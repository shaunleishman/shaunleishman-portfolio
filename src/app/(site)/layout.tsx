import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { PageEnter } from "@/components/layout/PageEnter";
import { MetricsSecretAccess } from "@/components/metrics/MetricsSecretAccess";
import { AudioPlayerProvider } from "@/components/audio/AudioPlayerProvider";
import { FloatingAudioPlayer } from "@/components/audio/FloatingAudioPlayer";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AudioPlayerProvider>
      <MetricsSecretAccess />
      <Header />
      <ScrollProgress />
      <main id="main-content" className="flex-1">
        <PageEnter>{children}</PageEnter>
      </main>
      <Footer />
      <FloatingAudioPlayer />
    </AudioPlayerProvider>
  );
}
