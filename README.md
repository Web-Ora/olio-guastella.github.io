# Oleificio Guastella — portable static export (webv3)

Same site as `webv2/`, rebuilt to fix two real problems `webv2` had:

1. **Opening the file directly (`file://`) showed unstyled text.** `webv2`
   linked CSS/JS/images with absolute paths (`/assets/...`), which only
   resolve correctly when a real web server is serving the site from its
   domain root. Opened as a local file, or hosted at a GitHub Pages
   *project* URL like `https://<username>.github.io/<repo>/`, those paths
   pointed at the wrong place entirely — hence "only basic text."
2. **GitHub Pages project pages showed no styling either**, for the exact
   same reason — `/assets/...` resolved to
   `https://<username>.github.io/assets/...` (missing the `/<repo>/`
   prefix), not the actual asset location.

`webv3` uses **relative paths everywhere** instead, so it works:
- opened straight from disk by double-clicking `index.html`, no server at all,
- on GitHub Pages at the repo root or a custom domain,
- on GitHub Pages at a project subpath (`username.github.io/reponame/`),
- moved to any other static host, at any subpath.

**The tradeoff:** because it needs to work from a plain double-clicked
file too, pages are flat files with `.html` extensions
(`site.com/azienda.html`) instead of the clean extension-less URLs
`webv1`/`webv2` use (`site.com/azienda`). That's a deliberate, necessary
trade for "just works everywhere, no server config" — plain `file://`
browsing can't run the server-side rewrite that makes clean URLs possible.

Don't hand-edit the `.html` files — edit `webv1/` (the PHP source) and
regenerate, same as `webv2`. To regenerate:

```bash
cd webv1
php -f index.php    > ../webv3/index.html
php -f azienda.php  > ../webv3/azienda.html
php -f olio.php     > ../webv3/olio.html
php -f contatti.php > ../webv3/contatti.html
cd ../webv3
python3 - <<'EOF'
import pathlib
for fname in ["index.html","azienda.html","olio.html","contatti.html"]:
    p = pathlib.Path(fname)
    html = p.read_text(encoding="utf-8")
    html = html.replace('href="/assets/', 'href="assets/')
    html = html.replace('src="/assets/', 'src="assets/')
    html = html.replace("url('/assets/", "url('assets/")
    html = html.replace('url("/assets/', 'url("assets/')
    html = html.replace('href="/"', 'href="index.html"')
    html = html.replace('href="/azienda"', 'href="azienda.html"')
    html = html.replace('href="/olio"', 'href="olio.html"')
    html = html.replace('href="/contatti"', 'href="contatti.html"')
    html = html.replace('href="https://olioguastella.com/azienda"', 'href="https://olioguastella.com/azienda.html"')
    html = html.replace('href="https://olioguastella.com/olio"', 'href="https://olioguastella.com/olio.html"')
    html = html.replace('href="https://olioguastella.com/contatti"', 'href="https://olioguastella.com/contatti.html"')
    p.write_text(html, encoding="utf-8")
EOF
rm -rf assets && cp -r ../webv1/assets .
cp ../webv1/robots.txt .
```

## Publishing on GitHub Pages

Settings → Pages → source = this branch, folder `/webv3`. No further
configuration needed — that's the whole point of this export. If you're
pointing a real domain at it, add a `CNAME` file here containing that
domain (e.g. `olioguastella.com`); `sitemap.xml`'s URLs assume that domain
either way, so update them (find-and-replace `olioguastella.com`) if
you're using a different one, or just delete `sitemap.xml` if you're only
using this as a quick preview.

## Verified working

- Opened directly via `file://` (no server) — CSS, fonts, hero background
  photos, and every product/section image load correctly; screenshotted at
  desktop, tablet (768px) and mobile (375px) widths.
- Served from a simulated GitHub Pages project subpath
  (`/somerepo/azienda.html`) — same result, nothing broken.

English, French and German aren't included, same as `webv1`/`webv2` —
not translated yet.
