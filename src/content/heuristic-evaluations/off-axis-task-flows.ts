import type { HeuristicEvaluation, HeuristicFinding } from "./types";
import { countSeverity } from "./types";

/**
 * Fourth Off Axis review. Task flows across roles on the live site, desktop and mobile.
 * Each finding has one highlighted screenshot. Findings are grouped into themes by flow,
 * so new findings only need a theme to appear in the right group.
 */
const SCREENSHOT_BASE = "/metrics/case-studies/off-axis-task-flows";

const THEMES = [
  "Artist onboarding and approval",
  "Signing in and account pages",
  "Buying tickets",
  "Browsing and first impressions",
] as const;

type TaskFlowTheme = (typeof THEMES)[number];

type TaskFlowFinding = HeuristicFinding & { theme: TaskFlowTheme };

const signedOutFindings: TaskFlowFinding[] = [
  {
    finding_id: "HE-001",
    theme: "Artist onboarding and approval",
    title: "Pending approval is a dead end",
    screen_or_flow: "Artist · pending approval",
    user_task: "Wait for approval after onboarding",
    primary_heuristic: "H03",
    secondary_heuristics: ["H01"],
    description:
      "After onboarding, the artist lands on a holding page where the only button is Sign out. Every other page sends them back here.",
    evidence: {
      observed_where: "/pending-approval",
      observed_behaviour:
        "The only action is Sign out. The menu still shows Dashboard, Create Gig, My Gigs and Scanner, and each one bounces back to this page. The copy promises approval today, which won't hold at weekends.",
      expected_behaviour:
        "A pending artist can edit their profile and browse gigs while they wait, with artist tools hidden until approval.",
    },
    user_impact:
      "New artists are shut out at the moment they are most keen, and the only way forward is to leave.",
    severity: "high",
    confidence: "medium",
    recommendation:
      "Make Edit your profile the main button and Browse gigs the second, with Sign out as a text link. Hide artist menu items while pending and drop the promise of today.",
    owner: "Product",
    status: "new",
    priority: { frequency: 4, impact: 4, effort: 2 },
    screenshot_reference: `${SCREENSHOT_BASE}/pending-approval-dead-end.png`,
    screenshot_caption: "Holding page copy, captured signed out",
  },
  {
    finding_id: "HE-002",
    theme: "Signing in and account pages",
    title: "Account pages show empty screens when signed out",
    screen_or_flow: "Any role · signed out",
    user_task: "Open a bookmarked account page",
    primary_heuristic: "H01",
    secondary_heuristics: ["H09"],
    description:
      "Account pages load as if someone were signed in, with empty data and no prompt to sign in.",
    evidence: {
      observed_where: "/dashboard, /profile, /my-gigs, /create-gig and /scanner",
      observed_behaviour:
        "The dashboard says Welcome back, Artist with £0.00 everywhere. The profile page shows empty fields and a Save Changes button. Behind each page the request fails, and nothing tells the visitor to sign in.",
      expected_behaviour:
        "Signed-out visitors are sent to sign in, then returned to the page they asked for.",
    },
    user_impact:
      "Someone whose session has expired sees zeros everywhere and may think their account has been wiped.",
    severity: "high",
    confidence: "high",
    recommendation:
      "Send signed-out visitors to sign in with the page they wanted kept as the return address. The admin area already does this.",
    owner: "Engineering",
    status: "new",
    priority: { frequency: 3, impact: 4, effort: 2 },
    screenshot_reference: `${SCREENSHOT_BASE}/logged-out-dashboard-shell.png`,
    screenshot_caption: "Dashboard loaded while signed out",
  },
  {
    finding_id: "HE-003",
    theme: "Buying tickets",
    title: "My Orders tells guests they have no orders",
    screen_or_flow: "Fan · guest buyer",
    user_task: "Find tickets bought as a guest",
    primary_heuristic: "H09",
    secondary_heuristics: ["H02"],
    description:
      "A guest who opens My Orders is told they haven't placed any orders, with no route to the order they did place.",
    evidence: {
      observed_where: "/orders and /tickets while signed out",
      observed_behaviour:
        "The page says No orders yet and offers Browse Events. There is no link to sign in or to Find My Order.",
      expected_behaviour:
        "Signed-out visitors are offered two routes, sign in or look up a guest order.",
    },
    user_impact: "A fan who bought tickets yesterday is told the order doesn't exist.",
    severity: "high",
    confidence: "high",
    recommendation:
      "When signed out, replace the empty state with Sign in to see your orders and Find a guest order.",
    owner: "Design",
    status: "new",
    priority: { frequency: 3, impact: 4, effort: 1 },
    screenshot_reference: `${SCREENSHOT_BASE}/logged-out-orders-says-no-orders.png`,
    screenshot_caption: "My Orders empty state, signed out",
  },
  {
    finding_id: "HE-004",
    theme: "Buying tickets",
    title: "Booking fee only appears at checkout",
    screen_or_flow: "Fan · gig page to checkout",
    user_task: "Know the real price before committing",
    primary_heuristic: "H02",
    secondary_heuristics: ["H01"],
    additional_lenses: ["L03"],
    description:
      "Gig cards and pages show £8.00. A £1.25 booking fee first appears in the checkout total.",
    evidence: {
      observed_where: "Gig list, gig page and /checkout",
      observed_behaviour:
        "One ticket costs £9.25 at checkout after £8.00 everywhere before it. This pattern is also likely to fall under the UK drip pricing rules, which want unavoidable fees in the headline price.",
      expected_behaviour: "The price fans see first already includes the booking fee.",
    },
    user_impact: "The fee feels hidden, and it lands after the fan has already decided to buy.",
    severity: "high",
    confidence: "high",
    recommendation:
      "Show the full price on gig cards and pages, such as £9.25 incl. £1.25 booking fee. Keep the breakdown at checkout and check the rules with whoever handles compliance.",
    owner: "Product",
    status: "new",
    priority: { frequency: 5, impact: 3, effort: 2 },
    screenshot_reference: `${SCREENSHOT_BASE}/checkout-booking-fee-revealed-late.png`,
    screenshot_caption: "Booking fee first shown at checkout",
  },
  {
    finding_id: "HE-005",
    theme: "Signing in and account pages",
    title: "Login to Checkout drops the shopper on the homepage",
    screen_or_flow: "Fan · basket to sign in",
    user_task: "Sign in and finish buying",
    primary_heuristic: "H03",
    secondary_heuristics: ["H07"],
    description:
      "The button opens sign-in with the checkout as the return address, but the sign-in page ignores it and sends everyone to the homepage.",
    evidence: {
      observed_where: "/login?redirect=/checkout",
      observed_behaviour:
        "The redirect is passed correctly and then dropped by the sign-in page, which always sends active users to /. Confirmed in the code. Checking it live, and whether the basket survives, needs a fan test account.",
      expected_behaviour: "After signing in, the shopper returns to checkout with the basket intact.",
    },
    user_impact:
      "A fan mid-purchase lands on an artist recruitment page and has to find their basket again.",
    severity: "high",
    confidence: "medium",
    recommendation:
      "Honour the redirect on sign-in and registration, limited to pages on the same site. The same fix helps account pages and Unlimited.",
    owner: "Engineering",
    status: "new",
    priority: { frequency: 4, impact: 4, effort: 1 },
    screenshot_reference: `${SCREENSHOT_BASE}/login-to-checkout-ignores-redirect.png`,
    screenshot_caption: "Sign-in page reached from Login to Checkout",
  },
  {
    finding_id: "HE-006",
    theme: "Buying tickets",
    title: "Guest checkout button is disabled with no reason",
    screen_or_flow: "Fan · guest checkout",
    user_task: "Continue to payment as a guest",
    primary_heuristic: "H09",
    secondary_heuristics: ["H01"],
    description:
      "Continue as Guest stays greyed out until certain fields and two checkboxes are filled in, but nothing says which ones.",
    evidence: {
      observed_where: "/checkout guest form",
      observed_behaviour:
        "The button stays disabled with no message. On mobile it sits far below the name and email fields, so the missing step is hard to spot. The inline Email addresses do not match message works well.",
      expected_behaviour: "The form says what is still missing before or when the buyer presses the button.",
    },
    user_impact: "Buyers stare at a dead button and some will give up on the tickets.",
    severity: "medium",
    confidence: "high",
    recommendation:
      "Keep the button active and, when pressed, scroll to the first missing field with an inline message. The confirm-email check already shows the pattern.",
    owner: "Design",
    status: "new",
    priority: { frequency: 4, impact: 3, effort: 2 },
    screenshot_reference: `${SCREENSHOT_BASE}/checkout-guest-button-disabled-no-reason.png`,
    screenshot_caption: "Guest checkout with the button disabled",
  },
  {
    finding_id: "HE-007",
    theme: "Buying tickets",
    title: "Required phone field is split off and not enforced",
    screen_or_flow: "Fan · guest checkout",
    user_task: "Fill in guest details",
    primary_heuristic: "H05",
    secondary_heuristics: ["H04"],
    description:
      "Mobile Phone is marked required but sits under the price, away from the other personal details. Leaving it blank still enables the button.",
    evidence: {
      observed_where: "/checkout order total card",
      observed_behaviour:
        "With names, email, terms and age filled in and the phone left blank, Continue as Guest became active. The button was not pressed, so what the server does next is unknown.",
      expected_behaviour: "A required field sits with the other details and is checked before the button unlocks.",
    },
    user_impact: "The form says one thing and does another, so any error lands late or not at all.",
    severity: "medium",
    confidence: "medium",
    recommendation:
      "Move Mobile Phone into Personal Details. Decide whether guests really need it, then either validate it or mark it optional.",
    owner: "Design",
    status: "new",
    priority: { frequency: 3, impact: 3, effort: 2 },
    screenshot_reference: `${SCREENSHOT_BASE}/checkout-guest-enabled-without-required-phone.png`,
    screenshot_caption: "Button enabled with the phone blank",
  },
  {
    finding_id: "HE-008",
    theme: "Signing in and account pages",
    title: "Venue dashboard never stops loading",
    screen_or_flow: "Venue manager · signed out",
    user_task: "Open the venue dashboard",
    primary_heuristic: "H01",
    description: "Signed out, the venue dashboard shows a loading message and stays there.",
    evidence: {
      observed_where: "/venue",
      observed_behaviour:
        "Loading Venue Dashboard never changes. There is no timeout, error or sign-in link.",
      expected_behaviour: "The page sends the visitor to sign in, or explains what went wrong after a short wait.",
    },
    user_impact: "A venue manager with an expired session waits on a page that will never load.",
    severity: "medium",
    confidence: "high",
    recommendation:
      "Cover it with the same sign-in redirect as the other account pages. Add a timeout with Try again and a sign-in link.",
    owner: "Engineering",
    status: "new",
    priority: { frequency: 2, impact: 3, effort: 1 },
    screenshot_reference: `${SCREENSHOT_BASE}/logged-out-venue-stuck-loading.png`,
    screenshot_caption: "Venue dashboard stuck loading",
  },
  {
    finding_id: "HE-009",
    theme: "Signing in and account pages",
    title: "Subscribing while signed out loses the plan",
    screen_or_flow: "Fan · Unlimited",
    user_task: "Subscribe to a plan",
    primary_heuristic: "H01",
    secondary_heuristics: ["H03"],
    description:
      "Subscribe Now sends a signed-out fan to the plain sign-in page, with no message and no way back to the plan.",
    evidence: {
      observed_where: "/unlimited",
      observed_behaviour:
        "A new fan has no account yet, so they have to find Register, then find Unlimited again and pick the plan a second time. After signing in they land on the homepage.",
      expected_behaviour: "The fan is told to sign in or create an account, then returns to the plan they chose.",
    },
    user_impact: "A fan ready to pay has to repeat the whole choice, and some won't.",
    severity: "medium",
    confidence: "high",
    recommendation:
      "Say Create an account or sign in to subscribe. Carry the chosen plan through sign-in or registration and return to it.",
    owner: "Product",
    status: "new",
    priority: { frequency: 3, impact: 3, effort: 2 },
    screenshot_reference: `${SCREENSHOT_BASE}/unlimited-subscribe-before.png`,
    screenshot_caption: "Unlimited plans before Subscribe Now",
  },
  {
    finding_id: "HE-010",
    theme: "Signing in and account pages",
    title: "Google and Apple sign-in don't work",
    screen_or_flow: "Any role · sign in",
    user_task: "Sign in with a social account",
    primary_heuristic: "H04",
    secondary_heuristics: ["H08"],
    description:
      "Both social buttons look live. Pressing either shows a toast saying it is coming soon.",
    evidence: {
      observed_where: "/login",
      observed_behaviour: "Google Login is coming soon and Apple Login is coming soon appear as toasts.",
      expected_behaviour: "Only working sign-in options are shown.",
    },
    user_impact: "People who rely on social sign-in hit a dead end, and the page looks unfinished.",
    severity: "medium",
    confidence: "high",
    recommendation: "Hide both buttons until they work.",
    owner: "Design",
    status: "new",
    priority: { frequency: 3, impact: 2, effort: 1 },
    screenshot_reference: `${SCREENSHOT_BASE}/login-social-buttons-coming-soon.png`,
    screenshot_caption: "Coming soon toast on sign in",
  },
  {
    finding_id: "HE-011",
    theme: "Artist onboarding and approval",
    title: "Registration catches errors late and skips consent",
    screen_or_flow: "Artist or fan · register",
    user_task: "Create an account",
    primary_heuristic: "H05",
    secondary_heuristics: ["H04"],
    additional_lenses: ["L03"],
    description:
      "Only Mobile Phone is marked required, an invalid email shows no error, and there is no terms or privacy step.",
    evidence: {
      observed_where: "/register, checked up to submit",
      observed_behaviour:
        "Typing not-an-email and moving on shows nothing. Checkout asks for terms consent but registration doesn't. Switching between Fan and Artist changes most of the fields.",
      expected_behaviour:
        "Required fields are marked the same way as checkout, email is checked on blur, and consent is asked for before the account exists.",
    },
    user_impact: "Artists find their mistakes only after submitting, and the account is created without clear consent.",
    severity: "medium",
    confidence: "high",
    recommendation:
      "Mark required fields consistently and validate email on blur. Add a line saying creating an account means agreeing to the Terms and Privacy Policy.",
    owner: "Design",
    status: "new",
    priority: { frequency: 4, impact: 3, effort: 2 },
    screenshot_reference: `${SCREENSHOT_BASE}/register-artist-validation-and-consent.png`,
    screenshot_caption: "Artist registration, not submitted",
  },
  {
    finding_id: "HE-012",
    theme: "Browsing and first impressions",
    title: "Homepage only speaks to artists",
    screen_or_flow: "Fan · homepage",
    user_task: "Find a gig to go to",
    primary_heuristic: "H02",
    secondary_heuristics: ["H04"],
    description:
      "The hero says Play more gigs. Earn more money. Find new fans, and every section below is about an artist career.",
    evidence: {
      observed_where: "/",
      observed_behaviour:
        "There are no upcoming gigs, dates or prices on the page. Get Started Free sits under an artist question but opens fan sign-up. Every role also lands here after signing in.",
      expected_behaviour: "Fans see upcoming gigs near the top, and artist calls to action open artist sign-up.",
    },
    user_impact: "Fans arrive to buy tickets and are pitched a music career instead.",
    severity: "medium",
    confidence: "high",
    recommendation:
      "Add an upcoming gigs strip near the top and point Get Started Free at artist sign-up. Later, send signed-in people somewhere that fits their role.",
    owner: "Product",
    status: "new",
    priority: { frequency: 5, impact: 3, effort: 3 },
    screenshot_reference: `${SCREENSHOT_BASE}/home-artist-only-pitch.png`,
    screenshot_caption: "Homepage hero aimed at artists",
  },
  {
    finding_id: "HE-013",
    theme: "Browsing and first impressions",
    title: "Test content on the live site",
    screen_or_flow: "Any role · browsing",
    user_task: "Tell real gigs from test ones",
    primary_heuristic: "H08",
    secondary_heuristics: ["H02"],
    additional_lenses: ["L03"],
    description:
      "A banner says every gig is a test event, yet the gigs are real and on sale. Test profiles and TEST descriptions show in public lists.",
    evidence: {
      observed_where: "/, /gigs and /artists",
      observed_behaviour:
        "The Up Top description starts with TEST, and so do several past gigs. The artist directory lists a phone test profile with the bio Asdf.",
      expected_behaviour: "Public pages show only real gigs and artists, with no test notice once the site is live.",
    },
    user_impact: "Fans can't tell what is real, which costs ticket sales and makes artists look less professional.",
    severity: "medium",
    confidence: "high",
    recommendation:
      "Decide whether the site is live. If it is, remove the banner, strip TEST from descriptions and hide test accounts with an admin flag.",
    owner: "Content",
    status: "new",
    priority: { frequency: 5, impact: 3, effort: 1 },
    screenshot_reference: `${SCREENSHOT_BASE}/gigs-list-test-content.png`,
    screenshot_caption: "TEST in a public gig listing",
  },
  {
    finding_id: "HE-014",
    theme: "Signing in and account pages",
    title: "One action, several names",
    screen_or_flow: "Any role · sign in and buy",
    user_task: "Recognise the same action across pages",
    primary_heuristic: "H04",
    description:
      "The nav says Sign In, the page title says Login and checkout says Login to Checkout. The footer offers an Artist / Venue Login.",
    evidence: {
      observed_where: "Header, /login, /checkout and footer",
      observed_behaviour:
        "Gig cards say Get Tickets and the gig page says Buy Tickets. The sign-in form shows the sign-up password rule.",
      expected_behaviour: "Each action keeps one name everywhere it appears.",
    },
    user_impact: "Fans read the footer link as not for them, and small mismatches add doubt at every step.",
    severity: "low",
    confidence: "high",
    recommendation:
      "Pick one term for each thing, such as Sign in, Get tickets and Your tickets. Remove the password rule from the sign-in form.",
    owner: "Content",
    status: "new",
    priority: { frequency: 4, impact: 2, effort: 1 },
    screenshot_reference: `${SCREENSHOT_BASE}/terminology-login-signin.png`,
    screenshot_caption: "Sign In and Login on one page",
  },
  {
    finding_id: "HE-015",
    theme: "Browsing and first impressions",
    title: "Mobile header hides the logo",
    screen_or_flow: "Any role · mobile",
    user_task: "Get home or find help on a phone",
    primary_heuristic: "H06",
    secondary_heuristics: ["H04"],
    additional_lenses: ["L04"],
    description:
      "At 390px the Off Axis logo and home link disappear. The menu holds only Gigs, Artists and Unlimited.",
    evidence: {
      observed_where: "Header and menu at 390px",
      observed_behaviour:
        "The header shows only the menu, theme and Sign In buttons. Find My Order, FAQ and Contact live only in the footer, below a long page.",
      expected_behaviour: "The brand and the main help routes stay one tap away on mobile.",
    },
    user_impact: "Phone visitors lose their bearings and have to scroll the whole page to find help.",
    severity: "low",
    confidence: "high",
    recommendation: "Show a compact logo in the mobile header. Add Find My Order and Help to the mobile menu.",
    owner: "Design",
    status: "new",
    priority: { frequency: 4, impact: 2, effort: 1 },
    screenshot_reference: `${SCREENSHOT_BASE}/mobile-header-no-logo.png`,
    screenshot_caption: "Mobile header without the logo",
  },
  {
    finding_id: "HE-016",
    theme: "Browsing and first impressions",
    title: "Internal labels on public pages",
    screen_or_flow: "Fan · gig and artist pages",
    user_task: "Read about a gig or artist",
    primary_heuristic: "H02",
    secondary_heuristics: ["H08"],
    description:
      "Gig pages show a Published badge, which is an admin status. Artist pages show a disabled Follow (Coming Soon) button.",
    evidence: {
      observed_where: "Gig page and artist page",
      observed_behaviour:
        "Profiles with no photo say No image available. The gig page says Organizer in US spelling and repeats the doors time with no stage time.",
      expected_behaviour: "Public pages only show what a fan can use.",
    },
    user_impact: "Small bits of admin language make the product feel unfinished to fans.",
    severity: "low",
    confidence: "high",
    recommendation:
      "Hide the status badge and the Follow button on public pages. Use a branded placeholder image and the spelling Organiser.",
    owner: "Content",
    status: "new",
    priority: { frequency: 4, impact: 1, effort: 1 },
    screenshot_reference: `${SCREENSHOT_BASE}/gig-page-internal-status-badge.png`,
    screenshot_caption: "Published badge on a public gig",
  },
  {
    finding_id: "HE-017",
    theme: "Browsing and first impressions",
    title: "Gig search matches description text",
    screen_or_flow: "Fan · gig search",
    user_task: "Find gigs in one city",
    primary_heuristic: "H02",
    description:
      "Searching Glasgow returns an Edinburgh gig because its description mentions Glasgow. There is no city or date filter.",
    evidence: {
      observed_where: "/gigs search",
      observed_behaviour:
        "The Sneaky Petes gig in Edinburgh appears for Glasgow. The no-results state is good, with No events found and Clear filters.",
      expected_behaviour: "Matches on city, venue and artist rank above description text.",
    },
    user_impact: "Fans looking for a local gig have to check each result's city by hand.",
    severity: "low",
    confidence: "high",
    recommendation: "Rank city, venue and artist matches above description matches, or add a city filter.",
    owner: "Engineering",
    status: "new",
    priority: { frequency: 2, impact: 2, effort: 2 },
    screenshot_reference: `${SCREENSHOT_BASE}/gigs-search-matches-description.png`,
    screenshot_caption: "Glasgow search returning Edinburgh",
  },
  {
    finding_id: "HE-018",
    theme: "Buying tickets",
    title: "Buy Tickets adds a ticket straight away",
    screen_or_flow: "Fan · gig page",
    user_task: "Choose how many tickets to buy",
    primary_heuristic: "H01",
    secondary_heuristics: ["H03"],
    description:
      "One press adds one ticket and a second press adds another, with no toast or quantity picker.",
    evidence: {
      observed_where: "Gig page Buy Tickets button",
      observed_behaviour:
        "The only sign is a basket bar sliding up at the bottom. Quantity can be changed once the bar is opened.",
      expected_behaviour: "The fan picks a quantity, or gets a clear confirmation that a ticket was added.",
    },
    user_impact: "Fans can add more tickets than they meant to without noticing.",
    severity: "low",
    confidence: "high",
    recommendation: "Add a quantity stepper next to Buy Tickets, or a short 1 ticket added message that opens the basket.",
    owner: "Design",
    status: "new",
    priority: { frequency: 4, impact: 2, effort: 2 },
    screenshot_reference: `${SCREENSHOT_BASE}/gig-buy-tickets-adds-instantly.png`,
    screenshot_caption: "Basket bar after one press",
  },
];

/** Findings from signed-in role testing. Empty until test accounts are available. */
const signedInFindings: TaskFlowFinding[] = [];

const findings: TaskFlowFinding[] = [...signedOutFindings, ...signedInFindings];

export const offAxisTaskFlowsEvaluation: HeuristicEvaluation = {
  slug: "off-axis-task-flows",
  title: "Off Axis heuristic evaluation · Part 4",
  client: "Off Axis · Task flows across fan, artist and venue roles",
  accent: "#A855F7",
  executiveSummary: {
    whatWasEvaluated:
      "Part 4 of the Off Axis review. Every signed-out task flow on the live site, from browsing and signing up to guest checkout, tested on desktop and mobile.",
    usabilityHealth:
      "Buying works, but the routes around it leak. Pending artists, guest buyers and anyone with an expired session all hit pages that go nowhere.",
    topIssues: [
      "Pending artists can only sign out",
      "Account pages show empty data instead of asking people to sign in",
      "Guests are told they have no orders",
      "The booking fee first appears at checkout",
      "Sign-in ignores where the shopper was heading",
    ],
    mainRisks: [
      "New artists leave during approval and don't come back",
      "Guest buyers think their tickets are lost",
      "Late fees fall foul of UK drip pricing rules",
    ],
    recommendedNextSteps: [
      "Add a sign-in redirect that returns people to the page they asked for",
      "Give pending artists a profile and gig browsing while they wait",
      "Show the full ticket price, fee included, from the first card",
      "Repeat the review for each signed-in role once test accounts exist",
    ],
  },
  scope: {
    evaluatedUrl: "https://offaxistours.com/",
    evaluationDate: "2026-11-16",
    evaluator: "Shaun Leishman",
    userGroups: ["Fans and guest buyers", "Artists", "Venue managers", "Visitors on mobile"],
    tasksEvaluated: [
      "Land on the homepage and browse gigs and artists",
      "Search gigs by city and add tickets to the basket",
      "Check out as a guest, up to the payment step",
      "Sign in, register and reach Unlimited while signed out",
      "Open account pages and the pending approval page while signed out",
      "Find a guest order and check the mobile header and menu",
    ],
    heuristicsUsed: [
      "H01 Visibility of system status",
      "H02 Match between system and the real world",
      "H03 User control and freedom",
      "H04 Consistency and standards",
      "H05 Error prevention",
      "H06 Recognition rather than recall",
      "H07 Flexibility and efficiency of use",
      "H08 Aesthetic and minimalist design",
      "H09 Help users recognise, diagnose and recover from errors",
    ],
    additionalLenses: ["Trust, consent and data confidence", "Responsive and cross-device behaviour"],
    limitations: [
      "Signed-out flows only. Signed-in flows for each role wait on test accounts and will be added later.",
      "Code-review hunches about signed-in roles are left out until they can be checked live.",
      "Nothing was written to production, so no accounts, orders or payments were made.",
      "Tested at 1440px desktop and 390px mobile in one browser. Screenshots show desktop unless noted.",
    ],
  },
  severitySummary: countSeverity(findings),
  themes: THEMES.map((label) => ({
    label,
    findingIds: findings.filter((f) => f.theme === label).map((f) => f.finding_id),
  })).filter((theme) => theme.findingIds.length > 0),
  findings,
  actionPlan: [
    { priority: "fix_now", action: "Redirect signed-out visitors to sign in and return them to the page they asked for" },
    { priority: "fix_now", action: "Give pending artists profile editing and gig browsing while they wait" },
    { priority: "fix_now", action: "Show the full ticket price, booking fee included, on cards and gig pages" },
    { priority: "fix_next", action: "Offer sign in and guest order lookup on My Orders when signed out" },
    { priority: "fix_next", action: "Explain what is missing when guest checkout can't continue" },
    { priority: "fix_next", action: "Remove test content and hide social sign-in until it works" },
    { priority: "monitor", action: "Settle one name each for sign in, tickets and orders" },
    { priority: "validate", action: "Test each signed-in role live once accounts are ready" },
  ],
};
