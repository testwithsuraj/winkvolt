export const site = {
  name: "WinkVolt",
  url: "https://winkvolt.com",
  email: "info@winkvolt.com",
  /** Cal.com booking page opened by every "Book a call" button. */
  bookingUrl: "https://cal.com/winkvolt/",
  tagline: "We build things people play with.",
  description:
    "WinkVolt is a creative technology studio building Snapchat Lenses people play and share: 150+ lenses built and 300M+ total views. Roblox games and mobile apps coming soon.",
} as const;

export type ServiceKey = "lenses" | "roblox" | "apps";
export type ServiceStatus = "live" | "soon";

export const services: {
  key: ServiceKey;
  slug: string;
  status: ServiceStatus;
  index: string;
  title: string;
  short: string;
  kicker: string;
  body: string;
  points: string[];
}[] = [
  {
    key: "lenses",
    slug: "snapchat-lenses",
    status: "live",
    index: "01",
    title: "Snapchat Lenses",
    short: "Face, world and game lenses",
    kicker: "AR that people share",
    body: "Face, world and game lenses designed to be played, captured and passed on, built in Lens Studio from concept to launch.",
    points: ["Face & body tracking", "World & landmarker AR", "Lens games", "Sponsored brand lenses"],
  },
  {
    key: "roblox",
    slug: "roblox-games",
    status: "soon",
    index: "02",
    title: "Roblox Games",
    short: "Worlds players return to",
    kicker: "Coming soon",
    body: "We're bringing the same play-first thinking to Roblox: experiences with tight core loops and social mechanics that keep players coming back.",
    points: ["Game design & Luau", "Obbies, tycoons, sims", "UGC & avatar items", "Live ops & updates"],
  },
  {
    key: "apps",
    slug: "mobile-apps",
    status: "soon",
    index: "03",
    title: "Mobile Apps",
    short: "Products in every pocket",
    kicker: "Coming soon",
    body: "Native-feeling iOS and Android apps with considered UX, fast performance and camera-first features are next on our roadmap.",
    points: ["Product & UX design", "iOS & Android", "Camera & AR features", "Store launch & growth"],
  },
];

export const serviceHref = (slug: string) => `/services/${slug}`;

/** Top-level navigation. Hash links point at sections of the home page. */
export const navItems = [
  { label: "Services", href: "/#services", dropdown: true },
  { label: "About", href: "/about", dropdown: false },
  { label: "Process", href: "/#process", dropdown: false },
  { label: "Blog", href: "/blog", dropdown: false },
  { label: "Contact", href: "/contact", dropdown: false },
] as const;

export const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
] as const;

export const stats = [
  { value: 150, suffix: "+", label: "Lenses built", note: "Face, world and game lenses" },
  { value: 300, suffix: "M+", label: "Total views", note: "Across every lens we've shipped" },
] as const;

export const marqueeItems = [
  "Snapchat Lenses",
  "Lens Studio",
  "Face Lenses",
  "World Lenses",
  "Lens Games",
  "Sponsored Lenses",
  "Augmented Reality",
  "Roblox Games · Soon",
  "Mobile Apps · Soon",
] as const;

export const capabilities = [
  { key: "face", title: "Face tracking", body: "Masks, makeup and expressions that follow every move." },
  { key: "world", title: "World AR", body: "Objects and portals anchored to the real world." },
  { key: "hand", title: "Hand & body", body: "Gestures that become controls, effects and games." },
  { key: "multiplayer", title: "Made to share", body: "Lenses designed to be captured, sent and passed between friends." },
  { key: "economy", title: "Brand campaigns", body: "Sponsored lenses that put your brand into people's stories." },
  { key: "analytics", title: "Analytics", body: "Every launch measured, so the next one lands harder." },
] as const;

export const process = [
  {
    step: "01",
    title: "Spark",
    body: "We dig into your audience, goals and brand, then pitch lens concepts built to be played and shared.",
    meta: "Days 1–3",
  },
  {
    step: "02",
    title: "Prototype",
    body: "A playable early build, fast. We test the core interaction on real devices before we polish a single pixel.",
    meta: "Week 1",
  },
  {
    step: "03",
    title: "Build",
    body: "Art, code, sound and motion come together, with test links you can try on your own phone along the way.",
    meta: "Weeks 1–3",
  },
  {
    step: "04",
    title: "Launch & grow",
    body: "We publish, watch the numbers and iterate, tuning the lens as real people start playing.",
    meta: "Ongoing",
  },
] as const;

export const faqs = [
  {
    q: "What do you build today?",
    a: "Snapchat Lenses: face, world and game lenses, for brands, agencies, creators and founders. Roblox games and mobile apps are coming soon, and you can get in touch now to hear first.",
  },
  {
    q: "How long does a lens take?",
    a: "A single lens usually goes from brief to live in one to three weeks, depending on the complexity of the tracking, 3D and interactions.",
  },
  {
    q: "Can you help with ideas, or do we need a full brief?",
    a: "Either works. Many projects start with a rough goal and an audience. We'll shape it into concepts and a clear plan before anything gets built.",
  },
  {
    q: "Do you support lenses after launch?",
    a: "Yes. We offer updates, seasonal refreshes, performance tuning and analytics reviews so your lens keeps performing after day one.",
  },
  {
    q: "What does a project cost?",
    a: "Every project is scoped individually. Book a 15-minute call or email us with what you have in mind and we'll come back with a clear estimate and timeline.",
  },
] as const;

export const values = [
  {
    title: "Playable first",
    body: "We prototype the interaction before anything else. If it isn't fun in the first five seconds, it isn't done.",
  },
  {
    title: "Made to share",
    body: "Every lens is designed around the moment someone captures it and sends it on. That's where reach comes from.",
  },
  {
    title: "Measured",
    body: "Views, shares and play time guide every iteration. Good instincts, checked against real numbers.",
  },
  {
    title: "Built to last",
    body: "Clean, performant builds that run smoothly on the phones people actually own, and stay easy to update.",
  },
] as const;
