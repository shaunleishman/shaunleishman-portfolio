export type CompanyLogo = {
  name: string;
  logo: string;
  /** Trimmed source pixel width */
  width: number;
  /** Trimmed source pixel height */
  height: number;
  /** Multiplier on the shared base slot (default 1) */
  scale?: number;
};

export const companies: CompanyLogo[] = [
  { name: "NHS", logo: "/companies/nhs.png", width: 164, height: 68, scale: 0.72 },
  { name: "OMRON", logo: "/companies/omron.png", width: 232, height: 45, scale: 1.05 },
  {
    name: "Public Health Scotland",
    logo: "/companies/public-health-scotland.png",
    width: 253,
    height: 95,
    scale: 0.869,
  },
  {
    name: "People's Postcode Lottery",
    logo: "/companies/peoples-postcode-lottery.png",
    width: 257,
    height: 54,
    scale: 1.35,
  },
  {
    name: "Energy Saving Trust",
    logo: "/companies/energy-saving-trust.png",
    width: 144,
    height: 120,
    scale: 0.792,
  },
  {
    name: "Home Energy Scotland",
    logo: "/companies/home-energy-scotland.png",
    width: 108,
    height: 109,
    scale: 0.792,
  },
  { name: "NatWest", logo: "/companies/natwest.png", width: 261, height: 45, scale: 1.35 },
  { name: "Royal Bank of Scotland", logo: "/companies/rbs.png", width: 245, height: 66, scale: 0.85 },
  { name: "Ulster Bank", logo: "/companies/ulster-bank.png", width: 315, height: 44, scale: 1.35 },
  { name: "Coutts", logo: "/companies/coutts.png", width: 251, height: 71, scale: 0.9 },
  { name: "Aegon", logo: "/companies/aegon.png", width: 180, height: 63, scale: 0.72 },
  { name: "abrdn", logo: "/companies/abrdn.png", width: 252, height: 54, scale: 1.05 },
  { name: "CBRE", logo: "/companies/cbre.png", width: 219, height: 55, scale: 0.88 },
  { name: "Vodafone", logo: "/companies/vodafone.png", width: 157, height: 135, scale: 1.5675 },
  { name: "Emirates", logo: "/companies/emirates.png", width: 174, height: 120, scale: 1.035 },
  { name: "Scottish Rugby", logo: "/companies/scottish-rugby.png", width: 129, height: 145, scale: 1.65 },
  { name: "ICAS", logo: "/companies/icas.png", width: 119, height: 123, scale: 0.72 },
];
