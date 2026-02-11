"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  "Post-production Video",
  "Visual Storytelling",
  "Adobe Premiere Pro",
  "Color Grading",
  "Sound Design",
  "Motion Design",
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

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
              ABOUT ME
            </p>
            <h2
              data-about="heading"
              className="mt-4 text-4xl leading-tight font-light text-primary md:text-5xl"
            >
              Crafting stories
              <br />
              through every cut
            </h2>
            <p
              data-about="bio"
              className="mt-8 max-w-md text-base leading-relaxed text-secondary"
            >
              Creative video editor and rigorous virtual assistant, I combine
              technical post-production skills with content management
              expertise. Passionate about storytelling, I help creators and
              businesses transform their ideas into impactful content while
              optimizing their daily workflow.
            </p>
          </div>

          {/* Right — skills */}
          <div data-about="skills" className="flex flex-col justify-end">
            <p className="mb-6 text-sm tracking-widest text-secondary">
              SKILLS
            </p>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <span
                  key={skill}
                  data-about="skill"
                  className="cursor-pointer rounded-full border border-secondary/20 px-5 py-2.5 text-sm text-primary transition-colors hover:border-primary hover:bg-primary hover:text-white"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
