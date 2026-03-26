// Vercel/Netlify serverless function: update-config.js
// Receives POST with JSON, writes to brand-config-portal/brand-config.json

const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const config = req.body;
    const filePath = path.join(__dirname, '../brand-config-portal/brand-config.json');
    fs.writeFileSync(filePath, JSON.stringify(config, null, 2));
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
