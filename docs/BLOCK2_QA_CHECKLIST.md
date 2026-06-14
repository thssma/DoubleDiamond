# Block 2 QA Checklist

Use this checklist before merging Product/UX changes.

## Client

- Login with the public Client flow.
- Page title is `My Project`.
- Visible sidebar routes are only:
  - Client Portal
  - Reports
- Client Portal shows project context, progress, reports, gallery/timeline area, Real Operations, and signature/report actions.
- Client Portal does not expose Payments, Contact Team, Work Orders, Admin, AI, or Finance actions.
- `View Reports` opens the reports surface or the Reports route remains visible in the sidebar.

## Employee

- Login with staff role `Employee` and PIN `field123`.
- Default page is `Mobile Workforce`.
- Visible sidebar routes are operational only:
  - Home
  - Work Orders
  - Routes
  - Field
  - Workforce
  - Weather
  - Mobile
  - PWA
  - Reports
- Finance, Administration, Executive, AI, and automation lab routes are hidden.

## Owner

- Login with staff role `Owner` and PIN `owner123`.
- Default page is `Home`.
- Visible sidebar routes match the MVP owner scope:
  - Home
  - Clients
  - Work Orders
  - Routes
  - Field
  - Workforce
  - Weather
  - Reports
  - Profitability
  - BI Dashboard
  - Executive
  - Integrations
  - Settings
- Prototype lab routes are hidden from navigation.

## Technical Checks

```powershell
node --check script.js
Get-ChildItem js -Recurse -Filter *.js | ForEach-Object { node --check $_.FullName }
```

## Browser Checks

- Console has no `error` logs during Client Portal and Reports navigation.
- Mobile viewport keeps sidebar toggle usable.
- Role context banner appears at the top of rendered content.
- Empty states show helpful secondary copy.
