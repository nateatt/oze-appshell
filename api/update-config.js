// Vercel serverless function: update-config.js
// Receives POST with JSON, saves to Vercel Blob Storage as brand-config.json

import { put } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  try {
    // Parse JSON body (Vercel Node.js API does not auto-parse)
    let body = '';
    await new Promise((resolve, reject) => {
      req.on('data', chunk => { body += chunk; });
      req.on('end', resolve);
      req.on('error', reject);
    });
    const config = JSON.parse(body);
    const blob = await put('brand-config.json', JSON.stringify(config, null, 2), {
      access: 'public',
      contentType: 'application/json'
    });
    res.status(200).json({ url: blob.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
