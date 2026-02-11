"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ChromaGrid, { type ChromaItem } from "@/components/chroma-grid";

gsap.registerPlugin(ScrollTrigger);

const galleryItems: ChromaItem[] = [
  {
    image: "/images/gallery/image1.jpeg",
    title: "Golden Hour",
    subtitle: "Landscape",
    borderColor: "#d9d9d9",
    gradient: "linear-gradient(180deg, #f2f2f2, #e2e2e2)",
  },
  {
    image: "/images/gallery/image2.jpeg",
    title: "Depth of Field",
    subtitle: "Macro",
    borderColor: "#d9d9d9",
    gradient: "linear-gradient(165deg, #f0f0f0, #e0e0e0)",
  },
  {
    image: "/images/gallery/image3.jpeg",
    title: "Contrast",
    subtitle: "Black & White",
    borderColor: "#d9d9d9",
    gradient: "linear-gradient(195deg, #ebebeb, #dcdcdc)",
  },
  {
    image: "/images/gallery/image4.jpeg",
    title: "Reflections",
    subtitle: "Architecture",
    borderColor: "#d9d9d9",
    gradient: "linear-gradient(225deg, #f2f2f2, #e2e2e2)",
  },
  {
    image: "/images/gallery/image5.jpeg",
    title: "Raw Emotion",
    subtitle: "Documentary",
    borderColor: "#d9d9d9",
    gradient: "linear-gradient(180deg, #ebebeb, #dcdcdc)",
  },
  {
    image: "/images/gallery/image6.jpeg",
    title: "Textures",
    subtitle: "Detail",
    borderColor: "#d9d9d9",
    gradient: "linear-gradient(160deg, #f0f0f0, #e0e0e0)",
  },
  {
    image: "/images/gallery/image7.jpeg",
    title: "Vanishing Point",
    subtitle: "Perspective",
    borderColor: "#d9d9d9",
    gradient: "linear-gradient(200deg, #f2f2f2, #e2e2e2)",
  },
  {
    image: "/images/gallery/image8.jpeg",
    title: "Still Life",
    subtitle: "Objects",
    borderColor: "#d9d9d9",
    gradient: "linear-gradient(170deg, #ebebeb, #dcdcdc)",
  },
];

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-gallery='heading']", {
        scrollTrigger: {
          trigger: "[data-gallery='heading']",
          start: "top 85%",
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from("[data-gallery='grid']", {
        scrollTrigger: {
          trigger: "[data-gallery='grid']",
          start: "top 85%",
        },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="portfolio" className="px-8 py-24 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div data-gallery="heading">
          <p className="text-sm tracking-widest text-secondary">PORTFOLIO</p>
          <h2 className="mt-4 text-4xl leading-tight font-light text-primary md:text-5xl">
            Photography
            <br />
            gallery
          </h2>
        </div>

        <div data-gallery="grid" className="mt-16">
          <ChromaGrid items={galleryItems} />
        </div>
      </div>
    </section>
  );
}
