"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type FormStatus = "idle" | "loading" | "success" | "error";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-contact='heading']", {
        scrollTrigger: {
          trigger: "[data-contact='heading']",
          start: "top 85%",
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from("[data-contact='description']", {
        scrollTrigger: {
          trigger: "[data-contact='description']",
          start: "top 85%",
        },
        opacity: 0,
        y: 40,
        duration: 0.7,
        delay: 0.2,
        ease: "power3.out",
      });

      gsap.from("[data-contact='field']", {
        scrollTrigger: {
          trigger: "[data-contact='form']",
          start: "top 80%",
        },
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out",
      });

      gsap.from("[data-contact='submit']", {
        scrollTrigger: {
          trigger: "[data-contact='form']",
          start: "top 75%",
        },
        opacity: 0,
        y: 20,
        duration: 0.5,
        delay: 0.3,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  async function onSubmit(data: ContactFormData) {
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || "Something went wrong.");
      }

      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong.",
      );
    }
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="bg-tertiary px-8 py-24 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-16 md:grid-cols-2">
          {/* Left — heading + description */}
          <div>
            <div data-contact="heading">
              <p className="text-sm tracking-widest text-secondary">CONTACT</p>
              <h2 className="mt-4 text-4xl leading-tight font-light text-primary md:text-5xl">
                Let&apos;s work
                <br />
                together
              </h2>
            </div>
            <p
              data-contact="description"
              className="mt-8 max-w-md text-base leading-relaxed text-secondary"
            >
              Have a project in mind or want to collaborate? Send me a message
              and I&apos;ll get back to you as soon as possible.
            </p>
          </div>

          {/* Right — form */}
          <div data-contact="form">
            {status === "success" ? (
              <div className="flex h-full items-center">
                <div>
                  <p className="text-xl font-light text-primary">
                    Message sent!
                  </p>
                  <p className="mt-2 text-sm text-secondary">
                    Thank you for reaching out. I&apos;ll get back to you soon.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-6 text-sm text-primary underline underline-offset-4 transition-colors hover:text-secondary"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div data-contact="field">
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm text-secondary"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register("name", { required: "Name is required." })}
                    className="w-full border-b border-secondary/20 bg-transparent py-3 text-primary outline-none transition-colors placeholder:text-secondary/40 focus:border-primary"
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div data-contact="field">
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm text-secondary"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register("email", {
                      required: "Email is required.",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address.",
                      },
                    })}
                    className="w-full border-b border-secondary/20 bg-transparent py-3 text-primary outline-none transition-colors placeholder:text-secondary/40 focus:border-primary"
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div data-contact="field">
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm text-secondary"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    {...register("message", {
                      required: "Message is required.",
                    })}
                    rows={5}
                    className="w-full resize-none border-b border-secondary/20 bg-transparent py-3 text-primary outline-none transition-colors placeholder:text-secondary/40 focus:border-primary"
                    placeholder="Tell me about your project..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {status === "error" && (
                  <p className="text-sm text-red-600">{errorMessage}</p>
                )}

                <div data-contact="submit">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-flex items-center gap-2 border border-primary bg-primary px-8 py-3 text-sm text-white transition-colors hover:bg-transparent hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {status === "loading" ? "Sending..." : "Send Message"}
                    {status !== "loading" && (
                      <span className="text-xs">&#8599;</span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
