DoubleDiamond Client Session Report Fix V3

Fixes:
- Uses dd_auth_session_v1 as logged client source.
- Adds logged client into Client select automatically.
- Locks Client select for CLIENT role.
- Fixes remaining Portuguese labels:
  Nome do relatório -> Report name
  Financeiro -> Financial
  Reporte -> Report
- Prevents false "Select a client" alert when client session exists.

Deploy:
1. Replace files in GitHub root.
2. Commit.
3. Open:
   https://doublediamondapp.netlify.app/?v=client-session-report-fix-v3
4. Ctrl+F5.

Test:
- Login as Client.
- Open Reports.
- Client dropdown should show logged client name/email.
- Click Prepare Report.
- It should not show "Select a client" if session exists.
