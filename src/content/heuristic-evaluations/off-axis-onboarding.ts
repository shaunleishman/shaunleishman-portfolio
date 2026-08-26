import type { HeuristicEvaluation, HeuristicFinding } from "./types";
import { countSeverity } from "./types";

/**
 * Third Off Axis review. Artist signup, first gig, venues, and support invites.
 * Text-only. No screenshots or interactive redesign mock.
 */
const findings: HeuristicFinding[] = [
  {
    finding_id: "HE-001",
    title: "Profile avatar is mandatory at signup",
    screen_or_flow: "Artist signup · profile setup",
    user_task: "Finish creating an artist account",
    primary_heuristic: "H08" as const,
    secondary_heuristics: ["H02" as const],
    description:
      "After email and band name, the flow makes a profile avatar mandatory. Most products leave photo upload optional at this stage, or hide cover and avatar until later.",
    evidence: {
      observed_where: "Artist signup profile fields",
      observed_behaviour:
        "Signup will not complete without a profile picture. Cover and other media also sit in the mandatory-feeling field set.",
      expected_behaviour:
        "Avatar and cover are optional at signup. Artists upload them later from profile when they are ready.",
    },
    user_impact: "Bands stall opening tabs and hunting for images before they have even joined.",
    severity: "high" as const,
    confidence: "high" as const,
    recommendation:
      "Make avatar and cover optional on signup. Move image upload into profile after the account exists.",
    owner: "Product" as const,
    status: "new" as const,
    priority: { frequency: 5 as const, impact: 4 as const, effort: 2 as const },
  },
  {
    finding_id: "HE-002",
    title: "Too many mandatory fields before first use",
    screen_or_flow: "Artist signup · profile setup",
    user_task: "Get onto the platform quickly",
    primary_heuristic: "H08" as const,
    secondary_heuristics: ["H06" as const],
    description:
      "The signup form asks for a long list of required fields. An artist may not have a website. They just want to get on the platform.",
    evidence: {
      observed_where: "Artist signup form",
      observed_behaviour:
        "Many fields are required. The reviewer opened multiple tabs to find answers and still was unsure what belonged where.",
      expected_behaviour:
        "A short first step collects artist name, genre, and a Spotify link. Everything else can wait for profile editing.",
    },
    user_impact: "Signup feels like paperwork. Some bands will abandon before they ever create a gig.",
    severity: "high" as const,
    confidence: "high" as const,
    recommendation:
      "Cut signup to artist name, genre, and Spotify. Keep other fields optional or move them to a later profile pass.",
    owner: "Product" as const,
    status: "new" as const,
    priority: { frequency: 5 as const, impact: 4 as const, effort: 3 as const },
  },
  {
    finding_id: "HE-003",
    title: "Pending approval locks artists out of the product",
    screen_or_flow: "Artist signup · under review",
    user_task: "Explore the product while waiting for approval",
    primary_heuristic: "H01" as const,
    secondary_heuristics: ["H03" as const],
    description:
      "After submit, the account sits under review. The artist cannot usefully explore. Most products give limited access while a human check finishes.",
    evidence: {
      observed_where: "Application under review state",
      observed_behaviour:
        "A modal explains approval takes one to two business days by email. Profile access fails. The artist is effectively locked out until an admin approves.",
      expected_behaviour:
        "Pending artists can browse with limited rights. Full actions unlock after approval.",
    },
    user_impact: "The quiet lockdown feels exclusive and may stop someone using Off Axis at the moment they are most curious.",
    severity: "high" as const,
    confidence: "high" as const,
    recommendation:
      "Allow limited exploration while pending. Keep destructive or public actions gated until approval.",
    owner: "Product" as const,
    status: "new" as const,
    priority: { frequency: 4 as const, impact: 5 as const, effort: 4 as const },
  },
  {
    finding_id: "HE-004",
    title: "Under-review modal pushes Sign out as the next step",
    screen_or_flow: "Artist signup · under review",
    user_task: "Decide what to do while waiting",
    primary_heuristic: "H02" as const,
    secondary_heuristics: ["H03" as const],
    description:
      "The pending modal offers Sign out as a primary action. That is not a natural next move after applying.",
    evidence: {
      observed_where: "Application under review modal",
      observed_behaviour:
        "Sign out is presented as the clear control. There is no strong path like Go to profile.",
      expected_behaviour:
        "Primary action matches the next useful step, such as Go to profile or Explore, with Sign out secondary.",
    },
    user_impact: "Artists leave the session instead of staying engaged while they wait.",
    severity: "medium" as const,
    confidence: "high" as const,
    recommendation:
      "Replace the primary Sign out with Go to profile or a limited home view. Keep Sign out as a quiet secondary action.",
    owner: "Design" as const,
    status: "new" as const,
    priority: { frequency: 4 as const, impact: 3 as const, effort: 1 as const },
  },
  {
    finding_id: "HE-005",
    title: "Profile from under-review state locks the artist out",
    screen_or_flow: "Artist signup · under review",
    user_task: "Open profile while pending",
    primary_heuristic: "H03" as const,
    secondary_heuristics: ["H09" as const],
    description:
      "Choosing profile while under review does not give a usable account view. It locks the artist out instead of explaining limited rights.",
    evidence: {
      observed_where: "Under-review modal and profile entry",
      observed_behaviour:
        "Attempting profile access fails. The pending state has no safe destination.",
      expected_behaviour:
        "Profile opens in a read-only or limited mode with a clear pending banner.",
    },
    user_impact: "The artist cannot check what they submitted or learn the product while waiting.",
    severity: "high" as const,
    confidence: "high" as const,
    recommendation:
      "Let pending artists open a limited profile with status messaging, not a hard lockout.",
    owner: "Engineering" as const,
    status: "new" as const,
    priority: { frequency: 4 as const, impact: 4 as const, effort: 3 as const },
  },
  {
    finding_id: "HE-006",
    title: "Sign out leaves the under-review modal on screen",
    screen_or_flow: "Artist signup · under review",
    user_task: "Sign out after applying",
    primary_heuristic: "H01" as const,
    secondary_heuristics: ["H09" as const],
    description:
      "Signing out does not clear the under-review modal. The page still looks signed in.",
    evidence: {
      observed_where: "Under-review modal after Sign out",
      observed_behaviour:
        "The modal remains after sign out. Session state and UI status disagree.",
      expected_behaviour:
        "Sign out dismisses the modal and returns to a logged-out public view.",
    },
    user_impact: "Artists cannot tell whether they left the account. Trust in status messaging drops.",
    severity: "medium" as const,
    confidence: "high" as const,
    recommendation:
      "On sign out, clear the pending modal and route to the public logged-out state.",
    owner: "Engineering" as const,
    status: "new" as const,
    priority: { frequency: 3 as const, impact: 3 as const, effort: 2 as const },
  },
  {
    finding_id: "HE-007",
    title: "Artists cannot add a missing venue when creating a first gig",
    screen_or_flow: "Create gig · venue",
    user_task: "Create a first gig at a venue not yet in the system",
    primary_heuristic: "H07" as const,
    secondary_heuristics: ["H03" as const],
    description:
      "Create your first gig has no way for an artist to find or propose a venue that is missing. In an unfamiliar city that can stop the flow completely.",
    evidence: {
      observed_where: "Create gig venue selection",
      observed_behaviour:
        "Venue choice is limited to what already exists. There is no add venue path for artists. Progress depends on admin adding the place first.",
      expected_behaviour:
        "Artists can propose a venue. Admin reviews and finalises it. Duplicates are prevented. Artists can create a gig without another admin contact loop.",
    },
    user_impact: "First-gig setup becomes manual and fragile. Scalability across cities suffers.",
    severity: "critical" as const,
    confidence: "high" as const,
    recommendation:
      "Add artist venue propose on create gig. Show pending venues in admin with duplicate checks. Let approved venues unlock gig creation without a support ticket.",
    owner: "Product" as const,
    status: "new" as const,
    priority: { frequency: 5 as const, impact: 5 as const, effort: 4 as const },
  },
  {
    finding_id: "HE-008",
    title: "Artist-proposed venues should lock city to the home city",
    screen_or_flow: "Create gig · add venue",
    user_task: "Propose a local venue",
    primary_heuristic: "H05" as const,
    secondary_heuristics: ["H06" as const],
    description:
      "If an Edinburgh band proposes a venue, the city should already be Edinburgh. Address validation should check that the place belongs there.",
    evidence: {
      observed_where: "Venue creation expectations during first-gig review",
      observed_behaviour:
        "No artist propose flow exists yet. The intended rule is that home-city artists should not freely invent out-of-city venues without system help.",
      expected_behaviour:
        "City is locked to the artist home city on propose. Address checks confirm the city. Admin finalises the record.",
    },
    user_impact: "Without city lock and validation, bad venue data piles up and admin cleanup grows.",
    severity: "medium" as const,
    confidence: "medium" as const,
    recommendation:
      "On artist propose, lock city to home city and validate address against that city before admin review.",
    owner: "Product" as const,
    status: "new" as const,
    priority: { frequency: 4 as const, impact: 3 as const, effort: 3 as const },
  },
  {
    finding_id: "HE-009",
    title: "Admin venue city list needs searchable select",
    screen_or_flow: "Admin · venues",
    user_task: "Pick a city when adding a venue",
    primary_heuristic: "H07" as const,
    secondary_heuristics: ["H06" as const],
    description:
      "City is an alphabetical dropdown. That works for a short list. It will not scale if Off Axis grows into the US and beyond.",
    evidence: {
      observed_where: "Admin add venue · city field",
      observed_behaviour:
        "Cities sit in a long alphabetical dropdown without search inside the control.",
      expected_behaviour:
        "A searchable select lets admins type to find a city quickly.",
    },
    user_impact: "Venue entry slows down as the city list grows.",
    severity: "medium" as const,
    confidence: "high" as const,
    recommendation:
      "Replace the plain city dropdown with a searchable select.",
    owner: "Design" as const,
    status: "new" as const,
    priority: { frequency: 3 as const, impact: 3 as const, effort: 2 as const },
  },
  {
    finding_id: "HE-010",
    title: "Venue address needs place lookup, not only manual paste",
    screen_or_flow: "Admin · venues",
    user_task: "Add a venue address and map",
    primary_heuristic: "H07" as const,
    secondary_heuristics: ["H09" as const],
    description:
      "There is no free place or address lookup when adding a venue. Map embed rejects shortened Google links and asks for the full browser address bar URL.",
    evidence: {
      observed_where: "Admin venue manager · map embed field",
      observed_behaviour:
        "Pasting a shortened Google Maps link fails validation. The full address bar URL works. Typing the whole address by hand is the default path.",
      expected_behaviour:
        "Search a venue name or address and fill structured fields from a places API. Accept common map URL forms or generate embed data from the place result.",
    },
    user_impact: "Admins waste time copying addresses and debugging map fields for every new venue.",
    severity: "medium" as const,
    confidence: "high" as const,
    recommendation:
      "Add address autocomplete or place search. Soften or replace map URL rules so common Google link forms work or are unnecessary.",
    owner: "Engineering" as const,
    status: "new" as const,
    priority: { frequency: 4 as const, impact: 3 as const, effort: 4 as const },
  },
  {
    finding_id: "HE-011",
    title: "New admin venue does not show for the artist create-gig list",
    screen_or_flow: "Create gig · venue list",
    user_task: "Pick a venue just added by admin",
    primary_heuristic: "H01" as const,
    secondary_heuristics: ["H04" as const],
    description:
      "After an admin adds an Edinburgh venue, the artist create-gig list still does not show it. The system should know the band is from Edinburgh and refresh available venues.",
    evidence: {
      observed_where: "Create gig after admin added Sneaky Pete's",
      observed_behaviour:
        "Venue appears in admin venues. Artist create gig still omits it after logout and login. The artist had to pick another venue.",
      expected_behaviour:
        "Approved venues for the artist city appear in create gig as soon as they are saved. Lists refresh without a mysterious delay.",
    },
    user_impact: "Artists cannot book the venue they asked admin to add. Trust in the handoff dies.",
    severity: "critical" as const,
    confidence: "high" as const,
    recommendation:
      "Fix venue availability for artists by city and cache. Confirm the new venue appears immediately after admin save.",
    owner: "Engineering" as const,
    status: "new" as const,
    priority: { frequency: 4 as const, impact: 5 as const, effort: 3 as const },
  },
  {
    finding_id: "HE-012",
    title: "Hero still says Join as artist after the user is an artist",
    screen_or_flow: "Public home · hero",
    user_task: "Return to the site while logged in as an artist",
    primary_heuristic: "H01" as const,
    secondary_heuristics: ["H02" as const],
    description:
      "The public hero still invites the logged-in artist to join as an artist. That action no longer makes sense.",
    evidence: {
      observed_where: "Home hero while logged in as an approved artist",
      observed_behaviour:
        "Join as artist remains the hero call to action after the account already exists.",
      expected_behaviour:
        "Logged-in artists see Go to profile or Open dashboard instead.",
    },
    user_impact: "The product looks unaware of who is signed in.",
    severity: "low" as const,
    confidence: "high" as const,
    recommendation:
      "Swap the hero CTA by auth state. Artists get Go to profile. Guests keep Join as artist.",
    owner: "Design" as const,
    status: "new" as const,
    priority: { frequency: 3 as const, impact: 2 as const, effort: 1 as const },
  },
  {
    finding_id: "HE-013",
    title: "Default gig title repeats the band name",
    screen_or_flow: "Create gig · basic information",
    user_task: "Name the gig",
    primary_heuristic: "H08" as const,
    secondary_heuristics: ["H04" as const],
    description:
      "The default title leans on the artist name again, such as Eyes of Home Eyes of Home Edinburgh. The act is already shown on the card.",
    evidence: {
      observed_where: "Create gig title field",
      observed_behaviour:
        "Default naming doubles the band and city in a redundant string.",
      expected_behaviour:
        "Default to the city, with date already visible on the card. Leave room to edit.",
    },
    user_impact: "Gig lists look noisy and harder to scan.",
    severity: "medium" as const,
    confidence: "high" as const,
    recommendation:
      "Default the title to the city. Keep the artist name on the card chrome, not duplicated in the title.",
    owner: "Design" as const,
    status: "new" as const,
    priority: { frequency: 4 as const, impact: 2 as const, effort: 1 as const },
  },
  {
    finding_id: "HE-014",
    title: "Doors and curfew should come from the venue",
    screen_or_flow: "Create gig · venue and slot",
    user_task: "Set doors and curfew",
    primary_heuristic: "H02" as const,
    secondary_heuristics: ["H05" as const],
    description:
      "Doors and curfew are artist-editable. In practice those times often belong to the venue, not the act.",
    evidence: {
      observed_where: "Create gig venue and slot details",
      observed_behaviour:
        "Doors and curfew sit as artist inputs. They later appear greyed in another step, which already hints they should be constrained.",
      expected_behaviour:
        "Venue records carry default doors and curfew. Artists inherit them unless admin overrides.",
    },
    user_impact: "Wrong times get published when artists guess venue policy.",
    severity: "medium" as const,
    confidence: "medium" as const,
    recommendation:
      "Store doors and curfew on the venue. Prefill and lock them on create gig unless there is a clear override path.",
    owner: "Product" as const,
    status: "new" as const,
    priority: { frequency: 3 as const, impact: 3 as const, effort: 3 as const },
  },
  {
    finding_id: "HE-015",
    title: "Cover image label does not match gig poster norms",
    screen_or_flow: "Create gig · basic information",
    user_task: "Upload event artwork",
    primary_heuristic: "H02" as const,
    secondary_heuristics: ["H06" as const],
    description:
      "The field is called cover image and suggests wide artwork. Gig promo art is usually square or about 4 by 5, more like a poster.",
    evidence: {
      observed_where: "Create gig cover image upload",
      observed_behaviour:
        "Label reads cover image. Guidance does not match common gig poster formats.",
      expected_behaviour:
        "Label reads gig poster or event artwork, with aspect guidance that matches promo norms.",
    },
    user_impact: "Artists upload the wrong crop and the listing looks off.",
    severity: "low" as const,
    confidence: "high" as const,
    recommendation:
      "Rename to gig poster or event artwork and show the expected aspect ratio.",
    owner: "Content" as const,
    status: "new" as const,
    priority: { frequency: 3 as const, impact: 2 as const, effort: 1 as const },
  },
  {
    finding_id: "HE-016",
    title: "Early bird quota language is unclear",
    screen_or_flow: "Create gig · pricing",
    user_task: "Set early bird tickets",
    primary_heuristic: "H06" as const,
    secondary_heuristics: ["H02" as const],
    description:
      "Early bird price sits next to quota. Quota is not explained in plain language.",
    evidence: {
      observed_where: "Create gig early bird fields",
      observed_behaviour:
        "The reviewer did not know what quota meant and would skip the section.",
      expected_behaviour:
        "Label the limit as number of early bird tickets, with a short helper line.",
    },
    user_impact: "Useful pricing tools get ignored.",
    severity: "medium" as const,
    confidence: "high" as const,
    recommendation:
      "Replace quota with plain wording such as Early bird ticket limit and add a one-line helper.",
    owner: "Content" as const,
    status: "new" as const,
    priority: { frequency: 4 as const, impact: 2 as const, effort: 1 as const },
  },
  {
    finding_id: "HE-017",
    title: "Support invites sit too early in create gig",
    screen_or_flow: "Create gig · support acts",
    user_task: "Finish creating a gig",
    primary_heuristic: "H08" as const,
    secondary_heuristics: ["H07" as const],
    description:
      "Choosing support during create gig is heavy. Invitation expiry is custom and can run long. Support is better after the gig exists.",
    evidence: {
      observed_where: "Create gig support acts step",
      observed_behaviour:
        "Support invite and custom expiry sit inside creation. 72 hours feels long when another invite can be sent later.",
      expected_behaviour:
        "Create the gig first. Prompt later to invite support. Use a standard expiry such as 48 hours.",
    },
    user_impact: "First-gig completion slows down for a task artists may not be ready for yet.",
    severity: "medium" as const,
    confidence: "high" as const,
    recommendation:
      "Remove support invites from create gig. Prompt from My gigs after publish. Standardise invite expiry.",
    owner: "Product" as const,
    status: "new" as const,
    priority: { frequency: 4 as const, impact: 3 as const, effort: 3 as const },
  },
  {
    finding_id: "HE-018",
    title: "Promotional discount Value is ambiguous",
    screen_or_flow: "Create gig · promotional discounts",
    user_task: "Add a discount to the gig",
    primary_heuristic: "H06" as const,
    secondary_heuristics: ["H02" as const],
    description:
      "Value does not say whether it is a percentage or a fixed amount against the ticket price. Max usage and expiry also feel detached from the gig date.",
    evidence: {
      observed_where: "Create gig promotional discount fields",
      observed_behaviour:
        "Value only became clear after guessing a percentage. Expiry is manual even though the gig already has an end.",
      expected_behaviour:
        "Show percentage or fixed amount clearly beside the ticket price. Default expiry to the gig, with an optional this-gig-only control.",
    },
    user_impact: "Artists mis-set discounts or skip them.",
    severity: "medium" as const,
    confidence: "high" as const,
    recommendation:
      "Label amount type plainly. Prefill expiry from the gig end. Offer a this-gig-only option.",
    owner: "Design" as const,
    status: "new" as const,
    priority: { frequency: 3 as const, impact: 3 as const, effort: 2 as const },
  },
  {
    finding_id: "HE-019",
    title: "Create gig ends on Gig not found",
    screen_or_flow: "Create gig · completion",
    user_task: "Land on the new gig after create",
    primary_heuristic: "H09" as const,
    secondary_heuristics: ["H01" as const],
    description:
      "After finishing create gig, the product shows Gig not found. Refresh still fails. The gig appears under My gigs.",
    evidence: {
      observed_where: "Post-create gig route",
      observed_behaviour:
        "Completion routes to a not-found state even though the gig was saved and listed.",
      expected_behaviour:
        "Completion opens the new gig detail or My gigs with the new item highlighted.",
    },
    user_impact: "Artists think creation failed when it actually worked.",
    severity: "critical" as const,
    confidence: "high" as const,
    recommendation:
      "Fix the post-create redirect to the new gig id. Never show not found for a gig that just saved.",
    owner: "Engineering" as const,
    status: "new" as const,
    priority: { frequency: 4 as const, impact: 5 as const, effort: 2 as const },
  },
  {
    finding_id: "HE-020",
    title: "My created gigs is over-labelled",
    screen_or_flow: "Artist · gigs list",
    user_task: "Find own gigs",
    primary_heuristic: "H08" as const,
    description:
      "The list is called My created gigs. My gigs is enough.",
    evidence: {
      observed_where: "Artist gigs list heading",
      observed_behaviour:
        "Created adds noise without changing meaning.",
      expected_behaviour:
        "Heading reads My gigs.",
    },
    user_impact: "Minor scan friction.",
    severity: "low" as const,
    confidence: "high" as const,
    recommendation: "Rename to My gigs.",
    owner: "Content" as const,
    status: "new" as const,
    priority: { frequency: 2 as const, impact: 1 as const, effort: 1 as const },
  },
  {
    finding_id: "HE-021",
    title: "Gig cards use odd action buttons instead of a clickable card",
    screen_or_flow: "Artist · My gigs",
    user_task: "Open or manage a gig",
    primary_heuristic: "H04" as const,
    secondary_heuristics: ["H08" as const],
    description:
      "Cards carry strange buttons including Dashboard and Fill with a headphones icon. Normal pattern is a hoverable card you click to open.",
    evidence: {
      observed_where: "My gigs event cards",
      observed_behaviour:
        "Dashboard and Fill sit on the card. Fill with headphones did not communicate invite support. Dashboard duplicates top-right navigation.",
      expected_behaviour:
        "Whole card is clickable. Primary Off Axis action for incomplete support is Invite support, not a vague Fill control.",
    },
    user_impact: "Artists miss the support workflow that the product is built around.",
    severity: "high" as const,
    confidence: "high" as const,
    recommendation:
      "Make the card the hit target. Drop Dashboard from the card. Replace Fill with Invite support when slots are open.",
    owner: "Design" as const,
    status: "new" as const,
    priority: { frequency: 5 as const, impact: 4 as const, effort: 2 as const },
  },
  {
    finding_id: "HE-022",
    title: "Artist navigation lacks a clear secondary side menu",
    screen_or_flow: "Artist account navigation",
    user_task: "Move between My gigs, merchandise, and support",
    primary_heuristic: "H04" as const,
    secondary_heuristics: ["H03" as const],
    description:
      "Admin has a secondary side menu. Artist does not. From My gigs there is no clear way back to where you were.",
    evidence: {
      observed_where: "Artist My gigs and related sections",
      observed_behaviour:
        "Navigation feels flatter and less consistent than admin. Back paths are weak.",
      expected_behaviour:
        "Artist areas share a stable secondary nav for gigs, merchandise, and support.",
    },
    user_impact: "Artists get lost between core tasks.",
    severity: "medium" as const,
    confidence: "high" as const,
    recommendation:
      "Add an artist secondary side menu that mirrors the admin pattern for the main artist sections.",
    owner: "Design" as const,
    status: "new" as const,
    priority: { frequency: 4 as const, impact: 3 as const, effort: 3 as const },
  },
  {
    finding_id: "HE-023",
    title: "Support invite fails on drafts with a late vague error",
    screen_or_flow: "Fill support · invite",
    user_task: "Invite support on a new gig",
    primary_heuristic: "H01" as const,
    secondary_heuristics: ["H09" as const],
    description:
      "Invite only works on published gigs. The artist only learns that after searching and trying. Draft state should say so up front.",
    evidence: {
      observed_where: "Fill support on a draft gig",
      observed_behaviour:
        "Message said invite can only be selected for published gigs after the artist had already worked through the picker.",
      expected_behaviour:
        "Draft gigs disable invite with a clear reason. Publishing emails the artist so they know when to add support.",
    },
    user_impact: "Wasted effort and another admin loop before the core Off Axis action.",
    severity: "high" as const,
    confidence: "high" as const,
    recommendation:
      "Show publish status before invite. Email the artist when a gig is published. Do not let the search flow start if invite is blocked.",
    owner: "Product" as const,
    status: "new" as const,
    priority: { frequency: 4 as const, impact: 4 as const, effort: 3 as const },
  },
  {
    finding_id: "HE-024",
    title: "Support candidate list exposes artist street addresses",
    screen_or_flow: "Fill support · candidate list",
    user_task: "Choose a support act",
    primary_heuristic: "H05" as const,
    secondary_heuristics: ["H02" as const],
    description:
      "When searching for support, the list shows a street address. That is likely a home address and is a serious privacy risk.",
    evidence: {
      observed_where: "Support candidate results",
      observed_behaviour:
        "Candidate rows include address detail beyond city. Anyone who can open the picker can see it.",
      expected_behaviour:
        "Show city only. Never expose street addresses to other artists in discovery.",
    },
    user_impact: "Personal addresses can leak. Fake artist accounts could be used to harvest where people live.",
    severity: "critical" as const,
    confidence: "high" as const,
    recommendation:
      "Remove street address from all artist-to-artist discovery. Show city and genre only. Audit other lists for the same leak.",
    owner: "Engineering" as const,
    status: "new" as const,
    priority: { frequency: 5 as const, impact: 5 as const, effort: 2 as const },
  },
  {
    finding_id: "HE-025",
    title: "Credits show on support candidate cards",
    screen_or_flow: "Fill support · candidate list",
    user_task: "Compare possible support acts",
    primary_heuristic: "H08" as const,
    secondary_heuristics: ["H02" as const],
    description:
      "Candidate cards expose how many credits another artist has. That can foster a bad culture.",
    evidence: {
      observed_where: "Main support and opening act candidate lists",
      observed_behaviour:
        "Credits appear alongside the band identity.",
      expected_behaviour:
        "Show band name, city, and genre. Open profile for more. Keep credits private.",
    },
    user_impact: "Invites start to feel transactional in the wrong way.",
    severity: "medium" as const,
    confidence: "high" as const,
    recommendation:
      "Hide credits from candidate lists. Lead with name, city, genre, and a profile link.",
    owner: "Product" as const,
    status: "new" as const,
    priority: { frequency: 3 as const, impact: 3 as const, effort: 1 as const },
  },
  {
    finding_id: "HE-026",
    title: "Support and opening lists need filters or find-band modals",
    screen_or_flow: "Fill support",
    user_task: "Find opening act or main support quickly",
    primary_heuristic: "H07" as const,
    secondary_heuristics: ["H08" as const],
    description:
      "Main support and opening act candidates sit in a long scroll. Genre filter and profile open are missing. Pills or Find band modals per slot would help.",
    evidence: {
      observed_where: "Fill support candidate sections",
      observed_behaviour:
        "Long combined lists. Invite opening can appear for same-city reasons without clear controls. No simple genre filter.",
      expected_behaviour:
        "Filter pills for opening vs main support, or a Find band modal per slot with search and genre filter, plus profile links.",
    },
    user_impact: "Booking support takes longer than it should and good fits get missed.",
    severity: "medium" as const,
    confidence: "high" as const,
    recommendation:
      "Add slot-type filters or Find band modals. Include genre filter and profile links.",
    owner: "Design" as const,
    status: "new" as const,
    priority: { frequency: 4 as const, impact: 3 as const, effort: 3 as const },
  },
  {
    finding_id: "HE-027",
    title: "Invite is one click with no confirm or message",
    screen_or_flow: "Fill support · invite",
    user_task: "Send a support invitation",
    primary_heuristic: "H05" as const,
    secondary_heuristics: ["H09" as const],
    description:
      "Invite fires immediately. A miss-click has no undo. There is no optional personal message or confirm step.",
    evidence: {
      observed_where: "Invite on a support candidate",
      observed_behaviour:
        "One click sends the invite. No second step. Decline also lacks a structured reason.",
      expected_behaviour:
        "Invite opens a short confirm with optional message. Decline collects a polite reason such as availability, travel cost, genre mismatch, or prefer not to say.",
    },
    user_impact: "Wrong invites go out. Declines give the headline act no useful feedback.",
    severity: "medium" as const,
    confidence: "high" as const,
    recommendation:
      "Add a two-step invite confirm with optional message. Add decline reasons for politeness and product learning.",
    owner: "Design" as const,
    status: "new" as const,
    priority: { frequency: 4 as const, impact: 3 as const, effort: 2 as const },
  },
  {
    finding_id: "HE-028",
    title: "Filled support shows a tick instead of the artist photo",
    screen_or_flow: "Gig support slots",
    user_task: "See who is playing support",
    primary_heuristic: "H06" as const,
    secondary_heuristics: ["H04" as const],
    description:
      "A completed support slot shows a ticked state. The support artist's profile picture would make completion obvious and more useful.",
    evidence: {
      observed_where: "Published gig support summary",
      observed_behaviour:
        "Filled slots read as checklist ticks rather than people.",
      expected_behaviour:
        "Show the support artist's avatar and name as the completed state.",
    },
    user_impact: "The lineup feels abstract instead of human.",
    severity: "low" as const,
    confidence: "high" as const,
    recommendation:
      "Replace the tick with the support artist's profile picture and name.",
    owner: "Design" as const,
    status: "new" as const,
    priority: { frequency: 3 as const, impact: 2 as const, effort: 1 as const },
  },
  {
    finding_id: "HE-029",
    title: "Accessibility reads as a bare No",
    screen_or_flow: "Gig · ticketing",
    user_task: "Understand venue accessibility before buying",
    primary_heuristic: "H02" as const,
    secondary_heuristics: ["H06" as const],
    description:
      "Accessibility is shown as No. That is too blunt and does not say what is missing for someone who needs wheelchair access.",
    evidence: {
      observed_where: "Gig ticketing or venue accessibility line",
      observed_behaviour:
        "The field reads No without explaining facilities.",
      expected_behaviour:
        "Plain sentence such as There are no wheelchair facilities at this venue, or a short list of what is and is not available.",
    },
    user_impact: "Buyers who need access information cannot decide with confidence.",
    severity: "medium" as const,
    confidence: "high" as const,
    recommendation:
      "Replace Yes or No with a short plain statement about wheelchair and related access at the venue.",
    owner: "Content" as const,
    status: "new" as const,
    priority: { frequency: 3 as const, impact: 4 as const, effort: 1 as const },
  },
  {
    finding_id: "HE-030",
    title: "Checkout layout hides what blocks Continue as Guest",
    screen_or_flow: "Checkout · guest details",
    user_task: "Complete checkout as a guest and pay",
    primary_heuristic: "H01" as const,
    secondary_heuristics: ["H08" as const, "H09" as const],
    description:
      "Personal details sit in a cramped side column beside the order summary. Continue as Guest stays grey until first name, email, matching confirm email, and terms are done, but that control sits far down the page under donation, discount, phone, and tick boxes. Mobile number is required yet does not grey the button, so people think they are ready and then get stopped.",
    evidence: {
      observed_where: "Checkout details step and Order Total card",
      observed_behaviour:
        "Required fields and the pay action are split across a narrow column and a long scroll. Phone can block progress without showing on the button state. Terms and email sit below other blocks.",
      expected_behaviour:
        "Name and email stack under the order summary in one readable column. The pay action stays in view. The UI names what is still missing, such as Agree to terms to continue. Phone is checked before they tap.",
    },
    user_impact: "Guest checkout feels like a hunt. People abandon when they cannot see why the button will not move.",
    severity: "high" as const,
    confidence: "high" as const,
    recommendation:
      "Move personal details under the order summary. Keep Continue as Guest visible and explain missing requirements inline. Validate phone before the button enables.",
    owner: "Design" as const,
    status: "new" as const,
    priority: { frequency: 5 as const, impact: 4 as const, effort: 3 as const },
  },
  {
    finding_id: "HE-031",
    title: "Ticket quantity total sticks after counting back down",
    screen_or_flow: "Checkout · ticket quantity",
    user_task: "Set ticket quantity and trust the total",
    primary_heuristic: "H01" as const,
    secondary_heuristics: ["H09" as const],
    description:
      "Raising quantity high then returning to one ticket left the displayed total stuck at a large amount instead of the discounted single-ticket price.",
    evidence: {
      observed_where: "Checkout ticket counter and total",
      observed_behaviour:
        "Quantity went up toward 50 and showed about £434.35. Back down to one ticket still showed about £434.75. Payment later charged the correct £1.25 with the test discount.",
      expected_behaviour:
        "Displayed total always matches quantity and active discount. UI and payment amount never disagree.",
    },
    user_impact: "Buyers think the price is wrong and may abandon checkout even when payment would be correct.",
    severity: "high" as const,
    confidence: "high" as const,
    recommendation:
      "Recalculate the visible total on every quantity change. Add a regression test for count up then down with a discount code.",
    owner: "Engineering" as const,
    status: "new" as const,
    priority: { frequency: 3 as const, impact: 4 as const, effort: 2 as const },
  },
  {
    finding_id: "HE-032",
    title: "Hard to get the ticket back after paying",
    screen_or_flow: "Post-purchase · email and Find Order",
    user_task: "Open the door ticket after the success screen is gone",
    primary_heuristic: "H06" as const,
    secondary_heuristics: ["H02" as const, "H01" as const, "H03" as const],
    description:
      "The confirmation email arrives but reads as a receipt. The scannable QR only lives in a PDF attachment, not the message body. Find Your Order sits behind Find Order in the footer and asks for two of four details including an order reference most people will not have kept. Once the success screen has gone, getting a ticket for the door is harder than it should be.",
    evidence: {
      observed_where: "Confirmation email and Find Your Order",
      observed_behaviour:
        "Email looks like payment confirmation with a PDF ticket attached. Find Order is footer-only. Lookup expects an order reference alongside email. No simple path back to tickets from the mail itself.",
      expected_behaviour:
        "Email body leads with a large QR and is framed as your ticket, with a simple link to open tickets online. PDF is backup only. After a guest buy, Find Order stays in the header and email plus name is enough to recover the ticket.",
    },
    user_impact:
      "Buyers treat the mail as a receipt, miss the attachment, or fail lookup and turn up without a scannable ticket.",
    severity: "high" as const,
    confidence: "high" as const,
    recommendation:
      "Put the QR in the email body and label the message as your ticket. Add a one-tap link to tickets in the mail. Keep Find Order in the header for guests and allow email plus name lookup.",
    owner: "Product" as const,
    status: "new" as const,
    priority: { frequency: 5 as const, impact: 5 as const, effort: 3 as const },
  },
  {
    finding_id: "HE-033",
    title: "Ticket PDF should lead with the QR code",
    screen_or_flow: "Order details · ticket PDF",
    user_task: "Open the ticket ready to scan at the door",
    primary_heuristic: "H07" as const,
    secondary_heuristics: ["H02" as const],
    description:
      "When the ticket is opened as a PDF, the QR code is not the first thing on the page. Door staff and fans need the scan target immediately.",
    evidence: {
      observed_where: "Downloaded or viewed ticket PDF",
      observed_behaviour:
        "QR is present for door scan but not leading the layout.",
      expected_behaviour:
        "QR code is the first large element on the ticket, with event details below.",
    },
    user_impact: "Extra scrolling or hunting at the door slows entry.",
    severity: "medium" as const,
    confidence: "high" as const,
    recommendation:
      "Put the QR code first and large on the ticket PDF. Keep supporting details underneath.",
    owner: "Design" as const,
    status: "new" as const,
    priority: { frequency: 4 as const, impact: 3 as const, effort: 2 as const },
  },
  {
    finding_id: "HE-034",
    title: "Guest basket empties after refresh or a new tab",
    screen_or_flow: "Checkout · guest basket",
    user_task: "Return to checkout with tickets still in the basket",
    primary_heuristic: "H01" as const,
    secondary_heuristics: ["H03" as const, "H09" as const],
    description:
      "As a guest, the basket clears after a refresh, opening a new tab, or coming back to checkout. The screen says Your Basket is Empty even though tickets were just added. Checkout cannot continue and the buyer must find the gig again.",
    evidence: {
      observed_where: "Checkout after refresh, new tab, or return visit",
      observed_behaviour:
        "Previously added tickets disappear. Empty basket blocks progress.",
      expected_behaviour:
        "Guest basket persists on that device until payment completes or the user clears it. Refresh restores the same tickets.",
    },
    user_impact: "Buyers lose their place mid-purchase and may not start again.",
    severity: "critical" as const,
    confidence: "high" as const,
    recommendation:
      "Persist guest basket in session or local storage until checkout completes or the user empties it.",
    owner: "Engineering" as const,
    status: "new" as const,
    priority: { frequency: 5 as const, impact: 5 as const, effort: 3 as const },
  },
  {
    finding_id: "HE-035",
    title: "Buy Tickets adds one ticket with no count on the gig page",
    screen_or_flow: "Gig page · Buy Tickets",
    user_task: "Choose how many tickets to buy before checkout",
    primary_heuristic: "H02" as const,
    secondary_heuristics: ["H04" as const, "H07" as const],
    description:
      "Buy Tickets on the gig page does not say what will happen. Browse Events uses Get Tickets for the same job. Tapping Buy Tickets adds one ticket and stays on the gig. There is no way to pick two or three upfront. A second tap can add another with no message. Quantity only appears later on a bottom bar or at checkout.",
    evidence: {
      observed_where: "Gig page primary ticket action",
      observed_behaviour:
        "Inconsistent labels between Buy Tickets and Get Tickets. No ticket count control on the gig. Repeat taps add tickets silently.",
      expected_behaviour:
        "Ticket count sits on the gig beside a clear action such as Add to basket. After add, confirm it is in the basket and offer Checkout. Plus and minus stay on checkout for changes.",
    },
    user_impact: "People buying two for a night out cannot set quantity where they decide to buy.",
    severity: "high" as const,
    confidence: "high" as const,
    recommendation:
      "Add quantity on the gig page. Align button labels. Confirm basket add and surface Checkout. Keep quantity controls at checkout too.",
    owner: "Product" as const,
    status: "new" as const,
    priority: { frequency: 5 as const, impact: 4 as const, effort: 3 as const },
  },
  {
    finding_id: "HE-036",
    title: "Sold out never appears on the gig or list",
    screen_or_flow: "Gig page and listings · availability",
    user_task: "See whether tickets are still available",
    primary_heuristic: "H01" as const,
    secondary_heuristics: ["H02" as const, "H05" as const],
    description:
      "A full room still shows Buy Tickets. Fans add tickets, reach checkout, and only then learn there are none left. That is a late failure at the most expensive moment.",
    evidence: {
      observed_where: "Gig list and gig detail when capacity is gone",
      observed_behaviour:
        "Buy Tickets stays visible. Sold out is not shown upfront. Failure arrives at pay.",
      expected_behaviour:
        "When no seats remain, list and gig say Sold Out and Buy Tickets goes away. When only a few remain, say so on the gig before checkout.",
    },
    user_impact: "Fans waste time in checkout for a night they cannot join.",
    severity: "critical" as const,
    confidence: "high" as const,
    recommendation:
      "Design a real sold-out state on list and gig. Surface low availability before checkout.",
    owner: "Product" as const,
    status: "new" as const,
    priority: { frequency: 5 as const, impact: 5 as const, effort: 3 as const },
  },
  {
    finding_id: "HE-037",
    title: "One buyer can put the whole room in their basket",
    screen_or_flow: "Gig · basket · per-person limit",
    user_task: "Buy tickets without emptying the room for everyone else",
    primary_heuristic: "H05" as const,
    secondary_heuristics: ["H04" as const],
    description:
      "One person can hold every seat. On a ten-seat gig that was all ten. The error still talks about a third of the room, which is not what happened. A guest can start again and take another full room.",
    evidence: {
      observed_where: "Ticket add and basket on small-capacity gigs",
      observed_behaviour:
        "No effective per-person cap stops one buyer clearing the room. Error copy does not match the rule. Guest restart can bypass intent.",
      expected_behaviour:
        "One clear personal limit applies on the gig, in the basket, and at pay. Copy names the number, such as a third of the room or a simple max of eight.",
    },
    user_impact: "One fan can block the whole night. Other buyers only discover that at pay.",
    severity: "critical" as const,
    confidence: "high" as const,
    recommendation:
      "Enforce one per-person limit everywhere with matching copy. Close guest loopholes that reset the cap.",
    owner: "Engineering" as const,
    status: "new" as const,
    priority: { frequency: 4 as const, impact: 5 as const, effort: 3 as const },
  },
  {
    finding_id: "HE-038",
    title: "Payment holds can lock seats forever",
    screen_or_flow: "Checkout · inventory hold",
    user_task: "Buy a ticket when someone else abandoned pay",
    primary_heuristic: "H01" as const,
    secondary_heuristics: ["H03" as const],
    description:
      "Holding the last tickets while someone pays is right. The hold can last forever if they close the tab. Other fans still see Buy Tickets and only hit the wall at pay.",
    evidence: {
      observed_where: "Gig availability during abandoned checkout",
      observed_behaviour:
        "Seats stay held after payment is started but not finished. The gig still looks buyable.",
      expected_behaviour:
        "Keep the hold, then release it after a short wait and as soon as payment is abandoned. Returned seats show as available on the gig.",
    },
    user_impact: "Ghost holds make a gig look open when it is not.",
    severity: "high" as const,
    confidence: "high" as const,
    recommendation:
      "Time-box checkout holds and release on abandon. Refresh gig availability when seats return.",
    owner: "Engineering" as const,
    status: "new" as const,
    priority: { frequency: 4 as const, impact: 4 as const, effort: 3 as const },
  },
  {
    finding_id: "HE-039",
    title: "Basket and checkout disagree on ticket limits",
    screen_or_flow: "Basket and checkout · quantity",
    user_task: "Trust how many tickets they can still buy",
    primary_heuristic: "H04" as const,
    secondary_heuristics: ["H01" as const],
    description:
      "The basket stops at seats still free. Checkout plus can climb toward the whole room size. If eight of ten are gone, the basket should stop at two but checkout can still tap toward ten.",
    evidence: {
      observed_where: "Basket quantity cap vs checkout plus control",
      observed_behaviour:
        "Same task, two different maximums. The number jumps between steps.",
      expected_behaviour:
        "One limit everywhere. How many this person can take is the smaller of seats left and their personal cap. Gig, basket, and checkout all stop at that number.",
    },
    user_impact: "Trust drops when the allowed count changes mid-flow.",
    severity: "high" as const,
    confidence: "high" as const,
    recommendation:
      "Share one limit calculation across gig, basket, and checkout. Never raise the cap at pay.",
    owner: "Engineering" as const,
    status: "new" as const,
    priority: { frequency: 4 as const, impact: 4 as const, effort: 2 as const },
  },
  {
    finding_id: "HE-040",
    title: "Early bird tickets vanish before anyone has paid",
    screen_or_flow: "Early bird pricing · checkout hold",
    user_task: "Buy at the early bird price fairly",
    primary_heuristic: "H02" as const,
    secondary_heuristics: ["H05" as const],
    description:
      "Early bird is a promise that the first tickets are cheaper. That cheaper pile can shrink as soon as someone reaches checkout, even if they never pay. Other fans then see full price for a sale that did not happen.",
    evidence: {
      observed_where: "Early bird pool during checkout starts",
      observed_behaviour:
        "Checkout entry consumes early bird allocation before payment completes.",
      expected_behaviour:
        "Only count an early bird as sold when money has landed. Abandoned pay should not use up cheap tickets.",
    },
    user_impact: "Fans lose the deal through no fault of their own.",
    severity: "high" as const,
    confidence: "high" as const,
    recommendation:
      "Reserve early bird on pay start if needed, but return it on abandon until payment succeeds.",
    owner: "Engineering" as const,
    status: "new" as const,
    priority: { frequency: 3 as const, impact: 4 as const, effort: 3 as const },
  },
  {
    finding_id: "HE-041",
    title: "Buy Tickets stays silent at the cap",
    screen_or_flow: "Gig page · Buy Tickets",
    user_task: "Understand why they cannot add more tickets",
    primary_heuristic: "H01" as const,
    secondary_heuristics: ["H09" as const],
    description:
      "Buy Tickets can be tapped again and again at the personal cap. Nothing happens and nothing is said on the gig. Checkout at least shows a message. A tap at a full room can even add an empty line to the basket. The button never changes state.",
    evidence: {
      observed_where: "Gig page Buy Tickets at cap or sold out",
      observed_behaviour:
        "Repeat taps with no feedback. Empty basket lines possible. Button label unchanged.",
      expected_behaviour:
        "If tickets are in the basket, say so and offer Checkout. If the night is full, say Sold Out. Never add zero tickets. The control always shows what happens next.",
    },
    user_impact: "People keep tapping because the product looks broken or unresponsive.",
    severity: "medium" as const,
    confidence: "high" as const,
    recommendation:
      "Give Buy Tickets clear next states for in basket, at cap, and sold out. Block zero-quantity adds.",
    owner: "Design" as const,
    status: "new" as const,
    priority: { frequency: 5 as const, impact: 3 as const, effort: 2 as const },
  },
  {
    finding_id: "HE-042",
    title: "Ticket money and credits are blurred in product language",
    screen_or_flow: "Homepage and artist journey · credits vs pounds",
    user_task: "Understand what fans pay and what artists earn or spend",
    primary_heuristic: "H02" as const,
    secondary_heuristics: ["H06" as const],
    description:
      "Fans pay in pounds. Credits are tokens artists use on each other's bills. The homepage talks as if offering an opening slot earns credits, and as if keeping ticket sales is the same pile. A designer cannot sketch the right states if those two currencies are mixed.",
    evidence: {
      observed_where: "Homepage and artist-facing copy about credits and ticket money",
      observed_behaviour:
        "Pounds and credits read as one economy in places.",
      expected_behaviour:
        "Ticket money is what fans pay and goes through payout. Credits are earned by selling enough tickets and spent to take a main support slot. Say that in the artist journey, not only in fine print.",
    },
    user_impact: "Artists misread what they earn, spend, and owe.",
    severity: "medium" as const,
    confidence: "high" as const,
    recommendation:
      "Separate pounds and credits in all primary product language and key artist screens.",
    owner: "Content" as const,
    status: "new" as const,
    priority: { frequency: 4 as const, impact: 3 as const, effort: 2 as const },
  },
  {
    finding_id: "HE-043",
    title: "Support credits can be taken at the wrong time",
    screen_or_flow: "Support slots · credit spend",
    user_task: "Take a main support slot without losing a credit early",
    primary_heuristic: "H05" as const,
    secondary_heuristics: ["H02" as const],
    description:
      "Main support should cost one credit. Opening should cost nothing. The product checks balance at apply, which is good. The credit can then be taken when the gig ends with no sales, or when ticket sales hit forty a week before the night. An artist can lose a credit before they play, or for a gig that never happened.",
    evidence: {
      observed_where: "Support credit deduction timing",
      observed_behaviour:
        "Credits leave on sales thresholds or gig end even when the show did not happen as planned.",
      expected_behaviour:
        "Check balance at apply. Only take the credit after the gig has actually happened. If the gig is cancelled, do not take it. Use one moment for night complete for both awarding headline credits and taking support credits.",
    },
    user_impact: "Artists lose credits on gigs they never played.",
    severity: "high" as const,
    confidence: "high" as const,
    recommendation:
      "Deduct support credits only after the gig completes. Refund on cancellation.",
    owner: "Product" as const,
    status: "new" as const,
    priority: { frequency: 3 as const, impact: 4 as const, effort: 4 as const },
  },
  {
    finding_id: "HE-044",
    title: "Admin credit rule edits do not reach the live job",
    screen_or_flow: "Admin · credit rules",
    user_task: "Change credit rules and trust artists see them",
    primary_heuristic: "H04" as const,
    secondary_heuristics: ["H01" as const],
    description:
      "Someone can edit credit rules in admin and believe the live product will follow. The job that awards and takes credits looks for different names, so it ignores those edits and uses hidden defaults. Admin numbers and artist-facing numbers will not match.",
    evidence: {
      observed_where: "Admin credit rules vs runtime credit job",
      observed_behaviour:
        "Edited rule names do not match what the live job reads. Defaults win silently.",
      expected_behaviour:
        "One set of names and numbers. Whatever admin shows as one credit for forty tickets or one credit to play main support is what artists get and spend.",
    },
    user_impact: "Support and ops cannot trust admin as source of truth.",
    severity: "high" as const,
    confidence: "medium" as const,
    recommendation:
      "Wire admin credit rules directly to the award and spend job. Remove hidden defaults.",
    owner: "Engineering" as const,
    status: "new" as const,
    priority: { frequency: 2 as const, impact: 5 as const, effort: 4 as const },
  },
  {
    finding_id: "HE-045",
    title: "Leftover path treats tickets as payable with credits",
    screen_or_flow: "Product copy and flows · credits",
    user_task: "Understand how fans and artists pay",
    primary_heuristic: "H02" as const,
    secondary_heuristics: ["H08" as const],
    description:
      "There is leftover thinking that a ticket might be bought with credits. Live fans pay in pounds. Leaving that idea in the product makes credits feel like money, and money feel like tokens.",
    evidence: {
      observed_where: "Legacy copy or flows referencing credits for ticket purchase",
      observed_behaviour:
        "Credits and pounds blur in older paths or helper text.",
      expected_behaviour:
        "Credits buy a support slot. Pounds buy a ticket. Every button, empty state, and help line follows that split.",
    },
    user_impact: "Both fans and artists misunderstand what each currency does.",
    severity: "medium" as const,
    confidence: "medium" as const,
    recommendation:
      "Remove pay for a ticket with credits from live UI and docs. Audit buttons and empty states.",
    owner: "Product" as const,
    status: "new" as const,
    priority: { frequency: 3 as const, impact: 3 as const, effort: 2 as const },
  },
  {
    finding_id: "HE-046",
    title: "Artists are told they keep 100 percent but settlement takes more",
    screen_or_flow: "Homepage, onboarding, checkout, and settlement PDF",
    user_task: "Trust what they will earn from ticket sales",
    primary_heuristic: "H02" as const,
    secondary_heuristics: ["H01" as const],
    description:
      "Artists are told they keep ticket sales and pay no ticketing commission on the homepage, in onboarding, and at checkout. After the gig the sum still takes about 5 percent, 20p, and PRS. Ten £8 tickets become about £72.44 before venue or support. Trust breaks the first time someone opens the PDF.",
    evidence: {
      observed_where: "Public commission promise vs post-gig settlement PDF",
      observed_behaviour:
        "Zero commission messaging sits alongside platform percent, flat fees, and PRS on the statement.",
      expected_behaviour:
        "Match the story to the sum, or change the sum. Either name every cut in the public promise, or stop taking them off tickets. Do not leave both live.",
    },
    user_impact: "The first settlement feels like a broken promise.",
    severity: "critical" as const,
    confidence: "high" as const,
    recommendation:
      "Align marketing and checkout copy with the real settlement rules, or remove those deductions from ticket payouts.",
    owner: "Product" as const,
    status: "new" as const,
    priority: { frequency: 5 as const, impact: 5 as const, effort: 4 as const },
  },
  {
    finding_id: "HE-047",
    title: "Donations go to the wrong person in the story",
    screen_or_flow: "Checkout donation · settlement · admin reports",
    user_task: "Understand who receives a checkout donation",
    primary_heuristic: "H04" as const,
    secondary_heuristics: ["H02" as const],
    description:
      "Checkout asks fans to donate to Off Axis. Settlement then puts that money in the artist pot. Admin reports treat the same donations as Off Axis income. Fan, artist, and admin each see a different owner.",
    evidence: {
      observed_where: "Checkout donation prompt, settlement allocation, admin reporting",
      observed_behaviour:
        "Donation owner changes between checkout, artist net, and admin income.",
      expected_behaviour:
        "Pick one owner and use it everywhere. If it is for Off Axis, keep it out of artist net. If it is for the artist, say so at checkout. Admin reports follow the same rule.",
    },
    user_impact: "Everyone reports a different truth for the same pound.",
    severity: "high" as const,
    confidence: "high" as const,
    recommendation:
      "Define donation ownership once. Align checkout copy, settlement, and admin reporting to that rule.",
    owner: "Product" as const,
    status: "new" as const,
    priority: { frequency: 4 as const, impact: 4 as const, effort: 3 as const },
  },
  {
    finding_id: "HE-048",
    title: "PRS and platform percent run on the wrong revenue pile",
    screen_or_flow: "Settlement · fee calculation",
    user_task: "Understand what platform and PRS fees apply to",
    primary_heuristic: "H02" as const,
    secondary_heuristics: ["H06" as const],
    description:
      "PRS and platform percents run on tickets plus donations plus merch. Real PRS is usually ticket sales for the show. A t-shirt or a platform donation should not swell that line. A 5 percent commission on merch sits badly next to zero commissions.",
    evidence: {
      observed_where: "Settlement percent fee base",
      observed_behaviour:
        "Percent fees use a combined revenue total instead of ticket sales alone.",
      expected_behaviour:
        "Point percent fees at ticket money only, unless a fee is meant for something else. Name that something else in the breakdown.",
    },
    user_impact: "Artists cannot reconcile the PDF against what they think they sold.",
    severity: "high" as const,
    confidence: "high" as const,
    recommendation:
      "Calculate percent fees on the correct base per line item. Label each fee and what it applies to.",
    owner: "Engineering" as const,
    status: "new" as const,
    priority: { frequency: 4 as const, impact: 4 as const, effort: 3 as const },
  },
  {
    finding_id: "HE-049",
    title: "Support fee can deduct from an empty main support slot",
    screen_or_flow: "Settlement · support fee",
    user_task: "Receive payout when no main support played",
    primary_heuristic: "H05" as const,
    secondary_heuristics: ["H02" as const],
    description:
      "If the gig has a support fee set, it is deducted even when no main support artist actually played. A quiet night with the usual £75 fee can wipe the payout or go negative.",
    evidence: {
      observed_where: "Settlement support fee line",
      observed_behaviour:
        "Support fee applies from gig settings without checking a confirmed main support artist on the bill.",
      expected_behaviour:
        "Only deduct when a main support artist is confirmed on the bill. If the slot is empty, the fee stays at zero.",
    },
    user_impact: "Artists lose money for support that never happened.",
    severity: "high" as const,
    confidence: "high" as const,
    recommendation:
      "Gate support fee deduction on a confirmed main support artist for that gig.",
    owner: "Engineering" as const,
    status: "new" as const,
    priority: { frequency: 3 as const, impact: 5 as const, effort: 2 as const },
  },
  {
    finding_id: "HE-050",
    title: "Settled does not mean paid",
    screen_or_flow: "Post-gig settlement status",
    user_task: "Know whether money has actually left the platform",
    primary_heuristic: "H01" as const,
    secondary_heuristics: ["H02" as const],
    description:
      "After curfew the product writes a number, can email a PDF, and the dashboard can say Settled. Nothing in the product sends money. Status stays calculated.",
    evidence: {
      observed_where: "Artist dashboard and settlement PDF status",
      observed_behaviour:
        "Settled reads as money received. No payout action or paid date is shown.",
      expected_behaviour:
        "Call it a statement until someone marks it paid, or until a real payout exists. Show the date and amount as an estimate until then.",
    },
    user_impact: "Artists think they have been paid when they have only been calculated.",
    severity: "high" as const,
    confidence: "high" as const,
    recommendation:
      "Rename Settled to Statement or Calculated until payout completes. Show paid date when money actually moves.",
    owner: "Product" as const,
    status: "new" as const,
    priority: { frequency: 4 as const, impact: 4 as const, effort: 2 as const },
  },
  {
    finding_id: "HE-051",
    title: "Live settlement and the PDF use different sums",
    screen_or_flow: "Artist dashboard vs settlement PDF",
    user_task: "Trust one payout number",
    primary_heuristic: "H04" as const,
    secondary_heuristics: ["H01" as const, "H06" as const],
    description:
      "The stored settlement includes extra costs admin typed in. The live estimate does not. Gross revenue on the dashboard is labelled as ticket sales, but the number also includes donations and merch.",
    evidence: {
      observed_where: "Dashboard live estimate vs emailed PDF",
      observed_behaviour:
        "Two totals for the same gig. Revenue labels do not match what is inside the number.",
      expected_behaviour:
        "Use one sum in both places. Split revenue lines so tickets, merch, and donations each have their own row.",
    },
    user_impact: "Artists cannot tell which number is real.",
    severity: "high" as const,
    confidence: "high" as const,
    recommendation:
      "Single calculation path for live view and PDF. Separate ticket, merch, and donation rows with honest labels.",
    owner: "Engineering" as const,
    status: "new" as const,
    priority: { frequency: 4 as const, impact: 4 as const, effort: 3 as const },
  },
  {
    finding_id: "HE-052",
    title: "Card fees are shown but not applied consistently",
    screen_or_flow: "Settlement · Stripe and booking fees",
    user_task: "See who pays card processing",
    primary_heuristic: "H02" as const,
    secondary_heuristics: ["H04" as const],
    description:
      "Stripe cost is shown and not taken off the artist. Booking fees are meant to cover it. That can work on a simple ticket order. It is weaker when donations or merch make the card charge bigger than the booking-fee pot, and a mixed basket can hang another gig's card fee on this one.",
    evidence: {
      observed_where: "Settlement card fee lines and booking fee logic",
      observed_behaviour:
        "Card fees appear on the statement but do not follow a clear rule for who pays. Cross-gig attribution can bleed in.",
      expected_behaviour:
        "Decide who eats the card fee and write that into the sum. Attribute Stripe cost to this gig's lines only.",
    },
    user_impact: "The statement hides who actually paid processing.",
    severity: "medium" as const,
    confidence: "medium" as const,
    recommendation:
      "Define card fee ownership in the settlement model and attribute costs per gig line.",
    owner: "Engineering" as const,
    status: "new" as const,
    priority: { frequency: 3 as const, impact: 3 as const, effort: 4 as const },
  },
];

export const offAxisOnboardingEvaluation: HeuristicEvaluation = {
  slug: "off-axis-onboarding",
  title: "Off Axis heuristic evaluation · Part 3",
  client: "Off Axis · Signup, gigs, support, ticketing, credits, and settlement",
  accent: "#A855F7",
  executiveSummary: {
    whatWasEvaluated:
      "Part 3 of the Off Axis review. Artist signup, first gig, support invites, fan checkout, ticket inventory, credits, and post-gig settlement, reviewed from artist, admin, and buyer test paths.",
    usabilityHealth:
      "Settlement breaks trust fastest. Artists are promised 100 percent, then the PDF tells a different story with the wrong labels, the wrong fee base, and no actual payout behind Settled.",
    topIssues: [
      "Artists are told they keep 100 percent but settlement takes more",
      "Sold out never appears on the gig or list",
      "Donations go to the wrong person in the story",
      "Live settlement and the PDF use different sums",
      "Settled does not mean paid",
    ],
    mainRisks: [
      "Artists lose trust the first time they open a settlement PDF",
      "Fans, artists, and admin report different owners for the same donation",
      "Percent fees and support fees apply to the wrong money or empty slots",
      "Fans reach checkout for gigs that are already full",
    ],
    recommendedNextSteps: [
      "Align the 100 percent promise with settlement rules or change the deductions",
      "Unify donation ownership across checkout, settlement, and admin reports",
      "Use one settlement calculation for live view and PDF with honest revenue rows",
      "Rename Settled until payout exists and fix fee bases and support fee gates",
    ],
  },
  scope: {
    evaluatedUrl: "https://offaxistours.com/",
    evaluationDate: "2026-08-26",
    evaluator: "Shaun Leishman",
    userGroups: ["Artists", "Super admins", "Ticket buyers", "Guest checkout"],
    tasksEvaluated: [
      "Sign up as an artist and complete mandatory profile fields",
      "Wait through under-review gating and admin approval",
      "Add a venue as admin and create a first gig as an artist",
      "Publish a gig and invite support from another artist account",
      "Accept a support invitation and review filled slots",
      "Buy tickets as a guest, including basket persistence and checkout",
      "Recover a ticket after payment via email and Find Order",
      "Hit sold-out, per-person limits, holds, and early bird behaviour on small gigs",
      "Review credits versus ticket money in admin and artist-facing copy",
      "Open post-gig settlement PDFs and compare live dashboard figures",
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
    additionalLenses: [],
    limitations: [
      "Desktop review only from supplied test accounts",
      "No screenshots or interactive redesign in this write-up",
      "Findings follow observed behaviour in session notes, not analytics",
      "Admin approve then successful re-login after email verify worked in this pass and is not listed as a finding",
      "Ticket sale count on My gigs updated correctly after purchase and is not listed as a finding",
      "A ticket confirmation email did arrive after purchase. The finding is about QR placement and receipt framing, not delivery failure",
    ],
    timeSpent: "Around 8 hours across signup, ticketing, inventory, and settlement review sessions",
  },
  severitySummary: countSeverity(findings),
  themes: [
    {
      label: "Artist signup and pending approval",
      findingIds: ["HE-001", "HE-002", "HE-003", "HE-004", "HE-005", "HE-006"],
    },
    {
      label: "Venues and first-gig creation",
      findingIds: ["HE-007", "HE-008", "HE-009", "HE-010", "HE-011", "HE-012"],
    },
    {
      label: "Gig form language and structure",
      findingIds: ["HE-013", "HE-014", "HE-015", "HE-016", "HE-017", "HE-018", "HE-019", "HE-020"],
    },
    {
      label: "Support invites, privacy, and navigation",
      findingIds: ["HE-021", "HE-022", "HE-023", "HE-024", "HE-025", "HE-026", "HE-027", "HE-028"],
    },
    {
      label: "Ticketing and checkout",
      findingIds: [
        "HE-029",
        "HE-030",
        "HE-031",
        "HE-032",
        "HE-033",
        "HE-034",
        "HE-035",
      ],
    },
    {
      label: "Ticket inventory and limits",
      findingIds: ["HE-036", "HE-037", "HE-038", "HE-039", "HE-040", "HE-041"],
    },
    {
      label: "Credits and product language",
      findingIds: ["HE-042", "HE-043", "HE-044", "HE-045"],
    },
    {
      label: "Settlement and payouts",
      findingIds: ["HE-046", "HE-047", "HE-048", "HE-049", "HE-050", "HE-051", "HE-052"],
    },
  ],
  findings,
  actionPlan: [
    { priority: "fix_now", action: "Align the 100 percent promise with settlement deductions or remove those cuts" },
    { priority: "fix_now", action: "Unify donation ownership across checkout, settlement, and admin reports" },
    { priority: "fix_now", action: "Use one settlement calculation for live view and PDF with split revenue rows" },
    { priority: "fix_now", action: "Show sold out and low availability before checkout" },
    { priority: "fix_next", action: "Rename Settled until payout exists and gate support fees on confirmed main support" },
    { priority: "fix_next", action: "Calculate percent fees on the correct base and attribute card costs per gig" },
    { priority: "fix_next", action: "Enforce one per-person limit across gig, basket, and checkout" },
    { priority: "fix_next", action: "Persist guest basket across refresh until payment or clear" },
    { priority: "monitor", action: "Wire admin credit rules to the live award and spend job" },
    { priority: "validate", action: "Walk a ten-ticket settlement example with artists before changing public commission copy" },
  ],
};
