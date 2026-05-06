import type { APIRoute } from "astro";
import { Redis } from "@upstash/redis";
import { getComments, type CollectionName, type Comment } from "@/lib/content";

export const prerender = false;

const collections = new Set(["blogs", "projects", "works"]);
const maxNameLength = 80;
const maxMessageLength = 1000;

function getIp(request: Request) {
	const forwarded = request.headers.get("x-forwarded-for");
	if (forwarded) return forwarded.split(",")[0]?.trim();
	return (
		request.headers.get("x-real-ip") ??
		request.headers.get("x-vercel-forwarded-for") ??
		undefined
	);
}

function clean(value: unknown, maxLength: number) {
	if (typeof value !== "string") return "";
	return value
		.replace(/[\u0000-\u001f\u007f]/g, " ")
		.trim()
		.slice(0, maxLength);
}

async function sha256(value: string) {
	const buffer = await crypto.subtle.digest(
		"SHA-256",
		new TextEncoder().encode(value),
	);
	return Array.from(new Uint8Array(buffer))
		.map((byte) => byte.toString(16).padStart(2, "0"))
		.join("");
}

function readTarget(url: URL) {
	const collection = url.searchParams.get("collection");
	const slug = url.searchParams.get("slug");

	if (!collection || !collections.has(collection) || !slug) {
		return undefined;
	}

	return { collection: collection as CollectionName, slug };
}

export const GET: APIRoute = async ({ url }) => {
	const target = readTarget(url);

	if (!target) {
		return Response.json({ comments: [] }, { status: 400 });
	}

	const comments = await getComments(target.collection, target.slug);
	return Response.json({ comments });
};

export const POST: APIRoute = async ({ request }) => {
	if (!request.headers.get("content-type")?.includes("application/json")) {
		return new Response("must be json", { status: 400 });
	}

	let body: unknown;
	try {
		body = await request.json();
	} catch {
		return new Response("invalid json", { status: 400 });
	}

	if (!body || typeof body !== "object") {
		return new Response("comment details required", { status: 400 });
	}

	const fields = body as Record<string, unknown>;
	const collection = clean(fields.collection, 32);
	const slug = clean(fields.slug, 160);
	const name = clean(fields.name, maxNameLength);
	const message = clean(fields.message, maxMessageLength);
	const website = clean(fields.website, 200);

	if (website) {
		return new Response(null, { status: 202 });
	}

	if (!collections.has(collection) || !slug || !name || !message) {
		return new Response("collection, slug, name, and message required", {
			status: 400,
		});
	}

	if (
		!process.env.UPSTASH_REDIS_REST_URL ||
		!process.env.UPSTASH_REDIS_REST_TOKEN
	) {
		return Response.json(
			{ error: "Comment storage is not configured." },
			{ status: 503 },
		);
	}

	let redis: Redis;

	try {
		redis = Redis.fromEnv();
	} catch {
		return Response.json(
			{ error: "Comment storage is not configured." },
			{ status: 503 },
		);
	}

	const ip = getIp(request);

	try {
		if (ip) {
			const hash = await sha256(ip);
			const rateKey = ["comment-rate", hash, collection, slug].join(":");
			const isAllowed = await redis.set(rateKey, true, {
				nx: true,
				ex: 60,
			});

			if (!isAllowed) {
				return Response.json(
					{ error: "Please wait a minute before posting another comment." },
					{ status: 429 },
				);
			}
		}

		const comment: Comment = {
			id: crypto.randomUUID(),
			name,
			message,
			createdAt: new Date().toISOString(),
		};

		await redis.rpush(
			["comments", collection, slug].join(":"),
			JSON.stringify(comment),
		);

		return Response.json({ comment }, { status: 201 });
	} catch {
		return Response.json(
			{ error: "Could not save this comment right now." },
			{ status: 500 },
		);
	}
};

export const ALL: APIRoute = async () =>
	new Response("use GET or POST", { status: 405 });
