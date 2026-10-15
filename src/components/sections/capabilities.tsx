import { CapabilityIcon } from "@/components/svg/capability-icons";
import { PlayArea } from "@/components/ui/play-area";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { capabilities } from "@/lib/site";

export function Capabilities({ index = "03" }: { index?: string }) {
  return (
    <section id="capabilities" aria-labelledby="capabilities-title" className="bg-ink py-20 text-paper sm:py-28 lg:py-36">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <SectionLabel index={index} className="text-paper/60">
              Capabilities
            </SectionLabel>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-8">
            <h2 id="capabilities-title" className="type-h2 max-w-3xl">
              The tech behind the <span className="font-serif font-normal text-volt italic">wink.</span>
            </h2>
            <p className="mt-6 max-w-xl type-lead text-paper/65">
              From real-time tracking to shareable game mechanics, we bring the full Lens Studio toolkit to every
              brief.
            </p>
          </Reveal>
        </div>

        <ul className="mt-10 grid gap-px overflow-hidden rounded-[2rem] border border-paper/10 bg-paper/10 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap, i) => (
            <li key={cap.key} className="bg-ink">
              <Reveal delay={(i % 3) * 0.08} className="h-full">
                <PlayArea
                  amount={0.8}
                  className="flex h-full flex-col gap-10 p-7 transition-colors duration-500 hover:bg-ink-2 data-[active=true]:bg-ink-2 sm:p-9"
                >
                  <div className="flex items-start justify-between">
                    <CapabilityIcon kind={cap.key} className="text-paper" />
                    <span className="font-mono text-xs text-paper/40 tabular">0{i + 1}</span>
                  </div>
                  <div>
                    <h3 className="type-h3">{cap.title}</h3>
                    <p className="mt-2 text-paper/60">{cap.body}</p>
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
