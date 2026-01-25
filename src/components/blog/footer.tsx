interface Props {
  publishDate: string;
}

export function BlogFooter({ publishDate }: Props) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="mt-10 border-t border-stone-200 pt-6 dark:border-neutral-700">
      <p className="text-sm text-stone-500 dark:text-stone-400">
        Published on {formatDate(publishDate)}
      </p>
    </div>
  );
}
