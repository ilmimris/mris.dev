import Link from "next/link";
import React from "react";
import { Article } from "../article";

import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { allWorks } from "contentlayer/generated";

import { Redis } from "@upstash/redis";
import { Eye } from "lucide-react";

const redis = Redis.fromEnv();
export const revalidate = 60;

export default async function WorksPage() {
  const views = (
    await redis.mget<number[]>(
      ...allWorks.map((p) => ["pageviews", "projects", p.slug].join(":"))
    )
  ).reduce((acc, v, i) => {
    acc[allWorks[i].slug] = v ?? 0;
    return acc;
  }, {} as Record<string, number>);

  const current = allWorks.find((work) => work?.slug === "spv.sicepat")!;
  const sorted = allWorks
    .filter((p) => p.published)
    .filter((work) => work?.slug !== current?.slug)
    .sort(
      (a, b) =>
        new Date(b.from ?? Number.POSITIVE_INFINITY).getTime() -
        new Date(a.from ?? Number.POSITIVE_INFINITY).getTime()
    );

  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-20 space-y-8 md:space-y-0 mx-auto max-w-7xl lg:px-8 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0 md:my-8 lg:my-16">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Works
          </h2>
          <p className="mt-4 text-zinc-400">
            Work experiences that I have been through. Some are from my
            full-time job and some are from my part-time job.
          </p>
        </div>
        <div className="w-full h-px bg-zinc-800" />

        <div className="grid grid-cols-1 w-full p-8 md:w-4/5 mx-auto justify-center">
          <Card>
            <Link href={`/works/${current.slug}`}>
              <article className="relative w-full h-full p-4 md:p-8">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-xs text-zinc-100">
                    {current.from ? (
                      <time dateTime={new Date(current.from).toISOString()}>
                        {Intl.DateTimeFormat(undefined, {
                          dateStyle: "medium",
                        }).format(new Date(current.from))}
                      </time>
                    ) : (
                      <span>Now</span>
                    )}
                    {" - "}
                    {current.until && current.until !== "now" ? (
                      <time dateTime={new Date(current?.until).toISOString()}>
                        {Intl.DateTimeFormat(undefined, {
                          dateStyle: "medium",
                        }).format(new Date(current.until))}
                      </time>
                    ) : (
                      <span>Present</span>
                    )}
                  </div>
                  <span className="flex items-center gap-1 text-xs text-zinc-500">
                    <Eye className="w-4 h-4" />{" "}
                    {Intl.NumberFormat("en-US", { notation: "compact" }).format(
                      views[current.slug] ?? 0
                    )}
                  </span>
                </div>

                <h2
                  id="featured-post"
                  className="mt-4 text-3xl font-bold text-zinc-100 group-hover:text-white sm:text-4xl font-display"
                >
                  {current.position}
                </h2>
                <p className="mt-2 leading-8 duration-150 text-zinc-400 group-hover:text-zinc-300">
                  {current.company}
                </p>
                <div className="pt-2">
                  <p className="hidden text-zinc-200 hover:text-zinc-50 lg:block">
                    Read more <span aria-hidden="true">&rarr;</span>
                  </p>
                </div>
              </article>
            </Link>
          </Card>
        </div>

        <div className="w-full h-px md:block bg-zinc-800" />

        <div className="grid grid-cols-1 gap-8 md:gap-0 w-10/12 md:w-full lg:mx-0 mx-auto md:mt-0">
          {sorted.map((work) => (
            <div className="grid md:grid-cols-2" key={work.slug}>
              <div className="hidden md:flex md:flex-col w-full md:w-1/4 items-center ml-auto mr-4">
                <div className="w-px h-1/2 bg-zinc-800" />
                <div className="w-4 h-4 bg-zinc-500 rounded-full" />
                <div className="w-px h-1/2 bg-zinc-800" />
              </div>
              <div className="flex flex-col items-center -mt-8 md:hidden">
                <div className="w-px h-8 bg-slate-200" />
              </div>
              <div className="w-full md:w-3/4 md:mt-8">
                <Card>
                  <Article work={work} views={views[work.slug] ?? 0} />
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
