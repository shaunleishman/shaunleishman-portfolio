export type NhsJourneyStage = {
  label: string;
  description?: string;
  frustration?: string;
  frustrationHighlight?: boolean;
  quote?: string;
  emotion: number;
};

export type NhsJourneyMap = {
  personaId: string;
  stages: NhsJourneyStage[];
};

const STAGE_LABELS = {
  heard: "Heard about 111",
  expectations: "Expectations around 111 are set",
  trigger: "Health event trigger",
  online: "Inquiring online resources",
  channels: "Decide between channels",
  call: "Make the call",
  ivr: "Decide on IVR option",
  queue: "Join call queue",
  handler: "Speak to call handler",
  hold: "Put on hold",
  supervisor: "Speak to clinical supervisor",
  outcome: "Outcome of call",
  after: "After call",
} as const;

function stage(
  key: keyof typeof STAGE_LABELS,
  data: Omit<NhsJourneyStage, "label"> & { label?: string },
): NhsJourneyStage {
  return { label: data.label ?? STAGE_LABELS[key], ...data };
}

export const nhsJourneyMaps: Record<string, NhsJourneyMap> = {
  "connection-seeker": {
    personaId: "connection-seeker",
    stages: [
      stage("heard", {
        emotion: 55,
        description: "Heard via word of mouth and the media.",
        frustration: "Needs clarity on the purpose of different services.",
        quote: "More advertisement so the public know when to get in touch.",
      }),
      stage("expectations", {
        emotion: 58,
        description: "Expects to speak to someone who can reassure and calm them in times of need.",
      }),
      stage("trigger", {
        emotion: 32,
        description: "A range of circumstances can trigger a call, often in the middle of the night.",
      }),
      stage("online", {
        emotion: 48,
        description: "The desire to be heard outweighs the need to research online first.",
        quote: "There should be more information or support for dealing with people with mental health issues.",
      }),
      stage("channels", {
        emotion: 62,
        description: "For mental health concerns, 111 is often seen as the only available option.",
      }),
      stage("call", {
        emotion: 58,
        description: "Threshold for calling is lower if a previous call was unresolved.",
      }),
      stage("ivr", {
        emotion: 28,
        description: "May choose an option other than mental health just to get through sooner.",
        frustration:
          "Long waits for the mental health IVR option lead some to press another option hoping to be seen faster.",
        frustrationHighlight: true,
        quote: "If you select option 1… you should speak to someone who deals with mental health.",
      }),
      stage("queue", {
        emotion: 22,
        description: "Call demand is particularly high for mental health concerns.",
        frustrationHighlight: true,
      }),
      stage("handler", {
        emotion: 24,
        description: "Glad to hear a voice, but experiences vary; some feel they are not taken seriously.",
        frustration:
          "Perception that handlers are not trained in mental health, and frustration when not connected to a more advanced practitioner.",
        frustrationHighlight: true,
        quote: "I think she seemed more interested in drinking her coffee than actually listening to me.",
      }),
      stage("hold", {
        emotion: 30,
        quote: "She just seemed more interested in getting off the phone. Call handlers should be more sympathetic.",
      }),
      stage("supervisor", {
        emotion: 68,
        description: "May be put on hold again if the supervisor needs to escalate further.",
      }),
      stage("outcome", {
        emotion: 72,
        description: "May receive specialised help for a short time, or feel misunderstood if not.",
        quote: "My GP is not there 24/7. I can't call my GP at 8pm at night.",
      }),
      stage("after", {
        emotion: 40,
        description: "Lack of resolution leads some connection seekers to call repeatedly.",
        quote: "You will get return callers, a lot more of them are mental health things.",
      }),
    ],
  },
  "distressed-caller": {
    personaId: "distressed-caller",
    stages: [
      stage("heard", {
        emotion: 50,
        description: "Heard through word of mouth, friends, family, or GP.",
        frustration: "Lack of clarity on when to call 111 vs GP vs A&E.",
        quote: "Make the split between GP, A&E, minor injuries, and 111 a lot clearer.",
      }),
      stage("expectations", {
        emotion: 52,
        description: "No time to set expectations, focused on an immediate solution.",
        quote: "I wasn't in the frame of mind to properly read through and understand what I was reading online.",
      }),
      stage("trigger", {
        emotion: 18,
        description: "An acute, urgent need, chest pain, breathing difficulty, or sudden deterioration.",
      }),
      stage("online", {
        emotion: 12,
        description: "Often no time for online research; those who search are often terrified by what they find.",
        quote: "Google's terrifying.",
      }),
      stage("channels", {
        emotion: 38,
        description: "Unsure what qualifies for 999; expects long A&E waits, so calls 111.",
        quote: "If it's out of hours and serious, it's 111. If it's extreme then 999.",
      }),
      stage("call", {
        emotion: 45,
        description: "Does not hesitate to contact when symptoms feel urgent.",
      }),
      stage("ivr", {
        emotion: 42,
        description: "May press any button to get through faster; expects a medical professional immediately.",
      }),
      stage("queue", {
        emotion: 25,
        description: "Keeps the phone close while waiting.",
        frustration: "Long wait times with no progress indicator cause anxiety.",
        quote: "Have a triage system for urgent calls.",
      }),
      stage("handler", {
        emotion: 38,
        description: "Relief at getting through, but still anxious about perceived lack of medical expertise.",
        frustration: "Time feels lost speaking to a non-specialist instead of medical staff.",
        frustrationHighlight: true,
        quote: "When getting to the information gathering point, it's quite laborious and takes a long time.",
      }),
      stage("hold", {
        emotion: 28,
        description: "Monitors whether to hang up and call 999 instead.",
        frustration: "Being put on hold significantly impacts an already anxious caller.",
        frustrationHighlight: true,
        quote: "The delay to the nurse… terrifying. I remember getting annoyed at 17 minutes.",
      }),
      stage("supervisor", {
        emotion: 55,
        frustration: "Too many contact points and repetitive questioning through the chain of command.",
        frustrationHighlight: true,
        quote: "Unsure, can be difficult to convey the issue without being physically seen.",
      }),
      stage("outcome", {
        emotion: 78,
        description: "Often directed to call 999 or go to A&E.",
      }),
      stage("after", {
        emotion: 65,
        description: "No expectation of further communication after the call.",
      }),
    ],
  },
  "confirmation-seeker": {
    personaId: "confirmation-seeker",
    stages: [
      stage("heard", {
        emotion: 58,
        description: "Word of mouth, TV or newspaper ads, or GP surgery messages.",
      }),
      stage("expectations", {
        emotion: 60,
        description: "Moderate expectations, thankful for any advice; some are first-time callers.",
      }),
      stage("trigger", {
        emotion: 48,
        description: "Ambiguous symptoms have suddenly been noticed.",
      }),
      stage("online", {
        emotion: 52,
        description: "Some research online; others call directly to hear a reassuring, qualified voice.",
      }),
      stage("channels", {
        emotion: 62,
        description: "Calls 111 as the matter is typically less serious or critical.",
        quote: "My son wasn't well after his injections, I just wanted to confirm everything was OK.",
      }),
      stage("call", {
        emotion: 65,
        description: "Wants a voice confirming there is nothing to worry about and what to do next.",
        quote: "It was out of hours, and I needed advice regarding my elderly relative's health concerns.",
      }),
      stage("ivr", {
        emotion: 50,
        frustration: "Wishes there was higher priority for callers phoning on behalf of children.",
        quote: "We called about my daughter (aged 3), it felt like a long time waiting for her.",
      }),
      stage("queue", {
        emotion: 30,
        frustration:
          "Long wait times and no feedback while in the queue, unsure they are still connected.",
        frustrationHighlight: true,
        quote: "Shorten wait times, have an online live chat option.",
      }),
      stage("handler", {
        emotion: 72,
        description: "Despite long waits, relieved to get through to someone.",
      }),
      stage("hold", {
        emotion: 45,
      }),
      stage("supervisor", {
        emotion: 68,
        description: "May be put on hold again if escalation is needed.",
      }),
      stage("outcome", {
        emotion: 70,
        description: "Directed to self-care, GP, or A&E if symptoms are deemed more serious.",
      }),
      stage("after", {
        emotion: 55,
        description: "Would welcome follow-up reassurance if the situation worsens.",
        quote: "Possibly send a text summary of advice given.",
      }),
    ],
  },
  "breaking-point": {
    personaId: "breaking-point",
    stages: [
      stage("heard", {
        emotion: 52,
        description: "Word of mouth, TV, newspaper ads, or their doctor.",
        frustration: "Clarity on when to call 111 vs GP vs A&E.",
        quote: "Better explain the purpose of the service.",
      }),
      stage("expectations", {
        emotion: 48,
        description: "Low expectations of getting through quickly, knows 111 is busy out of hours.",
      }),
      stage("trigger", {
        emotion: 35,
        description: "A persistent or deteriorating condition reaches a point where they can no longer manage alone.",
      }),
      stage("online", {
        emotion: 40,
        description: "Tries online resources first; calls when symptoms worsen or online info increases anxiety.",
      }),
      stage("channels", {
        emotion: 42,
        description: "May feel they can handle it themselves even when A&E might be appropriate.",
        frustration: "Unclear what is classed as an emergency versus urgent.",
      }),
      stage("call", {
        emotion: 32,
        description: "111 is a last resort during out-of-hours periods.",
        quote: "I'd only call 111 if I had to.",
      }),
      stage("ivr", {
        emotion: 38,
      }),
      stage("queue", {
        emotion: 28,
        frustration: "Long wait times with no indicator of queue position.",
        quote: "I held on for over an hour with no response.",
      }),
      stage("handler", {
        emotion: 30,
        frustration: "Wait times, being put on hold, and impression of low staffing on shift.",
        frustrationHighlight: true,
      }),
      stage("hold", {
        emotion: 32,
        frustration: "Repetitive questions at each stage in the chain of command.",
        frustrationHighlight: true,
      }),
      stage("supervisor", {
        emotion: 48,
        quote: "All the details I gave to the call handler… I did have to repeat to the nurse.",
      }),
      stage("outcome", {
        emotion: 75,
        description: "Often directed to self-care, GP appointment, or A&E depending on urgency.",
      }),
      stage("after", {
        emotion: 50,
        quote: "I use 111 as a last resort, long wait times and I feel guilty not knowing if it's the correct route.",
      }),
    ],
  },
  "gp-substitute": {
    personaId: "gp-substitute",
    stages: [
      stage("heard", {
        emotion: 55,
        description: "GP IVR system, word of mouth, or signposting from pharmacy and reception.",
        frustration: "Clarity on the purpose of different services.",
      }),
      stage("expectations", {
        emotion: 58,
        description: "Expectations set by GPs, receptionists, pharmacists, and past experience of 111.",
      }),
      stage("trigger", {
        label: "Trigger event to call 111",
        emotion: 32,
        description: "Unable to get a GP appointment, can't wait, or referred by receptionist/pharmacist.",
        frustration: "Very difficult to get a GP appointment; hard to book online.",
        quote: "Trying to get an appointment with GP is pretty impossible these days so I called 111.",
      }),
      stage("online", {
        emotion: 38,
        frustration: "Unable to book GP appointments online.",
        quote: "Would be good to book a health appointment through 111 after speaking to their professionals.",
      }),
      stage("channels", {
        emotion: 68,
        description: "Some feel 111 is the fastest channel; others hope it leads to a GP appointment.",
        quote: "Easiest and quickest route, makes sense.",
      }),
      stage("call", {
        emotion: 70,
      }),
      stage("ivr", {
        emotion: 65,
      }),
      stage("queue", {
        emotion: 42,
        frustration:
          "Long queue times only to be directed back to the GP practice, enquiry deemed non-urgent or outside 111 remit.",
        frustrationHighlight: true,
      }),
      stage("handler", {
        emotion: 48,
        description: "Often directed back to GP by the call handler.",
        quote: "GP said pharmacy, pharmacy said call 111. Although they helped, the outcome was visit GP.",
      }),
      stage("hold", {
        emotion: 45,
      }),
      stage("supervisor", {
        emotion: 48,
      }),
      stage("outcome", {
        emotion: 40,
        description: "Directed to book an appointment with GP.",
      }),
      stage("after", {
        emotion: 45,
        quote: "Kind of felt I was being told to go round in circles.",
      }),
    ],
  },
};

export function getNhsJourneyMap(personaId: string): NhsJourneyMap | undefined {
  return nhsJourneyMaps[personaId];
}
