# GP Annual Action Plan – PWA deployment guide

## What's in this package
| Item | Purpose |
|---|---|
| `index.html` | The whole app |
| `manifest.json` | Name, colours, icons – makes it installable |
| `sw.js` | Service worker – makes it work fully offline |
| `icons/` | App icons (192, 512, maskable, iOS, favicon) |
| `vendor/` | SheetJS (Excel) and Chart.js, bundled – no internet needed |
| `fonts/` | Inter, Poppins, Noto Sans Devanagari, bundled |

Total ≈ 2 MB. After the first visit, the app runs with **no internet at all**.

## Step 1 – Put it on an HTTPS website (required)
Browsers only allow installation and offline mode over HTTPS. Any one of these works; upload the **contents of this folder** (so `index.html` is at the top level):

- **Netlify Drop** – go to app.netlify.com/drop, drag the folder in. You get an `https://…netlify.app` link in seconds. (Easiest.)
- **GitHub Pages** – push the files to a repo, then Settings → Pages.
- **Cloudflare Pages** or your organisation's own web server.

Give surveyors that link (a QR code works well).

## Step 2 – Install on the phone
- **Android (Chrome):** open the link → tap the orange **Install app** button in the app header (or ⋮ → *Install app*). It appears on the home screen with the GP icon.
- **iPhone/iPad (Safari only):** open the link → Share → **Add to Home Screen**. (iOS has no install button; Safari is the only browser that can do this.)
- **Laptop (Chrome/Edge):** the install icon appears in the address bar.

Tip: have each surveyor open the app once on Wi-Fi/data after installing. From then on it works offline.

## Step 3 – Day-to-day use
- Plans are saved **on each phone**. Use **Database → Download Excel database** regularly (on iPhone this opens the Share sheet, so choose *Save to Files* or send it by WhatsApp/e-mail).
- To combine many phones' data: collect each file, then **Import Excel database** on one device.

## Updating the app later
1. Change the files (e.g. a new `index.html`).
2. Open `sw.js` and change the version in the first lines, e.g. `gp-plan-6582d0a101` → `gp-plan-v2` (both the comment and the `CACHE` name). **If you skip this, phones keep showing the old version.**
3. Re-upload. Phones pick up the new version the next time they open the app online.

## Known limitations
- Each phone holds its own data until exported – there is no central server yet.
- Excel download on iOS uses the Share sheet; on Android/desktop it saves to Downloads.
- Clearing browser data / uninstalling the app deletes locally stored plans, so export first.
