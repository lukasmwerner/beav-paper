import { BLOG_PATH } from "@/content.config";
import { slugifyStr } from "./slugify";

type GetPathOptions = {
  includeBase?: boolean;
  basePath?: string;
  contentPath?: string;
};

/**
 * Get full path for a collection entry.
 * @param id - id of the collection entry (aka slug)
 * @param filePath - the entry's full file location
 * @param options - path generation options
 * @returns entry path
 */
export function getPath(
  id: string,
  filePath: string | undefined,
  options: GetPathOptions | boolean = {}
) {
  const resolvedOptions =
    typeof options === "boolean" ? { includeBase: options } : options;

  const {
    includeBase = true,
    basePath = "/posts",
    contentPath = BLOG_PATH,
  } = resolvedOptions;

  const pathSegments = filePath
    ?.replace(contentPath, "")
    .split("/")
    .filter(path => path !== "")
    .filter(path => !path.startsWith("_"))
    .slice(0, -1)
    .map(segment => slugifyStr(segment));

  const resolvedBasePath = includeBase ? basePath : "";

  const entryId = id.split("/");
  const slug = entryId.length > 0 ? entryId.slice(-1) : entryId;

  if (!pathSegments || pathSegments.length < 1) {
    return [resolvedBasePath, slug].join("/");
  }

  return [resolvedBasePath, ...pathSegments, slug].join("/");
}
