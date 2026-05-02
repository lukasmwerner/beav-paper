import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { SITE } from "@/config";

export const BLOG_PATH = "src/data/blog";
export const PROJECT_PATH = "src/data/projects";

const baseSchema = (image: any) =>
  z.object({
    title: z.string(),
    description: z.string(),
    featured: z.boolean().optional(),
    draft: z.boolean().optional(),
    tags: z.array(z.string()).default([]),
    ogImage: image().or(z.string()).optional(),
  });

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: `./${BLOG_PATH}` }),
  schema: ({ image }) =>
    baseSchema(image).extend({
      author: z.string().default(SITE.author),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      canonicalURL: z.string().optional(),
      hideEditPost: z.boolean().optional(),
      timezone: z.string().optional(),
    }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: `./${PROJECT_PATH}` }),
  schema: ({ image }) =>
    baseSchema(image).extend({
      pubDatetime: z.date().optional(),
      modDatetime: z.date().optional().nullable(),
      status: z.string().optional(),
      repoUrl: z.string().url().optional(),
      demoUrl: z.string().url().optional(),
      canonicalURL: z.string().optional(),
      stack: z.array(z.string()).default([]),
    }),
});

export const collections = { blog, projects };
