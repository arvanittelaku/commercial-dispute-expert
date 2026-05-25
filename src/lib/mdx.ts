import fs from "fs";
import path from "path";
import matter from "gray-matter";

const insightsDirectory = path.join(process.cwd(), "content/insights");

export type InsightFrontmatter = {
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  slug: string;
};

export type InsightPost = InsightFrontmatter & {
  content: string;
};

export function getInsightSlugs(): string[] {
  if (!fs.existsSync(insightsDirectory)) return [];
  return fs
    .readdirSync(insightsDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getInsightBySlug(slug: string): InsightPost | null {
  const fullPath = path.join(insightsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;

  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title as string,
    description: data.description as string,
    date: data.date as string,
    author: data.author as string,
    tags: (data.tags as string[]) ?? [],
    content,
  };
}

export function getAllInsights(): InsightPost[] {
  return getInsightSlugs()
    .map((slug) => getInsightBySlug(slug))
    .filter((post): post is InsightPost => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
