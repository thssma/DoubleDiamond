DoubleDiamond Final Console Performance Fix

Correções incluídas:
- Mantém o app final funcional.
- Mantém Role-Based Access.
- Mantém Client Portal/Reports.
- Mantém correção do Unsplash 404.
- Reduz loops de verificação DOM de ~1 segundo para ~15 segundos.
- Reduz warnings [Violation] setTimeout/setInterval no console.
- Adiciona correção simples para input password fora de form.
- Não altera Supabase.
- Não altera tabelas.

Deploy:
1. Extraia o ZIP.
2. Substitua os arquivos na raiz do GitHub.
3. Commit.
4. Aguarde Netlify.
5. Abra:
   https://doublediamondapp.netlify.app/?v=console-performance-fix
6. Ctrl + F5.

Validação:
- F12 > Console
- O erro Unsplash 404 não deve voltar.
- Os avisos [Violation] devem reduzir bastante.
- O aviso Password field deve desaparecer ou ficar sem impacto.
