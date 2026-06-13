DoubleDiamond Cliente Label Fix V1

Correções:
- Troca textos visíveis de Empresa/Companies para Cliente/Clientes.
- Mantém nomes técnicos/tabelas do Supabase sem alteração.
- Em role CLIENT, selects de Cliente/Empresa ficam bloqueados para simular cliente conectado.
- Adiciona patch visual para impedir termos antigos em telas renderizadas dinamicamente.

Aplicar:
1. Substituir arquivos no GitHub/Netlify.
2. Commit.
3. Abrir https://doublediamondapp.netlify.app/?v=cliente-label-fix
4. Ctrl+F5.

Teste:
- Login como Client.
- Abrir Reports.
- Conferir que Novo Relatório mostra Cliente, não Empresa.
- Conferir que o select está bloqueado para cliente.
