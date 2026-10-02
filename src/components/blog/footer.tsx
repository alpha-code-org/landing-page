import { formatPublishDate } from "@/utils/post";

interface Props {
  publishDate: string;
}

export function BlogFooter({ publishDate }: Props) {
  return (
    <div className="mt-10 border-t border-stone-200 pt-6 dark:border-neutral-700">
      <p className="text-sm text-stone-500 dark:text-stone-400">
        Published on {formatPublishDate(publishDate)}
      </p>
    </div>
  );
}
