import Image from "next/image";
import { Card } from "../components/card";
import { Navigation } from "../components/nav";
import data from "./data.json";

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
                    Results-oriented Backend Software Engineer and IT Process
                    Management Supervisor with over 6 years of experience in
                    high-impact application development, process optimization,
                    and operational efficiency enhancement. Proven expertise in
                    designing solutions that reduce administrative workload by
                    up to 80% and simplify complex workflows, achieving up to
                    90% time savings in critical processes. Skilled in Web and
                    API development (Go, Typescript, MongoDB), Large Language
                    Models (LLMs), CI/CD, and automation with Streamlit and n8n.
                  </p>
                  <p className="mt-4 text-zinc-400">
                    Proven leadership skills in managing teams and guiding them
                    to achieve project goals. Adept in Web and API development,
                    with a strong background in Go, Typescript, Python, MongoDB,
                    RDBMS, Docker, and Gitlab CI. Eager to bring expertise and
                    leadership abilities to your team, contributing to mutual
                    success.
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
        <div className="w-full h-px bg-zinc-800" />
        <h2 className="mt-4 text-2xl font-normal text-zinc-100">Skills</h2>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.map((item) => (
            <Card key={item?.id}>
              <div className="p-8 font-normal text-zinc-100">
                <h3 className="mt-4 text-xl">{item?.category}</h3>
                <ul className="font-light text-zinc-400">
                  {item?.skills?.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
