DoubleDiamond Final No Unsplash 404

Fix:
- Removes repeated 404 errors from broken Unsplash image:
  photo-1599598425947-5b1a1cfacd57
- Targets .v66-photo-preview and image/background elements.
- Replaces broken image with local inline SVG placeholder.
- No Supabase changes.
- No database changes.

Deploy:
1. Replace files in GitHub root.
2. Commit.
3. Open:
   https://doublediamondapp.netlify.app/?v=no-unsplash-404
4. Ctrl+F5.
5. Check Console: Unsplash 404 spam should stop.
