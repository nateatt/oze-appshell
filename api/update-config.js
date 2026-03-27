// Vercel serverless function: update-config.js
// Receives POST with JSON, saves to Vercel Blob Storage as brand-config.json

import { put } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      res.status(500).json({
        error: 'BLOB_READ_WRITE_TOKEN is not configured for this deployment'
      });
      return;
    }

    // Vercel may provide parsed JSON body already; fallback to raw stream.
    let config = req.body;
    if (typeof config === 'string') {
      config = JSON.parse(config);
    } else if (!config || typeof config !== 'object') {
      let body = '';
      await new Promise((resolve, reject) => {
        req.on('data', chunk => { body += chunk; });
        req.on('end', resolve);
        req.on('error', reject);
      });
      config = JSON.parse(body);
    }

    if (!config || typeof config !== 'object') {
      res.status(400).json({ error: 'Invalid JSON body' });
      return;
    }

    const blob = await put('brand-config.json', JSON.stringify(config, null, 2), {
      access: 'public',
      contentType: 'application/json',
      addRandomSuffix: false
    });
    res.status(200).json({ url: blob.url, pathname: blob.pathname });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
