// Vercel serverless function: get-config.js
// Returns the latest brand-config.json from Vercel Blob Storage

import { list, put } from '@vercel/blob';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  try {
    const { blobs } = await list({ prefix: 'brand-config.json', limit: 1 });
    if (!blobs.length) {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      const defaultConfigPath = path.join(__dirname, '..', 'brand-config-portal', 'brand-config.json');
      const defaultConfigText = await fs.readFile(defaultConfigPath, 'utf8');

      if (!process.env.BLOB_READ_WRITE_TOKEN) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(defaultConfigText);
        return;
      }

      await put('brand-config.json', defaultConfigText, {
        access: 'public',
        contentType: 'application/json',
        addRandomSuffix: false
      });

      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(defaultConfigText);
      return;
    }
    const response = await fetch(blobs[0].url);
    if (!response.ok) {
      res.status(502).json({ error: 'Failed to fetch blob content' });
      return;
    }
    const text = await response.text();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(text);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
