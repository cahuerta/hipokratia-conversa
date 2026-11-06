# Conoce HypokratIA

conoce.hipokratia.health — Ica, Ipo, Sophia y Katia conversan y presentan el ecosistema HypokratIA.

- `/` — la escena a pantalla completa (botón "Ver la presentación").
- `/?modo=carrusel` — solo los avatares pasando; es lo que muestra la página principal de
  hipokratia.health (repo hipokratia-fronted-web, `src/components/AsistentesConoce.jsx`).
  Al tocar un avatar, el marco pasa a pantalla completa con la escena.

Voz: Azure, por el backend de los asistentes de ICA (`POST /voz`, acepta *.hipokratia.health).
Guion en `src/guion.js` (primero pacientes: Portal y Aprende; después centros: Gestión, dictado, reservas, Dossier, domicilio); maquetas de la pantalla en `src/Pantallas.jsx`.

planes.hipokratia.health (`planes.html`, `src/planes/`): planes y precios de Gestión con calculadora y el video de los avatares.
Los precios se leen en vivo de `GET /api/planes/precios` del backend de la Ficha (Superadmin → Precios): si cambian ahí, cambian la página y lo que dicen los avatares.

Vercel: proyecto Vite (build `npm run build`, salida `dist`), dominio conoce.hipokratia.health.
