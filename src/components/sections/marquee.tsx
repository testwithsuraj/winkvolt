import { marqueeItems } from "@/lib/site";

function Spark() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 shrink-0 fill-volt sm:size-6" aria-hidden>
      <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3Z" />
    </svg>
  );
}

export function Marquee() {
  const items = [...marqueeItems, ...marqueeItems];
  return (
    <section aria-label="What we work with" className="pause-on-hover overflow-hidden bg-ink py-5 text-paper sm:py-7">
      <ul className="flex w-max animate-marquee items-center [--marquee-duration:45s]">
        {items.map((item, i) => (
          <li
            key={`${item}-${i}`}
            aria-hidden={i >= marqueeItems.length}
            className="flex items-center gap-6 pr-6 text-2xl font-medium tracking-tight whitespace-nowrap sm:gap-10 sm:pr-10 sm:text-4xl"
          >
            <span className="transition-colors duration-300 hover:text-volt">{item}</span>
            <Spark />
          </li>
        ))}
      </ul>
    </section>
  );
}
