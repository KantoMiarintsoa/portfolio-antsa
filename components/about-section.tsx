"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillKeys = [
  "postProduction",
  "storytelling",
  "premiere",
  "colorGrading",
  "soundDesign",
  "motionDesign",
  "photography",
  "retouching",
] as const;

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations("About");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-about='heading']", {
        scrollTrigger: {
          trigger: "[data-about='heading']",
          start: "top 85%",
        },
        opacity: 0,
        y: 60,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from("[data-about='bio']", {
        scrollTrigger: {
          trigger: "[data-about='bio']",
          start: "top 85%",
        },
        opacity: 0,
        y: 40,
        duration: 0.7,
        delay: 0.2,
        ease: "power3.out",
      });

      gsap.from("[data-about='skill']", {
        scrollTrigger: {
          trigger: "[data-about='skills']",
          start: "top 80%",
        },
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.08,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="bg-tertiary px-8 py-24 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-16 md:grid-cols-2">
          {/* Left — heading + bio */}
          <div>
            <p
              data-about="heading"
              className="text-sm tracking-widest text-secondary"
            >
              {t("label")}
            </p>
            <h2
              data-about="heading"
              className="mt-4 text-4xl leading-tight font-light text-primary md:text-5xl"
            >
              {t("headingLine1")}
              <br />
              {t("headingLine2")}
            </h2>
            <p
              data-about="bio"
              className="mt-8 max-w-md text-base leading-relaxed text-secondary"
            >
              {t("bio")}
            </p>
          </div>

          {/* Right — skills */}
          <div data-about="skills" className="flex flex-col justify-end">
            <p className="mb-6 text-sm tracking-widest text-secondary">
              {t("skillsLabel")}
            </p>
            <div className="flex flex-wrap gap-3">
              {skillKeys.map((key) => (
                <span
                  key={key}
                  data-about="skill"
                  className="cursor-pointer rounded-full border border-secondary/20 px-5 py-2.5 text-sm text-primary transition-colors hover:border-primary hover:bg-primary hover:text-white"
                >
                  {t(`skills.${key}`)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
