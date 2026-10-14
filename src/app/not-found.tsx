import Link from "next/link";

import { LogoMark } from "@/components/svg/logo";
import { Button } from "@/components/ui/button";
import { ArrowIcon } from "@/components/ui/arrow-icon";

export default function NotFound() {
  return (
    <section className="grid min-h-[100svh] place-items-center pt-24 pb-16">
      <div className="container-x flex flex-col items-center text-center">
        <LogoMark className="size-20" interval={2500} />
        <p className="mt-10 font-mono text-xs tracking-[0.18em] text-muted uppercase">Error 404</p>
        <h1 className="text-heading mt-4">
          This page <span className="font-serif font-normal italic">winked out.</span>
        </h1>
        <p className="mt-5 max-w-md text-lg text-muted">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <Button asChild size="lg" className="mt-9">
          <Link href="/">
            Back to home <ArrowIcon />
          </Link>
        </Button>
      </div>
    </section>
  );
}
