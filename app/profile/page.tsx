import Image from "next/image";
import { Card } from "../components/card";
import { Navigation } from "../components/nav";

export default function Page() {
  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="mx-auto lg:mx-0">
          <div className="grid grid-cols-1 gap-8 w-full">
            <div className="w-full">
              <Card>
                <div className="flex">
                  <div className="p-8">
                    <div className="relative w-72 h-72 rounded-full overflow-hidden bg-[url('/pp.webp')] bg-cover bg-right-top bg-no-repeat -rotate-90 grayscale"></div>
                  </div>
                  <div className="w-full p-8">
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
                      Muhammad Rafiul Ilmi Syarifudin
                    </h2>
                    <h3 className="mt-4 text-xl font-normal text-zinc-100">
                      Lead Software Engineer | AI & ML Enthusiast
                    </h3>
                    <p className="mt-4 text-zinc-400">
                      Results-oriented Backend Software Engineer with 6+ years
                      of experience building high-impact applications that
                      improve operational efficiency. Pioneered the integration
                      of Large Language Models (LLMs) into the Qalboo chatbot
                      Qarib, significantly enhancing its ability to understand
                      and respond to user inquiries. Successfully led the
                      development of a new attendance monitoring system that
                      eliminated manual data entry, saving the company 90% in
                      costs. Also spearheaded the creation of an outsourcing
                      request-fulfillment system that streamlined recruitment,
                      enabling a 90% reduction in hiring time. Proven leadership
                      skills, currently managing two teams. Adept in Web and API
                      development, with experience in Go, Typescript, MongoDB,
                      RDBMS, Docker, and Gitlab CI. Eager to contribute my
                      expertise and leadership to your team's success.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
