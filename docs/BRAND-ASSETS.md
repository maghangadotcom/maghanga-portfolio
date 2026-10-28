# Selected project logo marquee

Official storefront artwork retrieved 2026-10-28; locally served under /brands/.
These marks identify selected project experience, not an endorsement or measured outcome.
Original proportions and artwork are preserved. CSS sets optical widths inside equal slots.
TechnoRV's white-backed JPG uses CSS multiply on the paper surface (no background editing).
Supply's CDN returned JPEG XL via browser content negotiation; it was decoded to PNG
for broad browser compatibility. No raster artwork was traced or wrapped in SVG.

| Brand | Official source |
| --- | --- |
| Supply Razors | https://supply.co/cdn/shop/files/logo-experiments.png?v=1621279378 |
| Blu Atlas | https://bluatlas.com/cdn/shop/files/logo_black_8aa8ce5b-6cae-4403-88ba-6e78732cd002.png?v=1673086300 |
| Fifth Ray (wellness) | https://fifthray.co.uk/cdn/shop/files/300140_Logo_Text-Black-Cropped.png?v=1698070517 |
| Benevolence LA | https://benevolencela.com/cdn/shop/files/benevolence_logonew2b.png?v=1613666631 |
| TechnoRV | https://technorv.com/cdn/shop/files/Logo_in_Line_2_2.jpg?v=1666975371 |
| Stryx | https://www.stryx.com/cdn/shop/files/logo_svg.svg?v=1756224706 |
| Brute Magnetics | https://brutemagnetics.com/cdn/shop/files/WordMark_d354024b-9dd7-4a11-813e-e60350d03deb.png?v=1689276340 |

Stryx is the original path/polygon SVG, inspected for scripts, event handlers,
external references and embedded images (none present). Its descender is optically
offset without cropping. Six other logos retain their authentic raster formats.

## Behavior to verify
- Desktop/mobile: all seven load, stay proportional, and loop without a jump.
- Pause/resume toggles repeatedly; hover and keyboard focus also pause.
- Reduced motion: one wrapped static list, no animation or irrelevant pause control.
- No JavaScript: one wrapped static list; all seven names are available via alt text.
- Hydrated duplicate has aria-hidden and empty alt text; no duplicated controls.
