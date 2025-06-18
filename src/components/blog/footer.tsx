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
    <div>
      <p className="mt-1 text-base text-gray-500">Published on {formatDate(publishDate)}</p>
    </div>
  );
}
