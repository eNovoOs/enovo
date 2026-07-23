# eNovo Website

Static marketing site for **eNovo OS** — the all-in-one platform for service-based businesses.

## Structure

```
/                     English pages (Home = index.html)
/fr/                  French pages (Accueil = fr/index.html)
/assets/css/          One stylesheet per page type (shared by EN + FR)
/assets/js/           One script per page type
/vercel.json          Clean-URL config (/about → about.html)
/sitemap.xml          robots.txt + sitemap for SEO
```

Each page loads its CSS and JS from `/assets` — no inline styles or scripts
(structured-data JSON-LD stays inline in each page for SEO).

## Pages

Home, About, How It Works, Free Tools, Free Tools Library, Automation Audit,
Use Cases, Partner, Blog, Support, Privacy Policy, Terms, Links, and six
comparison pages (vs GHL, HubSpot, Mailchimp, ManyChat, Pipedrive, Salesforce).
Every page has an English and a French version.

## Deploy

Hosted on Vercel. Pushing to `main` triggers a new deployment automatically.
Clean URLs are enabled, so links use `/about` (not `/about.html`).

## Local preview

```bash
npx serve .      # or: python3 -m http.server
```
