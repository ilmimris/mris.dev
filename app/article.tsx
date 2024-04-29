import type { Work } from "@/.contentlayer/generated";
import Link from "next/link";
import { Eye, View } from "lucide-react";

type Props = {
  work: Work;
  views: number;
};

export const Article: React.FC<Props> = ({ work, views }) => {
  return (
    <Link href={`/works/${work?.slug}`}>
      <article className="p-4 md:p-8">
        <div className="flex justify-between gap-2 items-center">
          <span className="text-xs duration-1000 text-zinc-200 group-hover:text-white group-hover:border-zinc-200 drop-shadow-orange">
            {work?.from ? (
              <time dateTime={new Date(work?.from).toISOString()}>
                {Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
                  new Date(work?.from)
                )}
              </time>
            ) : (
              <span>Now</span>
            )}
            {" - "}
            {work?.until && work?.until !== "now" ? (
              <time dateTime={new Date(work?.until).toISOString()}>
                {Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
                  new Date(work.until)
                )}
              </time>
            ) : (
              <span>Present</span>
            )}
          </span>
          <span className="text-zinc-500 text-xs  flex items-center gap-1">
            <Eye className="w-4 h-4" />{" "}
            {Intl.NumberFormat("en-US", { notation: "compact" }).format(views)}
          </span>
        </div>
        <h2 className="z-20 text-xl font-medium duration-1000 lg:text-3xl text-zinc-200 group-hover:text-white font-display">
          {work?.position}
        </h2>
        <p className="z-20 mt-4 text-sm  duration-1000 text-zinc-400 group-hover:text-zinc-200">
          {work?.company}
        </p>
      </article>
    </Link>
  );
};
