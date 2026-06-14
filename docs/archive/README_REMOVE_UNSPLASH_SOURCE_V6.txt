DoubleDiamond Final Remove Unsplash Source V6

Correção agressiva:
- Remove a URL quebrada do Unsplash diretamente de HTML/JS/CSS/JSON.
- Substitui por placeholder SVG local.
- Adiciona MutationObserver para impedir que a URL quebrada seja reinserida.
- Mantém Role-Based Access, Client Portal, Reports e todas as correções anteriores.

Arquivos alterados por substituição direta:
script.js

Deploy:
1. Substitua os arquivos na raiz do GitHub.
2. Commit.
3. Aguarde Netlify.
4. Abra:
   https://doublediamondapp.netlify.app/?v=remove-unsplash-source-v6
5. Ctrl + F5.

Validação:
Console não deve mais mostrar:
photo-1599598425947-5b1a1cfacd57 404
