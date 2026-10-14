import { CapabilityIcon } from "@/components/svg/capability-icons";
import { ServiceArt } from "@/components/svg/service-art";
import type { BlogPost, CoverTone } from "@/lib/blog";
import { cn } from "@/lib/utils";

const tones: Record<CoverTone, string> = {
  volt: "bg-volt text-ink",
  cobalt: "bg-cobalt text-paper",
  signal: "bg-signal text-ink",
  ink: "bg-ink text-paper",
  paper: "bg-paper-2 text-ink",
};

const iconFor = { world: "world", coins: "economy", share: "multiplayer", chart: "analytics", face: "face" } as const;

/** Illustrated cover for a post: a solid brand color with an animated illustration (plays via PlayArea). */
export function BlogCover({ post, className, large = false }: { post: BlogPost; className?: string; large?: boolean }) {
  const { art, tone, label } = post.cover;
  return (
    <div
      role="img"
      aria-label={label}
      className={cn("relative grid place-items-center overflow-hidden", tones[tone], className)}
    >
      {art === "lens" || art === "cubes" || art === "phone" ? (
        <ServiceArt
          kind={art === "lens" ? "lenses" : art === "cubes" ? "roblox" : "apps"}
          className={large ? "w-[min(70%,26rem)]" : "w-[72%]"}
        />
      ) : (
        <CapabilityIcon kind={iconFor[art]} className={large ? "size-[min(40%,14rem)]" : "size-[42%]"} />
      )}
    </div>
  );
}
