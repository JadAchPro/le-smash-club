# Changelog — Le Smash Club

## 2026-02-24 14h15 — Correction de tous les liens internes cassés

- 8 patterns d'URL corrigés (URLs courtes Ghost → URLs complètes Eleventy)
- Exemples : `/padel/regles/` → `/padel/regles-padel/`, `/pickleball/guide-complet/` → `/pickleball/guide-complet-pickleball/`
- 10 articles + 3 pages templates (actualites, ressources, histoire-padel) modifiés
- Vérification : zéro lien cassé restant sur l'ensemble du site

---

## 2026-02-24 13h45 — Audit SEO et corrections P0/P1/P2

### P0 (critiques)
- Article JSON-LD : image en URL absolue (Google Rich Results)
- Sitemap : ajout des pages quiz (`/padel/quiz-niveau/`, `/pickleball/quiz-niveau/`), mentions légales et politique de confidentialité
- FAQ visible en HTML (`<details>`) dans le template article — conforme politique Google 2023 (FAQ JSON-LD doit correspondre au contenu visible)

### P1 (haute priorité)
- Liens internes manquants ajoutés :
  - `pickleball-vs-padel` → lien vers le pilier pickleball (`/pickleball/guide-complet-pickleball/`)
  - `prix-terrain-padel` → liens vers `/padel/regles/` et `/padel/comment-jouer/`
  - `dimensions-terrain-padel` → lien vers `/padel/prix-terrain/`
- SearchAction JSON-LD supprimé (pas de recherche serveur, l'overlay est JS-only)
- Ajout `og:locale` (fr_FR) et `og:site_name` dans les meta Open Graph

### P2 (améliorations)
- Orbitron self-hosted (suppression de l'appel Google Fonts externe = plus de render-blocking)
- Author JSON-LD : `Organization` → `Person` avec lien `/a-propos/` (E-E-A-T)
- `inLanguage: "fr"` ajouté au WebSite schema

### Fichiers modifiés
| Fichier | Action |
|---------|--------|
| `src/_includes/layouts/article.njk` | Image URL absolue, author Person, section FAQ HTML |
| `src/_includes/layouts/base.njk` | og:locale, og:site_name, SearchAction supprimé, Orbitron self-hosted |
| `src/sitemap.njk` | Ajout quiz + légal |
| `src/css/style.css` | @font-face Orbitron, styles FAQ |
| `src/fonts/orbitron-latin-700.woff2` | Nouveau fichier |
| `src/articles/pickleball-vs-padel.md` | Lien pilier pickleball ajouté |
| `src/articles/prix-terrain-padel.md` | Liens règles + comment-jouer ajoutés |
| `src/articles/dimensions-terrain-padel.md` | Lien prix-terrain ajouté |

---

## 2026-02-24 13h00 — Suppression articles guide-raquettes

- Retrait de `guide-raquettes-padel.md` et `guide-raquettes-pickleball.md`
- Stratégie : publier progressivement (10 articles au lancement, ajouts réguliers)

---

## 2026-02-24 12h30 — Rebranding + pages légales + GA4

### Rebranding CourtSide → Le Smash Club
- `site.json` : nom, URL (`le-smash-club.com`), auteur
- Header, footer, pages (about, actualités, contact, index) : toutes les occurrences remplacées
- Commentaires JS/CSS, `robots.txt`, admin Decap CMS mis à jour

### Pages légales
- `mentions-legales.njk` : LCEN art. 6-III-2, hébergeur Vercel, contact jachhab.pro@gmail.com
- `politique-confidentialite.njk` : GA4 G-Z9N344QH98, RGPD, pas de cookies marketing

### Footer
- Liens mentions légales + politique de confidentialité ajoutés
- CSS `.footer__legal` ajouté

### GA4
- Tag Google Analytics 4 (`G-Z9N344QH98`) ajouté dans `base.njk`

### Fichiers modifiés
| Fichier | Action |
|---------|--------|
| `src/_data/site.json` | Rebranding nom + URL |
| `src/_includes/layouts/base.njk` | GA4 tag |
| `src/_includes/partials/header.njk` | Nom + tagline |
| `src/_includes/partials/footer.njk` | Nom + liens légaux |
| `src/pages/about.njk` | Rebranding |
| `src/pages/actualites.njk` | Rebranding |
| `src/pages/contact.njk` | Rebranding |
| `src/pages/index.njk` | Rebranding |
| `src/robots.txt` | URL sitemap |
| `src/admin/index.html` | Titre |
| `src/css/style.css` | Commentaire + footer__legal |
| `src/js/main.js`, `quiz.js`, `quiz-pickleball.js` | Commentaires |
| `src/articles/guide-raquettes-padel.md` | Rebranding mention |
| `src/pages/mentions-legales.njk` | Nouveau |
| `src/pages/politique-confidentialite.njk` | Nouveau |

---

## 2026-02-24 — Création du repo

- Fork du repo `JadAchPro/courtside-blog` vers `JadAchPro/le-smash-club`
- Base : Eleventy 3.1.2, 12 articles, templates Nunjucks, quiz JS, CSS complet
- Déploiement Vercel : `le-smash-club.vercel.app`
