export type CompanyLogo = {
  name: string;
  logo: string;
  /** Normalises white fill area within the shared slot (default 1) */
  scale?: number;
};

export const companies: CompanyLogo[] = [
  { name: "NHS", logo: "/companies/nhs.png", scale: 0.72 },
  { name: "OMRON", logo: "/companies/omron.png", scale: 1.05 },
  { name: "Public Health Scotland", logo: "/companies/public-health-scotland.png", scale: 0.79 },
  { name: "Scottish Government", logo: "/companies/scottish-government.png", scale: 1.08 },
  { name: "Energy Saving Trust", logo: "/companies/energy-saving-trust.png", scale: 0.72 },
  { name: "Home Energy Scotland", logo: "/companies/home-energy-scotland.png", scale: 0.72 },
  { name: "People's Postcode Lottery", logo: "/companies/peoples-postcode-lottery.png", scale: 1.25 },
  { name: "NatWest", logo: "/companies/natwest.png", scale: 1.35 },
  { name: "Royal Bank of Scotland", logo: "/companies/rbs.png", scale: 0.85 },
  { name: "Ulster Bank", logo: "/companies/ulster-bank.png", scale: 1.35 },
  { name: "Coutts", logo: "/companies/coutts.png", scale: 0.9 },
  { name: "Aegon", logo: "/companies/aegon.png", scale: 0.72 },
  { name: "abrdn", logo: "/companies/abrdn.png", scale: 1.05 },
  { name: "CBRE", logo: "/companies/cbre.png", scale: 0.88 },
  { name: "Vodafone", logo: "/companies/vodafone.png", scale: 1.32 },
  { name: "Emirates", logo: "/companies/emirates.png", scale: 1.15 },
  { name: "Scottish Rugby", logo: "/companies/scottish-rugby.png", scale: 1.32 },
  { name: "ICAS", logo: "/companies/icas.png", scale: 0.72 },
];
