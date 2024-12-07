import { nanoid } from 'nanoid';

// In a real application, these would be API calls to your backend
const urlDatabase = new Map<string, string>();

export async function createShortUrl(originalUrl: string): Promise<string> {
  const shortId = nanoid(6);
  urlDatabase.set(shortId, originalUrl);
  return shortId;
}

export async function getOriginalUrl(shortId: string): Promise<string> {
  const url = urlDatabase.get(shortId);
  if (!url) throw new Error('URL not found');
  return url;
}