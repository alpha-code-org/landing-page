export function formatPublishDate(publishDate: string) {
  return new Date(publishDate).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function sortByDate<T extends { publishDate: string }>(posts: T[]): T[] {
  return posts.sort(
    (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime(),
  );
}
