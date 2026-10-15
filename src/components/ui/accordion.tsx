"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";

import { cn } from "@/lib/utils";

function Accordion(props: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item data-slot="accordion-item" className={cn("border-b border-line", className)} {...props} />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/trigger flex flex-1 items-center justify-between gap-6 py-6 text-left text-lg font-medium tracking-tight transition-colors outline-none md:py-7",
          className,
        )}
        {...props}
      >
        {children}
        <span
          aria-hidden
          className="relative grid size-10 shrink-0 place-items-center rounded-full border border-line transition-colors duration-300 group-hover/trigger:border-ink group-data-[state=open]/trigger:border-ink group-data-[state=open]/trigger:bg-ink sm:size-11"
        >
          <svg viewBox="0 0 16 16" className="size-4">
            <path
              d="M3 8h10"
              className="stroke-ink transition-[stroke] duration-300 group-data-[state=open]/trigger:stroke-volt"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <path
              d="M8 3v10"
              className="origin-center stroke-ink transition-transform duration-500 ease-out-expo group-data-[state=open]/trigger:scale-y-0"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="group/content overflow-hidden data-[state=closed]:animate-[accordion-up_450ms_cubic-bezier(0.65,0,0.35,1)_both] data-[state=open]:animate-[accordion-down_600ms_cubic-bezier(0.65,0,0.35,1)_both]"
      {...props}
    >
      <div
        className={cn(
          "max-w-2xl pb-7 type-body text-muted",
          "group-data-[state=closed]/content:animate-[accordion-fade-out_300ms_ease-out_both] group-data-[state=open]/content:animate-[accordion-fade-in_600ms_cubic-bezier(0.16,1,0.3,1)_120ms_both]",
          className,
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
