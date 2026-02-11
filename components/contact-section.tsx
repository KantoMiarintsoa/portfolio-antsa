"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("Contact");
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
        throw new Error(body.error || t("error"));
      }

      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : t("error"));
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
              <p className="text-sm tracking-widest text-secondary">
                {t("label")}
              </p>
              <h2 className="mt-4 text-4xl leading-tight font-light text-primary md:text-5xl">
                {t("headingLine1")}
                <br />
                {t("headingLine2")}
              </h2>
            </div>
            <p
              data-contact="description"
              className="mt-8 max-w-md text-base leading-relaxed text-secondary"
            >
              {t("description")}
            </p>
          </div>

          {/* Right — form */}
          <div data-contact="form">
            {status === "success" ? (
              <div className="flex h-full items-center">
                <div>
                  <p className="text-xl font-light text-primary">
                    {t("successTitle")}
                  </p>
                  <p className="mt-2 text-sm text-secondary">
                    {t("successMessage")}
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-6 text-sm text-primary underline underline-offset-4 transition-colors hover:text-secondary"
                  >
                    {t("sendAnother")}
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
                    {t("nameLabel")}
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register("name", { required: t("nameRequired") })}
                    className="w-full border-b border-secondary/20 bg-transparent py-3 text-primary outline-none transition-colors placeholder:text-secondary/40 focus:border-primary"
                    placeholder={t("namePlaceholder")}
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
                    {t("emailLabel")}
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register("email", {
                      required: t("emailRequired"),
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: t("emailInvalid"),
                      },
                    })}
                    className="w-full border-b border-secondary/20 bg-transparent py-3 text-primary outline-none transition-colors placeholder:text-secondary/40 focus:border-primary"
                    placeholder={t("emailPlaceholder")}
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
                    {t("messageLabel")}
                  </label>
                  <textarea
                    id="message"
                    {...register("message", {
                      required: t("messageRequired"),
                    })}
                    rows={5}
                    className="w-full resize-none border-b border-secondary/20 bg-transparent py-3 text-primary outline-none transition-colors placeholder:text-secondary/40 focus:border-primary"
                    placeholder={t("messagePlaceholder")}
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
                    {status === "loading" ? t("sending") : t("send")}
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
