// planes/guionPlanes.js — el video de planes.hipokratia.health: los asistentes
// explican los planes de HypokratIA Gestión con los precios VIGENTES (precios.js).
// Se arma al cargar la página, así un cambio en el Superadmin cambia lo que dicen.
import { gruposCentro, pesosVoz, unir } from "./precios.js";

export function guionPlanes(p) {
  const grupos = gruposCentro(p).map(({ precio, nombres }) =>
    `${unir(nombres.map((n) => n.toLowerCase().replace("/o", "")), "o")}, ${pesosVoz(precio)}`);
  return [
    { quien: "ica", pantalla: "planes-marca", texto: "¡Hola! Somos los asistentes de HypokratIA. Te contamos los planes de HypokratIA Gestión: precios claros, mensuales y con IVA incluido." },
    { quien: "ipo", pantalla: "plan-base", texto: `Si atiendes solo, el plan Externo Base cuesta ${pesosVoz(p.externo_base)} al mes: ficha clínica, agenda, recetas y órdenes listas para imprimir, y el dictado con inteligencia artificial que ordena tu atención.` },
    { quien: "ica", pantalla: "plan-completo", texto: `El plan Externo Completo, a ${pesosVoz(p.externo_completo)} al mes, suma tu propia página de reservas, y apareces en el Portal HypokratIA para que los pacientes te encuentren y reserven contigo.` },
    { quien: "sophia", pantalla: "plan-centro", texto: `¿Tienes un centro? Pagas solo por cada usuario de tu equipo, al mes: ${grupos.join("; ")}.` },
    { quien: "katia", pantalla: "plan-incluye", texto: "Todos los planes incluyen el Portal y la aplicación para tus pacientes: su ficha clínica, recordatorios de medicamentos, cuidadores y el cotizador de recetas." },
    { quien: "ipo", pantalla: "plan-ley", texto: "Y cumplen la Ley de Derechos del Paciente y la Ley de Protección de Datos Personales. Además, cada profesional queda verificado en el registro de la Superintendencia de Salud." },
    { quien: "sophia", pantalla: "plan-modulos", texto: "Atención a domicilio, telemedicina y dermatología en línea se suman como módulos, y los cotizamos según tu centro." },
    { quien: "ica", pantalla: "plan-final", texto: "Calcula el valor de tu centro en planes punto hipokratia punto health, y escríbenos a contacto arroba hipokratia punto health." },
  ];
}
