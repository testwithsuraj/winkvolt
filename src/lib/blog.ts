/*
 * Blog content. Each post is plain data so the same source feeds the pages,
 * JSON-LD, sitemap, RSS feed and llms-full.txt.
 *
 * Inline formatting inside text: **bold** and [link text](/path or https://...).
 */

export type BlogCategory = { slug: string; name: string; description: string };

export const blogCategories: BlogCategory[] = [
  {
    slug: "snapchat-lenses",
    name: "Snapchat Lenses",
    description: "How Snapchat Lenses work, the different types, and what makes a great one.",
  },
  {
    slug: "ar-marketing",
    name: "AR Marketing",
    description: "Using AR lenses in campaigns: reach, sharing, sponsored placements and measurement.",
  },
  {
    slug: "guides",
    name: "Guides",
    description: "Practical answers on cost, timelines and planning a lens project.",
  },
  {
    slug: "studio-news",
    name: "Studio News",
    description: "Updates from WinkVolt, including what we're building next.",
  },
];

export type Block =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string };

export type CoverArt = "lens" | "cubes" | "phone" | "world" | "coins" | "share" | "chart" | "face";
export type CoverTone = "volt" | "cobalt" | "signal" | "ink" | "paper";

export type BlogPost = {
  slug: string;
  title: string;
  /** Optional longer title for search results. */
  seoTitle?: string;
  description: string;
  category: string;
  tags: string[];
  published: string;
  updated: string;
  featured?: boolean;
  cover: { art: CoverArt; tone: CoverTone; label: string };
  /** Direct answer shown first on the page (answer-engine friendly). */
  answer: string;
  takeaways: string[];
  sections: { id: string; heading: string; blocks: Block[] }[];
  faqs: { q: string; a: string }[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "what-is-a-snapchat-lens",
    title: "What is a Snapchat Lens? A plain-English guide for brands",
    seoTitle: "What Is a Snapchat Lens? A Plain-English Guide for Brands (2026)",
    description:
      "Snapchat Lenses are augmented reality effects people play with in the Snapchat camera. Here's how they work, where people find them and why brands use them.",
    category: "snapchat-lenses",
    tags: ["Snapchat Lenses", "Augmented reality", "Lens Studio", "Brand marketing"],
    published: "2026-10-14",
    updated: "2026-10-14",
    featured: true,
    cover: { art: "lens", tone: "volt", label: "A face lens with tracking points and sunglasses" },
    answer:
      "A Snapchat Lens is an augmented reality (AR) experience that runs inside the Snapchat camera. It can change your face, place 3D objects in the world around you, or turn the camera into a small game. Lenses are built in Lens Studio, Snap's free desktop app, and people use them to create Snaps and Stories they share with friends.",
    takeaways: [
      "A Lens is an AR effect that runs in the Snapchat camera, in real time.",
      "There are three broad types: face lenses, world lenses and lens games.",
      "Lenses are built in Lens Studio and published to Snapchat after review.",
      "People find lenses in the camera, through Lens Explorer, links and Snapcodes.",
      "Brands use lenses because every capture is a shareable piece of content.",
    ],
    sections: [
      {
        id: "how-lenses-work",
        heading: "How does a Snapchat Lens work?",
        blocks: [
          {
            type: "p",
            text: "When you open a Lens, Snapchat's camera tracks what it sees, such as your face, your hands or the floor in front of you, and draws digital content on top of it in real time. Move your head and a mask moves with you. Point the camera at a table and a 3D character can stand on it.",
          },
          {
            type: "p",
            text: "Under the hood, a Lens is a small package of 3D models, textures, animation, sound and scripts. It is built in [Lens Studio](https://ar.snap.com/lens-studio), Snap's free tool for creating AR, then submitted to Snapchat, where it is reviewed before it goes public.",
          },
        ],
      },
      {
        id: "types",
        heading: "What kinds of lenses are there?",
        blocks: [
          { type: "p", text: "Most lenses fall into one of three groups:" },
          {
            type: "ul",
            items: [
              "**Face lenses** track facial features to add masks, makeup, accessories or full transformations.",
              "**World lenses** use the back camera to place objects, characters or portals into the space around you.",
              "**Lens games** turn the camera into a quick, replayable game you control with your face, hands or body.",
            ],
          },
          {
            type: "p",
            text: "We break each one down, with what it is best for, in [Face, world and game lenses explained](/blog/types-of-snapchat-lenses).",
          },
        ],
      },
      {
        id: "where-people-find-lenses",
        heading: "Where do people find lenses?",
        blocks: [
          {
            type: "ul",
            items: [
              "**In the camera:** the Lens Carousel shows lenses right next to the capture button.",
              "**Lens Explorer:** Snapchat's searchable library of community and brand lenses.",
              "**Links and Snapcodes:** a scannable code or URL that opens a specific lens, useful on packaging, posters and social posts.",
              "**Shared Snaps:** when a friend sends a Snap made with a lens, there is usually a quick way to try it yourself.",
              "**Sponsored placements:** brands can pay to feature a lens in the carousel through Snapchat's ad platform.",
            ],
          },
        ],
      },
      {
        id: "why-brands-use-lenses",
        heading: "Why do brands use Snapchat Lenses?",
        blocks: [
          {
            type: "p",
            text: "A banner is something people scroll past. A lens is something people **do**, and every time someone captures a Snap with it, they create a piece of content featuring your brand and send it to people who trust them. That is why lenses can travel so far: across the 150+ lenses we have built, they have reached over 500 million total views.",
          },
          {
            type: "p",
            text: "Lenses also come with clear numbers. Snapchat's lens analytics report metrics such as views, plays, shares and play time, so you can see exactly how people engaged.",
          },
        ],
      },
      {
        id: "getting-started",
        heading: "How do you get a lens made?",
        blocks: [
          {
            type: "p",
            text: "You can learn Lens Studio and build one yourself, or work with a studio like WinkVolt. A typical custom lens goes from idea to live in one to three weeks: we shape the concept, prototype the interaction, build and test it on real phones, then publish and measure. See [how long a lens takes](/blog/how-long-does-it-take-to-build-a-snapchat-lens) for the detail.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Are Snapchat Lenses free to use?",
        a: "Yes. Anyone with Snapchat can use public lenses at no cost. Brands pay for building a custom lens and, optionally, for sponsored placements that promote it.",
      },
      {
        q: "What is the difference between a Lens and a Filter on Snapchat?",
        a: "A Filter is a static overlay, such as a frame or a location graphic, applied after you take a Snap. A Lens is interactive AR that reacts to your face, body or surroundings in real time while the camera is open.",
      },
      {
        q: "Do I need to code to make a Snapchat Lens?",
        a: "Simple lenses can be made in Lens Studio with templates and little or no code. Interactive lenses and lens games usually need scripting, 3D art and testing, which is where a specialist studio helps.",
      },
    ],
  },
  {
    slug: "types-of-snapchat-lenses",
    title: "Face, world and game lenses: the three types of Snapchat Lens explained",
    seoTitle: "Types of Snapchat Lenses: Face, World and Game Lenses Explained",
    description:
      "The three main types of Snapchat Lens, what each one does, how they are tracked, and which one fits your campaign goal.",
    category: "snapchat-lenses",
    tags: ["Face lenses", "World lenses", "Lens games", "Lens Studio"],
    published: "2026-10-14",
    updated: "2026-10-14",
    cover: { art: "world", tone: "cobalt", label: "A 3D cube floating above a surface" },
    answer:
      "Snapchat Lenses come in three main types. Face lenses track your face to add masks, makeup or transformations. World lenses use the back camera to place 3D objects in your surroundings. Lens games turn the camera into a playable game controlled by your face, hands or body. The right type depends on whether you want self-expression, product visualisation or replayable fun.",
    takeaways: [
      "Face lenses are the most familiar and the easiest to share as selfies.",
      "World lenses are ideal for showing products or characters in real spaces.",
      "Lens games drive repeat plays and longer play time.",
      "Many of the best lenses combine types, such as a face game with world effects.",
    ],
    sections: [
      {
        id: "face-lenses",
        heading: "Face lenses",
        blocks: [
          {
            type: "p",
            text: "Face lenses use the front camera to track facial features and expressions. They power masks, makeup, hair colour, accessories and full transformations, and they can react to expressions like raising your eyebrows or opening your mouth.",
          },
          {
            type: "ul",
            items: [
              "**Best for:** self-expression, beauty and fashion, character campaigns, launches built around a look.",
              "**Why they work:** a selfie with a lens is the most natural thing to send to a friend.",
            ],
          },
        ],
      },
      {
        id: "world-lenses",
        heading: "World lenses",
        blocks: [
          {
            type: "p",
            text: "World lenses use the back camera to understand surfaces and space, so 3D content can sit on a table, stand on the floor or appear through a portal. Some lenses can also recognise specific places or objects and anchor content to them.",
          },
          {
            type: "ul",
            items: [
              "**Best for:** product visualisation, mascots and characters, events and out-of-home moments.",
              "**Why they work:** people can see something at real scale, in their own space, before they buy.",
            ],
          },
        ],
      },
      {
        id: "lens-games",
        heading: "Lens games",
        blocks: [
          {
            type: "p",
            text: "Lens games are short, replayable games that live inside the camera. You might dodge obstacles by tilting your head, catch falling items with your mouth, or race against a timer with hand gestures. A score at the end gives people a reason to play again and challenge friends.",
          },
          {
            type: "ul",
            items: [
              "**Best for:** engagement, play time and repeat visits.",
              "**Why they work:** competition is social. Beating a friend's score is a reason to share.",
            ],
          },
        ],
      },
      {
        id: "choosing",
        heading: "Which type of lens should you choose?",
        blocks: [
          {
            type: "ol",
            items: [
              "**Want people to share selfies with your brand?** Start with a face lens.",
              "**Want people to see a product in their space?** Choose a world lens.",
              "**Want people to stay longer and come back?** Build a lens game.",
            ],
          },
          {
            type: "p",
            text: "In practice, the strongest concepts often blend types: a face-controlled game with world effects, or a try-on with a playful reveal. If you are unsure, [book a 15-minute call](/contact) and we will suggest a direction.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Which type of Snapchat Lens gets the most shares?",
        a: "Face lenses are usually the easiest to share because they produce selfies, but lens games can earn more repeat plays. The concept matters more than the type: a clear, funny or surprising moment is what people send on.",
      },
      {
        q: "Can one lens use both the front and back camera?",
        a: "Yes. A lens can include experiences for both cameras, such as a face effect on the front camera and a world effect when the user flips to the back camera.",
      },
    ],
  },
  {
    slug: "how-much-does-a-snapchat-lens-cost",
    title: "What does a custom Snapchat Lens cost? The six factors that decide it",
    seoTitle: "How Much Does a Custom Snapchat Lens Cost? 6 Factors That Decide It",
    description:
      "There is no single price for a Snapchat Lens. These six factors decide the cost of a custom lens, plus how to get an accurate estimate quickly.",
    category: "guides",
    tags: ["Pricing", "Budget", "Lens development", "Planning"],
    published: "2026-10-14",
    updated: "2026-10-14",
    cover: { art: "coins", tone: "signal", label: "A stack of coins with a sparkle" },
    answer:
      "The cost of a custom Snapchat Lens depends on six things: how complex the concept is, which tracking it needs, how much custom 3D art and animation it uses, how interactive it is, how much polish it needs (sound, motion, effects) and how many rounds of testing and revision are involved. Paid promotion, such as a sponsored placement, is a separate media budget on top of the build.",
    takeaways: [
      "A simple face effect costs far less than a multi-stage lens game.",
      "Custom 3D models and animation are often the biggest cost driver.",
      "Sponsored placements are a separate media spend, not part of the build.",
      "A clear goal and audience is the fastest route to an accurate quote.",
    ],
    sections: [
      {
        id: "factors",
        heading: "The six factors that decide the cost",
        blocks: [
          {
            type: "ol",
            items: [
              "**Concept complexity.** One effect that reacts to one trigger is quick. A lens with multiple states, a reveal and a payoff takes longer.",
              "**Tracking.** Face tracking is well supported. Hand, body, surface or location-based tracking adds design and testing time.",
              "**3D art and animation.** Using simple shapes or 2D graphics is efficient. Custom characters, products or environments built from scratch take the most time.",
              "**Interactivity and game logic.** Scores, timers, levels and randomised events need scripting and balancing.",
              "**Polish.** Sound design, particle effects, transitions and micro-animations are what make a lens feel premium.",
              "**Testing and revisions.** Lenses must run smoothly on a wide range of phones and stay within Snapchat's size limits, and every revision round adds time.",
            ],
          },
        ],
      },
      {
        id: "build-vs-media",
        heading: "Build cost vs media spend",
        blocks: [
          {
            type: "p",
            text: "The build is the cost of designing and developing the lens. Media is what you pay Snapchat, through its ad platform, if you want to promote the lens as a sponsored placement. Many lenses get strong organic reach without any media budget; others use paid placement to guarantee scale on a launch date. We compare the two in [Sponsored vs organic Snapchat Lenses](/blog/sponsored-vs-organic-snapchat-lenses).",
          },
        ],
      },
      {
        id: "save-money",
        heading: "How to get more lens for your budget",
        blocks: [
          {
            type: "ul",
            items: [
              "**Lead with one great interaction** rather than many average ones.",
              "**Reuse existing brand assets** such as 3D product files, logos and sound.",
              "**Agree on success metrics early** so effort goes where it moves the numbers.",
              "**Plan a series:** once the core is built, seasonal or themed variations are faster to make.",
            ],
          },
        ],
      },
      {
        id: "get-a-quote",
        heading: "How to get an accurate estimate",
        blocks: [
          {
            type: "p",
            text: "Share three things: your goal (awareness, engagement or product discovery), your audience and your launch date. With that, we can recommend a concept and give you a clear scope, timeline and estimate. The fastest way is a [15-minute call](/contact).",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Is it expensive to make a Snapchat Lens?",
        a: "It ranges widely. A simple branded face effect is a modest project, while a custom lens game with original 3D characters is a larger build. The six factors in this article decide where a project lands.",
      },
      {
        q: "Do I have to pay Snapchat to publish a lens?",
        a: "Publishing a lens made in Lens Studio does not require paying Snapchat. Paying is only needed if you want to promote it as a sponsored placement through Snapchat's ad platform.",
      },
    ],
  },
  {
    slug: "sponsored-vs-organic-snapchat-lenses",
    title: "Sponsored vs organic Snapchat Lenses: which should your brand use?",
    description:
      "Organic lenses spread through sharing; sponsored lenses buy guaranteed placement. Here's how they differ and when to use each, or both.",
    category: "ar-marketing",
    tags: ["Sponsored Lenses", "Organic reach", "Media planning", "Campaigns"],
    published: "2026-10-14",
    updated: "2026-10-14",
    cover: { art: "share", tone: "paper", label: "Three friends sharing a lens" },
    answer:
      "An organic lens is published to Snapchat and spreads through discovery and sharing, so reach depends on how much people love it. A sponsored lens is promoted through Snapchat's ad platform, which buys guaranteed placement in front of a chosen audience for a set period. Use organic for always-on, shareable ideas; use sponsored when you need scale on a specific date; combine both for launches.",
    takeaways: [
      "Organic lenses cost nothing to distribute but reach is earned, not guaranteed.",
      "Sponsored lenses guarantee placement and targeting for a media budget.",
      "The lens itself is the same craft either way. A great lens makes both work better.",
      "Launches often use sponsored placement first and organic sharing for the long tail.",
    ],
    sections: [
      {
        id: "organic",
        heading: "How organic lenses get reach",
        blocks: [
          {
            type: "p",
            text: "Once published, an organic lens can be found in Lens Explorer, opened from a link or Snapcode, and discovered when friends send Snaps made with it. Every share is a free impression, so the creative itself has to do the work.",
          },
          {
            type: "ul",
            items: [
              "**Strengths:** no media cost, long life, authentic peer-to-peer spread.",
              "**Watch-outs:** reach is unpredictable, and it relies on a concept people genuinely want to send.",
            ],
          },
        ],
      },
      {
        id: "sponsored",
        heading: "How sponsored lenses work",
        blocks: [
          {
            type: "p",
            text: "Sponsored lenses are bought through Snapchat's advertising tools. They appear prominently in the camera for the audience and dates you choose, which makes them a fit for product launches, film releases and big moments where timing matters.",
          },
          {
            type: "ul",
            items: [
              "**Strengths:** guaranteed scale, audience targeting, predictable timing.",
              "**Watch-outs:** needs a media budget, and results stop when the spend stops unless people keep sharing.",
            ],
          },
        ],
      },
      {
        id: "comparison",
        heading: "Sponsored vs organic at a glance",
        blocks: [
          {
            type: "ul",
            items: [
              "**Cost to distribute:** organic is free; sponsored needs a media budget.",
              "**Reach:** organic is earned and variable; sponsored is bought and predictable.",
              "**Timing:** organic builds over time; sponsored lands on your launch date.",
              "**Targeting:** organic spreads through friends; sponsored lets you pick an audience.",
            ],
          },
        ],
      },
      {
        id: "recommendation",
        heading: "Our recommendation",
        blocks: [
          {
            type: "p",
            text: "Design every lens as if it had no media budget. If it is good enough to spread organically, every paid impression also works harder, because more people capture and share it. For launches, combine both: a sponsored push for day-one scale, then organic sharing for the long tail. Our [seven ways to make a lens people share](/blog/how-to-make-a-snapchat-lens-people-share) is the place to start.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Can an organic lens later be turned into a sponsored lens?",
        a: "Usually, yes. A lens built to Snapchat's guidelines can typically be promoted later through the ad platform, though sponsored placements have their own creative and review requirements to check first.",
      },
      {
        q: "Which is better for a small brand?",
        a: "Start organic with a strong, shareable concept and promote it through your own channels with links and Snapcodes. Add sponsored placement when you have a launch or moment that needs guaranteed scale.",
      },
    ],
  },
  {
    slug: "how-to-make-a-snapchat-lens-people-share",
    title: "Seven ways to make a Snapchat Lens people actually share",
    seoTitle: "7 Ways to Make a Snapchat Lens People Actually Share",
    description:
      "What we've learned from 150+ lenses and 500M+ views about designing lenses people capture and send on, from the first second to the final reveal.",
    category: "ar-marketing",
    tags: ["Virality", "Lens design", "Engagement", "Best practices"],
    published: "2026-10-14",
    updated: "2026-10-14",
    cover: { art: "chart", tone: "volt", label: "A rising bar chart" },
    answer:
      "People share a lens when it gives them a moment worth sending. To get there: make the payoff obvious in the first second, centre the person rather than the logo, build in a surprise, keep the interaction to one simple action, design for the capture moment, make it run smoothly on everyday phones, and give people a reason to come back. These lessons come from building 150+ lenses with 500M+ total views.",
    takeaways: [
      "The first second decides whether someone keeps the lens open.",
      "People share lenses that make them look good, funny or surprising.",
      "One clear action beats a long list of instructions.",
      "Performance on mid-range phones is part of the creative.",
    ],
    sections: [
      {
        id: "first-second",
        heading: "1. Make the payoff obvious in the first second",
        blocks: [
          {
            type: "p",
            text: "Something should happen the instant the lens opens: a transformation, a sound, an object dropping in. If people have to wait or read before anything happens, many will swipe to the next lens.",
          },
        ],
      },
      {
        id: "centre-the-person",
        heading: "2. Centre the person, not the logo",
        blocks: [
          {
            type: "p",
            text: "People share Snaps of themselves and their friends, not ads. Put the brand into the experience, as the costume, the world or the game, rather than stamping a logo in the corner.",
          },
        ],
      },
      {
        id: "surprise",
        heading: "3. Build in a surprise",
        blocks: [
          {
            type: "p",
            text: "A reveal, a random outcome or a reaction to an expression gives people a reason to show someone else. Randomness also makes people play again to see what they get next.",
          },
        ],
      },
      {
        id: "one-action",
        heading: "4. Keep it to one simple action",
        blocks: [
          {
            type: "p",
            text: "Open your mouth. Raise your eyebrows. Tap the screen. The best lenses are learnable without any instructions at all; if you need a hint, keep it to a few words on screen.",
          },
        ],
      },
      {
        id: "capture-moment",
        heading: "5. Design for the capture moment",
        blocks: [
          {
            type: "p",
            text: "Think about what the Snap looks like when someone hits capture: is the face visible, is the effect at its best, does a ten-second video tell the story? Plan the peak moment so it lands within a short recording.",
          },
        ],
      },
      {
        id: "performance",
        heading: "6. Make it run smoothly on everyday phones",
        blocks: [
          {
            type: "p",
            text: "A lens that stutters gets closed. Keep 3D models, textures and effects light, and test on mid-range phones as well as the latest flagships. Smooth performance is part of the creative, not an afterthought.",
          },
        ],
      },
      {
        id: "come-back",
        heading: "7. Give people a reason to come back",
        blocks: [
          {
            type: "p",
            text: "Scores, collectibles, daily variations and seasonal refreshes turn a one-off play into a habit. After launch, watch plays, shares and play time, then iterate. We cover the full journey in [how long a lens takes](/blog/how-long-does-it-take-to-build-a-snapchat-lens).",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "How do you measure whether a lens is being shared?",
        a: "Snapchat's lens analytics include metrics such as views, plays, shares and play time. Shares relative to plays is a good signal of whether the concept is worth sending on.",
      },
      {
        q: "Does adding a brand logo reduce sharing?",
        a: "A prominent logo often makes a lens feel like an ad. Integrating the brand into the experience itself, such as the costume, product or world, tends to keep it shareable.",
      },
    ],
  },
  {
    slug: "how-long-does-it-take-to-build-a-snapchat-lens",
    title: "How long does it take to build a Snapchat Lens?",
    description:
      "Most custom Snapchat Lenses take one to three weeks from brief to live. Here's what happens in each stage and what can speed it up.",
    category: "guides",
    tags: ["Timeline", "Process", "Planning", "Lens development"],
    published: "2026-10-14",
    updated: "2026-10-14",
    cover: { art: "face", tone: "ink", label: "A smiling face with tracking points" },
    answer:
      "Most custom Snapchat Lenses take one to three weeks from brief to live. Simple face effects sit at the shorter end; lens games and lenses with custom 3D characters take longer. The work happens in four stages: concept, prototype, build and test, then launch. Snapchat also reviews lenses before they go public, so leave a buffer before your launch date.",
    takeaways: [
      "Typical range: one to three weeks from brief to live.",
      "Four stages: spark, prototype, build, launch and grow.",
      "Ready brand assets and quick feedback are the biggest speed-ups.",
      "Leave time for Snapchat's review before a fixed launch date.",
    ],
    sections: [
      {
        id: "stages",
        heading: "The four stages of a lens project",
        blocks: [
          {
            type: "ol",
            items: [
              "**Spark (days 1–3):** we learn your goal, audience and brand, then pitch concepts built to be played and shared.",
              "**Prototype (week 1):** a rough, playable version on real phones to prove the core interaction is fun.",
              "**Build (weeks 1–3):** art, code, sound and motion come together, with test links you can try yourself.",
              "**Launch and grow (ongoing):** we submit, publish and watch the numbers, then tune and refresh.",
            ],
          },
        ],
      },
      {
        id: "what-slows-it-down",
        heading: "What makes a lens take longer?",
        blocks: [
          {
            type: "ul",
            items: [
              "Custom 3D characters or products built from scratch.",
              "Game logic with scores, levels or timers.",
              "Multiple feedback rounds with many stakeholders.",
              "Brand, legal or licensing approvals.",
            ],
          },
        ],
      },
      {
        id: "speed-up",
        heading: "How to speed things up",
        blocks: [
          {
            type: "ul",
            items: [
              "Share existing 3D files, logos, fonts and sounds at kickoff.",
              "Name one decision-maker for feedback.",
              "Agree on the core interaction at the prototype stage, before polish begins.",
              "Book your launch date with a buffer for review.",
            ],
          },
          {
            type: "p",
            text: "Have a date in mind? [Tell us about it](/contact) and we'll map a timeline backwards from launch.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Can a Snapchat Lens be made in a few days?",
        a: "A simple effect using existing assets can be turned around quickly, but most custom lenses need at least a week to concept, build and test properly on real devices.",
      },
      {
        q: "Does Snapchat need to approve a lens?",
        a: "Yes. Lenses are reviewed by Snapchat before they go public, so it is wise to leave a buffer before a fixed launch date.",
      },
    ],
  },
  {
    slug: "whats-next-roblox-games-and-mobile-apps",
    title: "What's next for WinkVolt: Roblox games and mobile apps",
    description:
      "After 150+ Snapchat Lenses and 500M+ views, we're bringing our play-first approach to Roblox games and mobile apps. Here's what's coming.",
    category: "studio-news",
    tags: ["Roblox", "Mobile apps", "Studio news", "Roadmap"],
    published: "2026-10-14",
    updated: "2026-10-14",
    cover: { art: "cubes", tone: "cobalt", label: "Stacked Roblox-style blocks" },
    answer:
      "WinkVolt builds Snapchat Lenses today, and Roblox games and mobile apps are coming soon. We're taking what we learned from 150+ lenses and 500M+ views (fast feedback loops, social mechanics and designing for sharing) into Roblox experiences and iOS and Android apps. You can get in touch now to be first in line.",
    takeaways: [
      "Snapchat Lenses remain our core service, available now.",
      "Roblox games and mobile apps are coming soon.",
      "The same play-first, measure-everything approach carries across all three.",
    ],
    sections: [
      {
        id: "why",
        heading: "Why Roblox and mobile apps?",
        blocks: [
          {
            type: "p",
            text: "Lenses taught us how people play: they want something that works in the first second, feels social and gives them a reason to come back. Roblox experiences and mobile apps run on the same instincts, just with more room to grow.",
          },
        ],
      },
      {
        id: "roblox",
        heading: "Roblox games",
        blocks: [
          {
            type: "p",
            text: "We'll design and build experiences in Roblox Studio using Luau, with tight core loops, social features and live updates. Planned areas include game design, obbies, tycoons and simulators, UGC and avatar items, and live ops. More on our [Roblox games page](/services/roblox-games).",
          },
        ],
      },
      {
        id: "apps",
        heading: "Mobile apps",
        blocks: [
          {
            type: "p",
            text: "We'll build native-feeling iOS and Android apps with a focus on camera and AR features, from product design to store launch. More on our [mobile apps page](/services/mobile-apps).",
          },
        ],
      },
      {
        id: "get-involved",
        heading: "Want to be first in line?",
        blocks: [
          {
            type: "p",
            text: "If you have a Roblox or app idea, [get in touch](/contact). We'd love to hear about it now, so we can plan together as these services open up.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Does WinkVolt build Roblox games today?",
        a: "Roblox games are coming soon. Snapchat Lenses are available now, and you can contact us today to discuss a Roblox project ahead of launch.",
      },
      {
        q: "Will you still build Snapchat Lenses?",
        a: "Yes. Snapchat Lenses remain our core service. Roblox games and mobile apps are additions, not replacements.",
      },
    ],
  },
];

/* ---------- helpers ---------- */

export const postHref = (slug: string) => `/blog/${slug}`;
export const categoryHref = (slug: string) => `/blog/category/${slug}`;

export function getPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

export function getCategory(slug: string) {
  return blogCategories.find((c) => c.slug === slug);
}

/** Newest first; featured posts lead when dates tie. */
export function sortedPosts(posts: BlogPost[] = blogPosts) {
  return [...posts].sort(
    (a, b) => b.published.localeCompare(a.published) || Number(!!b.featured) - Number(!!a.featured),
  );
}

export function postsInCategory(slug: string) {
  return sortedPosts(blogPosts.filter((p) => p.category === slug));
}

export function relatedPosts(post: BlogPost, count = 3) {
  const others = sortedPosts(blogPosts.filter((p) => p.slug !== post.slug));
  const same = others.filter((p) => p.category === post.category);
  const rest = others.filter((p) => p.category !== post.category);
  return [...same, ...rest].slice(0, count);
}

const stripInline = (text: string) => text.replace(/\*\*(.+?)\*\*/g, "$1").replace(/\[(.+?)\]\((.+?)\)/g, "$1");

/** All readable text in a post, without markup. */
export function postPlainText(post: BlogPost) {
  const parts = [post.answer, ...post.takeaways];
  for (const s of post.sections) {
    parts.push(s.heading);
    for (const b of s.blocks) parts.push(...(b.type === "ul" || b.type === "ol" ? b.items : [b.text]));
  }
  for (const f of post.faqs) parts.push(f.q, f.a);
  return parts.map(stripInline).join("\n");
}

export function wordCount(post: BlogPost) {
  return postPlainText(post).split(/\s+/).filter(Boolean).length;
}

export function readingMinutes(post: BlogPost) {
  return Math.max(2, Math.round(wordCount(post) / 220));
}

/** Post as Markdown (used by llms-full.txt). */
export function postMarkdown(post: BlogPost) {
  const lines = [`## ${post.title}`, "", `> ${post.answer}`, ""];
  for (const s of post.sections) {
    lines.push(`### ${s.heading}`, "");
    for (const b of s.blocks) {
      if (b.type === "p" || b.type === "quote") lines.push(b.type === "quote" ? `> ${b.text}` : b.text, "");
      else lines.push(...b.items.map((item, i) => (b.type === "ol" ? `${i + 1}. ${item}` : `- ${item}`)), "");
    }
  }
  if (post.faqs.length) {
    lines.push("### FAQ", "");
    for (const f of post.faqs) lines.push(`**${f.q}** ${f.a}`, "");
  }
  return lines.join("\n");
}

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
