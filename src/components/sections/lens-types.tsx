import { CapabilityIcon, type CapabilityIconKey } from "@/components/svg/capability-icons";
import { PlayArea } from "@/components/ui/play-area";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";

const lensTypes: { icon: CapabilityIconKey; title: string; body: string; points: string[] }[] = [
  {
    icon: "face",
    title: "Face lenses",
    body: "Masks, makeup, transformations and expressions that track every move.",
    points: ["Face mesh & landmarks", "Hair & skin effects", "Expression triggers"],
  },
  {
    icon: "world",
    title: "World lenses",
    body: "3D characters, products and portals placed in the real world around you.",
    points: ["Surface & landmark AR", "Product try-on", "Interactive portals"],
  },
  {
    icon: "hand",
    title: "Lens games",
    body: "Quick, replayable games controlled with your face, hands or body.",
    points: ["Gesture controls", "Scores & challenges", "Built to replay"],
  },
  {
    icon: "economy",
    title: "Sponsored lenses",
    body: "Branded experiences that put your campaign straight into people's stories.",
    points: ["Campaign concepts", "Brand-safe builds", "Launch reporting"],
  },
];

export function LensTypes({ index = "02" }: { index?: string }) {
  return (
    <section aria-labelledby="lens-types-title" className="pb-20 sm:pb-28 lg:pb-36">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <SectionLabel index={index} className="text-muted">
              What we make
            </SectionLabel>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-8">
            <h2 id="lens-types-title" className="type-h2 max-w-3xl">
              Every kind of lens, <span className="font-serif font-normal italic">one studio.</span>
            </h2>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-4 sm:mt-16 md:grid-cols-2">
          {lensTypes.map((type, i) => (
            <li key={type.title}>
              <Reveal delay={(i % 2) * 0.08} className="h-full">
                <PlayArea
                  amount={0.7}
                  className="group flex h-full flex-col gap-10 rounded-[2rem] border border-line bg-paper p-7 transition-colors duration-500 hover:border-ink sm:p-9"
                >
                  <div className="flex items-start justify-between">
                    <span className="grid size-16 place-items-center rounded-2xl bg-volt">
                      <CapabilityIcon kind={type.icon} className="size-12 text-ink" />
                    </span>
                    <span className="font-mono text-xs text-muted tabular">0{i + 1}</span>
                  </div>
                  <div>
                    <h3 className="type-h3">{type.title}</h3>
                    <p className="mt-3 max-w-md text-muted">{type.body}</p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {type.points.map((p) => (
                        <li key={p} className="rounded-full border border-line px-3 py-1 text-sm">
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </PlayArea>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
