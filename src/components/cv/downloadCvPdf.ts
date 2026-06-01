import { getCvPdfFilename } from "@/content/cv";

async function waitForCvRoot(): Promise<{ root: HTMLElement; cleanup: () => void }> {
  const existing = document.querySelector<HTMLElement>("[data-cv-pdf-root]");
  if (existing) {
    return { root: existing, cleanup: () => {} };
  }

  const iframe = document.createElement("iframe");
  iframe.setAttribute("aria-hidden", "true");
  iframe.style.cssText =
    "position:fixed;left:-9999px;top:0;width:900px;height:100vh;border:0;visibility:hidden";
  iframe.src = "/cv";
  document.body.appendChild(iframe);

  await new Promise<void>((resolve, reject) => {
    const timeout = window.setTimeout(() => reject(new Error("CV load timeout")), 15000);
    iframe.onload = () => {
      window.clearTimeout(timeout);
      resolve();
    };
    iframe.onerror = () => {
      window.clearTimeout(timeout);
      reject(new Error("CV load failed"));
    };
  });

  await new Promise((resolve) => window.setTimeout(resolve, 600));

  const root = iframe.contentDocument?.querySelector<HTMLElement>("[data-cv-pdf-root]");
  if (!root) {
    iframe.remove();
    throw new Error("CV content not found");
  }

  return {
    root,
    cleanup: () => iframe.remove(),
  };
}

export async function downloadCvPdf() {
  const { root, cleanup } = await waitForCvRoot();
  const iframeRoot = root.ownerDocument?.documentElement;

  document.documentElement.classList.add("cv-pdf-export");
  iframeRoot?.classList.add("cv-pdf-export");

  try {
    const html2pdf = (await import("html2pdf.js")).default;

    await html2pdf()
      .set({
        margin: [12, 14, 16, 14],
        filename: getCvPdfFilename(),
        image: { type: "jpeg", quality: 0.96 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: "#ffffff",
          scrollX: 0,
          scrollY: 0,
          windowWidth: root.scrollWidth,
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
        },
        pagebreak: {
          mode: ["css", "legacy"],
          avoid: ["section", "article", "h2", "h3", "blockquote"],
        },
      })
      .from(root)
      .save();
  } catch (error) {
    const previousTitle = document.title;
    document.title = getCvPdfFilename().replace(/\.pdf$/i, "");
    window.open("/cv", "_blank", "noopener,noreferrer");
    document.title = previousTitle;
    throw error;
  } finally {
    document.documentElement.classList.remove("cv-pdf-export");
    iframeRoot?.classList.remove("cv-pdf-export");
    cleanup();
  }
}
