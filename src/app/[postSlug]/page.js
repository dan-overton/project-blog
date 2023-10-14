import BlogHero from "@/components/BlogHero";
import { notFound } from "next/navigation";

import CodeSnippet from "@/components/CodeSnippet";
import { loadBlogPost } from "@/helpers/file-helpers";
import { MDXRemote } from "next-mdx-remote/rsc";
import React from "react";
import styles from "./postSlug.module.css";

const cachedBlogPost = React.cache(async (slug) => {
  try {
    const post = await loadBlogPost(slug);
    return post;
  } catch (err) {
    if (err.code === "ENOENT") {
      return undefined;
    }
    throw err;
  }
});

const DivisionGroupsDemo = React.lazy(() =>
  import("@/components/DivisionGroupsDemo")
);

const CircularColorsDemo = React.lazy(() =>
  import("@/components/CircularColorsDemo")
);

export async function generateMetadata({ params }) {
  const blogPost = await cachedBlogPost(params.postSlug);

  if (!blogPost) {
    return {};
  }

  return {
    title: blogPost.frontmatter.title,
    description: blogPost.frontmatter.abstract,
  };
}

const components = {
  pre: CodeSnippet,
  DivisionGroupsDemo,
  CircularColorsDemo,
};

async function BlogPost({ params }) {
  const blogPost = await cachedBlogPost(params.postSlug);

  if (!blogPost) {
    notFound();
  }

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={blogPost.frontmatter.title}
        publishedOn={blogPost.frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote source={blogPost.content} components={components} />
      </div>
    </article>
  );
}

export default BlogPost;
