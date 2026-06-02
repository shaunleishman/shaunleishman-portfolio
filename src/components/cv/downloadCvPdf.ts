import { getCvPdfFilename } from "@/content/cv";

const PDF_IFRAME_WIDTH_PX = 794;
const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;
const PDF_MARGIN_V_MM = 8;
const PDF_MARGIN_H_MM = 10;
const PDF_PAGE_COUNT = 2;

function getTwoPageTargetHeightPx(contentWidthPx: number) {
  const innerHeightMm = (A4_HEIGHT_MM - PDF_MARGIN_V_MM * 2) * PDF_PAGE_COUNT;
  return (innerHeightMm / A4_WIDTH_MM) * contentWidthPx;
}

async function waitForCvRoot(): Promise<{ root: HTMLElement; cleanup: () => void }> {
  const existing = document.querySelector<HTMLElement>("[data-cv-pdf-root]");
  if (existing) {
    return { root: existing, cleanup: () => {} };
  }

  const iframe = document.createElement("iframe");
  iframe.setAttribute("aria-hidden", "true");
  iframe.style.cssText = `position:fixed;left:-9999px;top:0;width:${PDF_IFRAME_WIDTH_PX}px;height:100vh;border:0;visibility:hidden`;
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

  const iframeDoc = iframe.contentDocument;
  if (!iframeDoc) {
    iframe.remove();
    throw new Error("CV iframe unavailable");
  }

  iframeDoc.documentElement.classList.add("cv-pdf-export");
  await iframeDoc.fonts?.ready;

  await new Promise((resolve) => window.setTimeout(resolve, 400));

  const root = iframeDoc.querySelector<HTMLElement>("[data-cv-pdf-root]");
  if (!root) {
    iframe.remove();
    throw new Error("CV content not found");
  }

  return {
    root,
    cleanup: () => iframe.remove(),
  };
}

function prepareRootForExport(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>("[class*='opacity-0']").forEach((node) => {
    node.style.opacity = "1";
    node.style.transform = "none";
  });
}

function fitRootToTwoA4Pages(root: HTMLElement) {
  const contentWidth = root.scrollWidth;
  const targetHeight = getTwoPageTargetHeightPx(contentWidth);
  const naturalHeight = root.scrollHeight;

  if (naturalHeight <= targetHeight) {
    return {
      scale: 1,
      captureWidth: contentWidth,
      captureHeight: naturalHeight,
    };
  }

  const scale = targetHeight / naturalHeight;

  if (typeof CSS !== "undefined" && CSS.supports("zoom", "1")) {
    root.style.zoom = String(scale);
  } else {
    root.style.transform = `scale(${scale})`;
    root.style.transformOrigin = "top left";
    root.style.width = `${contentWidth / scale}px`;
  }

  return {
    scale,
    captureWidth: contentWidth,
    captureHeight: Math.ceil(naturalHeight * scale),
  };
}

function resetRootFit(root: HTMLElement) {
  root.style.zoom = "";
  root.style.transform = "";
  root.style.transformOrigin = "";
  root.style.width = "";
}

export async function downloadCvPdf() {
  const { root, cleanup } = await waitForCvRoot();
  const iframeRoot = root.ownerDocument?.documentElement;

  document.documentElement.classList.add("cv-pdf-export");
  iframeRoot?.classList.add("cv-pdf-export");
  prepareRootForExport(root);

  await document.fonts?.ready;
  await new Promise((resolve) => window.requestAnimationFrame(() => resolve(undefined)));

  const { captureWidth, captureHeight } = fitRootToTwoA4Pages(root);

  await new Promise((resolve) => window.requestAnimationFrame(() => resolve(undefined)));

  try {
    const html2pdf = (await import("html2pdf.js")).default;

    await html2pdf()
      .set({
        margin: [PDF_MARGIN_V_MM, PDF_MARGIN_H_MM, PDF_MARGIN_V_MM, PDF_MARGIN_H_MM],
        filename: getCvPdfFilename(),
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: "#ffffff",
          scrollX: 0,
          scrollY: 0,
          width: captureWidth,
          height: captureHeight,
          windowWidth: captureWidth,
          windowHeight: captureHeight,
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
        },
        pagebreak: {
          mode: ["css", "legacy"],
          avoid: ["h2", "h3"],
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
    resetRootFit(root);
    document.documentElement.classList.remove("cv-pdf-export");
    iframeRoot?.classList.remove("cv-pdf-export");
    cleanup();
  }
}
