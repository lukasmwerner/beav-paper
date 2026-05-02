import { SITE } from "@/config";

type FilterableEntry = {
  data: {
    draft?: boolean;
    pubDatetime?: Date;
  };
};

const filterCollection = <T extends FilterableEntry>({ data }: T) => {
  if (data.draft) return false;
  if (!data.pubDatetime) return true;

  const isPublishTimePassed =
    Date.now() >
    new Date(data.pubDatetime).getTime() - SITE.scheduledPostMargin;

  return import.meta.env.DEV || isPublishTimePassed;
};

export default filterCollection;
