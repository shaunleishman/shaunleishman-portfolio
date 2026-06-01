export type CompanyLogo = {
  name: string;
  logo: string;
  /** Apply white invert filter — for dark PNG logos on dark background */
  invert?: boolean;
};

export const companies: CompanyLogo[] = [
  { name: "NHS", logo: "/companies/nhs.svg" },
  { name: "OMRON", logo: "/companies/png/omron.png", invert: true },
  { name: "Public Health Scotland", logo: "/companies/png/public-health-scotland.png", invert: true },
  { name: "Scottish Government", logo: "/companies/png/scottish-government.png", invert: true },
  { name: "Energy Saving Trust", logo: "/companies/png/energy-saving-trust.png" },
  { name: "Home Energy Scotland", logo: "/companies/png/home-energy-scotland.png", invert: true },
  { name: "People's Postcode Lottery", logo: "/companies/png/peoples-postcode-lottery.png", invert: true },
  { name: "NatWest", logo: "/companies/png/natwest.png", invert: true },
  { name: "RBS", logo: "/companies/png/rbs.png", invert: true },
  { name: "Ulster Bank", logo: "/companies/png/ulster-bank.png", invert: true },
  { name: "Vodafone", logo: "/companies/png/vodafone.png", invert: true },
  { name: "Emirates", logo: "/companies/png/emirates.png", invert: true },
  { name: "Scottish Rugby", logo: "/companies/png/scottish-rugby.png", invert: true },
  { name: "ICAS", logo: "/companies/png/icas.png" },
  { name: "AIB", logo: "/companies/aib.svg" },
  { name: "KBC", logo: "/companies/kbc.svg" },
  { name: "EY", logo: "/companies/ey.svg" },
  { name: "Tesco", logo: "/companies/tesco.svg" },
  { name: "Datalex", logo: "/companies/datalex.svg" },
  { name: "Tenable", logo: "/companies/tenable.svg" },
  { name: "Workhuman", logo: "/companies/workhuman.svg" },
  { name: "Arbnco", logo: "/companies/arbnco.svg" },
];
