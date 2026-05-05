import type { APIRoute } from "astro";
import { getViews } from "@/lib/content";

export const prerender = false;

const collections = new Set(["blogs", "projects", "works"]);

export const GET: APIRoute = async ({ url }) => {
  const collection = url.searchParams.get("collection");
  const slugs = (url.searchParams.get("slugs") ?? "")
    .split(",")
    .map((slug) => slug.trim())
    .filter(Boolean);

  if (!collection || !collections.has(collection) || slugs.length === 0) {
    return Response.json({ views: {} }, { status: 400 });
  }

  const views = await getViews(collection as "blogs" | "projects" | "works", slugs);
  return Response.json({ views });
};
