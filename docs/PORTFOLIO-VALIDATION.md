# Portfolio redesign validation

This development change makes the portfolio hiring-first: role and availability,
selected work, exact individual contributions, expertise, delivery process and
contact precede the guide library. The CRO Lab supports the portfolio rather
than replacing its home page. No production merge or deployment is included.

## Content and build

- 22 original merchant guides across storefronts, offers/cart/checkout, technical
  quality, and research/measurement. Each includes practical handoff steps,
  limitations, a meaningful QA checklist and primary or credited teaching sources.
- Six original case studies retain their scope, role facts and screenshot captions.
  No measured revenue or conversion improvement has been invented. The Fifth Ray
  51% figure remains a reporting difference; 849+ remains review research volume.
- Production HTML is generated for 38 routes. Every guide is crawlable in its own
  HTML file and has a unique title, description, canonical, source links and
  Article/Breadcrumb metadata. Review dates are not treated as publication dates.
- `npm ci`, `npm run lint`, `npm run build` and `npm run verify` passed locally.
  The verifier checked 1,241 internal links and 211 asset references, plus metadata,
  headings, schema, sitemap coverage and missing-page configuration.
- No new runtime dependency or framework migration was needed. The existing
  build-time WebP optimization and explicit image dimensions are retained.

## Browser checks

The local production preview was checked in the in-app browser at 320, 390, 768
and 1440 pixels. Home, Fifth Ray case study, guide library, subscription article,
Lab and About all rendered one main heading with no horizontal page overflow
across those 24 route/viewport combinations. Desktop and mobile views were
visually inspected for hero, screenshot, navigation and article readability.

Interactions checked:

- Mobile menu opens, Escape closes it and same-page navigation dismisses it.
- Guide search has a useful matching state, supports plural “subscriptions”, and
  gives a clear zero-result state. Topic routes remain ordinary crawlable links.
- The Lab question and before/improvement radio groups update the fictional
  explanation; changing the question resets the comparison.
- Historical `/?case=fifthray#work` still opens the case dialog. Escape closes it,
  removes the query and restores focus to a focusable work heading.
- Contact links and Person metadata use `thomas@maghanga.com`.
- Motion reductions have a CSS fallback; no essential action depends on animation.

These checks do not claim a full assistive-technology audit, real Android in-app
browser testing, a live Shopify integration, measured conversion lift or a search
ranking. See the CRO Lab's own validation plan for its simulated commerce limits.

## Release checks and remaining gate

The normal Vercel development integration may generate a preview after the PR.
Before production, verify a known guide's HTTP 200 response, missing-slash
redirect and an unknown URL's actual HTTP 404. Local Vite fallback behavior cannot
establish production response status. Preserve hosting protection and DNS.

The downloadable two-page resume uses the corrected `thomas@maghanga.com` address.
Its visible text and clickable email were checked, with pixel comparison confirming
that all other content is unchanged. See `resume-contact-update.md` for evidence.
