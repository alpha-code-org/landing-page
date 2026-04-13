import ServiceCard from "../cards/ServiceCard";
import Link from "next/link";
import { CardItem } from "../ui/3d-card";
import { formatPublishDate } from "@/utils/post";

interface Props {
  title: string;
  slug: string;
  publishDate: string;
}

export const PostCard = ({ title, slug, publishDate }: Props) => {
  return (
    <Link href={`/blog/${slug}`} className="flex w-full flex-col">
      <ServiceCard
        title={title}
        description={formatPublishDate(publishDate)}
        imageSrc={`/blog/${slug}/hero.webp`}
        width="w-full"
      >
        <div className="mt-4 flex items-center justify-between md:mt-20">
          <CardItem
            translateZ={20}
            className="rounded-xl px-4 py-2 text-base font-normal text-neutral-900 dark:text-white"
          >
            Read now →
          </CardItem>
        </div>
      </ServiceCard>
    </Link>
  );
};
