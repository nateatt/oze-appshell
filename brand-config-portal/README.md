# Brand Config Portal

A minimal single-page web portal to generate and save a brand configuration JSON for Oze. 

## Features
- All fields pre-filled with Oze defaults
- Edit any value and generate the JSON
- Save button uploads the JSON to a public GitHub Gist and provides a download link
- Reset button restores all fields to defaults
- No backend, no dependencies, just static HTML/JS

## Usage
1. Open `index.html` in your browser (or deploy to GitHub Pages)
2. Edit any fields as needed
3. Click **Save** to generate and upload the JSON to GitHub Gist
4. Download the JSON from the provided link
5. Click **Reset** to restore all default values

## Deploying to GitHub Pages
1. Push this folder to a GitHub repository
2. In your repo, go to **Settings > Pages**
3. Set the source to the branch and folder containing `index.html`
4. Access your portal at `https://<your-username>.github.io/<repo-name>/brand-config-portal/`

## Notes
- Gists are public and anonymous (no login required)
- For private gists, you must modify the code to use authentication
- Works in all modern browsers
