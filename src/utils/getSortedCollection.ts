import filterCollection from "./filterCollection";

type SortableEntry = {
  data: {
    title: string;
    featured?: boolean;
    draft?: boolean;
    pubDatetime?: Date;
    modDatetime?: Date | null;
  };
};

const getSortedCollection = <T extends SortableEntry>(entries: T[]) => {
  return entries
    .filter(filterCollection)
    .sort((a, b) => {
      const featuredDiff =
        Number(b.data.featured ?? false) - Number(a.data.featured ?? false);

      if (featuredDiff !== 0) return featuredDiff;

      const aTime = new Date(
        a.data.modDatetime ?? a.data.pubDatetime ?? "1970-01-01"
      ).getTime();
      const bTime = new Date(
        b.data.modDatetime ?? b.data.pubDatetime ?? "1970-01-01"
      ).getTime();

      if (bTime !== aTime) return bTime - aTime;

      return a.data.title.localeCompare(b.data.title);
    });
};

export default getSortedCollection;
