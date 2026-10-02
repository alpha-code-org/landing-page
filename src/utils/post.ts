export function formatPublishDate(publishDate: string) {
  return new Date(publishDate).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
