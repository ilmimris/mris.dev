import type { CollectionEntry } from "astro:content";
import { Redis } from "@upstash/redis";

export type CollectionName = "blogs" | "projects" | "works";

export type Comment = {
	id: string;
	name: string;
	message: string;
	createdAt: string;
};

export function slugFromId(id: string) {
	return id.replace(/\.(md|mdx)$/i, "");
}

export function formatDate(date?: Date | string) {
	if (!date) return "";
	return Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
		new Date(date),
	);
}

export function compactNumber(value: number) {
	return Intl.NumberFormat("en-US", { notation: "compact" }).format(value);
}

export async function getViews(collection: CollectionName, slugs: string[]) {
	if (slugs.length === 0) return {};
	if (
		!process.env.UPSTASH_REDIS_REST_URL ||
		!process.env.UPSTASH_REDIS_REST_TOKEN
	) {
		return Object.fromEntries(slugs.map((slug) => [slug, 0]));
	}

	try {
		const redis = Redis.fromEnv();
		const values = await redis.mget<number[]>(
			...slugs.map((slug) => ["pageviews", collection, slug].join(":")),
		);

		return values.reduce((acc, value, index) => {
			acc[slugs[index]] = value ?? 0;
			return acc;
		}, {} as Record<string, number>);
	} catch {
		return Object.fromEntries(slugs.map((slug) => [slug, 0]));
	}
}

function parseComment(value: unknown): Comment | undefined {
	if (typeof value !== "string") return undefined;

	try {
		const parsed = JSON.parse(value) as Partial<Comment>;
		if (
			!parsed ||
			typeof parsed.id !== "string" ||
			typeof parsed.name !== "string" ||
			typeof parsed.message !== "string" ||
			typeof parsed.createdAt !== "string"
		) {
			return undefined;
		}

		return {
			id: parsed.id,
			name: parsed.name,
			message: parsed.message,
			createdAt: parsed.createdAt,
		};
	} catch {
		return undefined;
	}
}

export async function getComments(collection: CollectionName, slug: string) {
	if (
		!process.env.UPSTASH_REDIS_REST_URL ||
		!process.env.UPSTASH_REDIS_REST_TOKEN
	) {
		return [];
	}

	try {
		const redis = Redis.fromEnv();
		const values = await redis.lrange<string[]>(
			["comments", collection, slug].join(":"),
			0,
			99,
		);

		return values
			.map(parseComment)
			.filter((comment): comment is Comment => Boolean(comment));
	} catch {
		return [];
	}
}

export type BlogEntry = CollectionEntry<"blog">;
export type ProjectEntry = CollectionEntry<"projects">;
export type WorkEntry = CollectionEntry<"works">;
