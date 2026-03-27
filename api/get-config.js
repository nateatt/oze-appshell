// Vercel serverless function: get-config.js
// Returns the latest brand-config.json from Vercel Blob Storage

import { list } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  try {
    const { blobs } = await list({ prefix: 'brand-config.json', limit: 1 });
    if (!blobs.length) {
      res.status(404).json({ error: 'Config not found' });
      return;
    }
    const response = await fetch(blobs[0].url);
    const text = await response.text();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(text);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
