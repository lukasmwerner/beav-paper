import type { CollectionEntry } from "astro:content";
import getSortedCollection from "./getSortedCollection";

const getSortedPosts = (posts: CollectionEntry<"blog">[]) => {
  return getSortedCollection(posts);
};

export default getSortedPosts;
