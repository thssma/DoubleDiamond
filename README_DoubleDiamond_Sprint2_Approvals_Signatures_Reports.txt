SPRINT 2 — APPROVALS, SIGNATURES, REPORTS

Objetivo:
Adicionar fluxo de:
- Aprovação de etapa
- Assinatura digital simples
- Registro de relatório

Deploy:
1. Substitua os 5 arquivos.
2. Abra: https://doublediamondapp.netlify.app/?v=sprint2

Testes:
1. Abra Clients > Client Portal.
2. Clique "Aprovar Etapa".
3. Confira project_timeline no Supabase.
4. Digite uma assinatura e clique "Salvar Assinatura".
5. Se der erro, o app cria backup local e você deve conferir RLS/colunas de field_signatures.
6. Clique "Gerar Registro de Relatório".
7. Confira report_center_exports.
