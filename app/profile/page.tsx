import Image from "next/image";
import { Card } from "../components/card";
import { Navigation } from "../components/nav";

export default function Page() {
  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0 md:my-8 lg:my-16">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Profile
          </h2>
          <p className="mt-4 text-zinc-400">Professional summary</p>
        </div>

        <div className="w-full h-px bg-zinc-800" />

        <div className="mx-auto lg:mx-0">
          <div className="grid grid-cols-1 gap-8 w-full">
            <div className="w-full">
              <Card>
                <div className="flex mx-auto flex-col lg:flex-row items-center">
                  <div className="p-8">
                    <div className="relative w-72 h-72 rounded-full overflow-hidden bg-[url('/pp.jpg')] bg-cover bg-right-top bg-no-repeat grayscale hover:grayscale-0"></div>
                  </div>
                  <div className="w-full p-8">
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
                      Muhammad Rafiul Ilmi Syarifudin
                    </h2>
                    <h3 className="mt-4 text-xl font-normal text-zinc-100">
                      Lead Software Engineer | AI & ML Enthusiast
                    </h3>

                    <p className="mt-4 text-zinc-400">
                      Results-oriented Backend Software Engineer with over 6
                      years of experience. Specialized in building high-impact
                      applications that enhance operational efficiency.
                      Pioneered the integration of Large Language Models (LLMs)
                      into Qalboo chatbot, Qarib, significantly improving its
                      ability to understand and respond to user inquiries. Led
                      the development of a new attendance monitoring system,
                      eliminating manual data entry and saving the company 90%
                      in costs. Spearheaded the creation of an outsourcing
                      request-fulfillment system, streamlining the recruitment
                      process and enabling a 90% reduction in hiring time.
                    </p>
                    <p className="mt-4 text-zinc-400">
                      Proven leadership skills in managing teams and guiding
                      them to achieve project goals. Adept in Web and API
                      development, with a strong background in Go, Typescript,
                      Python, MongoDB, RDBMS, Docker, and Gitlab CI. Eager to
                      bring expertise and leadership abilities to your team,
                      contributing to mutual success.
                    </p>
                    <p className="mt-4 text-zinc-400">
                      "Success is not measured by lines of code, but by the
                      problems solved and the value delivered."
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
        <div className="w-full h-px bg-zinc-800" />
        <h2 className="mt-4 text-2xl font-normal text-zinc-100">Skills</h2>

        <div className="w-full grid grid-cols-3 gap-8">
          <Card>
            <div className="p-8 font-normal text-zinc-100">
              <h3 className="mt-4 text-xl">Web development</h3>
              <ul className="font-light text-zinc-400">
                <li>Go</li>
                <li>Python</li>
                <li>NodeJS</li>
                <li>GraphQL</li>
                <li>ReactJS</li>
              </ul>
            </div>
          </Card>

          <Card>
            <div className="p-8 font-normal text-zinc-100">
              <h3 className="mt-4 text-xl">Databases</h3>
              <ul className="font-light text-zinc-400">
                <li>MongoDB</li>
                <li>Postgres</li>
                <li>Redis</li>
                <li>Neo4J</li>
              </ul>
            </div>
          </Card>

          <Card>
            <div className="p-8 font-normal text-zinc-100">
              <h3 className="mt-4 text-xl">Message Broker</h3>
              <ul className="font-light text-zinc-400">
                <li>Kafka</li>
              </ul>
            </div>
          </Card>

          <Card>
            <div className="p-8 font-normal text-zinc-100">
              <h3 className="mt-4 text-xl">AI</h3>
              <ul className="font-light text-zinc-400">
                <li>LLMs</li>
                <li>OpenAI</li>
                <li>Tensorflow 2 and Pytorch</li>
              </ul>
            </div>
          </Card>

          <Card>
            <div className="p-8 font-normal text-zinc-100">
              <h3 className="mt-4 text-xl">Cloud</h3>
              <ul className="font-light text-zinc-400">
                <li>Kubernetes</li>
                <li>GCP</li>
                <li>AWS</li>
              </ul>
            </div>
          </Card>

          <Card>
            <div className="p-8 font-normal text-zinc-100">
              <h3 className="mt-4 text-xl">DevOps</h3>
              <ul className="font-light text-zinc-400">
                <li>Docker</li>
                <li>Gitlab CI</li>
                <li>Terraform</li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
