# RYDENODE Frontend Architecture

```text
src/
├── components/
│   ├── hero/
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Footer.jsx
│   │   └── MainLayout.jsx
│   └── ui/
│       ├── Button.jsx
│       ├── GlassCard.jsx
│       ├── Input.jsx
│       ├── Loader.jsx
│       ├── Modal.jsx
│       ├── Notification.jsx
│       └── index.js
├── contexts/
├── hooks/
├── pages/
├── services/
├── styles/
│   ├── global.css
│   └── tailwind.config.js
└── utils/
    └── theme.js
```

## Design tokens

- Midnight Black: `#0F0F0F`
- Graphite Gray: `#1C1C1C`
- Electric Blue: `#2E8BFF`
- Neon Purple: `#8A2BE2`

## Breakpoints

- mobile: `480px`
- tablet: `768px`
- desktop: `1280px`

## Future-ready extension points

- `services/socket.js` for live ride and driver location streams.
- `components/MapView.jsx` reserved for map provider integration.
- `hooks/useSocket.js` and future `hooks/useLiveTracking.js` for real-time state.
- UI primitives in `components/ui` can power dashboards across customer, driver, and owner apps.
