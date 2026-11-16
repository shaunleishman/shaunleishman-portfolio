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
  "Door check-in",
  "Admin dashboard",
  "Approvals and notifications",
  "Money and settlements",
  "Access and discounts",
  "Errors and empty states",
  "Venue schedule",
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

/**
 * Findings from signed-in testing as super admin (read-only). Other-role screens
 * were opened with the same account. Provisional code-only items stay out.
 */
const signedInFindings: TaskFlowFinding[] = [
  {
    finding_id: "HE-019",
    theme: "Door check-in",
    title: "Scanner picks the wrong gig",
    screen_or_flow: "Door staff · scanner",
    user_task: "Scan tickets for tonight's gig",
    primary_heuristic: "H01",
    secondary_heuristics: ["H05"],
    description:
      "The scanner opened on a cancelled gig with zero tickets. It fills its list from gigs the person organises and picks the first one.",
    evidence: {
      observed_where: "/scanner",
      observed_behaviour:
        "Marley Raps, a cancelled gig, was selected by default. Live gigs this admin can scan were not offered. A check-in assistant organises nothing, so their list will be empty unless they arrive with a gig link. That empty list still needs their own login to confirm.",
      expected_behaviour:
        "The scanner lists gigs the person may check in for, skips cancelled and ended ones, and defaults to tonight.",
    },
    user_impact: "At the door, staff scan against the wrong gig, or cannot scan at all.",
    severity: "high",
    confidence: "medium",
    recommendation:
      "List check-in gigs, not organised ones. Skip cancelled and ended gigs, default to tonight, and show the name and date large. When empty, say they have not been added yet and to ask the organiser for the door link.",
    owner: "Engineering",
    status: "new",
    priority: { frequency: 4, impact: 5, effort: 2 },
    screenshot_reference: `${SCREENSHOT_BASE}/scanner-defaults-to-cancelled-gig.png`,
    screenshot_caption: "Scanner defaulting to a cancelled gig",
  },
  {
    finding_id: "HE-020",
    theme: "Artist onboarding and approval",
    title: "Active accounts can still open onboarding",
    screen_or_flow: "Any active account · onboarding",
    user_task: "Stay in an approved account",
    primary_heuristic: "H05",
    description:
      "An approved admin could open the full onboarding form with Submit Application. One press would set their status to pending with no way back.",
    evidence: {
      observed_where: "/onboarding",
      observed_behaviour:
        "Nothing said the account was already approved. The server sets any user to pending on submit and only checks the profile for artists. The button was not pressed.",
      expected_behaviour:
        "Only accounts still in onboarding can open the form. Everyone else goes to their dashboard, and the server refuses the rest.",
    },
    user_impact:
      "An approved artist or admin can lock themselves onto the pending holding page until another admin frees them.",
    severity: "high",
    confidence: "high",
    recommendation:
      "Only let users with onboarding status open the page. Send everyone else to their dashboard, and refuse the submission on the server unless they are still in onboarding.",
    owner: "Engineering",
    status: "new",
    priority: { frequency: 2, impact: 5, effort: 2 },
    screenshot_reference: `${SCREENSHOT_BASE}/onboarding-reachable-by-active-admin.png`,
    screenshot_caption: "Onboarding form open while already approved",
  },
  {
    finding_id: "HE-021",
    theme: "Admin dashboard",
    title: "Admin dashboard shows made-up trends",
    screen_or_flow: "Admin · dashboard",
    user_task: "Read how the platform is doing",
    primary_heuristic: "H01",
    description:
      "The totals are real, but the trend lines under them are fixed strings. System Health always says everything is fine with static numbers.",
    evidence: {
      observed_where: "/admin",
      observed_behaviour:
        "Lines such as +12% from last month sit under real totals and are marked as mock data in the code. Uptime, CPU and memory never change.",
      expected_behaviour: "Trends come from real data, or they are removed. Health shows a real check and when it was last updated.",
    },
    user_impact: "Admins treat fake trends as facts, and a real outage would still look green.",
    severity: "high",
    confidence: "high",
    recommendation:
      "Work out the trends from real data or remove them. Remove System Health, or wire it to a real health check with a last-updated time.",
    owner: "Engineering",
    status: "new",
    priority: { frequency: 5, impact: 4, effort: 3 },
    screenshot_reference: `${SCREENSHOT_BASE}/admin-dashboard-mock-trends.png`,
    screenshot_caption: "Fixed trend strings on the admin dashboard",
  },
  {
    finding_id: "HE-022",
    theme: "Signing in and account pages",
    title: "Admins land on the public homepage after signing in",
    screen_or_flow: "Admin · after sign in",
    user_task: "Reach the admin panel after signing in",
    primary_heuristic: "H07",
    description:
      "After signing in, the admin lands on the artist recruitment homepage. The admin panel is only reached through the avatar menu.",
    evidence: {
      observed_where: "/ after admin sign in",
      observed_behaviour:
        "Every active role is sent to /. Gig managers and door staff will see the same landing, though that was not checked with their own logins.",
      expected_behaviour: "Each role lands on its main screen, with any redirect from the link honoured first.",
    },
    user_impact: "Admins waste a step every sign-in, and other roles start on a page that is not for them.",
    severity: "medium",
    confidence: "high",
    recommendation:
      "Send admins to /admin, artists to the dashboard, gig managers to My Gigs and door staff to the scanner. Honour the redirect first.",
    owner: "Product",
    status: "new",
    priority: { frequency: 5, impact: 2, effort: 2 },
    screenshot_reference: `${SCREENSHOT_BASE}/admin-login-lands-on-public-home.png`,
    screenshot_caption: "Public homepage after an admin signs in",
  },
  {
    finding_id: "HE-023",
    theme: "Approvals and notifications",
    title: "Approval counts disagree and open on an empty tab",
    screen_or_flow: "Admin · approvals",
    user_task: "Work through pending approvals",
    primary_heuristic: "H01",
    secondary_heuristics: ["H04"],
    description:
      "The sidebar badge, the page title and the tabs all show different counts. The page opens on Venues, which has nothing in it.",
    evidence: {
      observed_where: "/admin/approvals",
      observed_behaviour:
        "The sidebar said 8, the title said 4 pending, and the tabs added up to 4. Notifications said Email verify 5 for the same queue. Work sat further along from the empty Venues tab.",
      expected_behaviour: "One count from one source everywhere, with the first non-empty tab open.",
    },
    user_impact: "Admins cannot trust the queue size and start on a blank tab every visit.",
    severity: "medium",
    confidence: "high",
    recommendation: "Use one count from one source. Open on the first tab that has items, or on an All view.",
    owner: "Engineering",
    status: "new",
    priority: { frequency: 4, impact: 3, effort: 2 },
    screenshot_reference: `${SCREENSHOT_BASE}/admin-approvals-counts-and-empty-default-tab.png`,
    screenshot_caption: "Approvals page opening on an empty Venues tab",
  },
  {
    finding_id: "HE-024",
    theme: "Approvals and notifications",
    title: "Inbox still lists approved artists as waiting",
    screen_or_flow: "Admin · notification inbox",
    user_task: "Clear artists waiting for approval",
    primary_heuristic: "H01",
    description:
      "The inbox still shows Artist awaiting approval for people who are already approved and public.",
    evidence: {
      observed_where: "/admin/notifications",
      observed_behaviour:
        "Eyes of Home and others still appear as waiting, while the Artists count above shows 0 pending. The entries never update or clear.",
      expected_behaviour: "Inbox items clear or mark done when the approval is decided, with the current status on each row.",
    },
    user_impact: "Admins cannot trust the inbox and may open the same artist twice.",
    severity: "medium",
    confidence: "high",
    recommendation:
      "Mark an inbox item done, or remove it, when the approval is decided. Show the current status on each item.",
    owner: "Engineering",
    status: "new",
    priority: { frequency: 4, impact: 3, effort: 2 },
    screenshot_reference: `${SCREENSHOT_BASE}/admin-inbox-stale-awaiting-approval.png`,
    screenshot_caption: "Approved artists still listed as awaiting approval",
  },
  {
    finding_id: "HE-025",
    theme: "Money and settlements",
    title: "Budgeting labels future gigs as ended",
    screen_or_flow: "Admin · budgeting",
    user_task: "Settle gigs that have finished",
    primary_heuristic: "H01",
    description:
      "The Ended filter includes gigs that are still to come, each with an ended badge.",
    evidence: {
      observed_where: "/admin/budgeting",
      observed_behaviour:
        "Death To Our Friends on 21 Nov 2026 and LECKI LECKI on 28 Nov 2026 both sat under Ended.",
      expected_behaviour: "Status comes from the gig date. Future gigs show Upcoming and cannot be settled yet.",
    },
    user_impact: "An admin could settle a gig that has not happened.",
    severity: "medium",
    confidence: "high",
    recommendation:
      "Derive status from the gig date, or fix the job that sets it. Show Upcoming for future gigs and block settlement until the gig has ended.",
    owner: "Engineering",
    status: "new",
    priority: { frequency: 3, impact: 4, effort: 2 },
    screenshot_reference: `${SCREENSHOT_BASE}/admin-budgeting-future-gigs-ended.png`,
    screenshot_caption: "Future gigs listed under Ended",
  },
  {
    finding_id: "HE-026",
    theme: "Money and settlements",
    title: "Negative payouts appear with no explanation",
    screen_or_flow: "Admin and artist · settlements and gig dashboard",
    user_task: "Understand what an artist will be paid",
    primary_heuristic: "H02",
    secondary_heuristics: ["H01"],
    description:
      "Cancelled and unsold gigs show negative payouts as Statement Ready. Deductions use jargon with no plain explanation.",
    evidence: {
      observed_where: "/admin settlements and a gig dashboard",
      observed_behaviour:
        "Marley Raps showed -£161.97 with Statement Ready and the artist listed as Super Admin. On another gig, Est. Net Payout was -£60.75 in green before any tickets sold. Main Support Fee and GigPack sat with no explanation.",
      expected_behaviour:
        "Each deduction has a plain line next to it. Negative figures warn rather than look like a gain, and cancelled or future gigs are not Statement Ready.",
    },
    user_impact: "An artist opening their dashboard sees they owe money and has no idea why.",
    severity: "medium",
    confidence: "high",
    recommendation:
      "Explain each deduction in plain words with a link to the fee policy. Show negatives in a warning colour with a line about costs coming from ticket sales if that is the policy. Do not mark cancelled or future gigs as Statement Ready.",
    owner: "Product",
    status: "new",
    priority: { frequency: 3, impact: 4, effort: 3 },
    screenshot_reference: `${SCREENSHOT_BASE}/admin-settlements-negative-statement-ready.png`,
    screenshot_caption: "Negative settlement marked Statement Ready",
  },
  {
    finding_id: "HE-027",
    theme: "Access and discounts",
    title: "Access Control shows raw permission keys",
    screen_or_flow: "Super admin · access control",
    user_task: "Change what a role can do",
    primary_heuristic: "H02",
    secondary_heuristics: ["H05"],
    description:
      "Each toggle shows its code key twice with no description. One Save Changes button covers all seven role tabs with no confirmation.",
    evidence: {
      observed_where: "/admin/access-control, viewed only",
      observed_behaviour:
        "Keys such as view_pii appear over the same key again. Similar keys sit side by side with no plain names. Nothing shows what changed before save.",
      expected_behaviour:
        "Each permission has a plain name and a one-line description. Unsaved changes show per tab, with a confirmation that lists what will change.",
    },
    user_impact: "A wrong toggle could expose personal data or lock admins out.",
    severity: "medium",
    confidence: "high",
    recommendation:
      "Give each permission a plain name and a short description, and group them. Show unsaved changes per tab and ask for confirmation. Protect the super admin's own access from being switched off.",
    owner: "Design",
    status: "new",
    priority: { frequency: 2, impact: 5, effort: 3 },
    screenshot_reference: `${SCREENSHOT_BASE}/admin-access-control-raw-keys.png`,
    screenshot_caption: "Permission toggles labelled with raw keys",
  },
  {
    finding_id: "HE-028",
    theme: "Access and discounts",
    title: "Discounts cannot be deleted",
    screen_or_flow: "Admin · discounts",
    user_task: "Remove a discount that should no longer run",
    primary_heuristic: "H03",
    description:
      "Each discount has Download and Edit, but no delete or archive. Admins have started renaming codes as notes instead.",
    evidence: {
      observed_where: "/admin/vouchers",
      observed_behaviour:
        "Names such as IrishTourHowDoIDelete sit in the list. There is no delete call in the frontend. Old codes stay and may still work.",
      expected_behaviour: "Admins can archive a code so it stops working, with a way to bring it back.",
    },
    user_impact: "Old codes clutter the list and may still apply when they should not.",
    severity: "medium",
    confidence: "high",
    recommendation:
      "Add Archive, which stops the code and hides it from the main list, with an Archived filter to bring it back. Keep delete for codes that were never used.",
    owner: "Product",
    status: "new",
    priority: { frequency: 3, impact: 3, effort: 2 },
    screenshot_reference: `${SCREENSHOT_BASE}/admin-discounts-no-delete.png`,
    screenshot_caption: "Discount list with rename notes instead of delete",
  },
  {
    finding_id: "HE-029",
    theme: "Errors and empty states",
    title: "Errors are shown as empty states",
    screen_or_flow: "Any role · failed request",
    user_task: "Understand why a list did not load",
    primary_heuristic: "H09",
    description:
      "A refused or rate-limited request shows the same empty state as a real empty list, with a create button that invites duplicates.",
    evidence: {
      observed_where: "/artist/merchandise and /subscriptions",
      observed_behaviour:
        "Merchandise got a 403 and said No merchandise yet with Create Item. After a 429, subscriptions said No Subscriptions Found.",
      expected_behaviour:
        "Errors are handled apart from empty results, with a clear access or retry message.",
    },
    user_impact: "People think they have nothing when the real problem is access or a temporary fault.",
    severity: "medium",
    confidence: "high",
    recommendation:
      "For 403 say what access is needed. For 429 and server errors say the page could not load and offer Try again. Only show the empty state on a successful empty response.",
    owner: "Engineering",
    status: "new",
    priority: { frequency: 4, impact: 3, effort: 2 },
    screenshot_reference: `${SCREENSHOT_BASE}/error-shown-as-empty-state-merch.png`,
    screenshot_caption: "403 shown as an empty merchandise list",
  },
  {
    finding_id: "HE-030",
    theme: "Buying tickets",
    title: "Order page calls a voucher discount Early Bird Savings",
    screen_or_flow: "Fan · order details",
    user_task: "Read what was paid on an order",
    primary_heuristic: "H02",
    description:
      "A voucher that made an early-bird ticket free is labelled Early Bird Savings. The same £0.00 order still offers Request Refund.",
    evidence: {
      observed_where: "/orders/:id",
      observed_behaviour:
        "A £10 early-bird ticket made free by a 100% voucher showed Early Bird Savings -£10.00. Refund Status said Eligible with a Request Refund button.",
      expected_behaviour:
        "Each discount shows on its own line with its source. Refund is hidden when nothing was paid, or explained for a free ticket.",
    },
    user_impact: "The receipt is wrong, which matters for refunds and artist statements.",
    severity: "medium",
    confidence: "high",
    recommendation:
      "Show each discount on its own line with its source, such as the voucher code. Hide Request Refund when nothing was paid, or explain what a refund means for a free ticket.",
    owner: "Engineering",
    status: "new",
    priority: { frequency: 3, impact: 3, effort: 2 },
    screenshot_reference: `${SCREENSHOT_BASE}/order-voucher-labelled-early-bird.png`,
    screenshot_caption: "Voucher discount labelled as Early Bird Savings",
  },
  {
    finding_id: "HE-031",
    theme: "Venue schedule",
    title: "Venue schedule lists past slots as upcoming",
    screen_or_flow: "Venue manager · schedule",
    user_task: "See which slots are still free",
    primary_heuristic: "H01",
    secondary_heuristics: ["H05"],
    description:
      "Upcoming Slots starts with dates that are already past, marked Available. Hall names repeat the venue name.",
    evidence: {
      observed_where: "/venue/schedule, viewed as super admin",
      observed_behaviour:
        "25 Sept and 26 Sept 2026 sat under Upcoming as Available. Hall labels repeated The Rockin Chair. Delete Venue sat beside Edit on the venue page. A real venue manager may see only their own halls.",
      expected_behaviour:
        "Past slots leave Upcoming or move to a Past tab. Hall names only show when they differ from the venue. Delete sits in a danger area with a typed confirmation.",
    },
    user_impact: "Venue managers plan around slots that have already gone, and delete sits too close to edit.",
    severity: "medium",
    confidence: "medium",
    recommendation:
      "Hide past slots from Upcoming, or move them to a Past tab. Show the hall name only when it differs. Move Delete Venue into a danger area with a typed confirmation.",
    owner: "Design",
    status: "new",
    priority: { frequency: 3, impact: 3, effort: 2 },
    screenshot_reference: `${SCREENSHOT_BASE}/venue-schedule-past-slot-as-upcoming.png`,
    screenshot_caption: "Past dates listed under Upcoming Slots",
  },
  {
    finding_id: "HE-032",
    theme: "Admin dashboard",
    title: "User count differs between sidebar and page",
    screen_or_flow: "Admin · users",
    user_task: "Know how many accounts exist",
    primary_heuristic: "H04",
    description:
      "The sidebar and dashboard say one user total. The Users page says another, with no label for either.",
    evidence: {
      observed_where: "Admin sidebar and Users page",
      observed_behaviour:
        "The sidebar and dashboard said 181 users. The Users page said 191. One may count all accounts and the other only active ones, but neither says so.",
      expected_behaviour: "The same count everywhere, or each one labelled clearly.",
    },
    user_impact: "Admins cannot tell which number to trust when they brief or plan.",
    severity: "low",
    confidence: "medium",
    recommendation: "Use the same count, or label each one, for example 181 active of 191.",
    owner: "Engineering",
    status: "new",
    priority: { frequency: 3, impact: 1, effort: 1 },
    screenshot_reference: `${SCREENSHOT_BASE}/admin-dashboard-mock-trends.png`,
    screenshot_caption: "Sidebar user count on the admin dashboard",
  },
  {
    finding_id: "HE-033",
    theme: "Approvals and notifications",
    title: "Gig support page silently redirects admins",
    screen_or_flow: "Admin · gig support",
    user_task: "Open a gig's support page from Gig Support",
    primary_heuristic: "H01",
    description:
      "Anyone who is not the organiser is sent to the public gig page, admins included, with no message.",
    evidence: {
      observed_where: "/gigs/:id/support",
      observed_behaviour:
        "The page redirects before it renders. There was no screenshot because nothing stayed on screen long enough to capture.",
      expected_behaviour: "Admins can view the page read-only, or see a short message explaining the redirect.",
    },
    user_impact: "The link from Gig Support looks broken to the people who need it most.",
    severity: "low",
    confidence: "high",
    recommendation: "Let admins view the page read-only, or explain the redirect with a short message.",
    owner: "Engineering",
    status: "new",
    priority: { frequency: 2, impact: 2, effort: 1 },
  },
];

const findings: TaskFlowFinding[] = [...signedOutFindings, ...signedInFindings];

export const offAxisTaskFlowsEvaluation: HeuristicEvaluation = {
  slug: "off-axis-task-flows",
  title: "Off Axis heuristic evaluation · Part 4",
  client: "Off Axis · Task flows across fan, artist and venue roles",
  accent: "#A855F7",
  executiveSummary: {
    whatWasEvaluated:
      "Part 4 of the Off Axis review. Every signed-out task flow on the live site, plus signed-in admin, artist, venue, scanner and order screens tested read-only as a super admin, on desktop and mobile.",
    usabilityHealth:
      "Buying and browsing work, but the routes around them leak. Signed out, pending artists and guest buyers hit dead ends. Signed in, the scanner, onboarding and admin numbers can still send people the wrong way.",
    topIssues: [
      "Pending artists can only sign out",
      "The scanner defaults to the wrong gig",
      "Active accounts can open onboarding and lock themselves pending",
      "Admin dashboard trends and health are made up",
      "Account pages show empty data instead of asking people to sign in",
    ],
    mainRisks: [
      "Door staff scan the wrong gig or cannot scan at all",
      "An approved account can lock itself onto the pending page",
      "Admins act on fake trends, stale inbox items or the wrong settlement status",
      "Guest buyers think their tickets are lost, and late fees risk UK drip pricing rules",
    ],
    recommendedNextSteps: [
      "Fix the scanner gig list and default, and block onboarding for anyone already approved",
      "Replace mock admin trends and health, and use one approval count from one source",
      "Add a sign-in redirect that returns people to the page they asked for",
      "Show the full ticket price, fee included, from the first card",
    ],
  },
  scope: {
    evaluatedUrl: "https://offaxistours.com/",
    evaluationDate: "2026-11-16",
    evaluator: "Shaun Leishman",
    userGroups: [
      "Fans and guest buyers",
      "Artists",
      "Venue managers",
      "Admins and door staff",
      "Visitors on mobile",
    ],
    tasksEvaluated: [
      "Land on the homepage and browse gigs and artists",
      "Search gigs by city and add tickets to the basket",
      "Check out as a guest, up to the payment step",
      "Sign in, register and reach Unlimited while signed out",
      "Open account pages and the pending approval page while signed out",
      "Open the scanner, onboarding, admin panel, settlements, discounts, venue schedule and an order while signed in",
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
      "Signed-in testing used one super admin account read-only. Other-role screens were opened with that account, not as each role.",
      "Pending artist, fan, gig manager and check-in assistant still need their own logins for a few provisional items.",
      "Nothing was written to production. Approvals, refunds, scans, payouts and settings were not submitted.",
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
    { priority: "fix_now", action: "List the right gigs on the scanner, skip cancelled ones, and default to tonight" },
    { priority: "fix_now", action: "Block onboarding for anyone who is not still in onboarding status" },
    { priority: "fix_now", action: "Redirect signed-out visitors to sign in and return them to the page they asked for" },
    { priority: "fix_now", action: "Show the full ticket price, booking fee included, on cards and gig pages" },
    { priority: "fix_next", action: "Replace mock admin trends and health, and use one approval count everywhere" },
    { priority: "fix_next", action: "Clear or update inbox items when an approval is decided" },
    { priority: "fix_next", action: "Explain deductions on payouts and stop marking future or cancelled gigs as Statement Ready" },
    { priority: "monitor", action: "Settle one name each for sign in, tickets and orders" },
    { priority: "validate", action: "Retest as pending artist, fan, gig manager and check-in assistant once those logins exist" },
  ],
};
