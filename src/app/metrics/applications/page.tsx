import { AdminShell } from "@/components/admin/AdminShell";
import { ApplicationsGallery } from "@/components/cv/ApplicationsGallery";
import { applications, toApplicationSummary } from "@/content/applications";

export default function ApplicationsGalleryPage() {
  return (
    <AdminShell
      title="Applications"
      description="Tailored CV and cover letter packs by job and sector. Mark each outcome as you hear back, and add a learning note so the next pack is stronger."
    >
      <ApplicationsGallery applications={applications.map(toApplicationSummary)} />
    </AdminShell>
  );
}
