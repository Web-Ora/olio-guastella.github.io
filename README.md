# Oleificio Guastella — static export (webv2)

This is a **generated, static-HTML copy of `webv1/`**, for hosting on GitHub
Pages (which can't run PHP). Don't hand-edit the `.html` files here — edit
the source in `webv1/` (the PHP templates and `content/it.php`) and
re-generate this folder instead, or your edits will be lost/out of sync
next time someone regenerates it.

## Publishing on GitHub Pages

1. Push this repository to GitHub.
2. In the repo's **Settings → Pages**, set the source to the branch you
   pushed, folder `/webv2`.
3. **Domain:** every page here has its `<link rel="canonical">`,
   `hreflang`, and Open Graph tags hardcoded to `https://olioguastella.com`
   (matching the real site). Two ways to use that:
   - **You're pointing your real domain at this Pages site** — add a
     `CNAME` file in this folder containing exactly `olioguastella.com`,
     and configure the DNS records GitHub's Pages settings show you. This
     is the setup these baked-in URLs assume.
   - **You're just previewing at `https://<username>.github.io/<repo>/`**
     — that's fine for looking at it, but the canonical/hreflang/OG tags
     will point at the wrong domain until you either add the CNAME above
     or ask for the export to be regenerated with the github.io path
     baked in instead.

## Structure

Clean URLs are directories with an `index.html` inside (`azienda/index.html`
is served at `/azienda`), the same convention `webv1`'s `.htaccess` uses —
this needs no server configuration on GitHub Pages, it's standard static
directory-index behavior. `.nojekyll` is present so GitHub doesn't run its
Jekyll processor over these files (not needed, and would just slow down
every deploy).

English, French and German aren't included here — same as `webv1`, they're
not translated yet (see `webv1/README.md` §4). Once they are, regenerate
this export to pick them up.

## Regenerating after a change to webv1/

From the repository root:

```bash
rm -rf webv2/azienda webv2/olio webv2/contatti webv2/index.html
mkdir -p webv2/azienda webv2/olio webv2/contatti
cd webv1
php -f index.php    > ../webv2/index.html
php -f azienda.php  > ../webv2/azienda/index.html
php -f olio.php     > ../webv2/olio/index.html
php -f contatti.php > ../webv2/contatti/index.html
cd ..
rm -rf webv2/assets
cp -r webv1/assets webv2/assets
cp webv1/robots.txt webv1/sitemap.xml webv2/
```
