import { BlobNotFoundError, get, put } from "@vercel/blob";

export function hasBlobStorage(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);
}

export async function readJsonFromBlob(pathname: string): Promise<unknown | null> {
  if (!hasBlobStorage()) return null;

  try {
    const result = await get(pathname, { access: "private" });
    if (!result || result.statusCode !== 200 || !result.stream) return null;

    const text = await new Response(result.stream).text();
    return JSON.parse(text) as unknown;
  } catch (error) {
    // Missing file is expected on first write.
    if (error instanceof BlobNotFoundError) return null;
    console.error(`[blob] Failed to read ${pathname}`, error);
    return null;
  }
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
