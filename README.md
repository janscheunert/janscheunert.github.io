# Jan Scheunert — Photography Portfolio

Static site. Runs on **Cloudflare Pages** (zero config needed).

## Project structure

```
jan-Scheunert/
├── index.html          ← Homepage (photo grid)
├── portfolio.html
├── about.html
├── contact.html
├── agb.html            ← Terms & Conditions
├── impressum.html
├── datenschutz.html    ← Privacy Policy
├── css/
│   ├── style.css       ← Global styles (tokens, header, grid, lightbox, footer)
│   └── pages.css       ← Inner page styles (about, contact, legal)
├── js/
│   └── main.js         ← Mobile nav + lightbox logic
├── images/
│   └── placeholder-01.svg … placeholder-12.svg
├── _headers            ← Cloudflare security & cache headers
└── _redirects          ← Cloudflare URL redirects
```

## Deploying to Cloudflare Pages

1. Push this folder to a GitHub (or GitLab) repository.
2. Go to [Cloudflare Pages](https://pages.cloudflare.com/) → Create a project → Connect to Git.
3. Select the repository.
4. **Build settings:** leave blank (this is a static site — no build command, no output directory needed). Or set output directory to `/` if required.
5. Click **Save and Deploy**.

Cloudflare automatically picks up `_headers` and `_redirects`.

## Replacing placeholder images

Drop your real photos into the `images/` folder and update the `src` and `alt` attributes in `index.html`.

- Images should be **3:2 landscape ratio** (e.g. 1800 × 1200 px)
- Use **WebP** for best performance (update `src` to `.webp`)
- File names can be anything — just keep them consistent

## Updating content

| What to change | Where |
|---|---|
| Your name / links | `site-title` in every HTML file + social `href` values |
| X / Instagram URLs | `href` on `.nav-social` links |
| About text | `about.html` |
| Contact email | `contact.html` |
| Impressum details | `impressum.html` |
| Legal text | `agb.html`, `datenschutz.html` |

## Typography

- Newsreader

## Colour tokens (CSS custom properties in `style.css`)

```css
--c-bg:    #F5F3EE   /* Off-white background */
--c-ink:   #0A0A0A   /* Near-black text & borders */
--c-rule:  #C8C4BC   /* Hairline dividers */
--c-mid:   #6B6760   /* Secondary text */
```
