# DESIGN_GUIDE.md

Clean, dark, premium, light on motion.

## Tokens (Tailwind)
- `midnight #0F0F0F` background · `graphite #1C1C1C` surfaces
- `electric-blue #2E8BFF` primary · `neon-purple #8A2BE2` accent
- Success `#00E0A4`, warning `#FFB020`, danger `#FF5A5F`
- Text: white / gray-300 / gray-400. Radius: `rounded-xl` cards, `rounded-lg` controls.

## Components (shared, in `components/ui`)
Button (primary/ghost/danger, loading state), Input (label + error), Card (glass), Modal, Toast (success/error/info, auto-dismiss 3s), Badge (ride status colours), Skeleton, EmptyState.

## Motion rules
- Page enter: fade + 8px rise, 250ms (framer-motion).
- Hover: cards lift 2px + border glow; buttons scale 1.02. 150–200ms.
- Toasts slide in from top-right. Modals fade + scale 0.97 → 1.
- Respect `prefers-reduced-motion`. No continuous animation outside the landing hero.

## UX rules
- Every async action: loading state + toast on success/failure.
- Forms: inline validation, labelled inputs, disabled submit while loading.
- Mobile-first; dashboards stack to one column under `lg`.
- Role-coloured accents are optional; keep one primary action per screen.
- Status badges: pending gray, approved blue, assigned purple, ongoing amber, completed green, cancelled red.
