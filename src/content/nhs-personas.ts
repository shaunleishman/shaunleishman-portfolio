export type NhsPersonaTraits = {
  emotional: number;
  thankful: number;
  aggravated: number;
};

export type NhsPersona = {
  id: string;
  name: string;
  tagline: string;
  spectrumPosition: number;
  quote: string;
  callerSituation: string;
  traits: NhsPersonaTraits;
  expectations: string[];
  heardAbout: string;
  motivations: string;
  whenTheyCall: string;
  /** Persona illustration — board image cropped in UI or standalone character art */
  illustrationSrc: string;
  illustrationAlt: string;
  /** When true, crop the top of a full persona-board image */
  illustrationCropBoard?: boolean;
  /** End-to-end journey map image for this persona */
  journeyMapSrc: string;
  /** Call frequency through the day — 8 buckets from midnight → midnight */
  keyTimes: number[];
  positives: string;
  frustrations: string[];
  pullQuotes: string[];
};

export const NHS_PERSONA_SPECTRUM = {
  uncertain: "Very unsure what is happening",
  certain: "I know what it is that I need",
} as const;

export const nhsPersonas: NhsPersona[] = [
  {
    id: "connection-seeker",
    name: "Connection seeker",
    tagline: "Calls to be heard — often for mental health support",
    spectrumPosition: 0,
    quote: "I think she seemed more interested in drinking her coffee than actually listening to me.",
    callerSituation:
      "Hearing a human voice is at the centre of this person's needs. Dealing with mental health can be tough and may require the need to just have a chat. Connection seekers may call about ongoing long-term treatments, depression, bereavement, loneliness, and substance abuse — and may call repeatedly if the first call does not resolve how they feel.",
    traits: { emotional: 90, thankful: 65, aggravated: 20 },
    expectations: [
      "To feel listened to and heard.",
      "Some expect a call back to check in on them.",
      "Long wait times for the mental health IVR option — some deliberately press another option hoping to get through faster.",
    ],
    heardAbout: "Word of mouth or through the GP IVR system.",
    motivations:
      "To seek comfort, connection, and support. Some may feel fine in the morning but have a bad day and feel triggered, so call 111 in the evening.",
    whenTheyCall:
      "Most frequently during out-of-hours periods (from 10pm/midnight onwards) when loneliness sets in and other support feels unavailable. Often repeat callers.",
    illustrationSrc: "/projects/nhs-111-waiting-times/persona-illustration-connection-seeker.png",
    illustrationAlt: "Illustration of a caller wondering if they are being listened to",
    journeyMapSrc: "/projects/nhs-111-waiting-times/journey-connection-seeker.png",
    keyTimes: [92, 85, 75, 28, 22, 35, 60, 90],
    positives:
      "Callers often feel supported when connected to a member of the call handling team. Glad to hear someone's voice once connected.",
    frustrations: [
      "High demand for mental health concerns leads to perceived long wait times — some manipulate the IVR to get answered faster.",
      "Perception that call handlers are not trained in mental health.",
      "Frustration when not connected directly to a more advanced practitioner for complex histories.",
    ],
    pullQuotes: [
      "If you select option 1… you should speak to someone who deals with mental health.",
      "I dunno if [the call handler] was taking me seriously.",
      "She just seemed more like interested in getting off the phone to be honest.",
    ],
  },
  {
    id: "distressed-caller",
    name: "Distressed caller",
    tagline: "Acute symptoms — high anxiety, needs help fast",
    spectrumPosition: 1,
    quote: "So when he is not himself, I go straight to oh my God he's gonna die.",
    callerSituation:
      "Often a third-party caller for a loved one with acute symptoms — chest pain, breathing difficulty, or sudden deterioration. Highly emotional, anxious, and time-sensitive; every minute in the queue feels critical.",
    traits: { emotional: 90, thankful: 50, aggravated: 85 },
    expectations: [
      "To reach a medically trained person as soon as possible.",
      "To use 111 to identify the best next steps when unfamiliar with urgent care routes.",
    ],
    heardAbout: "Word of mouth from friends, family, or their GP surgery.",
    motivations:
      "To get help quickly for a loved one or be pointed in the right direction before the situation worsens.",
    whenTheyCall:
      "More likely out of hours when GP access is limited and symptoms feel urgent.",
    illustrationSrc: "/projects/nhs-111-waiting-times/persona-distressed-caller.png",
    illustrationAlt: "Illustration of a distressed caller on the phone",
    illustrationCropBoard: true,
    journeyMapSrc: "/projects/nhs-111-waiting-times/journey-distressed-caller.png",
    keyTimes: [85, 80, 65, 30, 25, 35, 60, 82],
    positives:
      "Intense anxiety eases once a clinical professional is on the line and takes the situation seriously.",
    frustrations: [
      "Long wait times with no indication of queue position or progress.",
      "Too many contact points — repeating details to handler, then nurse, then supervisor.",
      "The repetitive nature of questions at each stage — \"It's like groundhog day.\"",
      "Not being connected directly to specialist departments such as mental health.",
    ],
    pullQuotes: [
      "It was a life or death situation, and I needed reassurance that everything would be okay.",
      "I remember getting annoyed at 17 minutes.",
      "Google's terrifying.",
    ],
  },
  {
    id: "confirmation-seeker",
    name: "Confirmation seeker",
    tagline: "Wants reassurance that everything is fine",
    spectrumPosition: 2,
    quote: "If I had a covid test at hand, I probably wouldn't have bothered ringing them.",
    callerSituation:
      "Calls for less serious situations out of caution — often when symptoms are first noticed. Common among first-time parents or people encouraged by family to \"just check.\" They want validation, not emergency care.",
    traits: { emotional: 75, thankful: 90, aggravated: 10 },
    expectations: [
      "Confirmation that everything is OK.",
      "Clear advice on what to do next.",
    ],
    heardAbout:
      "Word of mouth, TV or newspaper ads, or GP surgery answerphone messages.",
    motivations:
      "To hear a qualified voice confirming what they already suspect — that there is nothing to worry about.",
    whenTheyCall:
      "Usually between 8am and midnight, often after work or before bedtime.",
    illustrationSrc: "/projects/nhs-111-waiting-times/persona-confirmation-seeker.png",
    illustrationAlt: "Illustration of a confirmation seeker checking their phone while walking",
    illustrationCropBoard: true,
    journeyMapSrc: "/projects/nhs-111-waiting-times/journey-confirmation-seeker.png",
    keyTimes: [8, 10, 18, 72, 95, 78, 88, 52],
    positives:
      "The call handler's questions help them feel thoroughly checked. Thankful for any advice received.",
    frustrations: [
      "Long call wait times.",
      "No feedback while waiting — unsure they are still connected to the queue.",
      "Wishes there was higher priority for those calling about children.",
    ],
    pullQuotes: [
      "The health concern wasn't the worst case scenario.",
      "It's so frustrating having to sit and listen to music… I want to know when I am connected.",
      "My son wasn't well after his injections, just wanted to confirm that if everything is ok…",
    ],
  },
  {
    id: "breaking-point",
    name: "Breaking point caller",
    tagline: "Calls when a situation is worsening out of hours",
    spectrumPosition: 3,
    quote: "It was a worsening situation and I had to wait too long for a response.",
    callerSituation:
      "Typically calling on behalf of a loved one with a persistent or deteriorating condition. Reaches a breaking point where they can no longer manage alone — medium urgency, worsening but not yet critical. Often experienced parents or carers.",
    traits: { emotional: 25, thankful: 85, aggravated: 75 },
    expectations: [
      "Low expectations of getting through quickly — they know 111 is busy out of hours.",
      "Higher expectations around what the call should provide when monitoring an ongoing health concern.",
    ],
    heardAbout: "Word of mouth, TV, newspaper ads, or their doctor.",
    motivations:
      "Tries online resources first, but calls 111 when symptoms worsen or online information increases anxiety. Some distrust online sources and prefer speaking to a human.",
    whenTheyCall:
      "111 is a last resort during out-of-hours periods, usually after trying their GP during the day.",
    illustrationSrc: "/projects/nhs-111-waiting-times/persona-breaking-point.png",
    illustrationAlt: "Illustration of a breaking point caller in a wheelchair",
    illustrationCropBoard: true,
    journeyMapSrc: "/projects/nhs-111-waiting-times/journey-breaking-point.png",
    keyTimes: [88, 75, 45, 22, 18, 28, 55, 80],
    positives:
      "Values having a service available when the GP is closed. Appreciates thorough, diligent call handlers even when the process involves many questions.",
    frustrations: [
      "Wait times, being put on hold, and waiting for callbacks — feeling there are not enough nurses on shift.",
      "No progress indicator in the queue — not knowing their position.",
      "Repetitive questions at each stage in the chain of command.",
      "Unclear what is classed as \"an emergency\" versus \"urgent.\"",
    ],
    pullQuotes: [
      "I'd only call 111 if I had to.",
      "I held on for over an hour with no response.",
      "I use 111 as a last resort as there is long wait times and I feel guilty not knowing if they are the correct route to take.",
    ],
  },
  {
    id: "gp-substitute",
    name: "GP substitute",
    tagline: "Uses 111 when GP access is blocked",
    spectrumPosition: 4,
    quote: "Trying to get an appointment with GP is pretty impossible these days so I'll call 111.",
    callerSituation:
      "Unable to get a GP appointment and referred by receptionists or pharmacists. Treats 111 as a faster route to the care they would have asked their GP for — not always understanding 111's remit.",
    traits: { emotional: 40, thankful: 60, aggravated: 65 },
    expectations: [
      "To get GP-level advice or an appointment pathway without waiting days.",
      "A single route rather than being passed between services.",
    ],
    heardAbout:
      "GP IVR systems, word of mouth, or signposting from pharmacy and reception staff.",
    motivations:
      "111 feels like the quickest channel when GP booking is impossible or online booking fails.",
    whenTheyCall:
      "Weekday daytime and early evening when GP access has already been attempted.",
    illustrationSrc: "/projects/nhs-111-waiting-times/persona-illustration-gp-substitute.png",
    illustrationAlt: "Illustration of a caller uncertain about which service to use",
    journeyMapSrc: "/projects/nhs-111-waiting-times/journey-gp-substitute.png",
    keyTimes: [12, 10, 22, 72, 95, 82, 48, 18],
    positives:
      "When helpful, 111 can validate the decision to seek care and suggest a sensible next step.",
    frustrations: [
      "Long queue times only to be directed back to the GP practice.",
      "Feeling passed in circles — GP sends to pharmacy, pharmacy sends to 111, 111 sends back to GP.",
      "Very difficult to get a GP appointment and long waiting times.",
      "Difficulty booking GP appointments online in the first place.",
    ],
    pullQuotes: [
      "Easiest and quickest route, makes sense.",
      "Kind of felt I was being told to go round in circles.",
      "GP said pharmacy, pharmacy said call 111. Although they helped and gave me advice the outcome was visit GP.",
    ],
  },
];

export function getNhsPersona(id: string) {
  return nhsPersonas.find((persona) => persona.id === id);
}
