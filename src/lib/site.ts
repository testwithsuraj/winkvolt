export const site = {
  name: "WinkVolt",
  url: "https://winkvolt.com",
  email: "info@winkvolt.com",
  /** Scheduling page for the "Book a 15-min call" buttons. Replace with your Cal.com / Calendly link. */
  bookingUrl: "https://cal.com/winkvolt/15min",
  tagline: "We build things people play with.",
  description:
    "WinkVolt is a creative technology studio building Snapchat Lenses, Roblox games and mobile apps. 150+ lenses shipped and 500M+ total views.",
} as const;

export const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
] as const;

export const stats = [
  { value: 150, suffix: "+", label: "Lenses built", note: "Face, world and game lenses" },
  { value: 500, suffix: "M+", label: "Total views", note: "Across every experience we've shipped" },
  { value: 3, suffix: "", label: "Platforms", note: "Snapchat, Roblox and mobile" },
] as const;

export const marqueeItems = [
  "Snapchat Lenses",
  "Lens Studio",
  "Roblox Games",
  "Luau",
  "iOS Apps",
  "Android Apps",
  "React Native",
  "Augmented Reality",
  "3D & Motion",
  "Live Ops",
] as const;

export type ServiceKey = "lenses" | "roblox" | "apps";

export const services: {
  key: ServiceKey;
  index: string;
  title: string;
  kicker: string;
  body: string;
  points: string[];
}[] = [
  {
    key: "lenses",
    index: "01",
    title: "Snapchat Lenses",
    kicker: "AR that people share",
    body: "Face, world and game lenses designed to be played, captured and passed on, built in Lens Studio from concept to launch.",
    points: ["Face & body tracking", "World & landmarker AR", "Lens games", "Sponsored brand lenses"],
  },
  {
    key: "roblox",
    index: "02",
    title: "Roblox Games",
    kicker: "Worlds players return to",
    body: "Experiences built in Roblox Studio with tight core loops, social mechanics and economies tuned to keep players coming back.",
    points: ["Game design & Luau", "Obbies, tycoons, sims", "UGC & avatar items", "Live ops & updates"],
  },
  {
    key: "apps",
    index: "03",
    title: "Mobile Apps",
    kicker: "Products in every pocket",
    body: "Native-feeling iOS and Android apps, from MVP to scale, with considered UX, fast performance and analytics built in.",
    points: ["Product & UX design", "iOS & Android", "Camera & AR features", "Store launch & growth"],
  },
];

export const capabilities = [
  { key: "face", title: "Face tracking", body: "Masks, makeup and expressions that follow every move." },
  { key: "world", title: "World AR", body: "Objects and portals anchored to the real world." },
  { key: "hand", title: "Hand & body", body: "Gestures that become controls, effects and games." },
  { key: "multiplayer", title: "Multiplayer", body: "Synced, social play built for groups of friends." },
  { key: "economy", title: "Economies", body: "Currencies, rewards and passes balanced for retention." },
  { key: "analytics", title: "Analytics", body: "Every launch measured, so the next one lands harder." },
] as const;

export const process = [
  {
    step: "01",
    title: "Spark",
    body: "We dig into your audience, goals and platform, then pitch concepts built to be played and shared.",
    meta: "Week 1",
  },
  {
    step: "02",
    title: "Prototype",
    body: "A playable early build, fast. We test the core interaction before we polish a single pixel.",
    meta: "Weeks 1–2",
  },
  {
    step: "03",
    title: "Build",
    body: "Art, code, sound and motion come together, with regular builds you can try on your own device.",
    meta: "Weeks 2–6",
  },
  {
    step: "04",
    title: "Launch & grow",
    body: "We ship, watch the numbers and iterate, tuning the experience as real players arrive.",
    meta: "Ongoing",
  },
] as const;

export const faqs = [
  {
    q: "What kinds of projects do you take on?",
    a: "Snapchat Lenses (face, world and game lenses), Roblox games and experiences, and iOS and Android apps. We work with brands, agencies, creators and founders.",
  },
  {
    q: "How long does a project take?",
    a: "A single lens can go from brief to live in one to three weeks. Roblox games and mobile apps usually take six to twelve weeks for a first release, depending on scope.",
  },
  {
    q: "Can you help with ideas, or do we need a full brief?",
    a: "Either works. Many projects start with a rough goal and an audience. We'll shape it into concepts and a clear plan before anything gets built.",
  },
  {
    q: "Do you support projects after launch?",
    a: "Yes. We offer live ops, content updates, performance tuning and analytics reviews so your experience keeps growing after day one.",
  },
  {
    q: "What does a project cost?",
    a: "Every project is scoped individually. Tell us what you have in mind and we'll come back with a clear estimate and timeline.",
  },
] as const;
