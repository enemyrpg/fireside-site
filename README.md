# Fireside site

The landing page for [Fireside](https://github.com/enemyrpg/fireside), a
self-hosted tracker for Old School RuneScape. It is served by GitHub Pages
from the root of `main`, at <https://enemyrpg.github.io/fireside-site/>.

Plain HTML, CSS and a little vanilla JavaScript: no build step, no external
fonts, CDNs or tracking.

| File                  | Contents                                                      |
| --------------------- | ------------------------------------------------------------- |
| `index.html`          | The page                                                      |
| `styles.css`          | Styles, in the colours of the dashboard's Ember theme         |
| `script.js`           | Links and the Plugin Hub switch (top of the file), tabs, copy |
| `assets/favicon.svg`  | The Fireside logo                                             |
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
- **Screenshots:** put the images in `assets/screenshots/` and follow the
  comment above the gallery in `index.html`.
- **The Ember theme changes:** copy the new values from
  `web/src/theme/themes.css` in the server repo into `:root` in `styles.css`.
