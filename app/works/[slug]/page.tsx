import { notFound } from "next/navigation";
import { allWorks } from "contentlayer/generated";
import { Mdx } from "@/app/components/mdx";
import { Header } from "./header";
import "./mdx.css";
import { ReportView } from "./view";
import { Redis } from "@upstash/redis";

export const revalidate = 60;

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const redis = Redis.fromEnv();

export async function generateStaticParams(): Promise<Props["params"][]> {
  return allWorks
    .filter((w) => w.published)
    .map((w) => ({
      slug: w.slug,
    }));
}

export default async function PostPage(props: Props) {
  const params = await props.params;
  const slug = params?.slug;
  const work = allWorks.find((work) => work.slug === slug);

  if (!work) {
    notFound();
  }

  const views =
    (await redis.get<number>(["pageviews", "works", slug].join(":"))) ?? 0;

  return (
    <div className="bg-zinc-50 min-h-screen">
      <Header work={work} views={views} />
      <ReportView slug={work.slug} />

      <article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless">
        <Mdx code={work.body.code} />
      </article>
    </div>
  );
}
