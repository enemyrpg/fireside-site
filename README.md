# Fireside site

The landing page for [Fireside](https://github.com/enemyrpg/fireside), a
self-hosted tracker for Old School RuneScape. It is served by GitHub Pages
from the root of `main`, at <https://enemyrpg.github.io/fireside-site/>.

Plain HTML, CSS and a little vanilla JavaScript: no build step, and no
external fonts, CDNs or tracking. The fonts are files in this repo.

| File                  | Contents                                                      |
| --------------------- | ------------------------------------------------------------- |
| `index.html`          | The page                                                      |
| `styles.css`          | Styles, in the colours of the dashboard's Ember theme         |
| `script.js`           | Links and the Plugin Hub switch (top of the file), tabs, copy |
| `assets/favicon.svg`  | The Fireside logo                                             |
| `assets/fonts/`       | Inter, Space Grotesk and JetBrains Mono (OFL), as in the app  |
| `assets/screenshots/` | Screenshots for the phone gallery                             |

## Preview locally

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000/>. Opening `index.html` straight from disk
works too.

## Common changes

- **The plugin is approved for the Plugin Hub:** set `PLUGIN_HUB_LIVE` to
  `true` at the top of `script.js` and check `PLUGIN_HUB_URL`.
- **A link changes:** edit `LINKS` at the top of `script.js`. The `href`s in
  `index.html` are only the fallback without JavaScript.
- **Screenshots:** replace `NAME.png` in `assets/screenshots/` (780 × 1688),
  make the two smaller copies the page shows on 1× and 2× screens (below,
  needs ImageMagick), and update the `alt` text and caption in `index.html`.

  ```sh
  cd assets/screenshots
  for n in home sessions xp loot-kc bank; do
    magick $n.png -colorspace RGB -filter Triangle -resize 282x -colorspace sRGB -strip $n-282.png
    magick $n.png -colorspace RGB -filter Triangle -resize 564x -colorspace sRGB -strip $n-564.png
  done
  ```
- **The Ember theme changes:** copy the new values from
  `web/src/theme/themes.css` in the server repo into `:root` in `styles.css`.
