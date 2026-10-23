import { BlobNotFoundError, get, put } from "@vercel/blob";

export function hasBlobStorage(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);
}

export type BlobJsonRead =
  | { ok: true; data: unknown }
  | { ok: false; reason: "unconfigured" | "missing" | "error" };

/**
 * Distinguish a missing blob from a failed read.
 * Callers that write back must not treat `error` as an empty store.
 */
export async function readBlobJson(pathname: string): Promise<BlobJsonRead> {
  if (!hasBlobStorage()) return { ok: false, reason: "unconfigured" };

  try {
    const result = await get(pathname, { access: "private" });
    if (!result) return { ok: false, reason: "missing" };
    if (result.statusCode !== 200 || !result.stream) return { ok: false, reason: "error" };

    const text = await new Response(result.stream).text();
    return { ok: true, data: JSON.parse(text) as unknown };
  } catch (error) {
    // Missing file is expected on first write.
    if (error instanceof BlobNotFoundError) return { ok: false, reason: "missing" };
    console.error(`[blob] Failed to read ${pathname}`, error);
    return { ok: false, reason: "error" };
  }
}

export async function readJsonFromBlob(pathname: string): Promise<unknown | null> {
  const result = await readBlobJson(pathname);
  return result.ok ? result.data : null;
}

export async function writeJsonToBlob(pathname: string, data: unknown): Promise<boolean> {
  if (!hasBlobStorage()) return false;

  try {
    await put(pathname, JSON.stringify(data), {
      access: "private",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
    });
    return true;
  } catch (error) {
    console.error(`[blob] Failed to write ${pathname}`, error);
    return false;
  }
}
