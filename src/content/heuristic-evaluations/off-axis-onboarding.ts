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
];

export const offAxisOnboardingEvaluation: HeuristicEvaluation = {
  slug: "off-axis-onboarding",
  title: "Off Axis heuristic evaluation · Part 3",
  client: "Off Axis · Artist signup, first gig, and support",
  accent: "#A855F7",
  executiveSummary: {
    whatWasEvaluated:
      "Part 3 of the Off Axis review. Artist signup and pending approval, create first gig, admin venue setup, and support invite flows, reviewed on desktop from artist and super-admin test accounts.",
    usabilityHealth:
      "Signup and first-gig creation still fight the artist. The sharpest risks are missing venue propose, venues not appearing for artists, Gig not found after create, and street addresses shown when picking support.",
    topIssues: [
      "No artist path to propose a missing venue",
      "Admin venues not appearing in artist create gig",
      "Create gig ends on Gig not found",
      "Support candidate list exposes street addresses",
      "Pending approval locks artists out of the product",
    ],
    mainRisks: [
      "Artists cannot create a first gig when the venue list is incomplete",
      "Personal addresses leak between artists",
      "Successful creates look like failures after Gig not found",
      "Onboarding lockdown and heavy signup fields drive drop-off before first value",
    ],
    recommendedNextSteps: [
      "Remove street addresses from artist-to-artist discovery",
      "Fix post-create redirect and venue list refresh for artists",
      "Add artist venue propose with admin review and duplicate checks",
      "Shorten signup and allow limited access while pending approval",
    ],
  },
  scope: {
    evaluatedUrl: "https://offaxistours.com/",
    evaluationDate: "2026-08-26",
    evaluator: "Shaun Leishman",
    userGroups: ["Artists", "Super admins"],
    tasksEvaluated: [
      "Sign up as an artist and complete mandatory profile fields",
      "Wait through under-review gating and admin approval",
      "Add a venue as admin and create a first gig as an artist",
      "Publish a gig and invite support from another artist account",
      "Accept a support invitation and review filled slots",
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
    ],
    timeSpent: "Around 4 hours across signup and first-gig review sessions",
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
  ],
  findings,
  actionPlan: [
    { priority: "fix_now", action: "Remove street addresses from support candidate discovery" },
    { priority: "fix_now", action: "Fix create-gig redirect so new gigs do not land on Gig not found" },
    { priority: "fix_now", action: "Make newly approved venues appear in artist create-gig lists by city" },
    { priority: "fix_now", action: "Add artist venue propose with admin review and duplicate prevention" },
    { priority: "fix_next", action: "Shorten signup fields and make avatar optional" },
    { priority: "fix_next", action: "Allow limited access while accounts are pending approval" },
    { priority: "fix_next", action: "Clarify draft vs published before support invite, and email on publish" },
    { priority: "fix_next", action: "Simplify My gigs cards and add artist secondary navigation" },
    { priority: "monitor", action: "Rename cover image to gig poster and clarify early bird and discount labels" },
    { priority: "validate", action: "Test support invite confirm and decline reasons with a small artist set" },
  ],
};
