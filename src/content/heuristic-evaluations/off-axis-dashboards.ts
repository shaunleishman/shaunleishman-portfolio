import type { HeuristicEvaluation, HeuristicFinding } from "./types";
import { countSeverity } from "./types";

/**
 * Second Off Axis review. Artist account and super-admin dashboard flows.
 * Text-only. No screenshots or interactive redesign mock.
 */
const findings: HeuristicFinding[] = [
  {
    finding_id: "HE-001",
    title: "Cover hover also lights the profile photo",
    screen_or_flow: "Artist profile",
    user_task: "Change cover or profile image",
    primary_heuristic: "H04" as const,
    secondary_heuristics: ["H03" as const],
    description:
      "Hovering the cover change prompt also activates the profile picture hover. That is not how most products treat separate controls.",
    evidence: {
      observed_where: "Artist profile header",
      observed_behaviour:
        "The cover change prompt hover state spills onto the profile photo, so both feel active at once.",
      expected_behaviour:
        "Only the control under the pointer shows a hover state. Cover and avatar stay independent.",
    },
    user_impact: "People may think both images will change, or that the UI is glitchy.",
    severity: "low" as const,
    confidence: "high" as const,
    recommendation:
      "Scope hover and focus styles to the control being hovered. Keep cover and avatar as separate hit targets.",
    owner: "Design" as const,
    status: "new" as const,
    priority: { frequency: 3 as const, impact: 2 as const, effort: 1 as const },
  },
  {
    finding_id: "HE-002",
    title: "Profile tabs wrap onto a second line",
    screen_or_flow: "Artist and admin profile",
    user_task: "Move between profile sections",
    primary_heuristic: "H04" as const,
    secondary_heuristics: ["H08" as const],
    additional_lenses: ["L05" as const],
    description:
      "Details, Activity, Transactions, Referrals, and Security wrap onto two lines on desktop. Product tabs usually stay on one row.",
    evidence: {
      observed_where: "Profile tab bar",
      observed_behaviour:
        "Security drops to a second line while the other tabs stay above. On smaller widths the same set can sit on one line after scaling.",
      expected_behaviour:
        "Tabs stay on one line, or move to a left vertical list when there are too many for a single row.",
    },
    user_impact: "The second line looks broken and makes the active section harder to scan.",
    severity: "medium" as const,
    confidence: "high" as const,
    recommendation:
      "Condense labels so the set fits one line on common desktop widths, or use a left vertical tab list beside the content.",
    owner: "Design" as const,
    status: "new" as const,
    priority: { frequency: 4 as const, impact: 3 as const, effort: 2 as const },
  },
  {
    finding_id: "HE-003",
    title: "Email verification looks like a profile field",
    screen_or_flow: "Profile · email verification",
    user_task: "Understand account verification status",
    primary_heuristic: "H02" as const,
    secondary_heuristics: ["H01" as const, "H06" as const],
    description:
      "Email verification manager sits in the profile like a normal settings block. If verification is a link in email, or a manual admin check, this layout sends the wrong message.",
    evidence: {
      observed_where: "Profile details",
      observed_behaviour:
        "Email address and verification status appear as an integrated section next to other editable profile fields.",
      expected_behaviour:
        "If the user must click a link in email, remind them with a warning banner and a resend action. If an admin must verify the account, label it as account verification, not email verification.",
    },
    user_impact: "Artists and admins do not know what to do next, or why the block is there.",
    severity: "medium" as const,
    confidence: "medium" as const,
    recommendation:
      "Replace the embedded block with a clear status warning and a single action, or rename and explain account verification if a human review is required.",
    owner: "Product" as const,
    status: "new" as const,
    priority: { frequency: 3 as const, impact: 3 as const, effort: 2 as const },
  },
  {
    finding_id: "HE-004",
    title: "Hometown asks for more than the form needs",
    screen_or_flow: "Artist profile · information",
    user_task: "Describe where the band is based",
    primary_heuristic: "H08" as const,
    secondary_heuristics: ["H02" as const],
    description:
      "Hometown sits beside city with no clear job. City or town is enough for most music products.",
    evidence: {
      observed_where: "Profile information",
      observed_behaviour: "Hometown and city both appear as fields with no explanation of the difference.",
      expected_behaviour: "One place field labelled city or town.",
    },
    user_impact: "Extra typing and doubt about which field matters for discovery.",
    severity: "low" as const,
    confidence: "high" as const,
    recommendation: "Drop hometown. Keep a single city or town field.",
    owner: "Product" as const,
    status: "new" as const,
    priority: { frequency: 2 as const, impact: 2 as const, effort: 1 as const },
  },
  {
    finding_id: "HE-005",
    title: "Genre controls feel duplicated",
    screen_or_flow: "Artist profile · genre",
    user_task: "Describe the band sound",
    primary_heuristic: "H08" as const,
    secondary_heuristics: ["H06" as const, "H02" as const],
    description:
      "Genre pills sit beside an input at the same time, so the UI looks like two ways to do one job. Mood and primary versus secondary genre are missing.",
    evidence: {
      observed_where: "Genre section",
      observed_behaviour:
        "Selected pills and an input share the same area with no clear hierarchy. There is no mood layer and no primary or secondary genre split.",
      expected_behaviour:
        "Pills alone for selection. Primary genre, secondary genre, and mood tags, closer to how artists pitch sound elsewhere.",
    },
    user_impact: "Artists struggle to describe the band cleanly, and the form looks unfinished.",
    severity: "medium" as const,
    confidence: "high" as const,
    recommendation:
      "Show selectable genre pills without a parallel free input. Add primary and secondary genre plus mood tags.",
    owner: "Design" as const,
    status: "new" as const,
    priority: { frequency: 4 as const, impact: 3 as const, effort: 3 as const },
  },
  {
    finding_id: "HE-006",
    title: "Social links and lead contact share one block",
    screen_or_flow: "Artist profile · details",
    user_task: "Update public links and private contact",
    primary_heuristic: "H08" as const,
    secondary_heuristics: ["H02" as const],
    description:
      "Social links run straight into lead contact with no visual break. Public links and private contact are different jobs.",
    evidence: {
      observed_where: "Between social links and lead contact",
      observed_behaviour: "No section heading or divider separates the two groups.",
      expected_behaviour: "Lead contact sits in its own section with a clear heading.",
    },
    user_impact: "People may treat private contact as public, or miss that the fields do different jobs.",
    severity: "low" as const,
    confidence: "high" as const,
    recommendation: "Split lead contact into its own section under social links.",
    owner: "Design" as const,
    status: "new" as const,
    priority: { frequency: 3 as const, impact: 2 as const, effort: 1 as const },
  },
  {
    finding_id: "HE-007",
    title: "Activity rows are spaced too far apart",
    screen_or_flow: "Artist profile · activity",
    user_task: "Scan recent activity",
    primary_heuristic: "H08" as const,
    description:
      "Activity cards leave a wide gap between rows, so a short list feels sparse and hard to scan as one list.",
    evidence: {
      observed_where: "Activity tab list",
      observed_behaviour: "Row cards sit with large vertical gaps between them.",
      expected_behaviour: "Tight list spacing, around eight pixels between cards.",
    },
    user_impact: "The feed looks unfinished and takes more scrolling than it needs.",
    severity: "low" as const,
    confidence: "high" as const,
    recommendation: "Tighten activity card spacing to a compact list rhythm.",
    owner: "Design" as const,
    status: "new" as const,
    priority: { frequency: 3 as const, impact: 1 as const, effort: 1 as const },
  },
  {
    finding_id: "HE-008",
    title: "Transaction cards do not match activity cards",
    screen_or_flow: "Artist profile · transactions",
    user_task: "Review transaction history",
    primary_heuristic: "H04" as const,
    secondary_heuristics: ["H08" as const],
    description:
      "Transaction cards use a different layout and a divider that attaches oddly to the ticket purchase card. Activity and transactions should share one list pattern.",
    evidence: {
      observed_where: "Transactions tab",
      observed_behaviour:
        "Card sizes and dividers differ from the Activity tab, so two history lists feel like two products.",
      expected_behaviour: "One shared history card component for activity and transactions.",
    },
    user_impact: "Inconsistency raises doubt and doubles design and build effort when either list changes.",
    severity: "medium" as const,
    confidence: "high" as const,
    recommendation:
      "Reuse the activity list component for transactions, with only the fields that differ.",
    owner: "Design" as const,
    status: "new" as const,
    priority: { frequency: 3 as const, impact: 3 as const, effort: 2 as const },
  },
  {
    finding_id: "HE-009",
    title: "Artist referrals hide pending status and the reward",
    screen_or_flow: "Artist profile · referrals",
    user_task: "Invite artists and claim rewards",
    primary_heuristic: "H01" as const,
    secondary_heuristics: ["H10" as const, "H06" as const],
    description:
      "On the artist profile Referrals tab, invite copy is clear, but the section does not show pending referrals, what qualifies, or how redemption works. Manual claim adds jargon when automatic credit would do.",
    evidence: {
      observed_where: "Artist profile · Referrals tab",
      observed_behaviour:
        "Claim referral appears without a clear count of pending or completed referrals, and without a plain reward explanation.",
      expected_behaviour:
        "Show pending and completed referrals, state the reward, and credit automatically when a referred artist qualifies.",
    },
    user_impact: "Artists do not know if invites worked or what they earn for referring another band.",
    severity: "high" as const,
    confidence: "medium" as const,
    recommendation:
      "Add pending and completed counts on the Referrals tab, spell out the reward in one line, and auto-credit when criteria are met.",
    owner: "Product" as const,
    status: "new" as const,
    priority: { frequency: 3 as const, impact: 4 as const, effort: 3 as const },
  },
  {
    finding_id: "HE-010",
    title: "Order details button fights the accordion",
    screen_or_flow: "My orders",
    user_task: "Inspect an order",
    primary_heuristic: "H03" as const,
    secondary_heuristics: ["H04" as const],
    description:
      "On My orders, the accordion already opens the order, but an Order details control sends people somewhere else for the same job. That second path adds effort with no gain. The full line-item breakdown should live inside the accordion.",
    evidence: {
      observed_where: "My orders list",
      observed_behaviour:
        "Accordion and Order details both claim to reveal the order. Order details takes the user away instead of expanding the row in place.",
      expected_behaviour:
        "Order details only toggles the accordion. The expanded accordion shows the full order breakdown. There is no separate details destination.",
    },
    user_impact: "Extra clicks and confusion about where the real order lives.",
    severity: "medium" as const,
    confidence: "high" as const,
    recommendation:
      "Drop the separate Order details journey. Use one control to expand the accordion and put the full breakdown there.",
    owner: "Design" as const,
    status: "new" as const,
    priority: { frequency: 4 as const, impact: 3 as const, effort: 2 as const },
  },
  {
    finding_id: "HE-011",
    title: "Receipt download never finishes",
    screen_or_flow: "My orders",
    user_task: "Download a receipt",
    primary_heuristic: "H01" as const,
    secondary_heuristics: ["H09" as const],
    description:
      "On My orders, the receipt download stays on Preparing your download and never completes. That is a functional bug with no recovery path.",
    evidence: {
      observed_where: "My orders · receipt download",
      observed_behaviour: "The preparing state starts and never ends. No file arrives and no error shows.",
      expected_behaviour:
        "Download completes, or the UI shows a clear failure with a retry path.",
    },
    user_impact: "Artists cannot get proof of purchase when they need it.",
    severity: "critical" as const,
    confidence: "high" as const,
    recommendation:
      "Fix the receipt download pipeline. Add a timeout, an error message, and a retry control if the file fails.",
    owner: "Engineering" as const,
    status: "new" as const,
    priority: { frequency: 4 as const, impact: 5 as const, effort: 3 as const },
  },
  {
    finding_id: "HE-012",
    title: "Artist dashboard ticket total has no scope",
    screen_or_flow: "Artist dashboard",
    user_task: "Understand performance at a glance",
    primary_heuristic: "H01" as const,
    secondary_heuristics: ["H06" as const],
    description:
      "On the artist dashboard, ticket sales appear as a headline number with no scope. It is unclear whether the figure covers every gig on Off Axis or only the next show.",
    evidence: {
      observed_where: "Artist dashboard overview",
      observed_behaviour: "A ticket sales total sits as a primary metric without a date range or gig scope.",
      expected_behaviour:
        "Lead with gigs played on Off Axis, with headlining versus support counts. Put tickets sold on each gig card.",
    },
    user_impact: "Artists cannot tell if the number is lifetime, recent, or for one upcoming gig.",
    severity: "medium" as const,
    confidence: "high" as const,
    recommendation:
      "Replace the orphan ticket total with gig counts and role breakdown. Keep tickets sold on individual gig cards.",
    owner: "Product" as const,
    status: "new" as const,
    priority: { frequency: 4 as const, impact: 3 as const, effort: 3 as const },
  },
  {
    finding_id: "HE-013",
    title: "Credit history shows balance on every row",
    screen_or_flow: "Artist dashboard · credits",
    user_task: "Review earned credits",
    primary_heuristic: "H08" as const,
    secondary_heuristics: ["H01" as const],
    description:
      "Credit history rows miss band, venue, and date detail, while repeating a balance that belongs at the top of the card, not on every line.",
    evidence: {
      observed_where: "Credits balance and history",
      observed_behaviour:
        "History rows surface balance again. Band, venue, date, and amount per earn are weak or missing.",
      expected_behaviour:
        "One balance at the top. Each history row shows band, venue, date, and credit amount.",
    },
    user_impact: "Spending and earning become hard to audit when the running total sits on every row.",
    severity: "medium" as const,
    confidence: "high" as const,
    recommendation:
      "Keep a single balance on the summary card. Enrich history rows with band, venue, date, and amount only.",
    owner: "Design" as const,
    status: "new" as const,
    priority: { frequency: 3 as const, impact: 3 as const, effort: 2 as const },
  },
  {
    finding_id: "HE-014",
    title: "Merchandise links to one gig only",
    screen_or_flow: "Artist dashboard · merchandise",
    user_task: "Set up merch for upcoming shows",
    primary_heuristic: "H02" as const,
    secondary_heuristics: ["H07" as const],
    description:
      "Creating a merch item asks the artist to link it to a single gig. Bands usually need the same stock across the run of shows.",
    evidence: {
      observed_where: "Create merchandise item",
      observed_behaviour: "The flow forces a link to one gig.",
      expected_behaviour:
        "Link merch to all relevant gigs, or to the tour, so stock planning covers the full set of dates.",
    },
    user_impact: "Artists cannot plan how many shirts to bring across several shows.",
    severity: "medium" as const,
    confidence: "high" as const,
    recommendation:
      "Allow merch to attach to multiple gigs, with a clear default of all upcoming dates.",
    owner: "Product" as const,
    status: "new" as const,
    priority: { frequency: 3 as const, impact: 3 as const, effort: 3 as const },
  },
  {
    finding_id: "HE-015",
    title: "Venue picker has no search",
    screen_or_flow: "Create a gig",
    user_task: "Choose a venue",
    primary_heuristic: "H07" as const,
    secondary_heuristics: ["H06" as const],
    description:
      "Select a venue is a long list with no search. As the catalogue grows, browsing alone will not scale.",
    evidence: {
      observed_where: "Create a gig · venue selection",
      observed_behaviour: "Venues appear as a list or grid without a search field.",
      expected_behaviour: "A search field filters venues by name as the list grows.",
    },
    user_impact: "Artists waste time hunting for a known venue.",
    severity: "medium" as const,
    confidence: "high" as const,
    recommendation: "Add venue search above the list before the catalogue gets long.",
    owner: "Design" as const,
    status: "new" as const,
    priority: { frequency: 4 as const, impact: 3 as const, effort: 2 as const },
  },
  {
    finding_id: "HE-016",
    title: "Artist support inbox and find support sit apart",
    screen_or_flow: "Artist support flows",
    user_task: "Fill a bill or respond to invites",
    primary_heuristic: "H02" as const,
    secondary_heuristics: ["H06" as const, "H04" as const],
    description:
      "In the artist account, support inbox and find support slots are separate destinations for one job family. Invitations received and finding support should live together, with genre fit in mind.",
    evidence: {
      observed_where: "Artist account navigation",
      observed_behaviour:
        "Support inbox and find support appear as separate top-level items. Genre match between headliner and support is not part of the find flow story.",
      expected_behaviour:
        "One Support area with Invitations and Find support. Help artists see genre fit so crowds match the bill.",
    },
    user_impact:
      "Artists miss invites or book mismatched support, which wastes a slot in front of the wrong crowd.",
    severity: "high" as const,
    confidence: "medium" as const,
    recommendation:
      "Merge into one Support section with Invitations and Find support tabs. Surface genre fit in search and invites.",
    owner: "Product" as const,
    status: "new" as const,
    priority: { frequency: 4 as const, impact: 4 as const, effort: 4 as const },
  },
  {
    finding_id: "HE-017",
    title: "Admin quick actions repeat the side nav",
    screen_or_flow: "Admin dashboard",
    user_task: "Jump to common admin work",
    primary_heuristic: "H08" as const,
    secondary_heuristics: ["H04" as const],
    description:
      "Quick actions open the same destinations as the left nav. They add surface area without a new job.",
    evidence: {
      observed_where: "Admin dashboard · quick actions",
      observed_behaviour:
        "Manage users and moderate gigs duplicate sidebar links with no extra context.",
      expected_behaviour:
        "Overview cards carry counts and deep-link into pending work, such as pending gig proposals.",
    },
    user_impact: "Noise on the home view with no faster path than the nav.",
    severity: "medium" as const,
    confidence: "high" as const,
    recommendation:
      "Drop duplicate quick actions. Make summary cards clickable, including a pending proposals count.",
    owner: "Design" as const,
    status: "new" as const,
    priority: { frequency: 3 as const, impact: 2 as const, effort: 2 as const },
  },
  {
    finding_id: "HE-018",
    title: "Venue language drifts between hall, venue, and space",
    screen_or_flow: "Admin · venue management",
    user_task: "Add or approve venues",
    primary_heuristic: "H04" as const,
    secondary_heuristics: ["H02" as const],
    description:
      "Admin copy mixes venue, hall, and space. Schedule management under venue approvals is ambiguous, and Add new hall puts fields before a clear action.",
    evidence: {
      observed_where: "Venue approvals and add hall",
      observed_behaviour:
        "Section titles and buttons switch between venue, hall, and space. Inputs appear before a clear Add new venue action.",
      expected_behaviour:
        "One word, venue, everywhere. Clear Add new venue action, then fields. Rename schedule management to match venue management.",
    },
    user_impact: "Admins hesitate on what they are approving and which label is correct.",
    severity: "medium" as const,
    confidence: "high" as const,
    recommendation:
      "Standardise on venue. Rename the section and the add action. Put the primary button before or clearly above the form fields.",
    owner: "Content" as const,
    status: "new" as const,
    priority: { frequency: 3 as const, impact: 3 as const, effort: 2 as const },
  },
  {
    finding_id: "HE-019",
    title: "User growth chart lacks period control",
    screen_or_flow: "Admin dashboard · charts",
    user_task: "Judge growth over time",
    primary_heuristic: "H07" as const,
    secondary_heuristics: ["H01" as const, "H06" as const],
    description:
      "User growth uses a bar chart with a fixed recent window and a crowded x-axis. A line chart with period filters would show change over time more clearly.",
    evidence: {
      observed_where: "User growth and revenue overview",
      observed_behaviour:
        "Bars for a short window. No 24h, 7d, 28d, or 12m control. Axis labels crowd the middle. Revenue series colour has no key.",
      expected_behaviour:
        "Line chart with period filters. Start and end dates on the axis, detail on hover. A legend for revenue series.",
    },
    user_impact: "Admins cannot answer simple growth questions without guessing the window.",
    severity: "medium" as const,
    confidence: "high" as const,
    recommendation:
      "Switch user growth to a line chart. Add period filters. Simplify axis labels and add a chart legend.",
    owner: "Design" as const,
    status: "new" as const,
    priority: { frequency: 3 as const, impact: 3 as const, effort: 3 as const },
  },
  {
    finding_id: "HE-020",
    title: "Create user input field placeholders sound personal",
    screen_or_flow: "Admin · user management",
    user_task: "Create a user",
    primary_heuristic: "H02" as const,
    description:
      "On the create user form, name field placeholders sound like the admin typing their own name, not an example person.",
    evidence: {
      observed_where: "Admin · create user form",
      observed_behaviour: "Placeholders read like your name rather than an example such as John.",
      expected_behaviour: "Neutral examples like First name, for example John.",
    },
    user_impact: "Small friction and a less polished admin form.",
    severity: "low" as const,
    confidence: "high" as const,
    recommendation: "Use example placeholders that clearly stand in for someone else.",
    owner: "Content" as const,
    status: "new" as const,
    priority: { frequency: 2 as const, impact: 1 as const, effort: 1 as const },
  },
  {
    finding_id: "HE-021",
    title: "Artist rows hide behind a kebab menu (dotted menu)",
    screen_or_flow: "Admin · artist management",
    user_task: "Open an artist record",
    primary_heuristic: "H07" as const,
    secondary_heuristics: ["H03" as const],
    description:
      "View details lives in a kebab menu (the dotted menu button). Rows and names are not clickable. Search and a main genre column are missing for promoter-style filtering.",
    evidence: {
      observed_where: "Admin · artist management table",
      observed_behaviour:
        "Opening a record needs the dotted menu button. There is no search and no genre tag column.",
      expected_behaviour:
        "Click the row or name to open details. Add search and a primary genre column for filter and scan.",
    },
    user_impact: "Slow lookups when building bills or playlists by genre.",
    severity: "medium" as const,
    confidence: "high" as const,
    recommendation:
      "Make rows clickable. Add search and a primary genre column. Keep the dotted menu for secondary actions only.",
    owner: "Design" as const,
    status: "new" as const,
    priority: { frequency: 4 as const, impact: 3 as const, effort: 2 as const },
  },
  {
    finding_id: "HE-022",
    title: "Total balance wording fights itself",
    screen_or_flow: "Admin · artist management",
    user_task: "Read collective artist credits",
    primary_heuristic: "H02" as const,
    description:
      "The summary says total balance in a place that reads like a personal wallet, while the idea is a combined artist credit total.",
    evidence: {
      observed_where: "Artist management summary",
      observed_behaviour: "Total balance and combined balance language sit without a clear owner.",
      expected_behaviour:
        "Title Collective balance with subtext for combined artist credits.",
    },
    user_impact: "Admins misread whose money or credits the number represents.",
    severity: "low" as const,
    confidence: "high" as const,
    recommendation: "Rename to Collective balance and clarify combined artist credits in the subtext.",
    owner: "Content" as const,
    status: "new" as const,
    priority: { frequency: 2 as const, impact: 2 as const, effort: 1 as const },
  },
  {
    finding_id: "HE-023",
    title: "Approved venue status is ambiguous",
    screen_or_flow: "Admin · venue management",
    user_task: "Know what approved means",
    primary_heuristic: "H02" as const,
    secondary_heuristics: ["H01" as const],
    description:
      "Approved could mean the venue agreed to use Off Axis, or that an admin checked the record. The table does not say which.",
    evidence: {
      observed_where: "Venue management status",
      observed_behaviour: "Approved appears without a definition or secondary state.",
      expected_behaviour:
        "Separate admin-verified from venue-confirmed, or explain Approved in plain helper text.",
    },
    user_impact: "Wrong assumptions about which venues are live partners.",
    severity: "medium" as const,
    confidence: "medium" as const,
    recommendation:
      "Define Approved in UI copy, or split into Verified by admin and Confirmed by venue.",
    owner: "Product" as const,
    status: "new" as const,
    priority: { frequency: 3 as const, impact: 3 as const, effort: 2 as const },
  },
  {
    finding_id: "HE-024",
    title: "Subscriptions are hard to reach from users",
    screen_or_flow: "Admin · subscriptions and users",
    user_task: "Find and manage a subscription",
    primary_heuristic: "H07" as const,
    secondary_heuristics: ["H04" as const],
    description:
      "Subscriptions exist as a page, but cancel and view paths feel incomplete. User management does not show who is subscribed at a glance.",
    evidence: {
      observed_where: "Subscriptions table and user management",
      observed_behaviour:
        "Actions on the only visible subscription do not include cancel. User rows lack a subscribed cue.",
      expected_behaviour:
        "A subscribed marker on the user row, with View subscription into the detail page, plus cancel where policy allows.",
    },
    user_impact: "Admins bounce between pages without a clear status story.",
    severity: "medium" as const,
    confidence: "medium" as const,
    recommendation:
      "Keep the subscriptions page. Add a subscribed indicator on user rows and a View subscription action.",
    owner: "Product" as const,
    status: "new" as const,
    priority: { frequency: 3 as const, impact: 3 as const, effort: 3 as const },
  },
  {
    finding_id: "HE-025",
    title: "Support status cards do not filter the list",
    screen_or_flow: "Admin · gig support",
    user_task: "Triage pending invites and applications",
    primary_heuristic: "H07" as const,
    secondary_heuristics: ["H03" as const],
    description:
      "Top cards show totals for pending, accepted invitations, and applications, but clicking them does not filter the list.",
    evidence: {
      observed_where: "Gig support overview cards",
      observed_behaviour: "Status cards are display-only. The list below stays unfiltered.",
      expected_behaviour:
        "Selecting a status card highlights it and filters the list to that state.",
    },
    user_impact: "Admins cannot jump into the queue that needs attention.",
    severity: "medium" as const,
    confidence: "high" as const,
    recommendation: "Make status cards toggle filters on the support list.",
    owner: "Design" as const,
    status: "new" as const,
    priority: { frequency: 4 as const, impact: 3 as const, effort: 2 as const },
  },
  {
    finding_id: "HE-026",
    title: "Onboarding section purpose is unclear",
    screen_or_flow: "Admin · onboarding",
    user_task: "Understand what to do in onboarding",
    primary_heuristic: "H10" as const,
    secondary_heuristics: ["H02" as const],
    description:
      "The onboarding area does not explain whether it is email, checklist, or product tour content. Onboarding usually lives in the product, not as a free-floating admin construct.",
    evidence: {
      observed_where: "Admin onboarding section",
      observed_behaviour: "The section gives little cue about audience, channel, or outcome.",
      expected_behaviour:
        "A clear purpose statement, or move onboarding into in-product flows with admin only monitoring completion.",
    },
    user_impact: "Admins may ignore the section or misuse it.",
    severity: "medium" as const,
    confidence: "medium" as const,
    recommendation:
      "Document the job of the section in the UI, or replace it with completion metrics for in-product onboarding.",
    owner: "Product" as const,
    status: "new" as const,
    priority: { frequency: 2 as const, impact: 3 as const, effort: 3 as const },
  },
  {
    finding_id: "HE-027",
    title: "Gig status and actions duplicate each other",
    screen_or_flow: "Admin · all gigs",
    user_task: "Change event status",
    primary_heuristic: "H08" as const,
    secondary_heuristics: ["H04" as const],
    description:
      "Status and Actions both appear when changing status is the main action. A status dropdown would cover the job without two columns.",
    evidence: {
      observed_where: "All gigs table",
      observed_behaviour:
        "Draft, ready for publishing, published, cancelled, and ended sit beside a separate actions column that mainly changes status.",
      expected_behaviour: "One Status column with a dropdown for allowed transitions.",
    },
    user_impact: "Extra chrome and slower scanning for no extra capability.",
    severity: "low" as const,
    confidence: "high" as const,
    recommendation: "Collapse status changes into a single Status dropdown column.",
    owner: "Design" as const,
    status: "new" as const,
    priority: { frequency: 3 as const, impact: 2 as const, effort: 2 as const },
  },
];

export const offAxisDashboardsEvaluation: HeuristicEvaluation = {
  slug: "off-axis-dashboards",
  title: "Off Axis heuristic evaluation · Part 2",
  client: "Off Axis · Artist and admin dashboards",
  accent: "#A855F7",
  executiveSummary: {
    whatWasEvaluated:
      "Part 2 of the Off Axis review. Logged-in artist account flows and the super-admin dashboard, reviewed on desktop from a Glasgow test artist account and a super-admin account.",
    usabilityHealth:
      "The admin side is more developed than the artist side, with more features and functionality in place. Both still share concrete consistency gaps, including profile tabs that wrap, activity and transaction cards that use different list patterns, and venue copy that mixes hall, venue, and space. The sharpest risk is a stuck receipt download on My orders. On the artist profile Referrals tab, pending status and the reward stay unclear. Support inbox and find support sit apart in the artist nav, and the artist dashboard ticket total has no time or gig scope.",
    topIssues: [
      "My orders receipt download never finishes",
      "Artist profile referrals hide pending status and the reward",
      "Artist support inbox and find support sit apart",
      "Profile tabs wrap onto a second line",
      "Artist dashboard ticket total has no time or gig scope",
    ],
    mainRisks: [
      "Artists cannot retrieve a receipt when the download hangs on My orders",
      "Support booking and referrals lose trust without status and genre fit",
      "Admin triage stays slow while cards and nav duplicate work",
    ],
    recommendedNextSteps: [
      "Fix the My orders receipt download and add a failure path",
      "Clarify artist referrals with pending counts and automatic credit",
      "Merge support inbox and find support, and surface genre fit",
      "Tighten profile tabs and shared list components",
    ],
  },
  scope: {
    evaluatedUrl: "https://offaxistours.com/",
    evaluationDate: "2026-08-06",
    evaluator: "Shaun Leishman",
    userGroups: ["Artists", "Super admins"],
    tasksEvaluated: [
      "Edit artist profile, activity, transactions, referrals, and security",
      "Review orders and download a receipt",
      "Use the artist dashboard, credits, merchandise, and create a gig",
      "Navigate support inbox and find support",
      "Use the admin dashboard, users, artists, venues, subscriptions, support, onboarding, and all gigs",
    ],
    heuristicsUsed: [
      "H01 Visibility of system status",
      "H02 Match between system and the real world",
      "H03 User control and freedom",
      "H04 Consistency and standards",
      "H06 Recognition rather than recall",
      "H07 Flexibility and efficiency of use",
      "H08 Aesthetic and minimalist design",
      "H09 Help users recognise, diagnose and recover from errors",
      "H10 Help and documentation",
    ],
    additionalLenses: ["L05 Responsive and layout behaviour"],
    limitations: [
      "Desktop review only from supplied test accounts",
      "No screenshots or interactive redesign in this write-up",
      "Findings follow observed behaviour in session notes, not analytics",
    ],
    timeSpent: "Around 8 hours across review and write-up",
  },
  severitySummary: countSeverity(findings),
  themes: [
    {
      label: "Artist profile and account",
      findingIds: ["HE-001", "HE-002", "HE-003", "HE-004", "HE-005", "HE-006", "HE-007", "HE-008", "HE-009"],
    },
    {
      label: "Orders and artist dashboard",
      findingIds: ["HE-010", "HE-011", "HE-012", "HE-013", "HE-014", "HE-015", "HE-016"],
    },
    {
      label: "Admin dashboard and operations",
      findingIds: [
        "HE-017",
        "HE-018",
        "HE-019",
        "HE-020",
        "HE-021",
        "HE-022",
        "HE-023",
        "HE-024",
        "HE-025",
        "HE-026",
        "HE-027",
      ],
    },
  ],
  findings,
  actionPlan: [
    { priority: "fix_now", action: "Fix My orders receipt download, with timeout and retry" },
    { priority: "fix_now", action: "Show referral pending and completed state on the artist Referrals tab, and auto-credit rewards" },
    { priority: "fix_now", action: "Merge support inbox and find support into one section" },
    { priority: "fix_next", action: "Keep profile tabs on one line or move them to a left rail" },
    { priority: "fix_next", action: "Share one history card pattern across activity and transactions" },
    { priority: "fix_next", action: "Replace the artist dashboard orphan ticket total with gig counts and per-gig sales" },
    { priority: "fix_next", action: "Standardise venue language and clickable admin summary cards" },
    { priority: "monitor", action: "Watch merch multi-gig linking after the model change" },
    { priority: "validate", action: "Test support genre-fit messaging with a small artist set" },
  ],
};
