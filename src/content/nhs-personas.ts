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
      "Often calls in the middle of the night when anxiety or mental health concerns feel overwhelming. They want human connection and reassurance more than a clinical outcome — and may call repeatedly if the first call does not resolve how they feel.",
    traits: { emotional: 85, thankful: 55, aggravated: 70 },
    expectations: [
      "To speak to someone trained in mental health who will take them seriously.",
      "Faster access when selecting the mental health IVR option.",
    ],
    heardAbout: "Word of mouth, media coverage, and GP or pharmacy signposting.",
    motivations:
      "The need to speak to someone and be heard outweighs researching online. They may not know exactly what is wrong — they need connection and validation.",
    whenTheyCall:
      "Often out of hours, especially late evening and overnight when other support feels unavailable.",
    keyTimes: [45, 55, 40, 25, 20, 30, 50, 70],
    positives:
      "Glad to hear someone's voice once connected. Appreciates when call handlers show empathy, even if the clinical outcome is limited.",
    frustrations: [
      "Long wait times for the mental health IVR option — some deliberately press another option to get through faster.",
      "Perception that call handlers are not trained in mental health.",
      "Frustration when not connected directly to a more advanced practitioner for complex histories.",
    ],
    pullQuotes: [
      "If you select option 1… you should speak to someone who deals with mental health.",
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
      "Often a third-party caller for a loved one with acute symptoms — chest pain, breathing difficulty, or sudden deterioration. Highly emotional and time-sensitive; every minute in the queue feels critical.",
    traits: { emotional: 95, thankful: 70, aggravated: 80 },
    expectations: [
      "To reach a medically trained person quickly.",
      "Clear routing when unsure whether to call 111, 999, or go to A&E.",
    ],
    heardAbout: "Word of mouth from friends, family, or their GP surgery.",
    motivations:
      "To get help quickly or be pointed in the right direction before the situation worsens.",
    whenTheyCall:
      "More likely out of hours when GP access is limited and symptoms feel urgent.",
    keyTimes: [75, 80, 65, 30, 25, 35, 60, 85],
    positives:
      "Intense anxiety eases once a clinical professional is on the line and takes the situation seriously.",
    frustrations: [
      "Long wait times with no indication of queue position or progress.",
      "Too many contact points — repeating details to handler, then nurse, then supervisor.",
      "Lack of direct connection to specialist departments such as mental health.",
    ],
    pullQuotes: [
      "It was a life or death situation, and I needed reassurance that everything would be okay.",
      "I remember getting annoyed at 17 minutes.",
    ],
  },
  {
    id: "confirmation-seeker",
    name: "Confirmation seeker",
    tagline: "Wants reassurance that everything is fine",
    spectrumPosition: 2,
    quote: "If I had a covid test at hand, I probably wouldn't have bothered ringing them.",
    callerSituation:
      "Calls for less serious situations out of caution — often when symptoms are first noticed. Common among first-time parents or people encouraged by family to 'just check'. They want validation, not emergency care.",
    traits: { emotional: 30, thankful: 90, aggravated: 10 },
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
    keyTimes: [15, 20, 35, 55, 70, 65, 50, 25],
    positives:
      "The call handler's questions help them feel thoroughly checked. Thankful for any advice received.",
    frustrations: [
      "Long call wait times.",
      "No feedback while waiting — unsure they are still connected to the queue.",
    ],
    pullQuotes: [
      "The health concern wasn't the worst case scenario.",
      "It's so frustrating having to sit and listen to music… I want to know when I am connected.",
    ],
  },
  {
    id: "breaking-point",
    name: "Breaking point caller",
    tagline: "Calls when a situation is worsening out of hours",
    spectrumPosition: 3,
    quote: "It was a worsening situation and I had to wait too long for a response.",
    callerSituation:
      "Typically calling on behalf of a loved one with a persistent or deteriorating condition. Reaches a breaking point where they can no longer manage alone — medium urgency, worsening but not yet critical.",
    traits: { emotional: 25, thankful: 85, aggravated: 75 },
    expectations: [
      "Low expectations of getting through quickly — they know 111 is busy out of hours.",
    ],
    heardAbout: "Word of mouth, TV, newspaper ads, or their doctor.",
    motivations:
      "Tries online resources first, but calls 111 when symptoms worsen or online information increases anxiety.",
    whenTheyCall:
      "111 is a last resort during out-of-hours periods, usually after trying their GP during the day.",
    keyTimes: [60, 70, 45, 25, 20, 30, 55, 75],
    positives:
      "Values having a service available when the GP is closed. Appreciates thorough, diligent call handlers even when the process involves many questions.",
    frustrations: [
      "Wait times, being put on hold, and waiting for callbacks.",
      "No progress indicator in the queue — not knowing their position.",
    ],
    pullQuotes: [
      "I'd only call 111 if I had to.",
      "I held on for over an hour with no response.",
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
    keyTimes: [20, 25, 80, 75, 60, 45, 35, 20],
    positives:
      "When helpful, 111 can validate the decision to seek care and suggest a sensible next step.",
    frustrations: [
      "Long queue times only to be directed back to the GP practice.",
      "Feeling passed in circles — GP sends to pharmacy, pharmacy sends to 111, 111 sends back to GP.",
      "Difficulty booking GP appointments online in the first place.",
    ],
    pullQuotes: [
      "Easiest and quickest route, makes sense.",
      "Kind of felt I was being told to go round in circles.",
    ],
  },
];

export function getNhsPersona(id: string) {
  return nhsPersonas.find((persona) => persona.id === id);
}
