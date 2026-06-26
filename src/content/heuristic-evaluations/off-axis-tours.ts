import type { HeuristicEvaluation, RedesignCallout, ScreenshotAnnotation } from "./types";

const offAxisRedesignCallouts: RedesignCallout[] = [
  {
    findingId: "HE-001",
    title: "Hero gives no next step",
    problem: "The hero stated a goal but offered no buttons or clear action.",
    change: "Hero now leads with two actions, Browse gigs and Join as an artist.",
    severity: "high",
  },
  {
    findingId: "HE-002",
    title: "Gig-swap is never explained",
    problem: "Nothing told a first-time visitor what a gig-swap platform actually does.",
    change: "A short How it works strip explains swap, book, and play in three steps.",
    severity: "high",
  },
  {
    findingId: "HE-003",
    title: "Test and empty profiles shown publicly",
    problem: "Test accounts and No biography available cards filled the public directory.",
    change: "The mock lists only complete, real profiles and hides empty or test ones.",
    severity: "high",
  },
  {
    findingId: "HE-004",
    title: "No way to search or filter artists",
    problem: "The artist directory had no search or filters, only a long scroll.",
    change: "A search field and genre filters sit at the top of the directory.",
    severity: "high",
  },
  {
    findingId: "HE-007",
    title: "Cards use blank image placeholders",
    problem: "Most artist and gig cards showed an empty grey box instead of an image.",
    change: "Cards use the artist photo, or a branded fallback with initials, never a blank box.",
    severity: "medium",
  },
  {
    findingId: "HE-009",
    title: "No sign-up path in the header",
    problem: "The header only offered Log in, with no obvious way to join.",
    change: "A Sign up button sits beside Log in at the top right.",
    severity: "medium",
  },
  {
    findingId: "HE-005",
    title: "No footer anywhere on the site",
    problem: "There was no footer, so about, help, contact, and legal links had no home.",
    change: "A footer adds navigation, support, social, and legal links on every page.",
    severity: "medium",
  },
  {
    findingId: "HE-012",
    title: "No back link on a profile",
    problem: "The artist profile had no back control, so users had to rely on the browser back button to return.",
    change: "A back link sits at the top of the profile and returns you to wherever you came from, whether that was artists, gigs, or a venue.",
    severity: "medium",
  },
  {
    findingId: "HE-013",
    title: "Ended gigs crowd the profile",
    problem: "Ended gigs showed as a full, equal-weight list even though they matter less than upcoming gigs.",
    change: "Ended gigs collapse to a single card with a Show more toggle, while upcoming gigs stay fully visible.",
    severity: "low",
  },
  {
    findingId: "HE-014",
    title: "No gig counts per section",
    problem: "A generic 2 Gigs badge gave no sense of how many gigs were upcoming versus ended.",
    change: "Each gig section heading shows a count, and the header badge splits upcoming and ended totals.",
    severity: "low",
  },
  {
    findingId: "HE-015",
    title: "Links don't look clickable",
    problem: "Connect links looked like plain coloured text, with no button or link affordance.",
    change: "Connect entries are now clear tappable rows with an icon, border, hover and focus states, and an external-link cue.",
    severity: "medium",
  },
  {
    findingId: "HE-016",
    title: "Link text shows a raw URL",
    problem: "The Instagram link read @https://www.instagram.com/eyes_of_home/, and entries were bare platform names rather than actions.",
    change: "Connect entries show a clean handle and an action label such as Follow on Instagram or Listen on Spotify.",
    severity: "medium",
  },
  {
    findingId: "HE-017",
    title: "Genre missing from the profile",
    problem: "The profile never stated the artist's genre, which is the key descriptor on a music platform.",
    change: "Genre appears as a prominent tag beside the artist name, matching the directory.",
    severity: "medium",
  },
  {
    findingId: "HE-018",
    title: "No way to convey the vibe",
    problem: "The band's sound was locked in a prose bio, with no scannable descriptors.",
    change: "A Sounds like row of comparable artists and descriptor tags sit under a concise bio.",
    severity: "low",
  },
  {
    findingId: "HE-019",
    title: "Artist shown as a generic icon",
    problem: "The event page used a mic icon for the artist instead of their real photo, while the organizer showed a real avatar.",
    change: "The event page shows the artist's profile photo (or a branded fallback) and links it to their profile.",
    severity: "low",
  },
  {
    findingId: "HE-020",
    title: "Promoter prefix dominates the title",
    problem: "Off Axis presents was the same huge size as the act, competing with the event name.",
    change: "Off Axis presents becomes a small eyebrow above a prominent event title.",
    severity: "low",
  },
  {
    findingId: "HE-021",
    title: "No quick add on gig cards",
    problem: "Gig cards showed the price but had no quick way to add a ticket, forcing high-intent users into the detail page first.",
    change: "Each gig card has an Add to basket action beside the price, so ready buyers add in one tap and keep browsing. The label stays honest, since it adds to the basket rather than buying instantly.",
    severity: "medium",
  },
  {
    findingId: "HE-022",
    title: "Basket bar hides form content",
    problem: "The fixed basket bar overlapped the profile form, hiding the lower fields and any save action.",
    change: "The page reserves space for the basket bar so it never covers content, and the form stays fully reachable.",
    severity: "medium",
  },
  {
    findingId: "HE-023",
    title: "No clear profile photo control",
    problem: "The avatar was a generic silhouette with no visible way to add a photo, inconsistent with the nav initial and cover upload.",
    change: "The avatar has an obvious change-photo control with a branded initials fallback, consistent across the page.",
    severity: "medium",
  },
  {
    findingId: "HE-024",
    title: "Account tabs wrap awkwardly",
    problem: "The settings tabs wrapped onto a second row, with Security stranded on its own line.",
    change: "Tabs fit on one row, scrolling horizontally on small screens, so the set reads as one control.",
    severity: "low",
  },
  {
    findingId: "HE-025",
    title: "Unverified email lacks context",
    problem: "The unverified state did not explain what it blocks, and the combined Verify / Resend button was ambiguous.",
    change: "A short line explains why verification matters, and the action is a single, clearly labelled button.",
    severity: "low",
  },
  {
    findingId: "HE-026",
    title: "2 months free is unclear",
    problem: "The annual plan said 2 months free without explaining what it meant or how it applied.",
    change: "The annual plan spells out the saving in plain words and shows the equivalent monthly cost.",
    severity: "low",
  },
  {
    findingId: "HE-027",
    title: "Cluttered checkout",
    problem: "The checkout stacked donation, voucher, totals, postcode, and terms in one dense column, and the order summary did not scale to multiple items.",
    change: "Checkout is grouped into clear steps for items, discounts, totals, and pay, with the order summary listing each gig under one heading.",
    severity: "medium",
  },
  {
    findingId: "HE-028",
    title: "Postcode at payment is odd",
    problem: "A postcode field for event planning sat right before Proceed to Payment, which felt unexpected.",
    change: "Non-payment fields move out of the pay step, and anything optional is clearly marked.",
    severity: "low",
  },
  {
    findingId: "HE-029",
    title: "Hidden booking fee until checkout",
    problem: "The booking fee was only revealed at checkout, a drip-pricing pattern that surprised users after they had committed.",
    change: "Gig cards and the event page flag that a booking fee applies and show the all-in price, so checkout holds no surprises.",
    severity: "medium",
  },
  {
    findingId: "HE-030",
    title: "Donate to the artist, not the platform",
    problem: "The optional donation asked users to support Off Axis, when fans are more motivated to support the artist.",
    change: "The donation is reframed to support the artist by default, kept clearly opt-in.",
    severity: "low",
  },
  {
    findingId: "HE-031",
    title: "Trim non-essential header controls",
    problem: "The header carried an ambiguous icon-only £ control (on a GBP-only platform) and a theme toggle. Neither earns its place this early, and the bare icons add noise without a clear job.",
    change: "Both the currency control and the theme toggle are removed, leaving a leaner MVP header focused on navigation, the basket, and account.",
    severity: "low",
  },
];

const heroNoCtaAnnotations: ScreenshotAnnotation[] = [
  {
    shape: "box",
    x: 49.6,
    y: 21,
    width: 40,
    height: 20,
    label: "Hero names a goal but gives no action",
    labelPosition: "below",
  },
  {
    shape: "box",
    x: 82.5,
    y: 2.6,
    width: 9,
    height: 4.8,
    label: "Only Log in, no Sign up",
    labelPosition: "below",
  },
  {
    shape: "box",
    x: 49.5,
    y: 52,
    width: 42,
    height: 24,
    label: "Test accounts and empty bios shown publicly",
    labelPosition: "above",
  },
];

const gigsSearchAnnotations: ScreenshotAnnotation[] = [
  {
    shape: "box",
    x: 74.2,
    y: 10.4,
    width: 20,
    height: 4.5,
    label: "Search is here on Gigs, but missing on Artists",
    labelPosition: "below",
  },
  {
    shape: "box",
    x: 49.5,
    y: 25.8,
    width: 82,
    height: 20,
    label: "Gig posters are blank placeholders",
    labelPosition: "below",
  },
];

const loginFlowAnnotations: ScreenshotAnnotation[] = [
  {
    shape: "box",
    x: 49.6,
    y: 51.4,
    width: 22,
    height: 3,
    label: "Password rules on the login form",
    labelPosition: "left",
  },
  {
    shape: "box",
    x: 49.6,
    y: 67.3,
    width: 22,
    height: 4,
    label: "Sign in sits below the social buttons",
    labelPosition: "left",
  },
];

export const offAxisToursEvaluation: HeuristicEvaluation = {
  slug: "off-axis-tours",
  title: "Off Axis heuristic evaluation",
  client: "Off Axis · Live music gig-swap platform",
  accent: "#A855F7",
  executiveSummary: {
    whatWasEvaluated:
      "The public Off Axis pages at offaxistours.com, covering home and artists, gigs, and login (desktop review, June 2026).",
    usabilityHealth:
      "Strong concept and clean styling, but the home page never explains the product, offers no clear action, and surfaces test data that hurts trust.",
    topIssues: [
      "Hero states a goal but gives no next step",
      "The gig-swap idea is never explained on the page",
      "Test accounts and empty profiles fill the public directory",
      "No way to search or filter the artist list",
    ],
    mainRisks: [
      "First-time visitors leave without understanding the product",
      "Test data and blank cards make the platform feel unfinished",
      "Fans cannot find a specific artist or gig quickly",
    ],
    recommendedNextSteps: [
      "Add a clear hero action and a short how-it-works line",
      "Hide test and empty profiles from public listings",
      "Add search and filters to the artist directory",
      "Add a global footer and a header sign-up path",
    ],
  },
  scope: {
    evaluatedUrl: "https://offaxistours.com/",
    evaluationDate: "2026-06-18",
    evaluator: "Shaun Leishman (heuristic evaluation)",
    userGroups: [
      "Fans discovering live music",
      "Artists and venues joining the platform",
      "Guests buying tickets without an account",
    ],
    tasksEvaluated: [
      "Understand what Off Axis is and does",
      "Find a gig or artist to follow or book",
      "Sign up, log in, or buy as a guest",
    ],
    heuristicsUsed: ["Nielsen Norman Group H01–H10"],
    additionalLenses: ["Accessibility", "Content clarity", "Trust and credibility"],
    limitations: [
      "One reviewer, desktop only. Mobile, logged-in, and checkout flows were not tested.",
      "Reviewed against live public pages in June 2026, so artist and gig content may change.",
    ],
  },
  severitySummary: {
    critical: 0,
    high: 4,
    medium: 14,
    low: 13,
  },
  themes: [
    {
      label: "First impression and trust",
      findingIds: ["HE-002", "HE-003", "HE-011", "HE-016", "HE-025", "HE-026", "HE-029", "HE-030"],
    },
    {
      label: "Finding and acting",
      findingIds: ["HE-001", "HE-004", "HE-009", "HE-012", "HE-015", "HE-021", "HE-028"],
    },
    {
      label: "Page structure and content",
      findingIds: ["HE-005", "HE-007", "HE-008", "HE-013", "HE-014", "HE-017", "HE-018", "HE-019", "HE-020", "HE-022", "HE-023", "HE-024", "HE-027", "HE-031"],
    },
    {
      label: "Accessibility",
      findingIds: ["HE-006", "HE-010"],
    },
  ],
  findings: [
    {
      finding_id: "HE-001",
      title: "Hero gives no next step",
      screen_or_flow: "Home hero",
      user_task: "Pick the next step",
      primary_heuristic: "H06",
      secondary_heuristics: ["H01"],
      additional_lenses: ["L02"],
      description:
        "The hero shows a heading and one line of subtext, then drops straight into a grid. There are no buttons or links to act on.",
      evidence: {
        observed_where: "Top of the home page (also served at /artists)",
        observed_behaviour:
          "Discover Live Music sits above one subheading, with no primary or secondary action. The page jumps from the hero into a list of artist cards.",
        expected_behaviour:
          "A clear primary action such as Browse gigs, and a secondary action such as Join as an artist, visible without scrolling.",
      },
      user_impact: "Visitors read the promise but have nothing to click, so many leave.",
      severity: "high",
      confidence: "high",
      recommendation:
        "Add a primary and secondary call to action in the hero. Point fans to gigs and creators to sign-up.",
      owner: "Design",
      status: "new",
      priority: { frequency: 5, impact: 4, effort: 2 },
      screenshot_reference: "/metrics/case-studies/off-axis-tours/hero-no-cta.png",
      screenshot_annotations: heroNoCtaAnnotations,
    },
    {
      finding_id: "HE-002",
      title: "The gig-swap idea is never explained",
      screen_or_flow: "Home hero and page",
      user_task: "Understand what Off Axis does",
      primary_heuristic: "H02",
      secondary_heuristics: ["H10"],
      additional_lenses: ["L02"],
      description:
        "The page title calls Off Axis a gig-swap platform, but the page only says Discover Live Music and support the underground scene. Nothing explains what gig-swap means or how it works.",
      evidence: {
        observed_where: "Browser tab title and home hero",
        observed_behaviour:
          "The home page has no how-it-works section, no about copy, and no explanation of swapping gigs between artists.",
        expected_behaviour:
          "A short, plain-English explanation of the core idea and how a fan or artist uses it.",
      },
      user_impact: "New visitors cannot tell what the product is for, so they do not commit.",
      severity: "high",
      confidence: "high",
      recommendation:
        "Add a short how-it-works strip with three steps. Explain the swap model in one sentence near the top.",
      owner: "Content",
      status: "new",
      priority: { frequency: 5, impact: 4, effort: 3 },
      screenshot_reference: "/metrics/case-studies/off-axis-tours/hero-no-cta.png",
      screenshot_annotations: heroNoCtaAnnotations.filter((_, index) => index === 0),
    },
    {
      finding_id: "HE-003",
      title: "Test and empty profiles shown publicly",
      screen_or_flow: "Artist directory",
      user_task: "Browse real artists",
      primary_heuristic: "H08",
      secondary_heuristics: ["H02"],
      additional_lenses: ["L02"],
      description:
        "The directory lists obvious test accounts and many cards with no biography. Around a third of the visible artists are placeholders or duplicates.",
      evidence: {
        observed_where: "Home and /artists grid",
        observed_behaviour:
          "Cards include test artist, test assist, swap 1, swap 2, DerickTest7, n nn, two Simin duplicates, and several No biography available entries.",
        expected_behaviour:
          "Only complete, real profiles appear publicly. Test and empty accounts are hidden.",
      },
      user_impact: "The platform looks unfinished, which undermines trust before a fan signs up.",
      severity: "high",
      confidence: "high",
      recommendation:
        "Exclude test and incomplete profiles from public listings. Require a minimum profile before an artist is shown.",
      owner: "Product",
      status: "new",
      priority: { frequency: 4, impact: 4, effort: 3 },
      screenshot_reference: "/metrics/case-studies/off-axis-tours/hero-no-cta.png",
      screenshot_annotations: heroNoCtaAnnotations.filter((_, index) => index === 2),
    },
    {
      finding_id: "HE-004",
      title: "No way to search or filter artists",
      screen_or_flow: "Artist directory",
      user_task: "Find a specific artist",
      primary_heuristic: "H07",
      secondary_heuristics: ["H04"],
      description:
        "The artist directory is one long, unpaged grid with no search or filters, even though the Gigs page has a search field.",
      evidence: {
        observed_where: "Home and /artists grid versus the Gigs page",
        observed_behaviour:
          "Over thirty artists load at once with no search, genre, or location filter. The Gigs page does have a search field.",
        expected_behaviour:
          "Search and a few filters at the top of the directory, consistent with the Gigs page.",
      },
      user_impact: "Fans must scroll the whole list to find one artist, and many give up.",
      severity: "high",
      confidence: "high",
      recommendation:
        "Add a search field and genre or location filters to the artist directory. Reuse the Gigs search pattern.",
      owner: "Design",
      status: "new",
      priority: { frequency: 4, impact: 4, effort: 4 },
      screenshot_reference: "/metrics/case-studies/off-axis-tours/gigs-search.png",
      screenshot_annotations: gigsSearchAnnotations.filter((_, index) => index === 0),
    },
    {
      finding_id: "HE-005",
      title: "No footer anywhere on the site",
      screen_or_flow: "Global layout",
      user_task: "Find help, contact, or legal info",
      primary_heuristic: "H04",
      secondary_heuristics: ["H06"],
      description:
        "Pages end abruptly after the last card. There is no footer with navigation, support, contact, social, or legal links.",
      evidence: {
        observed_where: "Bottom of every public page",
        observed_behaviour:
          "The home page stops at the final artist card with no footer region at all.",
        expected_behaviour:
          "A standard footer with about, help, contact, social, and legal links on every page.",
      },
      user_impact: "Users cannot find support or trust signals, and wayfinding suffers.",
      severity: "medium",
      confidence: "high",
      recommendation:
        "Add a global footer with key links, contact, social, and legal pages.",
      owner: "Design",
      status: "new",
      priority: { frequency: 4, impact: 3, effort: 3 },
    },
    {
      finding_id: "HE-006",
      title: "Every profile link is named the same",
      screen_or_flow: "Artist cards",
      user_task: "Follow a link with assistive tech",
      primary_heuristic: "H02",
      additional_lenses: ["L01"],
      description:
        "All thirty-four artist cards use the same link text, View Profile, with no artist name in the accessible name.",
      evidence: {
        observed_where: "Artist directory cards",
        observed_behaviour:
          "Screen readers announce View Profile thirty-four times with nothing to tell the links apart.",
        expected_behaviour:
          "Each link names its destination, for example View FAEDA profile, or uses an aria-label.",
      },
      user_impact: "Screen reader users cannot tell links apart and must explore each one.",
      severity: "medium",
      confidence: "high",
      recommendation:
        "Add the artist name to each link text or aria-label so every link is unique.",
      owner: "Engineering",
      status: "new",
      priority: { frequency: 2, impact: 4, effort: 2 },
      accessibility_lens: {
        is_accessibility_related: true,
        wcag_principle: "WCAG link purpose (Operable and Understandable)",
        notes: "Likely fails WCAG 2.2 SC 2.4.4 Link Purpose (In Context)",
      },
    },
    {
      finding_id: "HE-007",
      title: "Cards use blank image placeholders",
      screen_or_flow: "Artist and gig cards",
      user_task: "Scan listings quickly",
      primary_heuristic: "H08",
      secondary_heuristics: ["H01"],
      description:
        "Many artist cards, and most gig cards, show an empty grey box with a music-note icon instead of a photo.",
      evidence: {
        observed_where: "Artist grid and Gigs grid",
        observed_behaviour:
          "Gig cards have no event imagery, and several artist cards have no photo, so the grid reads as empty.",
        expected_behaviour:
          "Cards show a real image, or a branded fallback that still looks intentional.",
      },
      user_impact: "Listings are hard to scan and look unfinished, lowering perceived quality.",
      severity: "medium",
      confidence: "high",
      recommendation:
        "Use the artist or event image where available, and a styled branded fallback otherwise.",
      owner: "Design",
      status: "new",
      priority: { frequency: 4, impact: 2, effort: 3 },
      screenshot_reference: "/metrics/case-studies/off-axis-tours/gigs-search.png",
      screenshot_annotations: gigsSearchAnnotations.filter((_, index) => index === 1),
      screenshot_caption:
        "Every gig card uses a blank grey placeholder. The same pattern appears on many artist cards.",
    },
    {
      finding_id: "HE-008",
      title: "Home page is a raw, ungrouped list",
      screen_or_flow: "Home page",
      user_task: "Get oriented on arrival",
      primary_heuristic: "H08",
      secondary_heuristics: ["H06"],
      additional_lenses: ["L02"],
      description:
        "The landing experience is one long grid of every artist with no sections, featured content, or curation.",
      evidence: {
        observed_where: "Home page below the hero",
        observed_behaviour:
          "Over thirty cards render in one block with no headings, no featured row, and no order the user can see.",
        expected_behaviour:
          "Grouped or curated sections, for example featured artists and upcoming gigs, with clear headings.",
      },
      user_impact: "High cognitive load on arrival, and no sense of where to start.",
      severity: "medium",
      confidence: "medium",
      recommendation:
        "Break the home page into curated sections with headings and a featured row, and defer the full list.",
      owner: "Design",
      status: "new",
      priority: { frequency: 4, impact: 3, effort: 3 },
    },
    {
      finding_id: "HE-009",
      title: "No sign-up path in the header",
      screen_or_flow: "Header",
      user_task: "Create an account",
      primary_heuristic: "H06",
      secondary_heuristics: ["H04"],
      description:
        "The header offers only Log in. New fans, artists, and venues have no obvious way to register from the global nav.",
      evidence: {
        observed_where: "Global header",
        observed_behaviour:
          "Only a Log in link appears at the top right. Register is hidden on the login page.",
        expected_behaviour:
          "A visible Sign up action beside Log in, so new users can join from anywhere.",
      },
      user_impact: "Potential members have no clear entry point and may never create an account.",
      severity: "medium",
      confidence: "high",
      recommendation:
        "Add a Sign up button beside Log in, styled as the primary action for new users.",
      owner: "Design",
      status: "new",
      priority: { frequency: 4, impact: 3, effort: 2 },
    },
    {
      finding_id: "HE-010",
      title: "Login order and helper text are off",
      screen_or_flow: "Login page",
      user_task: "Log in",
      primary_heuristic: "H04",
      secondary_heuristics: ["H05"],
      additional_lenses: ["L01"],
      description:
        "The primary Sign in button sits below the Google and Apple options, and a password-rules line appears on the login form.",
      evidence: {
        observed_where: "Login page",
        observed_behaviour:
          "Order is email, password, social buttons, then Sign in. Password must be at least 8 characters shows before any error.",
        expected_behaviour:
          "Sign in directly under the password field, with password rules saved for registration.",
      },
      user_impact: "The main action is easy to miss, and the rules line adds noise.",
      severity: "low",
      confidence: "high",
      recommendation:
        "Put Sign in directly under the password field, above the social options, and remove the rules line from login.",
      owner: "Design",
      status: "new",
      priority: { frequency: 3, impact: 2, effort: 1 },
      screenshot_reference: "/metrics/case-studies/off-axis-tours/login-flow.png",
      screenshot_annotations: loginFlowAnnotations,
    },
    {
      finding_id: "HE-011",
      title: "Brand and domain names do not match",
      screen_or_flow: "Header and browser tab",
      user_task: "Confirm this is the right site",
      primary_heuristic: "H04",
      secondary_heuristics: ["H02"],
      description:
        "The domain is offaxistours.com, the tab title is Off Axis | Gig-Swap Platform, and the logo reads OFF AXIS. The tours name has no explanation.",
      evidence: {
        observed_where: "URL, browser title, and header logo",
        observed_behaviour:
          "Three slightly different names appear with no line tying them together.",
        expected_behaviour:
          "One consistent brand name, or a short line that explains the relationship.",
      },
      user_impact: "Minor doubt about whether this is the official site.",
      severity: "low",
      confidence: "medium",
      recommendation:
        "Align the tab title and visible brand, and decide whether tours is part of the name.",
      owner: "Content",
      status: "new",
      priority: { frequency: 3, impact: 2, effort: 1 },
    },
    {
      finding_id: "HE-012",
      title: "No way back from an artist profile",
      screen_or_flow: "Artist profile page",
      user_task: "Return to the previous list after viewing an artist",
      primary_heuristic: "H03",
      secondary_heuristics: ["H06"],
      description:
        "The artist profile page has no in-page back link, breadcrumb, or close control. After opening an artist from the directory, a gig, or a venue, the only way back is the browser back button.",
      evidence: {
        observed_where: "Artist profile page, for example Eyes of Home",
        observed_behaviour:
          "The page opens with the artist header and content but no back control anywhere. Users must use the browser back button to return to where they came from.",
        expected_behaviour:
          "A clearly marked back link or breadcrumb at the top of the profile that returns the user to their previous context.",
      },
      user_impact:
        "Users lose their place and orientation. Some do not realise they can use browser back, so the profile feels like a dead end.",
      severity: "medium",
      confidence: "high",
      recommendation:
        "Add a persistent back link or breadcrumb at the top of the profile that returns the user to wherever they came from, whether artists, gigs, or a venue, rather than a hard-coded destination.",
      owner: "Design",
      status: "new",
      priority: { frequency: 4, impact: 3, effort: 1 },
      screenshot_reference: "/metrics/case-studies/off-axis-tours/artist-profile.png",
    },
    {
      finding_id: "HE-013",
      title: "Ended gigs are shown as a full list",
      screen_or_flow: "Ended Gigs on the artist profile",
      user_task: "Focus on what an artist has coming up",
      primary_heuristic: "H08",
      secondary_heuristics: ["H07"],
      additional_lenses: ["L02"],
      description:
        "Past gigs render as a full list of large cards under Ended Gigs, at the same visual weight as Upcoming Gigs, even though ended gigs are lower priority for most visitors.",
      evidence: {
        observed_where: "Artist profile, Ended Gigs section (for example Eyes of Home)",
        observed_behaviour:
          "Every ended gig renders as a large card in a list, taking as much space as upcoming gigs and pushing merch, connect, and other content further down the page.",
        expected_behaviour:
          "Ended gigs are de-emphasised so upcoming gigs stay fully visible, for example by collapsing them to a single card with a Show more control.",
      },
      user_impact:
        "The profile is longer and noisier than it needs to be, and lower-priority history competes with what matters now.",
      severity: "low",
      confidence: "medium",
      recommendation:
        "Collapse Ended Gigs behind a Show more toggle that reveals one card by default and the rest on demand. Keep Upcoming Gigs fully expanded.",
      owner: "Design",
      status: "new",
      priority: { frequency: 3, impact: 2, effort: 2 },
      screenshot_reference: "/metrics/case-studies/off-axis-tours/ended-gigs.png",
    },
    {
      finding_id: "HE-014",
      title: "No gig counts to show activity at a glance",
      screen_or_flow: "Artist profile header and gig sections",
      user_task: "Gauge how active an artist is",
      primary_heuristic: "H01",
      secondary_heuristics: ["H08"],
      description:
        "The profile shows a single 2 Gigs badge but does not break the number into upcoming versus ended, and the section headings carry no count.",
      evidence: {
        observed_where: "Artist profile header badge and gig section headings",
        observed_behaviour:
          "A generic 2 Gigs badge appears in the header. The Upcoming Gigs and Ended Gigs headings have no number, so users must count cards to tell how many of each there are.",
        expected_behaviour:
          "Counts surfaced per section, for example Upcoming Gigs (0) and Ended Gigs (2), and a header badge that splits upcoming and ended totals.",
      },
      user_impact:
        "Users cannot quickly judge how active an artist is, or whether the artist is worth following or booking.",
      severity: "low",
      confidence: "medium",
      recommendation:
        "Add a count to each gig section heading and split the header badge into upcoming and ended totals.",
      owner: "Design",
      status: "new",
      priority: { frequency: 3, impact: 2, effort: 2 },
      screenshot_reference: "/metrics/case-studies/off-axis-tours/ended-gigs.png",
    },
    {
      finding_id: "HE-015",
      title: "Connect links don't look clickable",
      screen_or_flow: "Connect panel on the artist profile",
      user_task: "Open an artist's social or streaming page",
      primary_heuristic: "H04",
      secondary_heuristics: ["H06"],
      additional_lenses: ["L01"],
      description:
        "The Connect social links (Facebook, Spotify, Instagram) render as coloured text with a small icon and no visible affordance, meaning no border, fill, underline, or external-link cue. At rest they read as labels rather than links.",
      evidence: {
        observed_where: "Artist profile, Connect panel",
        observed_behaviour:
          "Each entry is coloured text and an icon in a row, with no border, background, underline, or external-link indicator until hover, so the rows look like static list items rather than links.",
        expected_behaviour:
          "Interactive rows that clearly look clickable, with consistent button or link styling, hover and focus states, and an external-link cue.",
      },
      user_impact:
        "Users may not realise they can open the artist's socials or streaming pages, so they miss a key action.",
      severity: "medium",
      confidence: "high",
      recommendation:
        "Style Connect entries as clear tappable rows or buttons, each with a platform icon, label, an external-link icon, a visible border or fill, and obvious hover and focus states with an adequate tap target.",
      owner: "Design",
      status: "new",
      priority: { frequency: 3, impact: 3, effort: 1 },
      screenshot_reference: "/metrics/case-studies/off-axis-tours/connect-links.png",
      accessibility_lens: {
        is_accessibility_related: true,
        wcag_principle: "WCAG use of colour and focus visibility (Perceivable and Operable)",
        notes:
          "Signalling links with colour alone risks WCAG 2.2 SC 1.4.1 Use of Color, so ensure a visible focus indicator per SC 2.4.7.",
      },
    },
    {
      finding_id: "HE-016",
      title: "Connect link text shows raw URLs, not handles or actions",
      screen_or_flow: "Connect panel on the artist profile",
      user_task: "Recognise and act on an artist's social links",
      primary_heuristic: "H02",
      secondary_heuristics: ["H04"],
      additional_lenses: ["L02"],
      description:
        "The Instagram entry displays the raw URL with a stray @ prefix (@https://www.instagram.com/eyes_of_home/), and the other entries are bare platform names. None read as an action the user can take.",
      evidence: {
        observed_where: "Artist profile, Connect panel",
        observed_behaviour:
          "The Instagram link text is the full URL, truncated and prefixed with @. Facebook and Spotify show only the platform name. None tell the user what tapping will do.",
        expected_behaviour:
          "A clean handle (for example @eyes_of_home) paired with an action-oriented label such as Follow on Instagram or Listen on Spotify.",
      },
      user_impact:
        "The raw URL looks broken and lowers trust, and bare platform names do not invite the user to act.",
      severity: "medium",
      confidence: "high",
      recommendation:
        "Render a clean handle or display name as the label, paired with an action verb such as Follow, Listen, or Like. Never show the raw URL as the link text.",
      owner: "Content",
      status: "new",
      priority: { frequency: 3, impact: 3, effort: 1 },
      screenshot_reference: "/metrics/case-studies/off-axis-tours/instagram-raw-url.png",
    },
    {
      finding_id: "HE-017",
      title: "Genre is missing from the artist profile",
      screen_or_flow: "Artist profile header and About",
      user_task: "Tell at a glance what kind of music this is",
      primary_heuristic: "H06",
      secondary_heuristics: ["H02"],
      additional_lenses: ["L02"],
      description:
        "The profile never states the artist's genre. A visitor has to read the full About paragraph and infer it from the comparison bands.",
      evidence: {
        observed_where: "Artist profile header and About section (for example Eyes of Home)",
        observed_behaviour:
          "There is no genre label, tag, or field anywhere on the page. The only hint comes from prose like for fans of Franz Ferdinand, The Killers, Kings of Leon and The Strokes.",
        expected_behaviour:
          "Genre shown as a clear, scannable tag near the artist name, consistent with how genre appears elsewhere on the platform.",
      },
      user_impact:
        "Users cannot quickly tell what kind of music this is, even though it is the single most important filter on a music platform.",
      severity: "medium",
      confidence: "high",
      recommendation:
        "Surface genre as a prominent tag near the header, consistent with the directory cards, so it is visible without reading the bio.",
      owner: "Product",
      status: "new",
      priority: { frequency: 4, impact: 4, effort: 3 },
      screenshot_reference: "/metrics/case-studies/off-axis-tours/profile-no-genre.png",
    },
    {
      finding_id: "HE-018",
      title: "No structured way to convey an artist's vibe",
      screen_or_flow: "About section on the artist profile",
      user_task: "Get a quick feel for how an artist sounds",
      primary_heuristic: "H06",
      secondary_heuristics: ["H08"],
      additional_lenses: ["L02"],
      description:
        "Everything about the band's sound is locked inside a prose bio. There is no structured, scannable way to convey the vibe, with no Sounds like comparable artists and no descriptor or mood tags.",
      evidence: {
        observed_where: "Artist profile, About section",
        observed_behaviour:
          "Comparisons such as for fans of Franz Ferdinand are buried in a paragraph. There are no tag chips, no Sounds like row, and nothing a user or a filter can scan.",
        expected_behaviour:
          "A concise bio plus structured sections, such as a Sounds like row of comparable artists and a set of descriptor or mood tags that users and filters can scan.",
      },
      user_impact:
        "Users skim, so a wall of prose makes it hard to get a quick vibe, and the underlying data cannot power search or recommendations.",
      severity: "low",
      confidence: "medium",
      recommendation:
        "Add a Sounds like row of comparable-artist chips and a set of descriptor tags below a short bio. Make the tags filterable where possible so they also power discovery.",
      owner: "Design",
      status: "new",
      priority: { frequency: 3, impact: 3, effort: 3 },
      screenshot_reference: "/metrics/case-studies/off-axis-tours/profile-no-genre.png",
    },
    {
      finding_id: "HE-019",
      title: "Event page shows a generic icon, not the artist's photo",
      screen_or_flow: "Gig/event detail Artist row",
      user_task: "Recognise who is playing",
      primary_heuristic: "H06",
      secondary_heuristics: ["H04"],
      additional_lenses: ["L02"],
      description:
        "In the event details panel, the Artist row uses a generic microphone icon instead of the artist's actual profile picture, even though the Organizer row on the same page shows a real avatar.",
      evidence: {
        observed_where: "Gig/event detail page, event details panel (for example Off Axis presents Harry Miles-Watson)",
        observed_behaviour:
          "The Artist field shows a small mic icon beside the name. The Organizer field lower down shows the artist's real circular photo, so the same person is represented two different ways on one page.",
        expected_behaviour:
          "The Artist row shows the artist's real profile photo, with a branded fallback if missing, ideally linking through to the artist profile.",
      },
      user_impact:
        "Users miss a quick visual cue to recognise the act, and the inconsistent treatment makes the page look unfinished.",
      severity: "low",
      confidence: "high",
      recommendation:
        "Use the artist's profile photo, or a branded initials fallback, in the Artist row, and link it to the artist profile. Keep avatar treatment consistent across the page.",
      owner: "Design",
      status: "new",
      priority: { frequency: 3, impact: 2, effort: 2 },
      screenshot_reference: "/metrics/case-studies/off-axis-tours/event-artist-icon.png",
    },
    {
      finding_id: "HE-020",
      title: "Event title buries the act under the promoter prefix",
      screen_or_flow: "Gig/event detail title",
      user_task: "Identify the act at a glance",
      primary_heuristic: "H08",
      secondary_heuristics: ["H06"],
      additional_lenses: ["L02"],
      description:
        "The event H1 renders Off Axis presents Harry Miles-Watson all at one very large size, so the promoter prefix competes visually with the act's name.",
      evidence: {
        observed_where: "Gig/event detail page title",
        observed_behaviour:
          "The whole string is one giant heading. Off Axis presents carries as much weight as the artist name and pushes Harry Miles-Watson onto a second line.",
        expected_behaviour:
          "Off Axis presents shown as a small eyebrow or subheading above a clear, prominent event title carrying the act's name.",
      },
      user_impact:
        "The act is harder to scan quickly, and the title feels heavier than it needs to be.",
      severity: "low",
      confidence: "high",
      recommendation:
        "Make Off Axis presents a small eyebrow label above the main title, and size the act's name as the primary heading.",
      owner: "Design",
      status: "new",
      priority: { frequency: 3, impact: 2, effort: 1 },
      screenshot_reference: "/metrics/case-studies/off-axis-tours/event-title.png",
    },
    {
      finding_id: "HE-021",
      title: "No quick add-to-basket action on gig cards",
      screen_or_flow: "Gigs listing gig card",
      user_task: "Add a ticket quickly when you already know the gig",
      primary_heuristic: "H07",
      secondary_heuristics: ["H06", "H02"],
      description:
        "Gig cards show the price, which is good, but offer no quick way to act on it. To get a ticket, a user must open the event detail page and read it first, even when they already know they want in. A 'Buy now' label would also mislead, since the platform funnels everything through a basket rather than buying instantly.",
      evidence: {
        observed_where: "Gigs listing grid",
        observed_behaviour:
          "Each card shows a price badge but the only action is to open the full event page. High-intent buyers, often friends and family of the band, must click through and read before they can add a ticket.",
        expected_behaviour:
          "A clear add action on the card itself, beside the price, for users who do not need the detail page. It should be labelled for what it actually does, adding to the basket, where each tap adds one.",
      },
      user_impact:
        "Extra steps add friction for the highest-intent buyers, which can cost ticket sales for small acts. A mislabelled 'Buy now' would also erode trust when it silently increments a basket instead of buying.",
      severity: "medium",
      confidence: "medium",
      recommendation:
        "Add an 'Add to basket' button on each gig card next to the price, with a + icon so it reads as additive, and keep the card click-through to the detail page for discovery. Reserve 'Buy now' for a true express-checkout action if one is ever introduced.",
      owner: "Product",
      status: "new",
      priority: { frequency: 4, impact: 3, effort: 2 },
      screenshot_reference: "/metrics/case-studies/off-axis-tours/gig-card-price.png",
    },
    {
      finding_id: "HE-022",
      title: "Basket bar overlaps and hides profile content",
      screen_or_flow: "Account profile page",
      user_task: "Edit profile details and reach the save action",
      primary_heuristic: "H08",
      secondary_heuristics: ["H03"],
      additional_lenses: ["L01"],
      description:
        "The fixed basket bar at the bottom of the screen overlaps the page content, covering the lower part of the profile form, including the New Cover Image control and any save action.",
      evidence: {
        observed_where: "Account profile page, Profile Information form",
        observed_behaviour:
          "The persistent 1 ticket basket bar sits on top of the form, partially hiding the fields beneath it. Content scrolls under the bar rather than clearing it.",
        expected_behaviour:
          "The page reserves space for the basket bar so it never covers content, and every form field and action stays fully visible and reachable.",
      },
      user_impact:
        "Users cannot see or interact with the obscured fields, which can block them from completing or saving their profile.",
      severity: "medium",
      confidence: "high",
      recommendation:
        "Add bottom padding equal to the basket bar height, or dismiss the bar on form pages, so content is never covered. Ensure obscured controls remain reachable.",
      owner: "Engineering",
      status: "new",
      priority: { frequency: 3, impact: 4, effort: 2 },
      screenshot_reference: "/metrics/case-studies/off-axis-tours/account-profile.png",
    },
    {
      finding_id: "HE-023",
      title: "No clear way to set a profile photo",
      screen_or_flow: "Account profile page avatar",
      user_task: "Add or change a profile photo",
      primary_heuristic: "H04",
      secondary_heuristics: ["H06"],
      additional_lenses: ["L02"],
      description:
        "The profile avatar is a generic silhouette with no visible control to add a photo, even though the form offers a New Cover Image upload and the header avatar shows the user's initial.",
      evidence: {
        observed_where: "Account profile page hero and Profile Information form",
        observed_behaviour:
          "The hero avatar is a default person icon with no edit affordance. The form has a cover-image upload but no profile-photo upload, and the nav avatar shows an S initial, so identity is shown three different ways.",
        expected_behaviour:
          "An obvious change-photo control on the avatar, a branded initials fallback when no photo is set, and consistent avatar treatment across the page and nav.",
      },
      user_impact:
        "Users cannot personalise their profile easily, and the inconsistent avatar treatment makes the page feel unfinished.",
      severity: "medium",
      confidence: "medium",
      recommendation:
        "Add a visible change-photo control on the avatar with an initials fallback, and make the avatar consistent between the header, the nav, and the profile.",
      owner: "Design",
      status: "new",
      priority: { frequency: 3, impact: 3, effort: 3 },
      screenshot_reference: "/metrics/case-studies/off-axis-tours/account-profile.png",
    },
    {
      finding_id: "HE-024",
      title: "Account tabs wrap onto a second row",
      screen_or_flow: "Account profile page tabs",
      user_task: "Move between account sections",
      primary_heuristic: "H08",
      secondary_heuristics: ["H04"],
      description:
        "The account tabs (Details, Activity, Transactions, Referrals, Security) wrap, leaving Security stranded on a second, centred row, so the set does not read as one tab bar.",
      evidence: {
        observed_where: "Account profile page tab bar",
        observed_behaviour:
          "Five tabs sit on the first row and Security drops to a second line on its own, breaking the visual grouping of the control.",
        expected_behaviour:
          "All tabs sit on one row, scrolling horizontally on narrow screens, so they read as a single, coherent control.",
      },
      user_impact:
        "The wrapped tab looks broken and is easy to miss, hurting wayfinding between account sections.",
      severity: "low",
      confidence: "high",
      recommendation:
        "Keep tabs on one row with horizontal scroll or an overflow menu on small screens, rather than wrapping a single tab to a new line.",
      owner: "Design",
      status: "new",
      priority: { frequency: 2, impact: 2, effort: 2 },
      screenshot_reference: "/metrics/case-studies/off-axis-tours/account-profile.png",
    },
    {
      finding_id: "HE-025",
      title: "Unverified email lacks context and the action is ambiguous",
      screen_or_flow: "Account profile page Email Verification",
      user_task: "Understand and complete email verification",
      primary_heuristic: "H10",
      secondary_heuristics: ["H04"],
      additional_lenses: ["L02"],
      description:
        "The email shows an Unverified status but nothing explains what verification unlocks or why it matters, and the single Verify / Resend Email button merges two distinct actions.",
      evidence: {
        observed_where: "Account profile page, Email Verification card",
        observed_behaviour:
          "Status is shown as Unverified with a Verify / Resend Email button. There is no explanation of what an unverified account cannot do, and the button label combines verifying and resending.",
        expected_behaviour:
          "A short line explaining why verification matters and what it unlocks, with a clearly labelled single action such as Resend verification email.",
      },
      user_impact:
        "Users may not understand the consequence of staying unverified, or what the combined button will actually do.",
      severity: "low",
      confidence: "medium",
      recommendation:
        "Explain the impact of an unverified email in one line and use a single, clearly labelled action such as Resend verification email.",
      owner: "Content",
      status: "new",
      priority: { frequency: 3, impact: 2, effort: 2 },
      screenshot_reference: "/metrics/case-studies/off-axis-tours/account-profile.png",
    },
    {
      finding_id: "HE-026",
      title: "Annual perk wording is unclear (2 months free)",
      screen_or_flow: "Fan Annual subscription plan",
      user_task: "Understand what the annual plan includes and saves",
      primary_heuristic: "H02",
      secondary_heuristics: ["H10"],
      additional_lenses: ["L02"],
      description:
        "The Fan Annual plan lists 2 months free with no explanation of how it applies, leaving users unsure whether it is built into the price, added at sign-up, or credited at the end of the year.",
      evidence: {
        observed_where: "Subscriptions page, Fan Annual card",
        observed_behaviour:
          "The card shows 2 months free as a bullet but does not say relative to what, when the user receives it, or how it changes the price. There are also only two plans, with a steep jump from £20 per month to £200 per year.",
        expected_behaviour:
          "A plain explanation such as Pay for 10 months, get 12, which is 2 months free versus paying monthly, with the equivalent monthly cost shown.",
      },
      user_impact:
        "Users cannot tell the real value of the annual plan, which weakens the upgrade decision.",
      severity: "low",
      confidence: "high",
      recommendation:
        "Spell out the saving in plain language and show the equivalent monthly cost so 2 months free is concrete. Consider a clearer tier ladder so the entry price is not a barrier.",
      owner: "Content",
      status: "new",
      priority: { frequency: 3, impact: 2, effort: 2 },
      screenshot_reference: "/metrics/case-studies/off-axis-tours/subscriptions.png",
    },
    {
      finding_id: "HE-027",
      title: "Checkout is cluttered and poorly grouped",
      screen_or_flow: "Checkout",
      user_task: "Review the order and pay with confidence",
      primary_heuristic: "H08",
      secondary_heuristics: ["H04"],
      additional_lenses: ["L02"],
      description:
        "The Total panel stacks many unrelated controls together, including a donation toggle, a voucher code, the price breakdown, a postcode field, terms, and the pay button, so the eye has no clear order. The order summary also does not scale cleanly to multiple items.",
      evidence: {
        observed_where: "Checkout page, right-hand Total panel and Order Summary",
        observed_behaviour:
          "Donation, voucher, price breakdown, postcode, and terms all sit in one dense column with little grouping. The Order Summary card mixes the heading with a single line item, with no structure for multiple gigs.",
        expected_behaviour:
          "Clear visual groups that move from order items to discounts (voucher and donation), then totals, then pay, plus an order summary that lists multiple items cleanly under one heading.",
      },
      user_impact:
        "A dense, ungrouped checkout raises anxiety at the most sensitive moment and can cause drop-off.",
      severity: "medium",
      confidence: "medium",
      recommendation:
        "Group the checkout into ordered sections (items, discounts, totals, pay). Put the Order Summary heading above the card and list each gig as a row inside it so multiple items read clearly.",
      owner: "Design",
      status: "new",
      priority: { frequency: 4, impact: 3, effort: 3 },
      screenshot_reference: "/metrics/case-studies/off-axis-tours/checkout.png",
    },
    {
      finding_id: "HE-028",
      title: "Postcode is requested oddly, right before payment",
      screen_or_flow: "Checkout Total panel",
      user_task: "Pay without unexpected interruptions",
      primary_heuristic: "H02",
      secondary_heuristics: ["H08"],
      additional_lenses: ["L02"],
      description:
        "A postcode field sits just above Proceed to Payment, labelled for event planning. Asking for a postcode at the moment of payment is unexpected and not obviously required to buy a ticket.",
      evidence: {
        observed_where: "Checkout page, above the Proceed to Payment button",
        observed_behaviour:
          "The field reads Postcode with helper text Used for event planning. Not shared with third parties, placed immediately before the pay button.",
        expected_behaviour:
          "Only ask for what is needed to pay at this step. Move optional, non-payment data earlier, mark it clearly optional, or collect it after purchase.",
      },
      user_impact:
        "An unexpected field at the payment step adds friction and hesitation, and can reduce conversion.",
      severity: "low",
      confidence: "medium",
      recommendation:
        "Move the postcode out of the payment step, mark it clearly optional, or collect it post-purchase. Explain why it is needed if it stays.",
      owner: "Product",
      status: "new",
      priority: { frequency: 3, impact: 3, effort: 2 },
      screenshot_reference: "/metrics/case-studies/off-axis-tours/checkout.png",
    },
    {
      finding_id: "HE-029",
      title: "Booking fee revealed only at checkout (drip pricing)",
      screen_or_flow: "Pricing and checkout",
      user_task: "Know the true price before committing",
      primary_heuristic: "H01",
      secondary_heuristics: ["H02"],
      additional_lenses: ["L03"],
      description:
        "The booking fee appears only at the final checkout step. Gigs are advertised and added at the headline price (for example £10), and the £1.25 booking fee surfaces only in the Total panel, after the user has chosen a gig and started checkout.",
      evidence: {
        observed_where: "Gig cards, event page, and checkout",
        observed_behaviour:
          "Cards and the event page show £10. The £1.25 booking fee only appears at checkout, increasing the total to £11.25 at the last moment.",
        expected_behaviour:
          "The booking fee, or the fact that fees apply, is disclosed up front on the gig card and event page, so the all-in price is never a surprise at checkout.",
      },
      user_impact:
        "Late fees feel deceptive and cause abandonment at the most committed moment, and repeated surprise fees reduce trust over time, especially among the repeat and friends-and-family buyers small acts rely on. Showing fees only at the end also runs against all-in pricing expectations and rules.",
      severity: "medium",
      confidence: "high",
      recommendation:
        "Show all-in pricing, or clearly flag that a booking fee applies, from the first place the price appears (cards and event page). Keep the breakdown at checkout, but never introduce a new mandatory fee there.",
      owner: "Product",
      status: "new",
      priority: { frequency: 5, impact: 4, effort: 3 },
      screenshot_reference: "/metrics/case-studies/off-axis-tours/booking-fee.png",
    },
    {
      finding_id: "HE-030",
      title: "Donation asks for the platform, not the artist",
      screen_or_flow: "Checkout donation prompt",
      user_task: "Decide whether to give a little extra",
      primary_heuristic: "H02",
      secondary_heuristics: ["H06"],
      additional_lenses: ["L02"],
      description:
        "The optional donation at checkout is framed as Donate £1.00 to support Off Axis. Fans are usually more motivated to support the artist they are seeing than the platform itself.",
      evidence: {
        observed_where: "Checkout, Total panel donation checkbox",
        observed_behaviour:
          "The prompt reads Donate £1.00 to support Off Axis, directing the optional gift to the platform.",
        expected_behaviour:
          "Frame the donation around supporting the artist, for example Add £1 to support the artist, which aligns with why fans are there.",
      },
      user_impact:
        "Fewer people opt in than would if the gift clearly supported the act, and asking for the platform can feel self-serving.",
      severity: "low",
      confidence: "medium",
      recommendation:
        "Reframe the optional donation to support the artist by default, naming the act, and keep it clearly opt-in. Consider letting users choose artist or platform.",
      owner: "Content",
      status: "new",
      priority: { frequency: 3, impact: 2, effort: 1 },
      screenshot_reference: "/metrics/case-studies/off-axis-tours/donation.png",
    },
    {
      finding_id: "HE-031",
      title: "Non-essential header controls add noise",
      screen_or_flow: "Global header",
      user_task: "Understand the header controls",
      primary_heuristic: "H08",
      secondary_heuristics: ["H06", "H04"],
      additional_lenses: ["L02"],
      description:
        "The header carries two icon-only controls that do not earn their place this early, a £ button and a theme toggle. The £ button has no text, caret, or selected value, so it is unclear whether it switches currency, filters by price, or links somewhere. Since Off Axis prices everything in GBP, it has no real job. A theme toggle is extra surface to build, test, and maintain that is not core to an MVP.",
      evidence: {
        observed_where: "Global header, top-right controls",
        observed_behaviour:
          "Two bare icon buttons (£ and a moon) sit beside the basket. Neither has a label or menu affordance, and the £ control does nothing meaningful on a single-currency platform.",
        expected_behaviour:
          "An MVP header carries only the controls that do a clear job, namely navigation, basket, and account. Anything non-essential or ambiguous is removed or clearly labelled.",
      },
      user_impact:
        "Users spend attention decoding controls that do nothing useful, and icon-only buttons with no text are especially hard for screen reader and low-vision users to interpret. Building and maintaining them also diverts effort from core MVP flows.",
      severity: "low",
      confidence: "medium",
      recommendation:
        "Remove the currency control while the platform is GBP-only and drop the theme toggle from the MVP. Revisit a labelled currency selector ('GBP £' with a caret) only if multiple currencies are added, and theming once core flows are validated.",
      owner: "Design",
      status: "new",
      priority: { frequency: 2, impact: 2, effort: 1 },
    },
  ],
  actionPlan: [
    { priority: "fix_now", action: "Add a clear hero action and a short how-it-works line" },
    { priority: "fix_now", action: "Hide test and empty artist profiles from public listings" },
    { priority: "fix_next", action: "Add search and filters to the artist directory" },
    { priority: "fix_next", action: "Add a global footer and a header sign-up button" },
    { priority: "fix_next", action: "Give cards real images and unique, descriptive link names" },
    { priority: "monitor", action: "Track sign-up and guest-checkout starts from the header" },
    { priority: "validate", action: "Run a five-user first-click test on the home page" },
  ],
  screenshots: [
    {
      src: "/metrics/case-studies/off-axis-tours/hero-no-cta.png",
      alt: "Off Axis home hero with no call to action above a grid of artist cards",
      caption:
        "The hero states a goal but offers no action, and the directory below mixes real artists with test and empty profiles.",
      annotations: heroNoCtaAnnotations,
    },
    {
      src: "/metrics/case-studies/off-axis-tours/gigs-search.png",
      alt: "Gigs page with a search field and blank gig image placeholders",
      caption:
        "Gigs has a search field that the artist directory lacks, and every gig card uses a blank image placeholder.",
      annotations: gigsSearchAnnotations,
    },
    {
      src: "/metrics/case-studies/off-axis-tours/login-flow.png",
      alt: "Login page with the Sign in button below the social login options",
      caption:
        "The primary Sign in button sits below the social options, and password rules appear on the login form.",
      annotations: loginFlowAnnotations,
    },
  ],
  redesignSummary: {
    intro:
      "The mock keeps the dark Off Axis styling. Changes focus on explaining the product, giving clear actions, and cleaning up the directory.",
    callouts: offAxisRedesignCallouts,
    implemented: [
      "Hero with a clear primary and secondary action",
      "A short how-it-works strip that explains the swap model",
      "Sign up beside Log in in the header",
      "A searchable, filterable artist directory",
      "Only complete, real profiles, with branded image fallbacks",
      "Featured and upcoming sections instead of one raw grid",
      "A global footer with help, contact, social, and legal links",
    ],
    planned: [
      "A dedicated artist profile page (about, gigs, merch, connect) with a back link that remembers your origin",
      "Collapse ended gigs behind a Show more toggle and show upcoming and ended counts per section",
      "Make Connect links obvious tappable rows with icon, border, hover, focus, and external-link cues",
      "Show clean social handles and action labels (Follow on Instagram, Listen on Spotify) in Connect",
      "Surface genre as a prominent tag on the profile, consistent with the directory",
      "Add a Sounds like row and descriptor tags so users can scan an artist's vibe",
      "Show the artist's real photo on the event page and link it to their profile",
      "Use an eyebrow for the promoter prefix above a prominent event title",
      "Add a direct Buy now action on gig cards beside the price, keeping the detail page for discovery",
      "Add a fan account page (details, activity, transactions, referrals, security) with email verification and profile editing",
      "Keep the basket bar from covering page content, add a clear profile-photo control, and fit account tabs on one row",
      "Rework subscriptions into three clear monthly tiers plus annual, with plain-language perks and savings",
      "Add a grouped checkout (items, discounts, totals, pay) with clear guest and member flows",
      "Disclose booking fees up front (cards and event page) with all-in pricing, not only at checkout",
      "Reframe the optional checkout donation to support the artist, kept clearly opt-in",
      "Hide test and incomplete profiles at the data level",
      "Unique, descriptive link names on every card",
      "Real event imagery on gig cards",
      "Contrast and focus pass across light and dark themes",
      "Five-user first-click test on the home page",
      "Mobile and tablet layout review",
    ],
  },
};

export { offAxisRedesignCallouts };
