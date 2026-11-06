// planes/precios.js — precios vigentes de HypokratIA Gestión.
// Salen del backend de la Ficha (GET /api/planes/precios), que lee las mismas
// tablas que se editan en Superadmin → Precios: si cambia un valor ahí, cambian
// la página y lo que dicen los avatares. IVA incluido (servicio exento).
export const BACKEND = import.meta.env.VITE_FICHA_BACKEND || "https://services.icarticular.cl";

export async function cargarPrecios() {
  const ctrl = new AbortController();
  const reloj = setTimeout(() => ctrl.abort(), 20000);   // Render puede estar despertando
  try {
    const r = await fetch(`${BACKEND}/api/planes/precios`, { signal: ctrl.signal });
    if (!r.ok) return null;
    const d = await r.json();
    if (!d || !Array.isArray(d.centro)) return null;
    return d;
  } catch {
    return null;
  } finally {
    clearTimeout(reloj);
  }
}

export const pesos = (n) => `$${Number(n || 0).toLocaleString("es-CL")}`;
// Para la voz: "35.000 pesos" (Azure lo lee "treinta y cinco mil pesos")
export const pesosVoz = (n) => `${Number(n || 0).toLocaleString("es-CL")} pesos`;

/** Roles del plan Centro agrupados por precio, de mayor a menor */
export function gruposCentro(precios) {
  const g = new Map();
  for (const r of precios?.centro || []) {
    if (!g.has(r.precio)) g.set(r.precio, []);
    g.get(r.precio).push(r.nombre);
  }
  return [...g.entries()].sort((a, b) => b[0] - a[0]).map(([precio, nombres]) => ({ precio, nombres }));
}

export const unir = (lista, y = "y") =>
  lista.length <= 1 ? (lista[0] || "") : `${lista.slice(0, -1).join(", ")} ${y} ${lista[lista.length - 1]}`;
