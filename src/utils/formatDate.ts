import { SITE } from "@/config";

const formatDate = (value?: Date | string | null, timezone = SITE.timezone) => {
  if (!value) return undefined;

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: timezone,
  }).format(new Date(value));
};

export default formatDate;
