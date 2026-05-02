import type { CollectionEntry } from "astro:content";
import filterCollection from "./filterCollection";

const postFilter = (post: CollectionEntry<"blog">) => filterCollection(post);

export default postFilter;
