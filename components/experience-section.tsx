"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experience = [
  {
    role: "Video Editor",
    company: "AGLT",
    period: "Oct 2024 — Present",
    highlights: [
      "Edited 55+ videos for YouTube channels totaling 813 subscribers",
      "Reduced post-production time by 20% with custom templates",
      "Real estate video editing for clients in Belgium & Canada",
      "Short-form social media content with dynamic editing",
      "Color grading to make interiors warmer and more appealing",
    ],
  },
  {
    role: "Intern Journalist & Video Editor",
    company: "DRCC Vakinankaratra, Antsirabe",
    period: "2022 — 2024",
    highlights: [
      "Full video journal editing — assembly, titling, audio mixing",
      "Field journalism, interviews & cultural event coverage",
    ],
  },
];

const education = [
  {
    degree: "Bachelor in Communication",
    major: "Media & Journalism",
    school: "Adventist University Zurcher Sambaina",
    period: "2022 — 2024",
  },
  {
    degree: "Baccalaureate",
    major: "Series A2",
    school: "Lycee Catholique Sainte-Therese d'Antanifotsy",
    period: "2021",
  },
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section label + heading
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

      // Timeline items
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

      // Highlight lines
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

      // Education cards
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

      // Divider
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
          <p className="text-sm tracking-widest text-secondary">EXPERIENCE</p>
          <h2 className="mt-4 text-4xl leading-tight font-light text-primary md:text-5xl">
            Where I&apos;ve
            <br />
            been working
          </h2>
        </div>

        {/* Timeline */}
        <div data-exp="timeline" className="mt-16 space-y-16">
          {experience.map((exp) => (
            <div
              key={exp.company}
              data-exp="item"
              className="grid gap-8 md:grid-cols-[200px_1fr]"
            >
              {/* Left — period */}
              <div>
                <p className="text-sm text-secondary">{exp.period}</p>
              </div>

              {/* Right — details */}
              <div>
                <div className="flex items-baseline gap-3">
                  <h3 className="text-xl font-medium text-primary">
                    {exp.role}
                  </h3>
                  <span className="text-sm text-secondary">
                    — {exp.company}
                  </span>
                </div>
                <ul className="mt-5 space-y-2.5">
                  {exp.highlights.map((h) => (
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
            EDUCATION
          </p>
          <div data-exp="education" className="grid gap-10 md:grid-cols-2">
            {education.map((edu) => (
              <div key={edu.school} data-exp="edu">
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
