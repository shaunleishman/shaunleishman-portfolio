"use client";

import { useMemo, useRef, useState } from "react";
import {
  Accessibility,
  ArrowLeft,
  ArrowRight,
  AtSign,
  Calendar,
  Camera,
  Check,
  ChevronDown,
  ChevronUp,
  Clock,
  ExternalLink,
  Globe,
  Mail,
  MapPin,
  Minus,
  Music,
  Plus,
  RotateCcw,
  Search,
  Share2,
  ShieldCheck,
  ShoppingCart,
  Ticket,
  Trash2,
  User,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { offAxisRedesignCallouts } from "@/content/heuristic-evaluations/off-axis-tours";
import type { RedesignCallout } from "@/content/heuristic-evaluations/types";
import { useRedesignPreview } from "./RedesignPreviewContext";
import { RedesignCalloutRegion } from "./RedesignFindingIndicator";

/** Dark palette sampled from the live site (June 2026) */
const OA = {
  bg: "#09090B",
  surface: "#18181B",
  border: "#27272A",
  text: "#FAFAFA",
  muted: "#A1A1AA",
  secondary: "#D4D4D8",
  accent: "#A855F7",
  accent2: "#EC4899",
} as const;

const PAGE_GUTTER = "px-4 sm:px-6";
const CONTENT = "mx-auto w-full max-w-5xl";
const ACCENT_GRADIENT = `linear-gradient(to right, ${OA.accent}, ${OA.accent2})`;
const BOOKING_FEE = 1.25;

type View =
  | "home"
  | "artists"
  | "gigs"
  | "venues"
  | "login"
  | "signup"
  | "artist"
  | "event"
  | "venue"
  | "account"
  | "subscriptions"
  | "checkout";
type SignupRole = "fan" | "artist" | "venue";

type Artist = {
  name: string;
  genre: string;
  location: string;
  bio: string;
  soundsLike: string[];
  tags: string[];
};

/** Real, complete profiles only — test and empty accounts are excluded (HE-003) */
const ARTISTS: Artist[] = [
  { name: "FAEDA", genre: "Indie", location: "Thurso", bio: "Four-piece indie rock from the Scottish Highlands, known for relentlessly energetic shows.", soundsLike: ["The Snuts", "Inhaler", "Catfish and the Bottlemen"], tags: ["High energy", "Anthemic", "Festival-ready"] },
  { name: "PILOSA", genre: "Psych", location: "Glasgow", bio: "Psychedelic rock project with an overarching narrative set in a land of over-evolved sloths.", soundsLike: ["Tame Impala", "King Gizzard", "Pond"], tags: ["Trippy", "Concept-driven", "Hypnotic"] },
  { name: "Clay Rings", genre: "Indie", location: "Glasgow", bio: "Members from Scotland, England, Spain and Italy bringing a pop of colour to the scene.", soundsLike: ["Phoenix", "Two Door Cinema Club", "Foals"], tags: ["Colourful", "Danceable", "Upbeat"] },
  { name: "Eyes of Home", genre: "Indie", location: "Edinburgh", bio: "Emotional, upbeat indie for fans of Franz Ferdinand, The Killers and The Strokes.", soundsLike: ["Franz Ferdinand", "The Killers", "The Strokes"], tags: ["Emotional", "Upbeat", "Singalong"] },
  { name: "Foreign Mornings", genre: "Alt rock", location: "Belfast", bio: "Fast-paced alt rock championed by Radio 1, BBC Introducing and Hot Press.", soundsLike: ["Twin Atlantic", "Nothing But Thieves", "Royal Blood"], tags: ["Fast-paced", "Radio-backed", "Driving"] },
  { name: "Dear Heather", genre: "Alt rock", location: "Manchester", bio: "Fun, theatrical, slightly chaotic live shows for fans of The Pixies and the Beastie Boys.", soundsLike: ["Pixies", "Beastie Boys", "IDLES"], tags: ["Theatrical", "Chaotic", "Fun"] },
  { name: "Sonnet", genre: "Indie", location: "Aberdeen", bio: "Indie rock quartet for fans of The Snuts, The Verve, Ride and Oasis.", soundsLike: ["The Verve", "Ride", "Oasis"], tags: ["Anthemic", "Melodic", "Guitar-led"] },
  { name: "OCEANLESS", genre: "Rock", location: "Manchester", bio: "Tireless touring duo who have played Belladrum Tartan Heart Festival and beyond.", soundsLike: ["Royal Blood", "Drenge", "Slaves"], tags: ["Heavy", "Riff-driven", "Two-piece"] },
  { name: "Ned Ashcroft", genre: "Folk", location: "London", bio: "Sold-out hometown gigs and 45-date UK and European tours blending folk and singer-songwriter.", soundsLike: ["Ben Howard", "Dermot Kennedy", "Lewis Capaldi"], tags: ["Heartfelt", "Acoustic", "Storytelling"] },
  { name: "Lemon Drink", genre: "Indie", location: "Glasgow", bio: "Five-piece blending infectious hooks, killer choruses and bold, sassy energy.", soundsLike: ["Wet Leg", "The Big Moon", "Dream Wife"], tags: ["Sassy", "Hooky", "Bold"] },
  { name: "Pivots", genre: "Post-punk", location: "Paris", bio: "A three-piece fusing post-punk, shoegaze and sample-based music. Think New Order meets J Dilla.", soundsLike: ["New Order", "Slowdive", "J Dilla"], tags: ["Atmospheric", "Sample-based", "Hypnotic"] },
  { name: "Harry Miles-Watson", genre: "Folk", location: "Edinburgh", bio: "A melting pot of post-punk, folk, country, rock, pop and even jazz.", soundsLike: ["King Krule", "Fontaines D.C.", "Black Country, New Road"], tags: ["Genre-blending", "Eclectic", "Lyrical"] },
];

const GENRES = ["All", "Indie", "Alt rock", "Rock", "Folk", "Psych", "Post-punk"] as const;
type Genre = (typeof GENRES)[number];

type Gig = {
  id: string;
  /** Headline act — used as the event H1 (HE-020) */
  artist: string;
  date: string;
  doors: string;
  curfew: string;
  venue: string;
  city: string;
  price: number;
  capacity: number;
  about: string;
  support?: string[];
  ended?: boolean;
};

const GIGS: Gig[] = [
  { id: "harry-waiting-room", artist: "Harry Miles-Watson", date: "Fri 26 Jun 2026", doors: "19:00", curfew: "22:00", venue: "The Waiting Room", city: "Glasgow", price: 10, capacity: 100, about: "A melting pot of post-punk, folk, country, rock, pop and even jazz, Harry Miles-Watson brings his genre-blending live show to Glasgow as part of the Off Axis gig swap.", support: ["Sonnet", "Clay Rings"] },
  { id: "sonnet-elgin", artist: "Sonnet", date: "Fri 19 Jun 2026", doors: "19:30", curfew: "23:00", venue: "Elgin Town Hall", city: "Elgin", price: 12.45, capacity: 250, about: "Aberdeen indie rock quartet Sonnet headline Elgin Town Hall with anthemic, guitar-led tunes for fans of The Verve and Oasis." },
  { id: "brittle-tooth", artist: "Dear Heather", date: "Sat 20 Jun 2026", doors: "19:00", curfew: "22:30", venue: "The Tooth and Claw", city: "Inverness", price: 10, capacity: 120, about: "Theatrical and slightly chaotic, Dear Heather take over The Tooth and Claw for a fun, high-energy night." },
  { id: "ned-waiting-room", artist: "Ned Ashcroft", date: "Fri 19 Jun 2026", doors: "19:00", curfew: "22:00", venue: "The Waiting Room", city: "Glasgow", price: 10, capacity: 100, about: "Heartfelt folk and singer-songwriter sets from Ned Ashcroft, fresh off a 45-date UK and European tour." },
  { id: "lemon-digbeth", artist: "Lemon Drink", date: "Fri 19 Jun 2026", doors: "19:30", curfew: "23:00", venue: "Dead Wax Digbeth", city: "Birmingham", price: 12, capacity: 200, about: "Glasgow five-piece Lemon Drink bring infectious hooks and bold, sassy energy to Birmingham." },
  { id: "pivots-waiting-room", artist: "Pivots", date: "Fri 3 Jul 2026", doors: "19:00", curfew: "22:00", venue: "The Waiting Room", city: "Glasgow", price: 10, capacity: 100, about: "Paris three-piece Pivots fuse post-punk, shoegaze and sample-based music for a hypnotic Glasgow debut." },
  { id: "eyes-of-home-waiting-room", artist: "Eyes of Home", date: "Sat 4 Jul 2026", doors: "19:00", curfew: "22:30", venue: "The Waiting Room", city: "Glasgow", price: 11, capacity: 100, about: "Edinburgh's Eyes of Home bring their emotional, upbeat indie to Glasgow as part of the Off Axis gig swap, with singalong hooks for fans of Franz Ferdinand and The Killers.", support: ["Clay Rings", "Lemon Drink"] },
];

type Venue = {
  name: string;
  location: string;
  upcoming: number;
};

const VENUES: Venue[] = [
  { name: "The Waiting Room", location: "Glasgow", upcoming: 4 },
  { name: "Elgin Town Hall", location: "Elgin", upcoming: 2 },
  { name: "The Tooth and Claw", location: "Inverness", upcoming: 3 },
  { name: "Dead Wax Digbeth", location: "Birmingham", upcoming: 2 },
  { name: "Sneaky Pete's", location: "Edinburgh", upcoming: 5 },
  { name: "Bennigans", location: "Derry", upcoming: 1 },
];

const HOW_IT_WORKS = [
  { step: "1", title: "Swap a gig", text: "Artists trade home-town shows with bands in other cities to reach new crowds." },
  { step: "2", title: "Book the night", text: "Fans browse upcoming gigs and grab tickets, as a member or a guest." },
  { step: "3", title: "Play to new fans", text: "Everyone supports the underground scene and grows their audience." },
] as const;

type SubTier = {
  name: string;
  price: string;
  period: string;
  summary: string;
  perks: string[];
  highlight?: boolean;
  badge?: string;
  /** Index of the perk that carries the HE-026 clarity fix */
  clarifiedPerk?: number;
};

const SUB_TIERS: SubTier[] = [
  { name: "Local", price: "£5", period: "/month", summary: "Dip into your local scene.", perks: ["1 free ticket every month", "Hometown gigs only", "Member-only presales", "Cancel anytime"] },
  { name: "Local+", price: "£8", period: "/month", summary: "Go out more, for less.", perks: ["3 free tickets every month", "Hometown gigs only", "Member-only presales", "Cancel anytime"] },
  { name: "Anywhere", price: "£12", period: "/month", summary: "Any gig, any city.", highlight: true, badge: "Most popular", perks: ["4 free tickets every month", "Any gig in any city", "Member-only presales", "Cancel anytime"] },
  { name: "Fan Annual", price: "£120", period: "/year", summary: "Best value for superfans.", badge: "Best value", clarifiedPerk: 1, perks: ["4 free tickets every month, any city", "Pay for 10 months and get 12. That's 2 free months, about £10 a month", "1 free ticket on every single gig", "Cancel anytime"] },
];

const ACCOUNT_TABS = ["Details", "Activity", "Transactions", "Referrals", "Security"] as const;
type AccountTab = (typeof ACCOUNT_TABS)[number];

const USER = { name: "Shaun Leishman", first: "Shaun", email: "shaun@example.com", joined: "18 Jun 2026", emailVerified: false };

/** Deterministic gradient + initials fallback so a card never shows an empty box (HE-007) */
function avatarGradient(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) hash = (hash * 31 + name.charCodeAt(i)) % 360;
  const a = hash;
  const b = (hash + 60) % 360;
  return `linear-gradient(135deg, hsl(${a} 70% 28%), hsl(${b} 65% 18%))`;
}

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/**
 * Real Unsplash photos layered over the gradient fallback. Each pool entry is a
 * verified `images.unsplash.com` CDN URL (HTTP 200). If a photo fails to load,
 * the browser falls back to the gradient that sits underneath it.
 */
const ARTIST_PHOTOS = [
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=70",
  "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=70",
  "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=800&q=70",
  "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=800&q=70",
  "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=800&q=70",
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=70",
  "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=70",
  "https://images.unsplash.com/photo-1565035010268-a3816f98589a?auto=format&fit=crop&w=800&q=70",
  "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&w=800&q=70",
  "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=70",
] as const;

const VENUE_PHOTOS = [
  "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=70",
  "https://images.unsplash.com/photo-1499364615650-ec38552f4f34?auto=format&fit=crop&w=800&q=70",
  "https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?auto=format&fit=crop&w=800&q=70",
  "https://images.unsplash.com/photo-1468359601543-843bfaef291a?auto=format&fit=crop&w=800&q=70",
  "https://images.unsplash.com/photo-1526749464606-83091e34a261?auto=format&fit=crop&w=800&q=70",
  "https://images.unsplash.com/photo-1483446227769-9137a8af8667?auto=format&fit=crop&w=800&q=70",
  "https://images.unsplash.com/photo-1545129139-1beb780cf337?auto=format&fit=crop&w=800&q=70",
  "https://images.unsplash.com/photo-1575285113814-f770cb8c796e?auto=format&fit=crop&w=800&q=70",
] as const;

/** Deterministically pick a stable photo for a given name (same hashing style as avatarGradient) */
function photoFor(name: string, pool: readonly string[]): string {
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) hash = (hash * 31 + name.charCodeAt(i)) % 100000;
  return pool[hash % pool.length];
}

/** Background image string that layers a real photo OVER the gradient, so a failed image gracefully falls back to the gradient */
function photoBg(name: string, pool: readonly string[]): string {
  return `url("${photoFor(name, pool)}"), ${avatarGradient(name)}`;
}

function slug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function formatGBP(amount: number): string {
  return `£${amount.toFixed(2)}`;
}

function artistByName(name: string): Artist | undefined {
  return ARTISTS.find((a) => a.name === name);
}

/**
 * Prototype-grade proximity model (no real geo). Maps the venue/artist cities
 * present in the file — plus a handful of UK postcode outward prefixes — to a
 * region so a typed town or postcode can be sorted "near you" first.
 */
const CITY_REGION: Record<string, string> = {
  glasgow: "scotland",
  edinburgh: "scotland",
  inverness: "scotland",
  elgin: "scotland",
  aberdeen: "scotland",
  thurso: "scotland",
  birmingham: "midlands",
  manchester: "england",
  london: "england",
  derry: "northern-ireland",
  belfast: "northern-ireland",
  paris: "international",
};

/** Leading UK postcode letters → city, longest prefixes matched first. */
const POSTCODE_CITY: { prefix: string; city: string }[] = [
  { prefix: "eh", city: "edinburgh" },
  { prefix: "iv", city: "inverness" },
  { prefix: "ab", city: "aberdeen" },
  { prefix: "bt", city: "derry" },
  { prefix: "g", city: "glasgow" },
  { prefix: "b", city: "birmingham" },
  { prefix: "m", city: "manchester" },
];

/** Resolve a free-text town/postcode into a known city + region (case-insensitive). */
function resolveLocation(input: string): { city: string | null; region: string | null } {
  const normalized = input.trim().toLowerCase();
  if (!normalized) return { city: null, region: null };

  for (const city of Object.keys(CITY_REGION)) {
    if (normalized.includes(city)) return { city, region: CITY_REGION[city] };
  }

  const lead = normalized.match(/^[a-z]+/)?.[0] ?? "";
  if (lead) {
    const match = [...POSTCODE_CITY]
      .sort((a, b) => b.prefix.length - a.prefix.length)
      .find((entry) => lead.startsWith(entry.prefix));
    if (match) return { city: match.city, region: CITY_REGION[match.city] ?? null };
  }

  return { city: null, region: null };
}

/** Proximity tier for sorting: 0 = same city, 1 = same region, 2 = elsewhere/unknown. */
function proximityTier(input: string, venueCity: string): number {
  const me = resolveLocation(input);
  if (!me.city && !me.region) return 2;
  const target = resolveLocation(venueCity);
  if (me.city && target.city && me.city === target.city) return 0;
  if (me.region && target.region && me.region === target.region) return 1;
  return 2;
}

function upcomingGigsFor(name: string): Gig[] {
  return GIGS.filter((gig) => gig.artist === name && !gig.ended);
}

/** Synthesised past shows so every profile demonstrates the ended-gigs pattern (HE-013/HE-014) */
function endedGigsFor(artist: Artist): Gig[] {
  const s = slug(artist.name);
  return [
    { id: `${s}-ended-1`, artist: artist.name, date: "Thu 29 May 2026", doors: "19:00", curfew: "22:00", venue: "Sneaky Pete's", city: "Edinburgh", price: 10, capacity: 100, about: artist.bio, ended: true },
    { id: `${s}-ended-2`, artist: artist.name, date: "Sat 7 Jun 2026", doors: "19:30", curfew: "23:00", venue: "The Hug and Pint", city: "Glasgow", price: 10, capacity: 90, about: artist.bio, ended: true },
  ];
}

function backLabelFor(view: View): string {
  switch (view) {
    case "artists":
      return "Back to artists";
    case "gigs":
      return "Back to gigs";
    case "venues":
      return "Back to venues";
    case "venue":
      return "Back to venue";
    case "artist":
      return "Back to artist";
    case "event":
      return "Back to event";
    case "home":
      return "Back to home";
    default:
      return "Back";
  }
}

function PrimaryButton({
  children,
  onClick,
  type = "button",
  className,
}: {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit";
  className?: string;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        "inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        className,
      )}
      style={{ backgroundImage: ACCENT_GRADIENT, outlineColor: OA.accent }}
    >
      {children}
    </button>
  );
}

function SecondaryButton({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-white/5",
        className,
      )}
      style={{ borderColor: OA.border, color: OA.secondary }}
    >
      {children}
    </button>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border px-2.5 py-1 text-[0.72rem] font-medium" style={{ borderColor: OA.border, color: OA.secondary, backgroundColor: OA.bg }}>
      {children}
    </span>
  );
}

function TextField({
  label,
  type,
  placeholder,
  value,
  onChange,
  hint,
}: {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
}) {
  return (
    <label className="block text-left">
      <span className="text-[0.78rem] font-medium" style={{ color: OA.secondary }}>
        {label}
      </span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-lg border px-3 py-2 text-sm outline-none placeholder:text-[#71717A] focus:border-[var(--oa-accent)]"
        style={{ borderColor: OA.border, backgroundColor: OA.bg, color: OA.text, ["--oa-accent" as string]: OA.accent }}
      />
      {hint ? (
        <span className="mt-1 block text-[0.7rem]" style={{ color: OA.muted }}>
          {hint}
        </span>
      ) : null}
    </label>
  );
}

function SearchField({ value, onChange, placeholder, label }: { value: string; onChange: (v: string) => void; placeholder: string; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border px-3 py-2" style={{ borderColor: OA.border, backgroundColor: OA.bg }}>
      <Search className="size-4" style={{ color: OA.muted }} aria-hidden />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={label}
        className="w-full bg-transparent text-sm outline-none placeholder:text-[#71717A]"
        style={{ color: OA.text }}
      />
    </div>
  );
}

function PageHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      {subtitle ? (
        <p className="mt-1 text-sm" style={{ color: OA.muted }}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function BackLink({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="inline-flex cursor-pointer items-center gap-1.5 text-[0.8rem] hover:text-white" style={{ color: OA.muted }}>
      <ArrowLeft className="size-4" aria-hidden />
      {label}
    </button>
  );
}

function ArtistCard({ artist, onOpen }: { artist: Artist; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`View ${artist.name} profile`}
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--oa-accent)] hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      style={{ borderColor: OA.border, backgroundColor: OA.surface, ["--oa-accent" as string]: OA.accent, outlineColor: OA.accent }}
    >
      <div className="relative flex h-32 items-center justify-center" style={{ backgroundImage: photoBg(artist.name, ARTIST_PHOTOS), backgroundSize: "cover", backgroundPosition: "center" }}>
        <span className="absolute left-3 top-3 rounded-full px-2 py-0.5 text-[0.625rem] font-semibold tracking-wide text-white/90" style={{ backgroundColor: "rgba(0,0,0,0.35)" }}>
          {artist.genre}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-[0.95rem] font-semibold" style={{ color: OA.text }}>
          {artist.name}
        </h3>
        <p className="mt-0.5 flex items-center gap-1 text-[0.7rem]" style={{ color: OA.muted }}>
          <MapPin className="size-3" aria-hidden />
          {artist.location}
        </p>
        <p className="mt-2 line-clamp-2 text-[0.78rem] leading-relaxed" style={{ color: OA.muted }}>
          {artist.bio}
        </p>
        <span className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-lg border py-2 text-[0.8rem] font-medium transition-colors group-hover:border-[var(--oa-accent)]" style={{ borderColor: OA.border, color: OA.secondary, ["--oa-accent" as string]: OA.accent }}>
          View profile
          <ArrowRight className="size-3.5" aria-hidden />
        </span>
      </div>
    </button>
  );
}

/** Whole card opens the event; explicit buttons handle keyboard + add-to-basket (HE-021) */
function GigCard({ gig, onOpen, onBuy, quantity, onSetQty }: { gig: Gig; onOpen: () => void; onBuy: () => void; quantity: number; onSetQty: (qty: number) => void }) {
  return (
    <article
      onClick={onOpen}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-xl border transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--oa-accent)] hover:shadow-lg"
      style={{ borderColor: OA.border, backgroundColor: OA.surface, ["--oa-accent" as string]: OA.accent }}
    >
      <div className="relative flex h-28 items-center justify-center" style={{ backgroundImage: photoBg(gig.artist, ARTIST_PHOTOS), backgroundSize: "cover", backgroundPosition: "center" }}>
        <span className="absolute right-3 top-3 flex flex-col items-end rounded-lg px-2 py-1 text-right text-white" style={{ backgroundColor: "rgba(0,0,0,0.45)" }}>
          <span className="text-[0.8rem] font-semibold leading-none">{formatGBP(gig.price)}</span>
          <span className="mt-0.5 text-[0.55rem] leading-none text-white/75">+ {formatGBP(BOOKING_FEE)} fee</span>
        </span>
      </div>
      <div className="@container flex flex-1 flex-col p-4">
        <h3 className="text-[0.9rem] font-semibold leading-snug">{gig.artist}</h3>
        <p className="mt-1.5 flex items-center gap-1 text-[0.72rem]" style={{ color: OA.muted }}>
          <Calendar className="size-3" aria-hidden />
          {gig.date}
        </p>
        <p className="mt-1 flex items-center gap-1 text-[0.72rem]" style={{ color: OA.muted }}>
          <MapPin className="size-3" aria-hidden />
          {gig.venue}, {gig.city}
        </p>
        <div className="mt-4 grid grid-cols-1 gap-2 @[16rem]:grid-cols-2">
          <SecondaryButton
            onClick={(e) => {
              e.stopPropagation();
              onOpen();
            }}
            className="!px-2 !py-2 !text-[0.78rem]"
          >
            Find out more
          </SecondaryButton>
          {quantity > 0 ? (
            <div
              role="group"
              aria-label="Ticket quantity"
              onClick={(e) => e.stopPropagation()}
              className="flex h-full w-full items-center justify-between gap-2 rounded-lg border px-2 py-1"
              style={{ borderColor: OA.accent, backgroundColor: "rgba(168,85,247,0.12)" }}
            >
              <button
                type="button"
                aria-label="Remove one ticket"
                disabled={quantity <= 1}
                onClick={(e) => {
                  e.stopPropagation();
                  onSetQty(quantity - 1);
                }}
                className="flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-full border transition-colors hover:border-[var(--oa-accent)] disabled:cursor-not-allowed disabled:opacity-40"
                style={{ borderColor: OA.border, color: OA.text, ["--oa-accent" as string]: OA.accent }}
              >
                <Minus className="size-3.5" aria-hidden />
              </button>
              <span className="text-[0.78rem] font-semibold" style={{ color: OA.text }}>
                {quantity} {quantity === 1 ? "ticket" : "tickets"}
              </span>
              <button
                type="button"
                aria-label="Add one ticket"
                onClick={(e) => {
                  e.stopPropagation();
                  onBuy();
                }}
                className="flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-full border transition-colors hover:border-[var(--oa-accent)]"
                style={{ borderColor: OA.border, color: OA.text, ["--oa-accent" as string]: OA.accent }}
              >
                <Plus className="size-3.5" aria-hidden />
              </button>
            </div>
          ) : (
            <PrimaryButton
              onClick={(e) => {
                e.stopPropagation();
                onBuy();
              }}
              className="!px-2 !py-2 !text-[0.78rem]"
            >
              <Plus className="size-3.5" aria-hidden />
              Add ticket
            </PrimaryButton>
          )}
        </div>
      </div>
    </article>
  );
}

function VenueCard({ venue, onOpen }: { venue: Venue; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`View what's on at ${venue.name}`}
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--oa-accent)] hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      style={{ borderColor: OA.border, backgroundColor: OA.surface, ["--oa-accent" as string]: OA.accent, outlineColor: OA.accent }}
    >
      <div className="relative flex h-24 items-center justify-center" style={{ backgroundImage: photoBg(venue.name, VENUE_PHOTOS), backgroundSize: "cover", backgroundPosition: "center" }} />

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-[0.9rem] font-semibold leading-snug">{venue.name}</h3>
        <p className="mt-1 text-[0.72rem]" style={{ color: OA.muted }}>
          {venue.location}
        </p>
        <p className="mt-2 text-[0.72rem] font-medium" style={{ color: OA.accent }}>
          {venue.upcoming} upcoming {venue.upcoming === 1 ? "gig" : "gigs"}
        </p>
      </div>
    </button>
  );
}

export function OffAxisRedesign() {
  const { showCallouts, immersive } = useRedesignPreview();
  const callouts = offAxisRedesignCallouts;

  const [view, setView] = useState<View>("home");
  const [loggedIn, setLoggedIn] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  const [activeArtist, setActiveArtist] = useState<Artist>(ARTISTS[0]);
  const [activeGig, setActiveGig] = useState<Gig>(GIGS[0]);
  const [activeVenue, setActiveVenue] = useState<Venue>(VENUES[0]);
  const [originArtist, setOriginArtist] = useState<View>("artists");
  const [originEvent, setOriginEvent] = useState<View>("gigs");
  const [originVenue, setOriginVenue] = useState<View>("venues");

  const [following, setFollowing] = useState<Record<string, boolean>>({});
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState<Genre>("All");
  const [gigQuery, setGigQuery] = useState("");
  const [signupRole, setSignupRole] = useState<SignupRole>("fan");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  /** Single source of truth for the user's town/postcode, reused app-wide. */
  const [userLocation, setUserLocation] = useState("");

  const [basket, setBasket] = useState<Record<string, number>>({});
  const [bump, setBump] = useState(false);
  const [undoBasket, setUndoBasket] = useState<Record<string, number> | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);
  const undoTimerRef = useRef<number | null>(null);

  const changeView = (next: View) => {
    setAccountMenuOpen(false);
    setView(next);
    requestAnimationFrame(() => {
      let el = rootRef.current?.parentElement ?? null;
      while (el) {
        const overflowY = getComputedStyle(el).overflowY;
        if ((overflowY === "auto" || overflowY === "scroll") && el.scrollHeight > el.clientHeight) {
          el.scrollTop = 0;
          return;
        }
        el = el.parentElement;
      }
      window.scrollTo({ top: 0 });
    });
  };

  const basketItems = useMemo(
    () =>
      Object.entries(basket)
        .map(([id, qty]) => {
          const gig = GIGS.find((g) => g.id === id) ?? endedGigsLookup(id);
          return gig ? { gig, qty } : null;
        })
        .filter((entry): entry is { gig: Gig; qty: number } => entry !== null),
    [basket],
  );

  const basketCount = useMemo(() => Object.values(basket).reduce((sum, qty) => sum + qty, 0), [basket]);
  const basketSubtotal = useMemo(() => basketItems.reduce((sum, item) => sum + item.gig.price * item.qty, 0), [basketItems]);

  const addToBasket = (gig: Gig) => {
    if (undoTimerRef.current) window.clearTimeout(undoTimerRef.current);
    setUndoBasket(null);
    setBasket((prev) => ({ ...prev, [gig.id]: (prev[gig.id] ?? 0) + 1 }));
    setBump(true);
    window.setTimeout(() => setBump(false), 350);
  };
  const clearBasket = () => {
    if (undoTimerRef.current) window.clearTimeout(undoTimerRef.current);
    setUndoBasket(basket);
    setBasket({});
    undoTimerRef.current = window.setTimeout(() => setUndoBasket(null), 6000);
  };
  const undoClear = () => {
    if (undoTimerRef.current) window.clearTimeout(undoTimerRef.current);
    if (undoBasket) setBasket(undoBasket);
    setUndoBasket(null);
  };
  const undoCount = undoBasket ? Object.values(undoBasket).reduce((sum, qty) => sum + qty, 0) : 0;
  const basketBarVisible = (basketCount > 0 || undoBasket !== null) && view !== "checkout";
  const setQty = (id: string, qty: number) => {
    setBasket((prev) => {
      const next = { ...prev };
      if (qty <= 0) delete next[id];
      else next[id] = qty;
      return next;
    });
  };

  const filteredArtists = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ARTISTS.filter((artist) => {
      const matchesGenre = genre === "All" || artist.genre === genre;
      const matchesQuery =
        q === "" ||
        artist.name.toLowerCase().includes(q) ||
        artist.location.toLowerCase().includes(q) ||
        artist.genre.toLowerCase().includes(q);
      return matchesGenre && matchesQuery;
    });
  }, [query, genre]);

  const filteredGigs = useMemo(() => {
    const q = gigQuery.trim().toLowerCase();
    if (q === "") return GIGS;
    return GIGS.filter((gig) => gig.artist.toLowerCase().includes(q) || gig.venue.toLowerCase().includes(q));
  }, [gigQuery]);

  /** Venues split into "near you" (tiers 0–1, nearest first) and "more", from the shared location. */
  const venueGroups = useMemo(() => {
    const trimmed = userLocation.trim();
    if (!trimmed) return { near: [] as Venue[], more: VENUES };
    const near = VENUES.filter((venue) => proximityTier(trimmed, venue.location) <= 1).sort(
      (a, b) => proximityTier(trimmed, a.location) - proximityTier(trimmed, b.location),
    );
    if (near.length === 0) return { near: [] as Venue[], more: VENUES };
    const more = VENUES.filter((venue) => proximityTier(trimmed, venue.location) > 1);
    return { near, more };
  }, [userLocation]);

  const openArtist = (artist: Artist, from: View) => {
    setActiveArtist(artist);
    setOriginArtist(from);
    changeView("artist");
  };
  const openArtistByName = (name: string, from: View) => {
    const artist = artistByName(name);
    if (artist) openArtist(artist, from);
  };
  const openEvent = (gig: Gig, from: View) => {
    setActiveGig(gig);
    setOriginEvent(from);
    changeView("event");
  };
  const openVenue = (venue: Venue, from: View) => {
    setActiveVenue(venue);
    setOriginVenue(from);
    changeView("venue");
  };
  const openVenueByName = (name: string, city: string, from: View) => {
    const venue = VENUES.find((v) => v.name === name) ?? { name, location: city, upcoming: GIGS.filter((g) => g.venue === name).length };
    openVenue(venue, from);
  };
  const openSignup = (role: SignupRole = "fan") => {
    setSignupRole(role);
    changeView("signup");
  };
  const toggleFollow = (name: string) => setFollowing((prev) => ({ ...prev, [name]: !prev[name] }));

  const navItems: { label: string; target: View }[] = [
    { label: "Artists", target: "artists" },
    { label: "Gigs", target: "gigs" },
    { label: "Venues", target: "venues" },
  ];

  return (
    <div ref={rootRef} style={{ backgroundColor: OA.bg, color: OA.text }} className={cn("relative min-h-full", basketBarVisible ? "pb-24" : "")}>
      {/* Header */}
      <header className={cn("sticky top-0 z-40 overflow-visible border-b py-4", PAGE_GUTTER)} style={{ borderColor: OA.border, backgroundColor: "rgba(9,9,11,0.85)" }}>
        <div className={cn(CONTENT, "flex items-center gap-3 sm:gap-6")}>
          <button type="button" onClick={() => changeView("home")} className="shrink-0 cursor-pointer text-sm font-bold tracking-[0.15em] transition-opacity hover:opacity-80 sm:tracking-[0.2em]" style={{ color: OA.text }}>
            OFF AXIS
          </button>
          <nav className="flex min-w-0 flex-1 items-center gap-3 overflow-x-auto text-sm [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-5 [&::-webkit-scrollbar]:hidden">
            {navItems.map((item) => {
              const active = view === item.target;
              return (
                <button
                  key={item.target}
                  type="button"
                  onClick={() => changeView(item.target)}
                  aria-current={active ? "page" : undefined}
                  className="shrink-0 cursor-pointer text-sm font-medium transition-colors hover:text-white"
                  style={{ color: active ? OA.text : OA.muted }}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
            {/* Currency + theme toggles removed — non-essential header controls trimmed for MVP focus (HE-031) */}
            <RedesignCalloutRegion
              calloutId="HE-031"
              callouts={callouts}
              showMarkers={showCallouts}
              markerClassName="-left-3 right-auto top-1/2 -translate-y-1/2"
            >
              {/* Basket — synced with the bottom checkout bar (HE-021) */}
              <button
                type="button"
                onClick={() => changeView("checkout")}
                aria-label={`Basket, ${basketCount} ${basketCount === 1 ? "ticket" : "tickets"}`}
                className="relative cursor-pointer rounded-lg border p-2 transition-colors hover:bg-white/5"
                style={{ borderColor: OA.border, color: OA.secondary }}
              >
                <ShoppingCart className="size-4" aria-hidden />
                {basketCount > 0 ? (
                  <span
                    className={cn("absolute -right-1.5 -top-1.5 flex min-w-[1.1rem] items-center justify-center rounded-full px-1 text-[0.6rem] font-bold text-white transition-transform duration-300", bump ? "scale-150" : "scale-100")}
                    style={{ backgroundImage: ACCENT_GRADIENT }}
                  >
                    {basketCount}
                  </span>
                ) : null}
              </button>
            </RedesignCalloutRegion>

            {loggedIn ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setAccountMenuOpen((o) => !o)}
                  aria-haspopup="menu"
                  aria-expanded={accountMenuOpen}
                  aria-label="Account menu"
                  className="flex size-9 cursor-pointer items-center justify-center rounded-full text-[0.8rem] font-bold text-white"
                  style={{ backgroundImage: ACCENT_GRADIENT }}
                >
                  {initials(USER.name)}
                </button>
                {accountMenuOpen ? (
                  <>
                    <button type="button" aria-hidden tabIndex={-1} onClick={() => setAccountMenuOpen(false)} className="fixed inset-0 z-40 cursor-default" />
                    <div role="menu" className="absolute right-0 top-11 z-50 w-52 overflow-hidden rounded-xl border py-1 shadow-xl" style={{ borderColor: OA.border, backgroundColor: OA.surface }}>
                      <div className="border-b px-3 py-2.5" style={{ borderColor: OA.border }}>
                        <p className="text-[0.82rem] font-semibold">{USER.name}</p>
                        <p className="text-[0.72rem]" style={{ color: OA.muted }}>
                          {USER.email}
                        </p>
                      </div>
                      {[
                        { label: "Profile", icon: User, target: "account" as View },
                        { label: "Subscriptions", icon: Star, target: "subscriptions" as View },
                        { label: "My orders", icon: Ticket, target: "account" as View },
                      ].map((item) => (
                        <button
                          key={item.label}
                          type="button"
                          role="menuitem"
                          onClick={() => changeView(item.target)}
                          className="flex w-full cursor-pointer items-center gap-2.5 px-3 py-2 text-left text-[0.82rem] transition-colors hover:bg-white/5"
                          style={{ color: OA.secondary }}
                        >
                          <item.icon className="size-4" aria-hidden />
                          {item.label}
                        </button>
                      ))}
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          setLoggedIn(false);
                          changeView("home");
                        }}
                        className="flex w-full cursor-pointer items-center gap-2.5 border-t px-3 py-2 text-left text-[0.82rem] transition-colors hover:bg-white/5"
                        style={{ color: OA.secondary, borderColor: OA.border }}
                      >
                        <ArrowLeft className="size-4" aria-hidden />
                        Log out
                      </button>
                    </div>
                  </>
                ) : null}
              </div>
            ) : (
              <RedesignCalloutRegion calloutId="HE-009" callouts={callouts} showMarkers={showCallouts} className="flex items-center gap-2">
                <button type="button" onClick={() => changeView("login")} className="hidden cursor-pointer rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:text-white sm:block" style={{ color: OA.secondary }}>
                  Log in
                </button>
                <PrimaryButton onClick={() => openSignup("fan")} className="!px-3 !py-2 sm:!px-4">
                  Sign up
                </PrimaryButton>
              </RedesignCalloutRegion>
            )}
          </div>
        </div>
      </header>

      {/* HOME */}
      {view === "home" ? (
        <>
          <section className={cn("relative overflow-hidden text-center", PAGE_GUTTER, "py-16 sm:py-20")}>
            <div className="pointer-events-none absolute inset-x-0 top-0 h-64 opacity-30" style={{ background: `radial-gradient(60% 100% at 50% 0%, ${OA.accent}55, transparent)` }} aria-hidden />
            <div className={cn(CONTENT, "relative")}>
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
                <span style={{ backgroundImage: ACCENT_GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>Discover Live Music</span>
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base" style={{ color: OA.secondary }}>
                Off Axis is a gig-swap platform. Artists trade shows across cities, and fans book the night, all in one place.
              </p>
              <RedesignCalloutRegion calloutId="HE-001" callouts={callouts} showMarkers={showCallouts} className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <PrimaryButton onClick={() => changeView("gigs")}>
                  Browse gigs
                  <ArrowRight className="size-4" aria-hidden />
                </PrimaryButton>
                <SecondaryButton onClick={() => openSignup("artist")}>Join as an artist</SecondaryButton>
              </RedesignCalloutRegion>
            </div>
          </section>

          <section className={cn(PAGE_GUTTER, "py-12")} style={{ backgroundColor: OA.surface }}>
            <div className={CONTENT}>
              <RedesignCalloutRegion calloutId="HE-002" callouts={callouts} showMarkers={showCallouts}>
                <h2 className="text-center text-xl font-semibold">How Off Axis works</h2>
                <div className="mt-8 grid gap-6 sm:grid-cols-3">
                  {HOW_IT_WORKS.map((item) => (
                    <div key={item.step} className="rounded-xl border p-5 text-center" style={{ borderColor: OA.border, backgroundColor: OA.bg }}>
                      <span className="mx-auto flex size-9 items-center justify-center rounded-full text-sm font-bold text-white" style={{ backgroundImage: ACCENT_GRADIENT }}>
                        {item.step}
                      </span>
                      <h3 className="mt-3 text-sm font-semibold">{item.title}</h3>
                      <p className="mt-1.5 text-[0.8rem] leading-relaxed" style={{ color: OA.muted }}>
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </RedesignCalloutRegion>
            </div>
          </section>

          <section className={cn(PAGE_GUTTER, "py-12")}>
            <div className={CONTENT}>
              <div className="flex items-end justify-between gap-3">
                <h2 className="text-xl font-semibold">Featured artists</h2>
                <button type="button" onClick={() => changeView("artists")} className="cursor-pointer text-sm font-medium hover:underline" style={{ color: OA.accent }}>
                  View all artists
                </button>
              </div>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {ARTISTS.slice(0, 4).map((artist) => (
                  <ArtistCard key={artist.name} artist={artist} onOpen={() => openArtist(artist, "home")} />
                ))}
              </div>
            </div>
          </section>

          <section className={cn(PAGE_GUTTER, "py-12")} style={{ backgroundColor: OA.surface }}>
            <div className={CONTENT}>
              <div className="flex items-end justify-between gap-3">
                <h2 className="text-xl font-semibold">Upcoming gigs</h2>
                <button type="button" onClick={() => changeView("gigs")} className="cursor-pointer text-sm font-medium hover:underline" style={{ color: OA.accent }}>
                  View all gigs
                </button>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {GIGS.slice(0, 3).map((gig) => (
                  <GigCard key={gig.id} gig={gig} onOpen={() => openEvent(gig, "home")} onBuy={() => addToBasket(gig)} quantity={basket[gig.id] ?? 0} onSetQty={(qty) => setQty(gig.id, qty)} />
                ))}
              </div>
            </div>
          </section>
        </>
      ) : null}

      {/* ARTISTS */}
      {view === "artists" ? (
        <section className={cn(PAGE_GUTTER, "py-12")}>
          <div className={CONTENT}>
            <PageHeading title="Artists" subtitle="Real, complete profiles only. Search or filter to find your next favourite act." />
            <RedesignCalloutRegion calloutId="HE-004" callouts={callouts} showMarkers={showCallouts}>
              <SearchField value={query} onChange={setQuery} placeholder="Search artists by name, genre, or city…" label="Search artists" />
              <div className="mt-3 flex flex-wrap gap-2">
                {GENRES.map((g) => {
                  const active = g === genre;
                  return (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGenre(g)}
                      className="cursor-pointer rounded-full border px-3 py-1 text-[0.78rem] font-medium transition-colors"
                      style={active ? { borderColor: OA.accent, color: OA.text, backgroundColor: "rgba(168,85,247,0.18)" } : { borderColor: OA.border, color: OA.muted }}
                    >
                      {g}
                    </button>
                  );
                })}
              </div>
            </RedesignCalloutRegion>

            <RedesignCalloutRegion calloutId="HE-003" callouts={callouts} showMarkers={showCallouts} tooltipPlacement="above" className="mt-8">
              {filteredArtists.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {filteredArtists.map((artist, index) =>
                    index === 0 ? (
                      <RedesignCalloutRegion key={artist.name} calloutId="HE-007" callouts={callouts} showMarkers={showCallouts} tooltipPlacement="above">
                        <ArtistCard artist={artist} onOpen={() => openArtist(artist, "artists")} />
                      </RedesignCalloutRegion>
                    ) : (
                      <ArtistCard key={artist.name} artist={artist} onOpen={() => openArtist(artist, "artists")} />
                    ),
                  )}
                </div>
              ) : (
                <p className="py-10 text-center text-sm" style={{ color: OA.muted }}>
                  No artists match that search yet.
                </p>
              )}
            </RedesignCalloutRegion>
          </div>
        </section>
      ) : null}

      {/* GIGS */}
      {view === "gigs" ? (
        <section className={cn(PAGE_GUTTER, "py-12")}>
          <div className={CONTENT}>
            <PageHeading title="Gigs" subtitle="Upcoming shows across the network. Add to your basket, or open a gig for full details." />
            <SearchField value={gigQuery} onChange={setGigQuery} placeholder="Search gigs by artist or venue…" label="Search gigs" />
            {filteredGigs.length > 0 ? (
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredGigs.map((gig, index) =>
                  index === 0 ? (
                    <RedesignCalloutRegion key={gig.id} calloutId="HE-021" callouts={callouts} showMarkers={showCallouts} tooltipPlacement="above">
                      <GigCard gig={gig} onOpen={() => openEvent(gig, "gigs")} onBuy={() => addToBasket(gig)} quantity={basket[gig.id] ?? 0} onSetQty={(qty) => setQty(gig.id, qty)} />
                    </RedesignCalloutRegion>
                  ) : (
                    <GigCard key={gig.id} gig={gig} onOpen={() => openEvent(gig, "gigs")} onBuy={() => addToBasket(gig)} quantity={basket[gig.id] ?? 0} onSetQty={(qty) => setQty(gig.id, qty)} />
                  ),
                )}
              </div>
            ) : (
              <p className="py-10 text-center text-sm" style={{ color: OA.muted }}>
                No gigs match that search yet.
              </p>
            )}
          </div>
        </section>
      ) : null}

      {/* VENUES */}
      {view === "venues" ? (
        <section className={cn(PAGE_GUTTER, "py-12")}>
          <div className={CONTENT}>
            <PageHeading title="Venues" subtitle="Spaces hosting Off Axis shows. Tap a venue to see what's on." />

            <div className="mb-8">
              <span className="mb-1.5 block text-[0.78rem] font-medium" style={{ color: OA.secondary }}>
                Find venues near you
              </span>
              <div className="flex items-center gap-2 rounded-lg border px-3 py-2" style={{ borderColor: OA.border, backgroundColor: OA.bg }}>
                <MapPin className="size-4 shrink-0" style={{ color: OA.muted }} aria-hidden />
                <input
                  value={userLocation}
                  onChange={(e) => setUserLocation(e.target.value)}
                  placeholder="Enter your town or postcode…"
                  aria-label="Find venues near you"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-[#71717A]"
                  style={{ color: OA.text }}
                />
                {userLocation.trim() ? (
                  <button
                    type="button"
                    onClick={() => setUserLocation("")}
                    className="shrink-0 cursor-pointer rounded-md px-2 py-1 text-[0.72rem] font-medium transition-colors hover:text-white"
                    style={{ color: OA.muted }}
                  >
                    Clear
                  </button>
                ) : null}
              </div>
              {!userLocation.trim() ? (
                <p className="mt-2 text-[0.78rem]" style={{ color: OA.muted }}>
                  Enter your town or postcode to see venues near you first.
                </p>
              ) : null}
            </div>

            {venueGroups.near.length === 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {venueGroups.more.map((venue) => (
                  <VenueCard key={venue.name} venue={venue} onOpen={() => openVenue(venue, "venues")} />
                ))}
              </div>
            ) : (
              <div className="space-y-8">
                <div>
                  <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                    <h2 className="text-lg font-semibold">Venues near you</h2>
                    <span className="inline-flex items-center gap-1 text-[0.72rem]" style={{ color: OA.accent }}>
                      <MapPin className="size-3" aria-hidden />
                      Nearest to {userLocation.trim()}
                    </span>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {venueGroups.near.map((venue) => (
                      <VenueCard key={venue.name} venue={venue} onOpen={() => openVenue(venue, "venues")} />
                    ))}
                  </div>
                </div>
                {venueGroups.more.length > 0 ? (
                  <div>
                    <h2 className="mb-3 text-lg font-semibold">More venues</h2>
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      {venueGroups.more.map((venue) => (
                        <VenueCard key={venue.name} venue={venue} onOpen={() => openVenue(venue, "venues")} />
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </section>
      ) : null}

      {/* AUTH */}
      {view === "login" || view === "signup" ? (
        <AuthView
          mode={view}
          form={form}
          setForm={setForm}
          signupRole={signupRole}
          setSignupRole={setSignupRole}
          location={userLocation}
          setLocation={setUserLocation}
          onSubmit={() => {
            setLoggedIn(true);
            changeView(basketCount > 0 ? "checkout" : "home");
          }}
          onSwitch={(next) => changeView(next)}
          onBack={() => changeView("home")}
        />
      ) : null}

      {/* ARTIST PROFILE */}
      {view === "artist" ? (
        <ArtistProfileView
          artist={activeArtist}
          following={!!following[activeArtist.name]}
          onToggleFollow={() => toggleFollow(activeArtist.name)}
          onBack={() => changeView(originArtist)}
          backLabel={backLabelFor(originArtist)}
          upcoming={upcomingGigsFor(activeArtist.name)}
          ended={endedGigsFor(activeArtist)}
          onOpenEvent={(gig) => openEvent(gig, "artist")}
          onOpenArtist={(a) => openArtist(a, originArtist)}
          onBuy={addToBasket}
          callouts={callouts}
          showCallouts={showCallouts}
        />
      ) : null}

      {/* EVENT DETAIL */}
      {view === "event" ? (
        <EventDetailView
          gig={activeGig}
          artist={artistByName(activeGig.artist)}
          onBack={() => changeView(originEvent)}
          backLabel={backLabelFor(originEvent)}
          onOpenArtist={() => openArtistByName(activeGig.artist, "event")}
          onOpenArtistByName={(name) => openArtistByName(name, "event")}
          onOpenVenue={() => openVenueByName(activeGig.venue, activeGig.city, "event")}
          onBuy={() => addToBasket(activeGig)}
          callouts={callouts}
          showCallouts={showCallouts}
        />
      ) : null}

      {/* VENUE DETAIL */}
      {view === "venue" ? (
        <VenueDetailView venue={activeVenue} gigs={GIGS.filter((g) => g.venue === activeVenue.name)} onBack={() => changeView(originVenue)} backLabel={backLabelFor(originVenue)} onOpenEvent={(gig) => openEvent(gig, "venue")} onBuy={addToBasket} />
      ) : null}

      {/* ACCOUNT */}
      {view === "account" ? <AccountView onOpenSubscriptions={() => changeView("subscriptions")} callouts={callouts} showCallouts={showCallouts} /> : null}

      {/* SUBSCRIPTIONS */}
      {view === "subscriptions" ? <SubscriptionsView callouts={callouts} showCallouts={showCallouts} /> : null}

      {/* CHECKOUT */}
      {view === "checkout" ? (
        <CheckoutView
          items={basketItems}
          loggedIn={loggedIn}
          onSetQty={setQty}
          onBrowse={() => changeView("gigs")}
          onSignIn={() => changeView("login")}
          postcode={userLocation}
          onPostcodeChange={setUserLocation}
          callouts={callouts}
          showCallouts={showCallouts}
        />
      ) : null}

      {/* Floating basket pill — second half of the dual basket UI (HE-021).
          Detached from the screen edges and centred with fully rounded corners.
          Fixed to the viewport in the immersive full-screen preview; sticky inside
          the scaled inline teaser. The wrapper ignores pointer events so only the
          pill itself is interactive. */}
      {basketBarVisible ? (
        <div className={cn(immersive ? "fixed inset-x-0 bottom-5" : "sticky bottom-5", "pointer-events-none z-40 px-4")}>
          {/* Mobile: full-width, thumb-friendly bar. Desktop: stable centred pill with a
              fixed min/max width so it doesn't reflow every time the count or total changes. */}
          <div
            className="pointer-events-auto mx-auto flex w-full items-center justify-between gap-3 rounded-2xl border px-4 py-2.5 shadow-2xl backdrop-blur-md sm:w-auto sm:min-w-[26rem] sm:max-w-[30rem]"
            style={{ borderColor: OA.border, backgroundColor: "rgba(9,9,11,0.92)" }}
          >
            {basketCount > 0 ? (
              <>
                <div className="flex min-w-0 items-center gap-2 whitespace-nowrap text-sm">
                  <ShoppingCart className="size-4 shrink-0" style={{ color: OA.accent }} aria-hidden />
                  <span className="font-semibold">
                    {basketCount} {basketCount === 1 ? "ticket" : "tickets"}
                  </span>
                  <span className="hidden truncate sm:inline" style={{ color: OA.muted }}>
                    · {formatGBP(basketSubtotal + BOOKING_FEE * basketCount)} all-in
                  </span>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={clearBasket}
                    aria-label="Clear basket"
                    className="cursor-pointer rounded-lg border p-2 transition-colors hover:bg-white/5 hover:text-white"
                    style={{ borderColor: OA.border, color: OA.muted }}
                  >
                    <Trash2 className="size-4" aria-hidden />
                  </button>
                  <PrimaryButton onClick={() => changeView("checkout")} className="!py-2">
                    Checkout
                    <ArrowRight className="size-4" aria-hidden />
                  </PrimaryButton>
                </div>
              </>
            ) : (
              <>
                <div className="flex min-w-0 items-center gap-2 whitespace-nowrap text-sm">
                  <Trash2 className="size-4 shrink-0" style={{ color: OA.muted }} aria-hidden />
                  <span className="font-medium" style={{ color: OA.secondary }}>
                    Removed {undoCount} {undoCount === 1 ? "ticket" : "tickets"}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={undoClear}
                  className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-semibold transition-colors hover:bg-white/5"
                  style={{ borderColor: OA.accent, color: OA.text }}
                >
                  <RotateCcw className="size-4" aria-hidden />
                  Undo
                </button>
              </>
            )}
          </div>
        </div>
      ) : null}

      {/* Footer */}
      <RedesignCalloutRegion calloutId="HE-005" callouts={callouts} showMarkers={showCallouts} tooltipPlacement="above" markerClassName="bottom-3 right-3 top-auto">
        <footer className={cn("border-t pt-12 pb-10", PAGE_GUTTER)} style={{ borderColor: OA.border, backgroundColor: OA.bg }}>
          <div className={cn(CONTENT, "grid gap-8 sm:grid-cols-4")}>
            <div>
              <button type="button" onClick={() => changeView("home")} className="cursor-pointer text-sm font-bold tracking-[0.2em] hover:opacity-80">
                OFF AXIS
              </button>
              <p className="mt-3 text-[0.78rem] leading-relaxed" style={{ color: OA.muted }}>
                The gig-swap platform for the underground scene.
              </p>
            </div>
            <div>
              <h3 className="text-[0.72rem] font-semibold tracking-wide" style={{ color: OA.secondary }}>
                Explore
              </h3>
              <ul className="mt-3 space-y-2 text-[0.8rem]" style={{ color: OA.muted }}>
                <li>
                  <button type="button" onClick={() => changeView("artists")} className="cursor-pointer hover:text-white">
                    Artists
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => changeView("gigs")} className="cursor-pointer hover:text-white">
                    Gigs
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => changeView("venues")} className="cursor-pointer hover:text-white">
                    Venues
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-[0.72rem] font-semibold tracking-wide" style={{ color: OA.secondary }}>
                Company
              </h3>
              <ul className="mt-3 space-y-2 text-[0.8rem]" style={{ color: OA.muted }}>
                {["About", "How it works", "Contact"].map((label) => (
                  <li key={label}>
                    <button type="button" onClick={() => changeView("home")} className="cursor-pointer hover:text-white">
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-[0.72rem] font-semibold tracking-wide" style={{ color: OA.secondary }}>
                Support
              </h3>
              <ul className="mt-3 space-y-2 text-[0.8rem]" style={{ color: OA.muted }}>
                {["Help centre", "Privacy", "Terms"].map((label) => (
                  <li key={label}>
                    <button type="button" onClick={() => changeView("home")} className="cursor-pointer hover:text-white">
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={cn(CONTENT, "mt-10 flex flex-wrap items-center justify-between gap-3 border-t pt-6 text-[0.72rem]")} style={{ borderColor: OA.border, color: OA.muted }}>
            <span>© 2026 Off Axis. All rights reserved.</span>
            <span className="flex gap-4">
              {["Instagram", "TikTok", "X"].map((s) => (
                <button key={s} type="button" onClick={() => changeView("home")} className="cursor-pointer hover:text-white">
                  {s}
                </button>
              ))}
            </span>
          </div>
        </footer>
      </RedesignCalloutRegion>
    </div>
  );
}

/** Small star icon shim (lucide Star) imported lazily-friendly */
function Star({ className, ...rest }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden {...rest}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

/** Resolve a basket id that belongs to a synthesised ended gig (so removed-from-history adds still render) */
function endedGigsLookup(id: string): Gig | undefined {
  for (const artist of ARTISTS) {
    const found = endedGigsFor(artist).find((g) => g.id === id);
    if (found) return found;
  }
  return undefined;
}

function AuthView({
  mode,
  form,
  setForm,
  signupRole,
  setSignupRole,
  location,
  setLocation,
  onSubmit,
  onSwitch,
  onBack,
}: {
  mode: "login" | "signup";
  form: { name: string; email: string; password: string };
  setForm: React.Dispatch<React.SetStateAction<{ name: string; email: string; password: string }>>;
  signupRole: SignupRole;
  setSignupRole: (role: SignupRole) => void;
  location: string;
  setLocation: (value: string) => void;
  onSubmit: () => void;
  onSwitch: (next: "login" | "signup") => void;
  onBack: () => void;
}) {
  const isSignup = mode === "signup";
  return (
    <section className={cn("relative overflow-hidden", PAGE_GUTTER, "py-16")}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 opacity-30" style={{ background: `radial-gradient(60% 100% at 50% 0%, ${OA.accent}55, transparent)` }} aria-hidden />
      <div className="relative mx-auto w-full max-w-md rounded-2xl border p-6 sm:p-8" style={{ borderColor: OA.border, backgroundColor: OA.surface }}>
        <button type="button" onClick={onBack} className="mb-4 inline-flex cursor-pointer items-center gap-1.5 text-[0.78rem] hover:text-white" style={{ color: OA.muted }}>
          <ArrowLeft className="size-3.5" aria-hidden />
          Back
        </button>
        <h1 className="text-xl font-semibold">{isSignup ? "Create your account" : "Welcome back"}</h1>
        <p className="mt-1 text-[0.82rem]" style={{ color: OA.muted }}>
          {isSignup ? "Join Off Axis as a fan, artist, or venue." : "Log in to book gigs and follow artists."}
        </p>

        {isSignup ? (
          <div className="mt-5 grid grid-cols-3 gap-2">
            {(["fan", "artist", "venue"] as SignupRole[]).map((role) => {
              const active = role === signupRole;
              return (
                <button
                  key={role}
                  type="button"
                  onClick={() => setSignupRole(role)}
                  className="cursor-pointer rounded-lg border px-2 py-2 text-[0.78rem] font-medium capitalize transition-colors"
                  style={active ? { borderColor: OA.accent, color: OA.text, backgroundColor: "rgba(168,85,247,0.18)" } : { borderColor: OA.border, color: OA.muted }}
                >
                  {role}
                </button>
              );
            })}
          </div>
        ) : null}

        <form
          className="mt-5 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          {isSignup ? <TextField label="Name" type="text" placeholder="Your name or band name" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} /> : null}
          <TextField label="Email" type="email" placeholder="name@example.com" value={form.email} onChange={(v) => setForm((f) => ({ ...f, email: v }))} />
          <TextField label="Password" type="password" placeholder="Enter your password" value={form.password} onChange={(v) => setForm((f) => ({ ...f, password: v }))} />
          {isSignup ? (
            <TextField
              label="Postcode (optional)"
              type="text"
              placeholder="e.g. EH1 1AA"
              value={location}
              onChange={setLocation}
              hint="Helps us show you gigs and venues near you. You can add it later."
            />
          ) : null}
          <PrimaryButton type="submit" className="w-full">
            {isSignup ? "Create account" : "Sign in"}
          </PrimaryButton>
        </form>

        <div className="my-5 flex items-center gap-3 text-[0.7rem]" style={{ color: OA.muted }}>
          <span className="h-px flex-1" style={{ backgroundColor: OA.border }} />
          OR CONTINUE WITH
          <span className="h-px flex-1" style={{ backgroundColor: OA.border }} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <SecondaryButton onClick={onSubmit} className="!py-2 !text-[0.8rem]">
            Google
          </SecondaryButton>
          <SecondaryButton onClick={onSubmit} className="!py-2 !text-[0.8rem]">
            Apple
          </SecondaryButton>
        </div>

        <p className="mt-6 text-center text-[0.8rem]" style={{ color: OA.muted }}>
          {isSignup ? "Already have an account? " : "Don't have an account? "}
          <button type="button" onClick={() => onSwitch(isSignup ? "login" : "signup")} className="cursor-pointer font-semibold hover:underline" style={{ color: OA.accent }}>
            {isSignup ? "Log in" : "Sign up"}
          </button>
        </p>
      </div>
    </section>
  );
}

function GigRow({ gig, onOpen, onBuy, ended, lead = "venue" }: { gig: Gig; onOpen: () => void; onBuy?: () => void; ended?: boolean; lead?: "venue" | "artist" }) {
  const leadArtist = lead === "artist";
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border p-3" style={{ borderColor: OA.border, backgroundColor: OA.bg }}>
      <button type="button" onClick={onOpen} className="flex min-w-0 flex-1 cursor-pointer items-center gap-3 text-left">
        <span
          className="size-10 shrink-0 rounded-md"
          style={{
            backgroundImage: photoBg(leadArtist ? gig.artist : gig.venue, leadArtist ? ARTIST_PHOTOS : VENUE_PHOTOS),
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <span className="min-w-0">
          <span className="block truncate text-[0.85rem] font-medium">
            {leadArtist ? gig.artist : `${gig.venue}, ${gig.city}`}
          </span>
          <span className="block text-[0.72rem]" style={{ color: OA.muted }}>
            {gig.date} · {ended ? "Past show" : formatGBP(gig.price)}
          </span>
        </span>
      </button>
      {ended ? (
        <span className="shrink-0 rounded-full border px-2.5 py-1 text-[0.68rem]" style={{ borderColor: OA.border, color: OA.muted }}>
          Ended
        </span>
      ) : onBuy ? (
        <PrimaryButton onClick={onBuy} className="shrink-0 whitespace-nowrap !px-3 !py-1.5 !text-[0.75rem]">
          <Plus className="size-3.5" aria-hidden />
          Add to basket
        </PrimaryButton>
      ) : null}
    </div>
  );
}

function ArtistProfileView({
  artist,
  following,
  onToggleFollow,
  onBack,
  backLabel,
  upcoming,
  ended,
  onOpenEvent,
  onOpenArtist,
  onBuy,
  callouts,
  showCallouts,
}: {
  artist: Artist;
  following: boolean;
  onToggleFollow: () => void;
  onBack: () => void;
  backLabel: string;
  upcoming: Gig[];
  ended: Gig[];
  onOpenEvent: (gig: Gig) => void;
  onOpenArtist: (artist: Artist) => void;
  onBuy: (gig: Gig) => void;
  callouts: readonly RedesignCallout[];
  showCallouts: boolean;
}) {
  const [showAllEnded, setShowAllEnded] = useState(false);
  const handle = slug(artist.name);
  const similarArtists = ARTISTS
    .filter((a) => a.name !== artist.name)
    .map((a) => {
      const soundsOverlap = a.soundsLike.filter((s) => artist.soundsLike.includes(s)).length;
      const tagOverlap = a.tags.filter((t) => artist.tags.includes(t)).length;
      const score = (a.genre === artist.genre ? 2 : 0) + soundsOverlap + tagOverlap + (a.location === artist.location ? 1 : 0);
      return { artist: a, score };
    })
    .sort((x, y) => y.score - x.score)
    .slice(0, 3)
    .map((x) => x.artist);
  const connects = [
    { icon: AtSign, label: "Follow on Instagram", value: `@${handle}` },
    { icon: Music, label: "Listen on Spotify", value: `${artist.name} on Spotify` },
    { icon: Globe, label: "Like on Facebook", value: `facebook.com/${handle}` },
  ];
  const visibleEnded = showAllEnded ? ended : ended.slice(0, 1);

  return (
    <section className={cn(PAGE_GUTTER, "py-12")}>
      <div className={CONTENT}>
        <RedesignCalloutRegion calloutId="HE-012" callouts={callouts} showMarkers={showCallouts} className="inline-block">
          <BackLink label={backLabel} onClick={onBack} />
        </RedesignCalloutRegion>

        <div className="mt-6 overflow-hidden rounded-2xl border" style={{ borderColor: OA.border, backgroundColor: OA.surface }}>
          <div className="relative flex h-44 items-center justify-center" style={{ backgroundImage: photoBg(artist.name, ARTIST_PHOTOS), backgroundSize: "cover", backgroundPosition: "center" }} />

          <div className="p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold">{artist.name}</h1>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-sm" style={{ color: OA.muted }}>
                  <RedesignCalloutRegion calloutId="HE-017" callouts={callouts} showMarkers={showCallouts} className="inline-flex">
                    <span className="rounded-full border px-2.5 py-0.5 text-[0.72rem] font-semibold" style={{ borderColor: OA.accent, color: OA.text, backgroundColor: "rgba(168,85,247,0.18)" }}>
                      {artist.genre}
                    </span>
                  </RedesignCalloutRegion>
                  <span className="flex items-center gap-1">
                    <MapPin className="size-3.5" aria-hidden />
                    {artist.location}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onToggleFollow}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border px-4 py-2 text-sm font-semibold transition-colors"
                  style={following ? { borderColor: OA.accent, color: OA.text, backgroundColor: "rgba(168,85,247,0.18)" } : { borderColor: OA.border, color: OA.secondary }}
                >
                  {following ? <Check className="size-4" aria-hidden /> : null}
                  {following ? "Following" : "Follow"}
                </button>
              </div>
            </div>

            {/* Gig counts as lightweight metadata (HE-014: header still splits upcoming vs ended) */}
            <RedesignCalloutRegion calloutId="HE-014" callouts={callouts} showMarkers={showCallouts} className="mt-4">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.82rem]">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="size-3.5" style={{ color: OA.accent }} aria-hidden />
                  <span className="font-semibold" style={{ color: OA.text }}>{upcoming.length}</span>
                  <span style={{ color: OA.muted }}>upcoming {upcoming.length === 1 ? "gig" : "gigs"}</span>
                </span>
                <span aria-hidden style={{ color: OA.border }}>·</span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="font-semibold" style={{ color: OA.text }}>{ended.length}</span>
                  <span style={{ color: OA.muted }}>past {ended.length === 1 ? "show" : "shows"}</span>
                </span>
              </div>
            </RedesignCalloutRegion>

          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-8">
            {/* About: bio + structured Sounds like / Vibe (HE-018) */}
            <div>
              <h2 className="text-lg font-semibold">About {artist.name}</h2>
              <p className="mt-3 max-w-2xl text-[0.9rem] leading-relaxed" style={{ color: OA.secondary }}>
                {artist.bio}
              </p>
              <RedesignCalloutRegion calloutId="HE-018" callouts={callouts} showMarkers={showCallouts} className="mt-5">
                <div className="space-y-3">
                  <div>
                    <span className="text-[0.72rem] font-semibold" style={{ color: OA.muted }}>
                      Sounds like
                    </span>
                    <div className="mt-1.5 flex flex-wrap gap-2">
                      {artist.soundsLike.map((s) => (
                        <Chip key={s}>{s}</Chip>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-[0.72rem] font-semibold" style={{ color: OA.muted }}>
                      Vibe
                    </span>
                    <div className="mt-1.5 flex flex-wrap gap-2">
                      {artist.tags.map((t) => (
                        <Chip key={t}>{t}</Chip>
                      ))}
                    </div>
                  </div>
                </div>
              </RedesignCalloutRegion>
            </div>

            {/* Upcoming gigs */}
            <div>
              <h2 className="text-lg font-semibold">Upcoming gigs ({upcoming.length})</h2>
              <div className="mt-3 space-y-2.5">
                {upcoming.length > 0 ? (
                  upcoming.map((gig) => <GigRow key={gig.id} gig={gig} onOpen={() => onOpenEvent(gig)} onBuy={() => onBuy(gig)} />)
                ) : (
                  <p className="rounded-lg border p-4 text-center text-sm" style={{ borderColor: OA.border, color: OA.muted }}>
                    No upcoming gigs scheduled right now. Follow {artist.name} to be notified.
                  </p>
                )}
              </div>
            </div>

            {/* Ended gigs — collapsed (HE-013) */}
            <RedesignCalloutRegion calloutId="HE-013" callouts={callouts} showMarkers={showCallouts}>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold" style={{ color: OA.secondary }}>
                  Ended gigs ({ended.length})
                </h2>
              </div>
              <div className="mt-3 space-y-2.5">
                {visibleEnded.map((gig) => (
                  <GigRow key={gig.id} gig={gig} onOpen={() => onOpenEvent(gig)} ended />
                ))}
              </div>
              {ended.length > 1 ? (
                <button type="button" onClick={() => setShowAllEnded((s) => !s)} className="mt-3 inline-flex cursor-pointer items-center gap-1.5 text-[0.8rem] font-medium hover:underline" style={{ color: OA.accent }}>
                  {showAllEnded ? (
                    <>
                      Show less
                      <ChevronUp className="size-4" aria-hidden />
                    </>
                  ) : (
                    <>
                      Show {ended.length - 1} more ended {ended.length - 1 === 1 ? "gig" : "gigs"}
                      <ChevronDown className="size-4" aria-hidden />
                    </>
                  )}
                </button>
              ) : null}
            </RedesignCalloutRegion>
          </div>

          <aside className="space-y-8">
            {/* Merch */}
            <div className="rounded-xl border p-5" style={{ borderColor: OA.border, backgroundColor: OA.surface }}>
              <h2 className="text-base font-semibold">Merch</h2>
              <div className="mt-3 flex items-center gap-3 rounded-lg border p-3" style={{ borderColor: OA.border, backgroundColor: OA.bg }}>
                <span className="flex size-12 items-center justify-center rounded-md text-white/80" style={{ backgroundImage: avatarGradient(`${artist.name} merch`) }}>
                  <Ticket className="size-5" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[0.85rem] font-medium">{artist.name} tour tee</p>
                  <p className="text-[0.72rem]" style={{ color: OA.muted }}>
                    {formatGBP(20)} · 9 left
                  </p>
                </div>
                <SecondaryButton className="!px-3 !py-1.5 !text-[0.75rem]">Add</SecondaryButton>
              </div>
            </div>

            {/* Connect — tappable rows with clean handles + action labels (HE-015, HE-016) */}
            <RedesignCalloutRegion calloutId="HE-015" callouts={callouts} showMarkers={showCallouts} markerIndex={0}>
              <RedesignCalloutRegion calloutId="HE-016" callouts={callouts} showMarkers={showCallouts} markerIndex={1}>
                <div className="rounded-xl border p-5" style={{ borderColor: OA.border, backgroundColor: OA.surface }}>
                  <h2 className="text-base font-semibold">Connect</h2>
                  <div className="mt-3 space-y-2">
                    {connects.map((c) => (
                      <button
                        key={c.label}
                        type="button"
                        className="flex w-full cursor-pointer items-center gap-3 rounded-lg border px-3 py-2.5 text-left transition-colors hover:border-[var(--oa-accent)] hover:bg-white/5"
                        style={{ borderColor: OA.border, ["--oa-accent" as string]: OA.accent }}
                      >
                        <c.icon className="size-4 shrink-0" style={{ color: OA.accent }} aria-hidden />
                        <span className="min-w-0 flex-1">
                          <span className="block text-[0.82rem] font-medium">{c.label}</span>
                          <span className="block truncate text-[0.72rem]" style={{ color: OA.muted }}>
                            {c.value}
                          </span>
                        </span>
                        <ExternalLink className="size-3.5 shrink-0" style={{ color: OA.muted }} aria-hidden />
                      </button>
                    ))}
                  </div>
                </div>
              </RedesignCalloutRegion>
            </RedesignCalloutRegion>
          </aside>
        </div>

        {similarArtists.length > 0 ? (
          <div className="mt-12">
            <h2 className="text-lg font-semibold">Similar artists</h2>
            <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {similarArtists.map((a) => (
                <button
                  key={a.name}
                  type="button"
                  onClick={() => onOpenArtist(a)}
                  className="flex cursor-pointer items-center gap-3 rounded-xl border p-3 text-left transition-colors hover:border-[var(--oa-accent)] hover:bg-white/5"
                  style={{ borderColor: OA.border, backgroundColor: OA.surface, ["--oa-accent" as string]: OA.accent }}
                >
                  <span
                    className="size-11 shrink-0 rounded-full"
                    style={{ backgroundImage: photoBg(a.name, ARTIST_PHOTOS), backgroundSize: "cover", backgroundPosition: "center" }}
                  />

                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[0.88rem] font-semibold">{a.name}</span>
                    <span className="block truncate text-[0.74rem]" style={{ color: OA.muted }}>
                      {a.genre} · {a.location}
                    </span>
                  </span>
                  <ArrowRight className="size-4 shrink-0" style={{ color: OA.muted }} aria-hidden />
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function MetaRow({ icon: Icon, label, value, onClick }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; onClick?: () => void }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 size-4 shrink-0" />
      <div>
        <p className="text-[0.7rem]" style={{ color: OA.muted }}>
          {label}
        </p>
        {onClick ? (
          <button type="button" onClick={onClick} className="cursor-pointer text-left text-[0.85rem] font-medium underline-offset-2 transition-colors hover:text-white hover:underline">
            {value}
          </button>
        ) : (
          <p className="text-[0.85rem] font-medium">{value}</p>
        )}
      </div>
    </div>
  );
}

function EventDetailView({
  gig,
  artist,
  onBack,
  backLabel,
  onOpenArtist,
  onOpenArtistByName,
  onOpenVenue,
  onBuy,
  callouts,
  showCallouts,
}: {
  gig: Gig;
  artist: Artist | undefined;
  onBack: () => void;
  backLabel: string;
  onOpenArtist: () => void;
  onOpenArtistByName: (name: string) => void;
  onOpenVenue: () => void;
  onBuy: () => void;
  callouts: readonly RedesignCallout[];
  showCallouts: boolean;
}) {
  return (
    <section className={cn(PAGE_GUTTER, "py-12")}>
      <div className={CONTENT}>
        <BackLink label={backLabel} onClick={onBack} />

        <div className="mt-6 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div>
            {/* Eyebrow + title (HE-020) */}
            <RedesignCalloutRegion calloutId="HE-020" callouts={callouts} showMarkers={showCallouts} className="inline-block">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em]" style={{ color: OA.accent }}>
                Off Axis presents
              </p>
              <h1 className="mt-1 text-2xl font-bold sm:text-3xl">{gig.artist}</h1>
            </RedesignCalloutRegion>

            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm" style={{ color: OA.muted }}>
              <span className="flex items-center gap-1.5">
                <Calendar className="size-4" aria-hidden />
                {gig.date}
              </span>
              <button
                type="button"
                onClick={onOpenVenue}
                className="flex cursor-pointer items-center gap-1.5 rounded transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ color: "inherit", outlineColor: OA.accent }}
              >
                <MapPin className="size-4" aria-hidden />
                <span className="underline-offset-2 hover:underline">
                  {gig.venue}, {gig.city}
                </span>
              </button>
            </div>

            <div className="mt-6 h-48 w-full rounded-2xl border" style={{ borderColor: OA.border, backgroundImage: photoBg(gig.artist, ARTIST_PHOTOS), backgroundSize: "cover", backgroundPosition: "center" }} aria-hidden />

            {/* Mobile-only ticket / CTA — surfaces the buy action high on small screens (desktop uses the sidebar card) */}
            <div className="mt-6 rounded-2xl border p-5 lg:hidden" style={{ borderColor: OA.border, backgroundColor: OA.surface }}>
              <p className="text-[0.72rem]" style={{ color: OA.muted }}>
                Ticket price
              </p>
              <p className="mt-0.5 text-3xl font-bold">{formatGBP(gig.price)}</p>
              <p className="mt-1 text-[0.75rem]" style={{ color: OA.muted }}>
                + {formatGBP(BOOKING_FEE)} booking fee · {formatGBP(gig.price + BOOKING_FEE)} all-in
              </p>
              <PrimaryButton onClick={onBuy} className="mt-4 w-full">
                <Plus className="size-4" aria-hidden />
                Add to basket
              </PrimaryButton>
              <SecondaryButton className="mt-2 w-full !py-2 !text-[0.82rem]">
                <Share2 className="size-4" aria-hidden />
                Share
              </SecondaryButton>
            </div>

            <h2 className="mt-8 text-lg font-semibold">About this event</h2>
            <p className="mt-2 max-w-2xl text-[0.9rem] leading-relaxed" style={{ color: OA.secondary }}>
              {gig.about}
            </p>

            {/* Artist row with real avatar (HE-019) */}
            <RedesignCalloutRegion calloutId="HE-019" callouts={callouts} showMarkers={showCallouts} className="mt-6">
              <h2 className="text-lg font-semibold">Artist</h2>
              <button
                type="button"
                onClick={onOpenArtist}
                className="mt-2 flex w-full max-w-md cursor-pointer items-center gap-3 rounded-xl border p-3 text-left transition-colors hover:border-[var(--oa-accent)] hover:bg-white/5"
                style={{ borderColor: OA.border, backgroundColor: OA.surface, ["--oa-accent" as string]: OA.accent }}
              >
                <span
                  className="size-12 shrink-0 rounded-full"
                  style={{ backgroundImage: photoBg(gig.artist, ARTIST_PHOTOS), backgroundSize: "cover", backgroundPosition: "center" }}
                />

                <span className="min-w-0 flex-1">
                  <span className="block text-[0.9rem] font-semibold">{gig.artist}</span>
                  <span className="block truncate text-[0.75rem]" style={{ color: OA.muted }}>
                    {artist ? `${artist.genre} · ${artist.location}` : "View artist profile"}
                  </span>
                </span>
                <ArrowRight className="size-4 shrink-0" style={{ color: OA.muted }} aria-hidden />
              </button>
            </RedesignCalloutRegion>

            {gig.support && gig.support.length > 0 ? (
              <div className="mt-6">
                <h2 className="text-lg font-semibold">Support</h2>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  {gig.support.map((name) => {
                    const supportArtist = artistByName(name);
                    return (
                      <button
                        key={name}
                        type="button"
                        onClick={() => onOpenArtistByName(name)}
                        className="flex cursor-pointer items-center gap-3 rounded-xl border p-3 text-left transition-colors hover:border-[var(--oa-accent)] hover:bg-white/5"
                        style={{ borderColor: OA.border, backgroundColor: OA.surface, ["--oa-accent" as string]: OA.accent }}
                      >
                        <span
                          className="size-10 shrink-0 rounded-full"
                          style={{ backgroundImage: photoBg(name, ARTIST_PHOTOS), backgroundSize: "cover", backgroundPosition: "center" }}
                        />

                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[0.85rem] font-semibold">{name}</span>
                          <span className="block truncate text-[0.72rem]" style={{ color: OA.muted }}>
                            {supportArtist ? `${supportArtist.genre} · ${supportArtist.location}` : "Support act"}
                          </span>
                        </span>
                        <ArrowRight className="size-4 shrink-0" style={{ color: OA.muted }} aria-hidden />
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>

          {/* Ticket sidebar */}
          <aside className="space-y-4">
            <RedesignCalloutRegion calloutId="HE-029" callouts={callouts} showMarkers={showCallouts} className="hidden lg:block">
              <div className="rounded-2xl border p-5" style={{ borderColor: OA.border, backgroundColor: OA.surface }}>
                <p className="text-[0.72rem]" style={{ color: OA.muted }}>
                  Ticket price
                </p>
                <p className="mt-0.5 text-3xl font-bold">{formatGBP(gig.price)}</p>
                <p className="mt-1 text-[0.75rem]" style={{ color: OA.muted }}>
                  + {formatGBP(BOOKING_FEE)} booking fee · {formatGBP(gig.price + BOOKING_FEE)} all-in
                </p>
                <PrimaryButton onClick={onBuy} className="mt-4 w-full">
                  <Plus className="size-4" aria-hidden />
                  Add to basket
                </PrimaryButton>
                <SecondaryButton className="mt-2 w-full !py-2 !text-[0.82rem]">
                  <Share2 className="size-4" aria-hidden />
                  Share
                </SecondaryButton>
              </div>
            </RedesignCalloutRegion>

            <div className="space-y-4 rounded-2xl border p-5" style={{ borderColor: OA.border, backgroundColor: OA.surface }}>
              <MetaRow icon={Clock} label="Doors / curfew" value={`${gig.doors} to ${gig.curfew}`} />
              <MetaRow icon={MapPin} label="Venue" value={`${gig.venue}, ${gig.city}`} onClick={onOpenVenue} />
              <MetaRow icon={Users} label="Capacity" value={`${gig.capacity} capacity`} />
              <div className="flex items-start gap-3">
                <Accessibility className="mt-0.5 size-4 shrink-0" />
                <div>
                  <p className="text-[0.7rem]" style={{ color: OA.muted }}>
                    Accessibility
                  </p>
                  <p className="text-[0.82rem]" style={{ color: OA.secondary }}>
                    Step-free access available. Contact the venue for specific requirements.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border p-5" style={{ borderColor: OA.border, backgroundColor: OA.surface }}>
              <p className="text-[0.7rem]" style={{ color: OA.muted }}>
                Organised by
              </p>
              <div className="mt-2 flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full text-[0.8rem] font-bold text-white/90" style={{ backgroundImage: avatarGradient("Off Axis") }}>
                  {initials("Off Axis")}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[0.9rem] font-semibold">Off Axis</span>
                  <span className="block truncate text-[0.74rem]" style={{ color: OA.muted }}>
                    Gig-swap platform
                  </span>
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function VenueDetailView({ venue, gigs, onBack, backLabel, onOpenEvent, onBuy }: { venue: Venue; gigs: Gig[]; onBack: () => void; backLabel: string; onOpenEvent: (gig: Gig) => void; onBuy: (gig: Gig) => void }) {
  return (
    <section className={cn(PAGE_GUTTER, "py-12")}>
      <div className={CONTENT}>
        <BackLink label={backLabel} onClick={onBack} />
        <div className="mt-6 overflow-hidden rounded-2xl border" style={{ borderColor: OA.border, backgroundColor: OA.surface }}>
          <div className="relative flex h-36 items-center justify-center" style={{ backgroundImage: photoBg(venue.name, VENUE_PHOTOS), backgroundSize: "cover", backgroundPosition: "center" }} />

          <div className="p-6">
            <h1 className="text-2xl font-bold">{venue.name}</h1>
            <p className="mt-1 text-sm" style={{ color: OA.muted }}>
              {venue.location} · {venue.upcoming} upcoming {venue.upcoming === 1 ? "gig" : "gigs"}
            </p>
          </div>
        </div>
        <h2 className="mt-8 text-lg font-semibold">What&apos;s on here</h2>
        <div className="mt-3 space-y-2.5">
          {gigs.length > 0 ? (
            gigs.map((gig) => <GigRow key={gig.id} gig={gig} lead="artist" onOpen={() => onOpenEvent(gig)} onBuy={() => onBuy(gig)} />)
          ) : (
            <p className="rounded-lg border p-4 text-center text-sm" style={{ borderColor: OA.border, color: OA.muted }}>
              No upcoming gigs listed at this venue yet.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function AccountView({ onOpenSubscriptions, callouts, showCallouts }: { onOpenSubscriptions: () => void; callouts: readonly RedesignCallout[]; showCallouts: boolean }) {
  const [tab, setTab] = useState<AccountTab>("Details");
  const [displayName, setDisplayName] = useState(USER.name);
  const [bio, setBio] = useState("Gig-goer and supporter of small artists.");

  return (
    <section className={cn(PAGE_GUTTER, "py-12")}>
      <div className={CONTENT}>
        {/* Header card with avatar + change-photo control (HE-023) */}
        <div className="overflow-hidden rounded-2xl border" style={{ borderColor: OA.border, backgroundColor: OA.surface }}>
          <div className="h-24" style={{ backgroundImage: ACCENT_GRADIENT, opacity: 0.85 }} aria-hidden />
          <div className="px-6 pb-6">
            <div className="-mt-10 flex flex-wrap items-end gap-4">
              <RedesignCalloutRegion calloutId="HE-023" callouts={callouts} showMarkers={showCallouts} className="inline-block">
                <div className="relative">
                  <span
                    className="block size-20 rounded-full border-4"
                    style={{ borderColor: OA.surface, backgroundImage: photoBg(USER.name, ARTIST_PHOTOS), backgroundSize: "cover", backgroundPosition: "center" }}
                  />

                  <button
                    type="button"
                    aria-label="Change profile photo"
                    className="absolute -bottom-1 -right-1 flex size-7 cursor-pointer items-center justify-center rounded-full border-2 text-white"
                    style={{ borderColor: OA.surface, backgroundImage: ACCENT_GRADIENT }}
                  >
                    <Camera className="size-3.5" aria-hidden />
                  </button>
                </div>
              </RedesignCalloutRegion>
              <div className="flex-1">
                <h1 className="text-xl font-bold">{USER.name}</h1>
                <p className="text-[0.8rem]" style={{ color: OA.muted }}>
                  Fan · Joined {USER.joined}
                </p>
              </div>
              <SecondaryButton onClick={onOpenSubscriptions} className="!py-2 !text-[0.82rem]">
                <Star className="size-4" />
                Manage subscription
              </SecondaryButton>
            </div>
          </div>
        </div>

        {/* Tabs on one row (HE-024) */}
        <RedesignCalloutRegion calloutId="HE-024" callouts={callouts} showMarkers={showCallouts} className="mt-6">
          <div className="flex gap-1 overflow-x-auto rounded-xl border p-1" style={{ borderColor: OA.border, backgroundColor: OA.surface }}>
            {ACCOUNT_TABS.map((t) => {
              const active = t === tab;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  className="shrink-0 cursor-pointer rounded-lg px-3.5 py-2 text-[0.82rem] font-medium transition-colors"
                  style={active ? { color: OA.text, backgroundColor: "rgba(168,85,247,0.18)" } : { color: OA.muted }}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </RedesignCalloutRegion>

        {tab === "Details" ? (
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {/* Email verification clarity (HE-025) */}
            <RedesignCalloutRegion calloutId="HE-025" callouts={callouts} showMarkers={showCallouts}>
              <div className="rounded-xl border p-5" style={{ borderColor: OA.border, backgroundColor: OA.surface }}>
                <div className="flex items-center gap-2">
                  <Mail className="size-4" style={{ color: OA.accent }} aria-hidden />
                  <h2 className="text-base font-semibold">Email verification</h2>
                </div>
                <div className="mt-3 flex items-start gap-2 rounded-lg border p-3" style={{ borderColor: "rgba(234,179,8,0.4)", backgroundColor: "rgba(234,179,8,0.08)" }}>
                  <span className="mt-0.5 size-2 shrink-0 rounded-full" style={{ backgroundColor: "#EAB308" }} aria-hidden />
                  <p className="text-[0.8rem] leading-relaxed" style={{ color: OA.secondary }}>
                    Your email <span className="font-medium">{USER.email}</span> isn&apos;t verified yet. Verifying confirms it&apos;s really you and lets us send your tickets and booking confirmations. Check your inbox for the link, or resend it below.
                  </p>
                </div>
                <PrimaryButton className="mt-3 !py-2 !text-[0.82rem]">Resend verification email</PrimaryButton>
              </div>
            </RedesignCalloutRegion>

            <div className="rounded-xl border p-5" style={{ borderColor: OA.border, backgroundColor: OA.surface }}>
              <h2 className="text-base font-semibold">Profile information</h2>
              <div className="mt-3 space-y-4">
                <TextField label="Display name" type="text" placeholder="Your name" value={displayName} onChange={setDisplayName} />
                <TextField label="Email" type="email" placeholder="name@example.com" value={USER.email} onChange={() => {}} />
                <label className="block text-left">
                  <span className="text-[0.78rem] font-medium" style={{ color: OA.secondary }}>
                    Bio
                  </span>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={3}
                    className="mt-1.5 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-[var(--oa-accent)]"
                    style={{ borderColor: OA.border, backgroundColor: OA.bg, color: OA.text, ["--oa-accent" as string]: OA.accent }}
                  />
                </label>
                <PrimaryButton className="!py-2 !text-[0.82rem]">Save changes</PrimaryButton>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-6 rounded-xl border p-8 text-center" style={{ borderColor: OA.border, backgroundColor: OA.surface }}>
            <p className="text-sm" style={{ color: OA.muted }}>
              {tab === "Activity" ? "Your recent follows, saved gigs and views appear here." : null}
              {tab === "Transactions" ? "Your past orders and receipts appear here." : null}
              {tab === "Referrals" ? "Invite friends and earn free tickets. Your referral link appears here." : null}
              {tab === "Security" ? "Password, connected accounts and two-factor settings appear here." : null}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function SubscriptionsView({ callouts, showCallouts }: { callouts: readonly RedesignCallout[]; showCallouts: boolean }) {
  return (
    <section className={cn(PAGE_GUTTER, "py-12")}>
      <div className={CONTENT}>
        <div className="text-center">
          <h1 className="text-2xl font-bold">Upgrade your fan experience</h1>
          <p className="mx-auto mt-2 max-w-xl text-sm" style={{ color: OA.muted }}>
            Get free tickets every month and back the artists you love. Cancel anytime.
          </p>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SUB_TIERS.map((tier) => {
            const card = (
              <div
                className="flex h-full flex-col rounded-2xl border p-5"
                style={tier.highlight ? { borderColor: OA.accent, backgroundColor: OA.surface } : { borderColor: OA.border, backgroundColor: OA.surface }}
              >
                {tier.badge ? (
                  <span className="mb-3 inline-flex w-fit items-center gap-1 rounded-full px-2.5 py-1 text-[0.65rem] font-bold text-white" style={{ backgroundImage: ACCENT_GRADIENT }}>
                    {tier.badge}
                  </span>
                ) : null}
                <h2 className="text-base font-semibold">{tier.name}</h2>
                <p className="mt-0.5 text-[0.76rem]" style={{ color: OA.muted }}>
                  {tier.summary}
                </p>
                <p className="mt-3">
                  <span className="text-3xl font-bold">{tier.price}</span>
                  <span className="text-[0.8rem]" style={{ color: OA.muted }}>
                    {tier.period}
                  </span>
                </p>
                <ul className="mt-4 flex-1 space-y-2 text-[0.8rem]" style={{ color: OA.secondary }}>
                  {tier.perks.map((perk, i) => (
                    <li key={perk} className="flex items-start gap-2">
                      <Check className="mt-0.5 size-4 shrink-0" style={{ color: OA.accent }} aria-hidden />
                      <span className={tier.clarifiedPerk === i ? "font-medium" : undefined}>{perk}</span>
                    </li>
                  ))}
                </ul>
                {tier.highlight ? (
                  <PrimaryButton className="mt-5 w-full !py-2">Choose {tier.name}</PrimaryButton>
                ) : (
                  <SecondaryButton className="mt-5 w-full !py-2">Choose {tier.name}</SecondaryButton>
                )}
              </div>
            );

            return tier.clarifiedPerk !== undefined ? (
              <RedesignCalloutRegion key={tier.name} calloutId="HE-026" callouts={callouts} showMarkers={showCallouts} tooltipPlacement="above">
                {card}
              </RedesignCalloutRegion>
            ) : (
              <div key={tier.name}>{card}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CheckoutView({
  items,
  loggedIn,
  onSetQty,
  onBrowse,
  onSignIn,
  postcode,
  onPostcodeChange,
  callouts,
  showCallouts,
}: {
  items: { gig: Gig; qty: number }[];
  loggedIn: boolean;
  onSetQty: (id: string, qty: number) => void;
  onBrowse: () => void;
  onSignIn: () => void;
  postcode: string;
  onPostcodeChange: (value: string) => void;
  callouts: readonly RedesignCallout[];
  showCallouts: boolean;
}) {
  const [voucher, setVoucher] = useState("");
  const [donate, setDonate] = useState(false);
  const [terms, setTerms] = useState(false);

  const ticketCount = items.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = items.reduce((sum, item) => sum + item.gig.price * item.qty, 0);
  const fees = BOOKING_FEE * ticketCount;
  const donation = donate ? 1 : 0;
  const total = subtotal + fees + donation;
  const headlineArtist = items[0]?.gig.artist ?? "the artist";

  if (items.length === 0) {
    return (
      <section className={cn(PAGE_GUTTER, "py-16")}>
        <div className={cn(CONTENT, "text-center")}>
          <ShoppingCart className="mx-auto size-10" style={{ color: OA.muted }} aria-hidden />
          <h1 className="mt-4 text-xl font-semibold">Your basket is empty</h1>
          <p className="mt-1 text-sm" style={{ color: OA.muted }}>
            Add a gig from the listings to get started.
          </p>
          <PrimaryButton onClick={onBrowse} className="mt-5">
            Browse gigs
          </PrimaryButton>
        </div>
      </section>
    );
  }

  return (
    <section className={cn(PAGE_GUTTER, "py-12")}>
      <div className={CONTENT}>
        <PageHeading title="Checkout" />

        {/* Guest vs member (HE-027 grouping) */}
        {!loggedIn ? (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border p-4" style={{ borderColor: OA.border, backgroundColor: OA.surface }}>
            <div className="flex items-center gap-2 text-[0.85rem]">
              <User className="size-4" style={{ color: OA.accent }} aria-hidden />
              <span>
                <span className="font-semibold">Checking out as a guest.</span>{" "}
                <span style={{ color: OA.muted }}>Sign in for faster checkout and to save your tickets.</span>
              </span>
            </div>
            <SecondaryButton onClick={onSignIn} className="!py-2 !text-[0.82rem]">
              Sign in
            </SecondaryButton>
          </div>
        ) : (
          <div className="mb-6 flex items-center gap-2 rounded-xl border p-4 text-[0.85rem]" style={{ borderColor: OA.border, backgroundColor: OA.surface }}>
            <ShieldCheck className="size-4" style={{ color: OA.accent }} aria-hidden />
            <span>
              Signed in as <span className="font-semibold">{USER.email}</span>. Tickets will be saved to your account.
            </span>
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          {/* Order summary (HE-027): heading above the card, items inside */}
          <div>
            <RedesignCalloutRegion calloutId="HE-027" callouts={callouts} showMarkers={showCallouts}>
              <h2 className="text-lg font-semibold">Order summary</h2>
              <div className="mt-3 divide-y rounded-xl border" style={{ borderColor: OA.border, backgroundColor: OA.surface }}>
                {items.map((item) => (
                  <div key={item.gig.id} className="flex flex-wrap items-center gap-3 p-4 sm:flex-nowrap" style={{ borderColor: OA.border }}>
                    <span
                      className="size-12 shrink-0 rounded-md"
                      style={{ backgroundImage: photoBg(item.gig.artist, ARTIST_PHOTOS), backgroundSize: "cover", backgroundPosition: "center" }}
                    />

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[0.88rem] font-semibold">{item.gig.artist}</p>
                      <p className="truncate text-[0.74rem]" style={{ color: OA.muted }}>
                        {item.gig.venue}, {item.gig.city} · {item.gig.date}
                      </p>
                    </div>
                    <div className="flex w-full items-center justify-between gap-3 sm:w-auto">
                      <div className="flex items-center gap-1.5 rounded-lg border" style={{ borderColor: OA.border }}>
                        <button type="button" aria-label="Decrease quantity" onClick={() => onSetQty(item.gig.id, item.qty - 1)} className="cursor-pointer px-2 py-1.5 hover:text-white" style={{ color: OA.muted }}>
                          <Minus className="size-3.5" aria-hidden />
                        </button>
                        <span className="min-w-[1.25rem] text-center text-[0.85rem] font-medium">{item.qty}</span>
                        <button type="button" aria-label="Increase quantity" onClick={() => onSetQty(item.gig.id, item.qty + 1)} className="cursor-pointer px-2 py-1.5 hover:text-white" style={{ color: OA.muted }}>
                          <Plus className="size-3.5" aria-hidden />
                        </button>
                      </div>
                      <span className="w-16 shrink-0 text-right text-[0.88rem] font-semibold">{formatGBP(item.gig.price * item.qty)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </RedesignCalloutRegion>

            {/* Postcode moved out of the pay step, clearly optional (HE-028) */}
            <RedesignCalloutRegion calloutId="HE-028" callouts={callouts} showMarkers={showCallouts} className="mt-6">
              <div className="rounded-xl border p-4" style={{ borderColor: OA.border, backgroundColor: OA.surface }}>
                <TextField
                  label="Postcode (optional)"
                  type="text"
                  placeholder="e.g. EH1 1AA"
                  value={postcode}
                  onChange={onPostcodeChange}
                  hint="Only used to recommend gigs near you. You don't need it to buy tickets."
                />
              </div>
            </RedesignCalloutRegion>
          </div>

          {/* Discounts + totals + pay */}
          <aside className="space-y-4">
            <div className="rounded-xl border p-5" style={{ borderColor: OA.border, backgroundColor: OA.surface }}>
              <h2 className="text-base font-semibold">Discounts</h2>
              <div className="mt-3 flex gap-2">
                <div className="flex-1">
                  <input
                    value={voucher}
                    onChange={(e) => setVoucher(e.target.value)}
                    placeholder="Voucher code"
                    aria-label="Voucher code"
                    className="w-full rounded-lg border px-3 py-2 text-sm outline-none placeholder:text-[#71717A] focus:border-[var(--oa-accent)]"
                    style={{ borderColor: OA.border, backgroundColor: OA.bg, color: OA.text, ["--oa-accent" as string]: OA.accent }}
                  />
                </div>
                <SecondaryButton className="!py-2 !text-[0.8rem]">Apply</SecondaryButton>
              </div>

              {/* Donation reframed to the artist (HE-030) */}
              <RedesignCalloutRegion calloutId="HE-030" callouts={callouts} showMarkers={showCallouts} className="mt-3">
                <label className="flex cursor-pointer items-start gap-2.5 rounded-lg border p-3" style={{ borderColor: donate ? OA.accent : OA.border, backgroundColor: OA.bg }}>
                  <input type="checkbox" checked={donate} onChange={(e) => setDonate(e.target.checked)} className="mt-0.5 size-4 cursor-pointer accent-[var(--oa-accent)]" style={{ ["--oa-accent" as string]: OA.accent }} />
                  <span className="text-[0.8rem] leading-relaxed" style={{ color: OA.secondary }}>
                    Add <span className="font-semibold">£1</span> to support <span className="font-semibold">{headlineArtist}</span> directly. 100% goes to the artist.
                  </span>
                </label>
              </RedesignCalloutRegion>
            </div>

            <div className="rounded-xl border p-5" style={{ borderColor: OA.border, backgroundColor: OA.surface }}>
              <h2 className="text-base font-semibold">Total</h2>
              <dl className="mt-3 space-y-2 text-[0.85rem]">
                <div className="flex justify-between" style={{ color: OA.secondary }}>
                  <dt>Subtotal ({ticketCount} {ticketCount === 1 ? "ticket" : "tickets"})</dt>
                  <dd>{formatGBP(subtotal)}</dd>
                </div>
                <div className="flex justify-between" style={{ color: OA.secondary }}>
                  <dt>Booking fee ({ticketCount} × {formatGBP(BOOKING_FEE)})</dt>
                  <dd>{formatGBP(fees)}</dd>
                </div>
                {donate ? (
                  <div className="flex justify-between" style={{ color: OA.secondary }}>
                    <dt>Artist donation</dt>
                    <dd>{formatGBP(donation)}</dd>
                  </div>
                ) : null}
                <div className="flex justify-between border-t pt-2 text-base font-bold" style={{ borderColor: OA.border }}>
                  <dt>Total</dt>
                  <dd>{formatGBP(total)}</dd>
                </div>
              </dl>

              <label className="mt-4 flex cursor-pointer items-start gap-2.5 text-[0.78rem]" style={{ color: OA.muted }}>
                <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} className="mt-0.5 size-4 cursor-pointer accent-[var(--oa-accent)]" style={{ ["--oa-accent" as string]: OA.accent }} />
                <span>I agree to the terms of sale and refund policy.</span>
              </label>

              <PrimaryButton className="mt-4 w-full">Proceed to payment</PrimaryButton>
              <p className="mt-2 flex items-center justify-center gap-1.5 text-[0.7rem]" style={{ color: OA.muted }}>
                <ShieldCheck className="size-3.5" aria-hidden />
                Secure payment · No new fees added at this step
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
