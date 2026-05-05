import type { APIRoute } from "astro";
import { Redis } from "@upstash/redis";

export const prerender = false;

const collections = new Set(["blogs", "projects", "works"]);

function getIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim();
  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("x-vercel-forwarded-for") ??
    undefined
  );
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

  if (
    !body ||
    typeof body !== "object" ||
    !("collection" in body) ||
    !("slug" in body)
  ) {
    return new Response("collection and slug required", { status: 400 });
  }

  const collection = String(body.collection);
  const slug = String(body.slug);

  if (!collections.has(collection) || !slug) {
    return new Response("invalid collection or slug", { status: 400 });
  }

  if (
    !process.env.UPSTASH_REDIS_REST_URL ||
    !process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    return new Response(null, { status: 202 });
  }

  let redis: Redis;

  try {
    redis = Redis.fromEnv();
  } catch {
    return new Response(null, { status: 202 });
  }

  try {
    const ip = getIp(request);

    if (ip) {
      const hash = await sha256(ip);
      const isNew = await redis.set(
        ["deduplicate", hash, collection, slug].join(":"),
        true,
        {
          nx: true,
          ex: 24 * 60 * 60,
        },
      );

      if (!isNew) {
        return new Response(null, { status: 202 });
      }
    }

    await redis.incr(["pageviews", collection, slug].join(":"));
  } catch {
    return new Response(null, { status: 202 });
  }

  return new Response(null, { status: 202 });
};

export const ALL: APIRoute = async () =>
  new Response("use POST", { status: 405 });
