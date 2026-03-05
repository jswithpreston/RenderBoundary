export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
  coverImage?: string;
  draft?: boolean;
}

export interface Post extends PostFrontmatter {
  slug: string;
  content: string;
  readingTime: string;
}

export interface PostMeta extends Omit<Post, "content"> {}

export interface Heading {
  level: number;
  text: string;
  id: string;
}
