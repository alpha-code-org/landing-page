import Image from "next/image";
import { Linkedin, Twitter, Github } from "lucide-react";

interface Props {
  author: string;
}

const authorData = {
  "Mateo Galić": {
    image: "https://avatars.githubusercontent.com/u/61632123?s=96&v=4",
    bio: "Full-stack developer at Alpha Code",
    social: {
      linkedin: "https://www.linkedin.com/in/mateo-gali%C4%87-bb0b90200/",
      twitter: "https://x.com/matteoo_eth",
      github: "https://github.com/mateogalic112",
    },
  },
};

export function BlogHeader({ author }: Props) {
  const authorInfo = authorData[author as keyof typeof authorData];

  if (!authorInfo) {
    return null;
  }

  return (
    <div className="mb-12">
      <div className="flex items-center gap-4">
        <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-gray-600">
          <Image
            src={authorInfo.image}
            alt={`${author} profile picture`}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">
          <h3 className="text-base font-semibold text-white">{author}</h3>
          <p className="text-sm text-gray-400">{authorInfo.bio}</p>

          <div className="mt-2 flex space-x-4">
            {authorInfo.social.linkedin && (
              <a
                href={authorInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors hover:text-blue-400"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            )}

            {authorInfo.social.twitter && (
              <a
                href={authorInfo.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors hover:text-blue-400"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
            )}

            {authorInfo.social.github && (
              <a
                href={authorInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors hover:text-gray-300"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
