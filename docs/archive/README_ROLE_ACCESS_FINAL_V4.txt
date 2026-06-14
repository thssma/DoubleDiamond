DoubleDiamond Role Access Final V4

Includes:
- All previous fixes from Client Session Report Fix V3
- Full role-based navigation visibility
- CLIENT role:
  - Client Portal
  - Reports
- EMPLOYEE role:
  - Home
  - Work Orders
  - Routes
  - Field
  - Workforce
  - Weather
  - Mobile Ready
  - PWA
  - Reports
- OWNER role:
  - Full access
- Role badge
- Client auto-redirect away from owner dashboard
- Employee blocked from Finance/Administration/Intelligence areas
- No Supabase changes
- No database schema changes

Deploy:
1. Replace files in GitHub root.
2. Commit.
3. Open:
   https://doublediamondapp.netlify.app/?v=role-access-final-v4
4. Ctrl+F5.

Test:
- Login as Client: should see only Client Portal + Reports.
- Login as Employee: should see operations modules.
- Login as Owner: should see everything.
