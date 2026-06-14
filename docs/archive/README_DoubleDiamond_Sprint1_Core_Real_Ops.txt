SPRINT 1 — CORE REAL OPS

Objetivo:
Conectar visualmente o produto às tabelas reais:
- field_photos
- project_timeline
- team_checkins
- work_orders

Deploy:
1. Substitua index.html, script.js, style.css, manifest.json, service-worker.js.
2. Abra: https://doublediamondapp.netlify.app/?v=sprint1

Testes:
1. Abra Clients > Client Portal.
2. Confirme seção "Operação Real".
3. Abra Operations > Field.
4. Clique "Criar Check-in Teste".
5. Se salvar, confira team_checkins no Supabase.
6. Se der alerta, a leitura continua funcionando; precisa ajustar RLS/colunas.
