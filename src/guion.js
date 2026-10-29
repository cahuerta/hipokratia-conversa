// guion.js — quién habla, qué dice y qué sale en la pantalla del set. Un guion por marca:
//
// HypokratIA (conoce.hipokratia.health): dar a conocer y vender el sistema, contado por sus
//   asistentes. Primero a los PACIENTES (Portal HypokratIA, Aprende, su médico que los escucha);
//   después a los CENTROS (Gestión, dictado, reservas, Dossier, domicilio). ICA y Familia Vital
//   aparecen como centros que ya lo usan.
// ICA (conoce.icarticular.cl): el Instituto de Cirugía Articular y sus pacientes. Sin domicilio
//   (ICA no lo hace). Cierra con que el instituto usa el software de HypokratIA.
// Las direcciones web se dicen "punto" para la voz; en el subtítulo van escritas normal.
import { esICA } from "./marca.js";

const GUION_HIPOKRATIA = [
  { quien: "ica", pantalla: "marca", texto: "¡Hola! Somos Ica, Ipo, Sophia y Katia, los asistentes de HypokratIA. Tenemos algo para ti, seas paciente o tengas un centro de salud." },

  // ── Pacientes ──
  { quien: "katia", pantalla: "portal", texto: "Si eres paciente, te presento el Portal HypokratIA: tu ficha clínica siempre contigo, explicada en palabras simples." },
  { quien: "katia", pantalla: "recordatorios", texto: "Te recuerdo tus medicamentos y tus horas, cotizas tu receta entre farmacias, sumas a tu familia como cuidadora y autorizas a tu médico a ver tu ficha." },
  { quien: "ipo", pantalla: "dolor", texto: "¿Te duele algo? Conversamos sobre tu dolor, marcas dónde te duele y te propongo los exámenes, con una orden firmada por un médico." },
  { quien: "sophia", pantalla: "aprende", texto: "Y si quieres entender lo que tienes, te explico en simple lo que dicen los mejores estudios científicos. Eso es HypokratIA Aprende." },
  { quien: "ica", pantalla: "escucha", texto: "Y en los centros que usan HypokratIA, tu médico te escucha a ti. Nosotros nos encargamos de las notas clínicas, la receta y la orden de exámenes." },
  { quien: "ipo", pantalla: "escucha", texto: "Tu doctor se dedica a ti: más tiempo escuchándote, menos tiempo escribiendo." },

  // ── Centros de salud ──
  { quien: "ica", pantalla: "gestion", texto: "¿Tienes un centro de salud? HypokratIA Gestión es todo tu centro en un solo sistema: ficha clínica, agenda, caja, equipo y remuneraciones." },
  { quien: "ipo", pantalla: "dictado", texto: "Tus médicos dictan la consulta y la ficha se escribe sola. La receta y la orden de exámenes salen listas para firmar. Atienden mejor y terminan a la hora." },
  { quien: "ica", pantalla: "reservas", texto: "Tu centro tiene su propia página de reservas, y yo atiendo a tus pacientes las veinticuatro horas: les busco hora, se la confirmo y se la recuerdo. Menos horas perdidas." },
  { quien: "sophia", pantalla: "dossier", texto: "Para tus médicos está HypokratIA Dossier: la evidencia científica analizada y resumida, para decidir con datos reales." },
  { quien: "ipo", pantalla: "domicilio", texto: "¿Atiendes a domicilio? Familia Vital lo hace con HypokratIA: sus pacientes reservan y pagan en línea, y siguen al profesional en el mapa hasta que llega." },
  { quien: "katia", pantalla: "conectado", texto: "Y tus pacientes reciben el Portal: tu centro queda en su teléfono." },
  { quien: "katia", pantalla: "ley", texto: "Y sus datos están protegidos. HypokratIA cumple la Ley de Protección de Datos Personales y la Ley de Derechos del Paciente: solo los ve quien el paciente autoriza, y cada acceso queda registrado." },
  { quien: "sophia", pantalla: "usado", texto: "El Instituto de Cirugía Articular, en Curicó, ya trabaja así todos los días." },

  { quien: "ica", pantalla: "final", texto: "Pacientes: pidan su Portal en portal punto hipokratia punto health. Centros de salud: pidan una demostración en hipokratia punto health." },
];

const GUION_ICA = [
  { quien: "ica", pantalla: "marca", texto: "¡Hola! Te damos la bienvenida al Instituto de Cirugía Articular. Somos Ica, Ipo, Sophia y Katia, y te acompañamos desde antes de tu consulta." },
  { quien: "ica", pantalla: "especialidades", texto: "Te atendemos en traumatología general y en sus subespecialidades, en kinesiología y en preparación física. Y muy pronto abrimos nuestro nuevo centro." },
  { quien: "ipo", pantalla: "dolor", texto: "¿Te duele la rodilla, la cadera o el hombro? Cuéntame. Marcamos juntos dónde te duele y te propongo los exámenes que corresponden." },
  { quien: "ipo", pantalla: "orden", texto: "Un médico del instituto revisa y firma tu orden, y llegas a tu consulta con todo listo." },
  { quien: "ica", pantalla: "reservas", texto: "Y yo te busco hora con el especialista indicado, a cualquier hora del día, en reservas punto icarticular punto cl." },
  { quien: "sophia", pantalla: "aprende", texto: "¿Quieres entender lo que tienes? Te explico en simple lo que dicen los mejores estudios científicos." },
  { quien: "ica", pantalla: "escucha", texto: "En la consulta, tu médico te escucha a ti. Nosotros escribimos las notas clínicas, la receta y la orden de exámenes." },
  { quien: "ipo", pantalla: "escucha", texto: "Tu doctor se dedica a ti: más tiempo escuchándote, menos tiempo escribiendo." },
  { quien: "katia", pantalla: "portal", texto: "Y después te llevas tu ficha en el bolsillo, con el Portal del paciente: tus atenciones explicadas en palabras simples." },
  { quien: "katia", pantalla: "recordatorios", texto: "Te recuerdo tus medicamentos, tus horas y tus sesiones de kinesiología, y puedes sumar a tu familia como cuidadora." },
  { quien: "sophia", pantalla: "software", texto: "Todo esto es posible porque en el instituto usamos el software de HypokratIA." },
  { quien: "ica", pantalla: "final", texto: "Agenda tu hora en reservas punto icarticular punto cl. ¡Te esperamos!" },
];

export const GUION = esICA ? GUION_ICA : GUION_HIPOKRATIA;

export const enPantalla = (t) =>
  t
    .replace("portal punto hipokratia punto health", "portal.hipokratia.health")
    .replace("hipokratia punto health", "hipokratia.health")
    .replace("reservas punto icarticular punto cl", "reservas.icarticular.cl")
    .replace("las veinticuatro horas", "las 24 horas");

/** Al tocar un avatar en el carrusel, la escena parte en su primera frase */
export const inicioDe = (quien) => Math.max(0, GUION.findIndex((g) => g.quien === quien));
