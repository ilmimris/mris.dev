import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({
    base: "./content/blogs",
    pattern: "**/*.{md,mdx}",
    generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/i, ""),
  }),
  schema: z.object({
    published: z.boolean().optional().default(false),
    title: z.string(),
    date: z.coerce.date().optional(),
    tags: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({
    base: "./content/projects",
    pattern: "**/*.{md,mdx}",
    generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/i, ""),
  }),
  schema: z.object({
    published: z.boolean().optional().default(false),
    title: z.string(),
    description: z.string(),
    date: z.coerce.date().optional(),
    url: z.string().optional(),
    repository: z.string().optional(),
  }),
});

const works = defineCollection({
  loader: glob({
    base: "./content/works",
    pattern: "**/*.{md,mdx}",
    generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/i, ""),
  }),
  schema: z.object({
    published: z.boolean().optional().default(false),
    position: z.string(),
    company: z.string(),
    from: z.coerce.date().optional(),
    until: z.union([z.string(), z.coerce.date()]).optional(),
  }),
});

export const collections = { blog, projects, works };
