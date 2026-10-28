import { AboutBackgroundSwitch } from "@/components/sections/AboutBackgroundSwitch";
import {
  aboutBackgroundLinks,
  aboutBackgroundViewOrder,
  aboutBackgroundViews,
  aboutPersonalLead,
  aboutProfilePhotos,
  eyesOfHome,
} from "@/content/about-background";

export function AboutBackgroundSection() {
  return (
    <AboutBackgroundSwitch
      viewOrder={aboutBackgroundViewOrder}
      views={aboutBackgroundViews}
      photos={aboutProfilePhotos}
      personalLead={aboutPersonalLead}
      band={eyesOfHome}
      cvUrl={aboutBackgroundLinks.cvUrl}
      linkedIn={aboutBackgroundLinks.linkedIn}
    />
  );
}
