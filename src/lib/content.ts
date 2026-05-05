import type { CollectionEntry } from "astro:content";
import { Redis } from "@upstash/redis";

export type CollectionName = "blogs" | "projects" | "works";

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
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return Object.fromEntries(slugs.map((slug) => [slug, 0]));
  }

  try {
    const redis = Redis.fromEnv();
    const values = await redis.mget<number[]>(
      ...slugs.map((slug) => ["pageviews", collection, slug].join(":")),
    );

    return values.reduce(
      (acc, value, index) => {
        acc[slugs[index]] = value ?? 0;
        return acc;
      },
      {} as Record<string, number>,
    );
  } catch {
    return Object.fromEntries(slugs.map((slug) => [slug, 0]));
  }
}

export type BlogEntry = CollectionEntry<"blog">;
export type ProjectEntry = CollectionEntry<"projects">;
export type WorkEntry = CollectionEntry<"works">;
