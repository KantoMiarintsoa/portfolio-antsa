"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: value,
      duration: 2,
      delay: 0.8,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = Math.round(obj.val).toString();
      },
    });
  }, [value]);

  return <span ref={ref}>0</span>;
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Sidebar text + line
      tl.from("[data-animate='sidebar']", {
        opacity: 0,
        x: -20,
        duration: 0.8,
      });

      // Stats fade up
      tl.from(
        "[data-animate='stats'] > div",
        {
          opacity: 0,
          y: 30,
          duration: 0.7,
          stagger: 0.15,
        },
        "-=0.4",
      );

      // Hello heading — reveal from bottom
      tl.from(
        "[data-animate='heading']",
        {
          opacity: 0,
          y: 80,
          duration: 1,
        },
        "-=0.5",
      );

      // Subtitle
      tl.from(
        "[data-animate='subtitle']",
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
        },
        "-=0.4",
      );

      // Profile image — scale + fade
      tl.from(
        "[data-animate='image']",
        {
          opacity: 0,
          scale: 1.1,
          duration: 1.2,
          ease: "power2.out",
        },
        0.3,
      );

      // Bottom elements
      tl.from(
        "[data-animate='bottom']",
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          stagger: 0.1,
        },
        "-=0.6",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-white"
    >
      {/* Left sidebar — "Video editor" */}
      <div
        data-animate="sidebar"
        className="absolute top-0 left-0 z-10 flex h-full w-16 flex-col items-center justify-center lg:w-20"
      >
        <div className="flex flex-col items-center gap-6">
          <span className="origin-center -rotate-90 whitespace-nowrap text-xs tracking-widest text-secondary">
            Video editor
          </span>
        </div>
        <div className="mt-8 h-24 w-px bg-secondary/30" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex h-full flex-col justify-between px-8 pt-28 pb-10 lg:px-12">
        {/* Stats */}
        <div data-animate="stats" className="ml-12 flex gap-12 lg:ml-16">
          <div>
            <p className="text-4xl font-light text-primary">
              <span className="text-secondary">+</span>
              <CountUp value={55} />
            </p>
            <p className="mt-1 text-xs text-secondary">Videos edited</p>
          </div>
          <div>
            <p className="text-4xl font-light text-primary">
              <span className="text-secondary">+</span>
              <CountUp value={20} />
            </p>
            <p className="mt-1 text-xs text-secondary">% faster delivery</p>
          </div>
        </div>

        {/* Hello + subtitle */}
        <div className="ml-12 lg:ml-16">
          <h1
            data-animate="heading"
            className="-ml-1 text-[120px] leading-none font-light tracking-tight text-primary md:text-[150px] lg:text-[180px]"
          >
            Hello
          </h1>
          <p data-animate="subtitle" className="mt-4 text-base text-secondary">
            — It&apos;s Antsa, a video storyteller
          </p>
        </div>

        {/* Bottom row */}
        <div className="ml-12 flex items-end justify-between lg:ml-16">
          <p data-animate="bottom" className="text-sm text-secondary">
            Scroll down &darr;
          </p>
        </div>
      </div>

      {/* Bottom-left "2025" */}
      <div
        data-animate="bottom"
        className="absolute bottom-0 left-0 z-10 flex w-16 items-center justify-center pb-12 lg:w-20"
      >
        <span className="origin-center -rotate-90 whitespace-nowrap text-xs tracking-widest text-secondary">
          2025
        </span>
      </div>

      {/* Profile image — right side */}
      <div
        data-animate="image"
        className="absolute right-12 bottom-0 h-[75%] w-[40%] overflow-hidden"
      >
        <Image
          src="/images/profile.png"
          alt="Antsa Ratolojanahary portrait"
          fill
          priority
          className="object-contain object-bottom"
        />
      </div>
    </section>
  );
}
