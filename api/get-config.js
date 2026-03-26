// Vercel serverless function: get-config.js
// Returns the latest brand-config.json from Vercel Blob Storage

import { get } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  try {
    const blob = await get('brand-config.json');
    if (!blob) {
      res.status(404).json({ error: 'Config not found' });
      return;
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(blob.toString());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
