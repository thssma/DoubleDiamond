DoubleDiamond English Role Consolidation V1

Includes:
- Full UI language cleanup to English
- Empresa/Company visible text changed to Client/Clients
- Alert "Selecione a empresa" changed to "Select a client"
- Client role select lock remains active
- Back/Logout labels in English
- No Supabase schema changes
- No database changes

Deploy:
1. Replace files in GitHub root.
2. Commit and push.
3. Open:
   https://doublediamondapp.netlify.app/?v=english-role-consolidation-v1
4. Ctrl+F5.

Test:
- Login as Owner
- Open Reports
- Try Prepare Report without selecting client
- Alert should say: Select a client.
- Login as Client
- Client select should be locked/auto-selected
- UI should be English.
