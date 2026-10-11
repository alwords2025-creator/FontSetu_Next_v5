# FontSetu Next — Full Project

A responsive static web app with a dashboard, text converter, PDF/image tools, image editor, local activity history, local page counters, and ad/affiliate placement setup.

## Included
- Dashboard with live local date/time.
- Browser-local visits and page-impression counters.
- Project history with timestamps, export to JSON, clear-history control.
- Two large, responsive converter boxes with separate Convert buttons, swap-box control, copy/clear actions, and a KrutiDev 010/10 sequence mapping with short-i and reph reordering in both directions. It does not target KrutiDev 055 or Shivaji.
- TXT upload/download and basic PDF export (Latin text is best supported).
- PDF pages to PNG using PDF.js.
- Multiple JPG/PNG images to multi-page PDF using jsPDF.
- Image editing with Fabric.js: upload image, add text/shapes, brightness/contrast filters, export PNG.
- AdSense setup guide/link and ad placement placeholders.
- Affiliate URL manager with disclosure reminder.
- Responsive layout for desktop and mobile.
- Netlify and Vercel static hosting config.

## Honest limitations
1. **AdSense is not active automatically.** Create an AdSense account, add/verify your domain, wait for approval, then use the exact code Google supplies. Placeholder ad spaces are not real ads and do not earn revenue.
2. **Affiliate links must be yours.** Join a program, receive your own tracking URL, add it on the Ads & affiliate page, and disclose the relationship. This project does not create affiliate accounts or guarantee income.
3. **Counters are local-only.** They count visits/page views in the current browser storage. They do not measure all visitors across devices/users. For global traffic, connect an analytics service or backend database.
4. **History is local-only.** It is stored in localStorage in that browser, not a secure multi-user server. Clearing browser data may remove it.
5. **KrutiDev conversion map is still a starter map.** Common examples are tested, but complex conjuncts, matra reordering, mixed English, and Marathi-specific legacy encodings need a complete verified engine and corpus tests. Do not treat output as guaranteed accurate.
6. **Hindi/Marathi PDF text export needs a Unicode font embedded in jsPDF.** The included PDF export is most suitable for Latin text.
7. External libraries/fonts load from CDNs, so the first load needs internet. The app does not upload your files to a custom server.
8. Do not click your own live ads or encourage invalid ad impressions/clicks. Follow the current Google AdSense and affiliate-program policies.

## Run locally on Windows 10/11
### Easiest
1. Extract `FontSetu_Next_Level.zip`.
2. Open the `FontSetu_Next_Level` folder.
3. Double-click `index.html`.
4. Keep internet enabled for PDF.js, jsPDF, Fabric.js and fonts.

### Recommended local server
1. Install Python from https://www.python.org/downloads/ if needed.
2. Open the extracted project folder in File Explorer.
3. Click the folder address bar, type `cmd`, press Enter.
4. Run:
   ```bash
   python -m http.server 8000
   ```
5. Visit http://localhost:8000 in Chrome/Edge.
6. Press Ctrl+C in the command window to stop the server.

## Deploy online using GitHub + Netlify
1. Extract the ZIP.
2. Go to https://github.com/new and create a repository named `fontsetu-next`.
3. Upload the **contents** of this folder (not only the ZIP) to the repository root.
4. Go to https://app.netlify.com and sign in with GitHub.
5. Choose Add new site → Import an existing project → select `fontsetu-next`.
6. Build command: leave blank. Publish directory: `.`.
7. Deploy and open the HTTPS URL Netlify provides.
8. Test on PC and phone.

## Deploy using Vercel
1. Upload project files to GitHub.
2. Go to https://vercel.com and import the repository.
3. Select Framework Preset: Other. Build command blank. Output directory `.`.
4. Deploy.

## Configure AdSense (manual, after approval)
1. Open https://adsense.google.com/start/.
2. Sign in and add your website.
3. Complete ownership verification and follow the site's policy/consent requirements.
4. Wait for Google review/approval.
5. Copy the exact AdSense code from your AdSense account.
6. Insert it in `index.html` inside `<head>` where the comment says `AdSense`.
7. For display units, paste the approved ad-unit code in the desired `.ad-slot` location.
8. Redeploy and test policy-compliant ad delivery. Approval and earnings are not guaranteed.

## Affiliate marketing setup
1. Apply to an affiliate program that accepts your country/site and follow its rules.
2. Generate your own tracking URL from the affiliate dashboard.
3. In FontSetu, open Ads & affiliate, add the display name and tracking URL.
4. Publish a clear disclosure near affiliate recommendations. Do not use misleading claims or spam.
5. Test links and review the affiliate program's terms.

## History and counters
- Local counters use this browser's localStorage.
- Each navigation and major action is recorded with a timestamp.
- Use Export history to save a JSON backup.
- A real all-user visitor counter needs a backend/database or analytics provider. This zip is static and has no server database.

## Project structure
- `index.html` — page structure and library imports
- `styles.css` — responsive visual styling
- `app.js` — navigation, conversion, editor, counters, history and affiliate link management
- `README.md` — this guide
- `STEP_BY_STEP_GUIDE_HI.txt` — Hindi/Hinglish quick guide
- `netlify.toml`, `vercel.json` — hosting configuration
- `package.json` — project metadata


## Converter regression tests

The converter targets KrutiDev 010/10. Run `npm test` to execute regression tests for the supplied Marathi loan-waiver headline in both directions, including reph/halant handling, rupee placeholder, hyphens, matras, and common words. The tests cover these known cases; they do not guarantee perfect conversion for every legacy document. See `CONVERSION_TESTS.txt` for the tested sample and limitations.
