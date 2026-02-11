import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-white">
      {/* Left sidebar — "Video editor" */}
      <div className="absolute top-0 left-0 z-10 flex h-full w-16 flex-col items-center justify-center lg:w-20">
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
        <div className="ml-12 flex gap-12 lg:ml-16">
          <div>
            <p className="text-4xl font-light text-primary">
              <span className="text-secondary">+</span>55
            </p>
            <p className="mt-1 text-xs text-secondary">Videos edited</p>
          </div>
          <div>
            <p className="text-4xl font-light text-primary">
              <span className="text-secondary">+</span>20
            </p>
            <p className="mt-1 text-xs text-secondary">% faster delivery</p>
          </div>
        </div>

        {/* Hello + subtitle */}
        <div className="ml-12 lg:ml-16">
          <h1 className="-ml-1 text-[120px] leading-none font-light tracking-tight text-primary md:text-[150px] lg:text-[180px]">
            Hello
          </h1>
          <p className="mt-4 text-base text-secondary">
            — It&apos;s Antsa, a video storyteller
          </p>
        </div>

        {/* Bottom row */}
        <div className="ml-12 flex items-end justify-between lg:ml-16">
          {/* Scroll down */}
          <p className="text-sm text-secondary">Scroll down &darr;</p>
        </div>
      </div>

      {/* Bottom-left "2024" */}
      <div className="absolute bottom-0 left-0 z-10 flex w-16 items-center justify-center pb-12 lg:w-20">
        <span className="origin-center -rotate-90 whitespace-nowrap text-xs tracking-widest text-secondary">
          2025
        </span>
      </div>

      {/* Profile image — right side */}
      <div className="absolute top-0 right-0 h-full w-[55%] overflow-hidden">
        <Image
          src="/images/profile.png"
          alt="Antsa Ratolojanahary portrait"
          fill
          priority
          className="object-cover object-top grayscale"
        />
      </div>
    </section>
  );
}
