// Cloudflare Pages (antes "rewrites" por host en vercel.json):
//   conoce.icarticular.cl/            → ica.html  (video de ICA)
//   planes.hipokratia.health/ , /inscribete , /terminos → planes.html
// Solo corre en esas rutas (public/_routes.json).
export async function onRequest({ request, next, env }) {
  const url = new URL(request.url);
  const host = url.hostname;
  let pagina = null;
  if (host === "conoce.icarticular.cl" && url.pathname === "/") pagina = "/ica";
  if (host === "planes.hipokratia.health" && /^\/(inscribete|terminos)?\/?$/.test(url.pathname)) pagina = "/planes";
  if (!pagina) return next();
  return env.ASSETS.fetch(new Request(new URL(pagina, url), request));
}
