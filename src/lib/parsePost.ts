"use server";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { sync } from "glob";


export type PostMatter = {
    title: string;
    subtitle: string;
    description: string;
    date: string;
    thumbnail: string;
  };
  
  export type Post = PostMatter & {
    slug: string;
    content: string;
  };
  
  export type Test = PostMatter & {
    slug: string;
  };
  

const parsePost = (postPath: string): Post | undefined => {
    try {
      const file = fs.readFileSync(postPath, "utf-8");
      const { content, data } = matter(file);
      const grayMatter = data as PostMatter;
  
      return {
        ...grayMatter,
        content,
        slug: postPath.slice(postPath.indexOf(SLICE_PATH)).replace(".mdx", ""),
      };
    } catch (e) {
      console.error(e);
    }
  };

  const testPost =(postPath: string): Test | undefined => {
    try {
      const file = fs.readFileSync(postPath, "utf-8");
      const { content, data } = matter(file);
      const grayMatter = data as PostMatter;
  
      return {
        ...grayMatter,
        slug: postPath.slice(postPath.indexOf(SLICE_PATH)).replace(".mdx", ""),
      };
    } catch (e) {
      console.error(e);
    }
  };
  
  const BASE_PATH = "/src/posts";
  const SLICE_PATH = "/posts";
  const POSTS_PATH = path.join(process.cwd(), BASE_PATH);
  
  export const getAllPosts = () => {
    const postPaths: string[] = sync(`${POSTS_PATH}/**/*.mdx`);
    return postPaths.reduce<Post[]>((ac, postPath) => {
      const post = parsePost(postPath);
      if (!post) return ac;
  
      return [...ac, post];
    }, []);
  };
  
  export const test = () => {
    const postPaths: string[] = sync(`${POSTS_PATH}/**/*.mdx`);
    return postPaths.reduce<Test[]>((ac, postPath) => {
      const post = testPost(postPath);
      if (!post) return ac;
  
      return [...ac, post];
    }, []);
  }