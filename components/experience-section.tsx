"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const jobKeys = ["aglt", "drcc"] as const;
const educationKeys = ["bachelor", "baccalaureate"] as const;

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations("Experience");

  const jobs = jobKeys.map((key) => ({
    key,
    role: t(`jobs.${key}.role`),
    company: t(`jobs.${key}.company`),
    period: t(`jobs.${key}.period`),
    highlights: t.raw(`jobs.${key}.highlights`) as string[],
  }));

  const education = educationKeys.map((key) => ({
    key,
    degree: t(`education.${key}.degree`),
    major: t(`education.${key}.major`),
    school: t(`education.${key}.school`),
    period: t(`education.${key}.period`),
  }));

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-exp='heading']", {
        scrollTrigger: {
          trigger: "[data-exp='heading']",
          start: "top 85%",
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from("[data-exp='item']", {
        scrollTrigger: {
          trigger: "[data-exp='timeline']",
          start: "top 80%",
        },
        opacity: 0,
        x: -30,
        duration: 0.7,
        stagger: 0.25,
        ease: "power3.out",
      });

      gsap.from("[data-exp='highlight']", {
        scrollTrigger: {
          trigger: "[data-exp='timeline']",
          start: "top 75%",
        },
        opacity: 0,
        y: 15,
        duration: 0.4,
        stagger: 0.06,
        ease: "power3.out",
      });

      gsap.from("[data-exp='edu']", {
        scrollTrigger: {
          trigger: "[data-exp='education']",
          start: "top 80%",
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.2,
        ease: "power3.out",
      });

      gsap.from("[data-exp='divider']", {
        scrollTrigger: {
          trigger: "[data-exp='divider']",
          start: "top 85%",
        },
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1,
        ease: "power3.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="bg-white px-8 py-24 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div data-exp="heading">
          <p className="text-sm tracking-widest text-secondary">{t("label")}</p>
          <h2 className="mt-4 text-4xl leading-tight font-light text-primary md:text-5xl">
            {t("headingLine1")}
            <br />
            {t("headingLine2")}
          </h2>
        </div>

        {/* Timeline */}
        <div data-exp="timeline" className="mt-16 space-y-16">
          {jobs.map((job) => (
            <div
              key={job.key}
              data-exp="item"
              className="grid gap-8 md:grid-cols-[200px_1fr]"
            >
              {/* Left — period */}
              <div>
                <p className="text-sm text-secondary">{job.period}</p>
              </div>

              {/* Right — details */}
              <div>
                <div className="flex items-baseline gap-3">
                  <h3 className="text-xl font-medium text-primary">
                    {job.role}
                  </h3>
                  <span className="text-sm text-secondary">
                    — {job.company}
                  </span>
                </div>
                <ul className="mt-5 space-y-2.5">
                  {job.highlights.map((h) => (
                    <li
                      key={h}
                      data-exp="highlight"
                      className="flex items-start gap-3 text-sm leading-relaxed text-secondary"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary/40" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div data-exp="divider" className="my-20 h-px w-full bg-secondary/20" />

        {/* Education */}
        <div>
          <p className="mb-12 text-sm tracking-widest text-secondary">
            {t("educationLabel")}
          </p>
          <div data-exp="education" className="grid gap-10 md:grid-cols-2">
            {education.map((edu) => (
              <div key={edu.key} data-exp="edu">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-lg font-medium text-primary">
                    {edu.degree}
                  </h3>
                  <span className="text-xs text-secondary">{edu.period}</span>
                </div>
                <p className="mt-1 text-sm text-secondary">{edu.major}</p>
                <p className="mt-2 text-xs text-secondary/70">{edu.school}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
