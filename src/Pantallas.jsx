// Pantallas.jsx — lo que muestra la pantalla grande del set en cada momento:
// maquetas animadas de cada producto (sin datos reales de pacientes). Según la marca
// (marca.js) cambian la portada, la reserva, la firma de la orden y el cierre.
import { esICA, logoInsignia } from "./marca.js";

export default function Pantalla({ id }) {
  switch (id) {
    case "marca":
      if (esICA) return (<div className="pt pt--marca"><img className="pt__logoimg" src={logoInsignia} alt="" /><p className="pt__logo pt__logo--ica">Instituto de Cirugía Articular</p><p className="pt__lema">Vuelve a moverte sin dolor</p></div>);
      return (<div className="pt pt--marca"><p className="pt__logo">Hypokrat<span>IA</span></p><p className="pt__lema">Tu salud, conectada</p><p className="pt__lugar">Para pacientes y centros de salud</p></div>);
    case "dolor":
      return (<div className="pt pt--dolor"><p className="pt__titulo">{esICA ? "Asistentes ICA" : "Asistentes HypokratIA"} · ¿Dónde te duele?</p>
        <svg viewBox="0 0 120 220" className="cuerpo" aria-hidden>
          <circle cx="60" cy="22" r="15" /><rect x="40" y="40" width="40" height="70" rx="16" />
          <rect x="22" y="44" width="14" height="62" rx="7" /><rect x="84" y="44" width="14" height="62" rx="7" />
          <rect x="42" y="106" width="16" height="96" rx="8" /><rect x="62" y="106" width="16" height="96" rx="8" />
          <circle className="dolor-p p1" cx="70" cy="160" r="7" /><circle className="dolor-p p2" cx="50" cy="114" r="6" /><circle className="dolor-p p3" cx="88" cy="50" r="6" />
        </svg>
        <ul className="pt__chips"><li>Rodilla derecha</li><li>Hace 3 semanas</li><li>Al subir escaleras</li></ul></div>);
    case "orden":
      return (<div className="pt pt--orden"><p className="pt__titulo">Diagnóstico probable</p><p className="pt__grande">Lesión meniscal</p>
        <div className="orden"><p>Orden de exámenes</p><p className="orden__item">✓ Resonancia magnética de rodilla derecha</p><p className="orden__firma">{esICA ? "Firma: médico del Instituto de Cirugía Articular" : "Firma: médico del centro"}</p></div></div>);
    case "reservas":
      return (<div className="pt pt--reservas"><p className="pt__titulo">{esICA ? "reservas.icarticular.cl · 24 horas" : "Página de reservas de tu centro · 24 horas"}</p>
        {esICA
          ? <div className="modos"><span className="on">🦴 Traumatología</span><span>🏃 Kinesiología</span><span>💪 Preparación física</span></div>
          : <div className="modos"><span className="on">🏥 Presencial</span><span>🏠 Domicilio</span><span>📱 Telemedicina</span></div>}
        <div className="horas">{["09:00", "09:20", "10:40", "11:00", "15:00", "15:20"].map((h, i) => <span key={h} style={{ animationDelay: `${0.15 * i}s` }} className={i === 2 ? "elegida" : ""}>{h}</span>)}</div>
        <p className="pt__ok">✓ Hora confirmada · recordatorio enviado</p></div>);
    case "aprende":
      return (<div className="pt pt--aprende"><p className="pt__titulo">HypokratIA Aprende</p><p className="pt__pregunta">“¿Necesito operarme del menisco?”</p>
        <p className="pt__resp">Según 12 estudios, muchas lesiones meniscales mejoran con kinesiología. La cirugía se indica si la rodilla se bloquea.</p>
        <p className="pt__fuentes">PubMed · SciELO</p></div>);
    case "dossier":
      return (<div className="pt pt--dossier"><p className="pt__titulo">HypokratIA Dossier</p>
        {["Meta-análisis · 2025 · 4.120 pacientes", "Ensayo clínico · 2024 · 320 pacientes", "Revisión sistemática · 2023"].map((t, i) => <div key={t} className="paper" style={{ animationDelay: `${0.2 * i}s` }}><span className="paper__nivel">Nivel {i + 1}</span>{t}</div>)}
        <p className="pt__fuentes">Resumen de la evidencia listo</p></div>);
    case "portal":
      return (<div className="pt pt--portal"><div className="tel"><p className="tel__barra">Portal HypokratIA</p><p className="tel__h">Mi ficha clínica</p>
        <p className="tel__ev">19 oct · Lumbago mecánico</p><p className="tel__exp">✨ “Tienes una contractura en la zona lumbar. Calor local y reposo relativo.”</p></div></div>);
    case "recordatorios":
      return (<div className="pt pt--portal"><div className="tel"><p className="tel__barra">Portal HypokratIA · Recordatorios</p>
        <p className="aviso">⏰ 08:00 · Ibuprofeno 400 mg</p><p className="aviso">🗓 Jue 10:40 · Dr. Huerta</p><p className="aviso">💊 Cotizar receta: desde $3.490</p>{esICA && <p className="aviso">🏃 Kine: sesión 4 de 10, mañana 18:00</p>}<p className="aviso">👥 Cuidador: tu hija Ana</p></div></div>);
    case "gestion":
      return (<div className="pt pt--gestion"><p className="pt__titulo">HypokratIA Gestión · Agenda de hoy</p>
        <div className="agenda">{[["09:00", "Control post operatorio"], ["09:20", "Dolor de cadera"], ["09:40", "Lesión de hombro"], ["10:00", "🏠 Kine a domicilio"]].map(([h, t], i) => <p key={h} style={{ animationDelay: `${0.18 * i}s` }}><b>{h}</b>{t}</p>)}</div>
        <p className="pt__dictado">🎙 Dictando la atención…</p></div>);
    case "domicilio":
      return (<div className="pt pt--mapa"><p className="pt__titulo">Familia Vital · atención a domicilio</p>
        <svg viewBox="0 0 300 160" className="mapa" aria-hidden><path d="M10 120 C80 120 90 40 160 50 S260 110 290 30" className="ruta" /><circle cx="290" cy="30" r="8" className="casa" /><circle r="7" className="auto"><animateMotion dur="5s" repeatCount="indefinite" path="M10 120 C80 120 90 40 160 50 S260 110 290 30" /></circle></svg>
        <p className="pt__grande">Llega en 12 min · código 4821</p></div>);
    case "conectado":
      return (<div className="pt pt--red">{["Tu centro", "Portal", "Aprende", "Dossier", "Asistentes"].map((n, i) => <span key={n} className={`nodo n${i}`}>{n}</span>)}<span className="nodo nodo--centro">🔒 Tu paciente</span></div>);
    case "ley":
      return (<div className="pt pt--ley"><p className="pt__titulo">🔒 Datos protegidos</p>
        <div className="leyes"><div><b>Ley 21.719</b><span>Protección de datos personales</span></div><div><b>Ley 20.584</b><span>Derechos y deberes del paciente</span></div></div>
        <div className="escribe"><span>✓ Solo los ve quien el paciente autoriza</span><span style={{ animationDelay: ".5s" }}>✓ Cada acceso queda registrado</span></div></div>);
    case "escucha":
      // El médico mira al paciente; el sistema escribe por él
      return (<div className="pt pt--escucha"><p className="pt__titulo">En la consulta</p>
        <p className="pt__grande">Tu médico te escucha a ti</p>
        <div className="escribe">{["📝 Notas clínicas", "💊 Receta", "🧪 Orden de exámenes"].map((t, i) => <span key={t} style={{ animationDelay: `${0.35 + 0.35 * i}s` }}>✓ {t}</span>)}</div>
        <p className="pt__lema">Más tiempo escuchándote, menos tiempo escribiendo</p></div>);
    case "dictado":
      return (<div className="pt pt--dictado"><p className="pt__titulo">HypokratIA Gestión · Dictado por voz</p>
        <div className="onda" aria-hidden>{Array.from({ length: 28 }, (_, i) => <i key={i} style={{ animationDelay: `${(i % 7) * 0.09}s` }} />)}</div>
        <div className="ficha">
          <p><b>Motivo:</b> dolor de rodilla derecha hace 3 semanas</p>
          <p><b>Examen:</b> derrame leve, McMurray positivo</p>
          <p><b>Diagnóstico:</b> lesión meniscal</p>
          <p className="ficha__listo">✓ Receta y orden listas para firmar</p>
        </div></div>);
    case "usado":
      return (<div className="pt pt--usado"><p className="pt__titulo">Ya usan HypokratIA</p>
        <div className="socios"><div><b>Instituto de Cirugía Articular</b><span>Curicó · traumatología</span></div><div><b>Familia Vital</b><span>Atención a domicilio</span></div></div></div>);
    // ── Video de ICA (pacientes): la atención ──
    case "ica-dolor":
      return (<div className="pt pt--marca"><img className="pt__logoimg" src={logoInsignia} alt="" />
        <p className="pt__pregunta">¿Te duele la cadera o la rodilla?</p>
        <p className="pt__logo pt__logo--ica">Vuelve a moverte <span>sin dolor</span></p>
        <p className="pt__lugar">Instituto de Cirugía Articular</p></div>);
    case "ica-equipo":
      return (<div className="pt pt--usado"><p className="pt__titulo">Nuestro equipo</p>
        <div className="equipo">{[["CH", "Dr. Cristóbal Huerta Cortés", "Traumatólogo · Cadera y pelvis"], ["JE", "Dr. Jaime Espinoza", "Traumatólogo · Rodilla"], ["GC", "Gabriel Castillo", "Kinesiólogo"]].map(([ini, n, r], k) => (
          <div key={n} style={{ animationDelay: `${0.25 * k}s` }}><span className="equipo__ini">{ini}</span><b>{n}</b><span>{r}</span></div>))}</div>
        <p className="pt__lugar">Y traumatología general</p></div>);
    case "ica-consulta":
      return (<div className="pt pt--escucha"><p className="pt__titulo">En tu consulta</p>
        <div className="pasos3">{["👂 Te escuchamos", "🩺 Te examinamos con calma", "💬 Te explicamos tus opciones"].map((t, k) => <span key={t} style={{ animationDelay: `${0.35 * k}s` }}>{t}</span>)}</div>
        <p className="pt__grande">No siempre hay que operar</p></div>);
    case "ica-mako":
      return (<div className="pt pt--marca"><p className="pt__titulo">Cirugía de última tecnología</p>
        <p className="pt__logo pt__logo--ica">Cirugía robótica <span>Mako</span></p>
        <p className="pt__lema">Stryker · Prótesis de cadera y de rodilla</p>
        <p className="pt__chip-lugar">🏥 Clínica CleverSalud · Rancagua</p>
        <p className="pt__ok">Cirugías por Fonasa e Isapres, en convenio con la clínica</p></div>);
    case "ica-tratamientos":
      return (<div className="pt pt--usado"><p className="pt__titulo">También tratamos</p>
        <div className="escribe">{["Ligamentos", "Meniscos", "Cirugía de revisión", "Choque femoroacetabular", "Traumatología general"].map((t, k) => <span key={t} style={{ animationDelay: `${0.2 * k}s` }}>{t}</span>)}</div>
        <p className="pt__lema">Siempre según la mejor evidencia</p></div>);
    case "ica-kine":
      return (<div className="pt pt--usado"><p className="pt__titulo">Kinesiología · Gabriel Castillo</p>
        <div className="camino">{["Día 1", "Caminar", "Trabajar", "Tu deporte"].map((t, k) => <span key={t} style={{ animationDelay: `${0.3 * k}s` }}>{t}</span>)}</div>
        <p className="pt__lema">Te acompañamos en toda tu recuperación</p></div>);
    case "ica-preparacion":
      return (<div className="pt pt--escucha"><p className="pt__titulo">Preparación física</p>
        <div className="pasos3"><span>💪 Llega fuerte a tu cirugía</span><span style={{ animationDelay: ".35s" }}>🛡️ Evita nuevas lesiones</span></div></div>);
    case "ica-camino":
      return (<div className="pt pt--usado"><p className="pt__titulo">Un mismo equipo contigo</p>
        <div className="camino">{["Diagnóstico", "Tratamiento", "Recuperación", "Vuelta al deporte"].map((t, k) => <span key={t} style={{ animationDelay: `${0.3 * k}s` }}>{t}</span>)}</div>
        <p className="pt__grande">Nunca estás solo</p></div>);
    case "ica-prevision":
      return (<div className="pt pt--marca"><p className="pt__titulo">Muy pronto</p>
        <p className="pt__grande">✨ Nuestro nuevo centro</p></div>);
    case "ica-dudas":
      return (<div className="pt pt--escucha"><p className="pt__titulo">¿Tienes una duda?</p>
        <div className="globos"><p className="globos__p">¿Qué examen necesito para mi rodilla?</p><p className="globos__r">Cuéntame qué sientes y te ayudo 😊</p></div>
        <p className="pt__lema">Pregúntanos a cualquier hora</p></div>);
    case "especialidades":
      return (<div className="pt pt--usado"><p className="pt__titulo">Instituto de Cirugía Articular</p>
        <div className="especialidades">{[["🦴", "Traumatología general"], ["🎯", "Subespecialidades: cadera, rodilla, hombro…"], ["🏃", "Kinesiología"], ["💪", "Preparación física"]].map(([i, t], k) => <div key={t} style={{ animationDelay: `${0.2 * k}s` }}><span>{i}</span>{t}</div>)}</div>
        <p className="pt__ok">✨ Muy pronto, nuestro nuevo centro</p></div>);
    case "software":
      return (<div className="pt pt--marca"><p className="pt__titulo">El instituto usa</p><p className="pt__logo">Hypokrat<span>IA</span></p><p className="pt__lema">Software clínico</p></div>);
    case "final":
      if (esICA) return (<div className="pt pt--final"><img className="pt__logoimg" src={logoInsignia} alt="" /><p className="pt__logo pt__logo--ica">Instituto de Cirugía Articular</p><p className="cta">Agenda tu hora en <b>reservas.icarticular.cl</b></p><p className="pt__pie">Tecnología Hypokrat<span>IA</span></p></div>);
      return (<div className="pt pt--final"><p className="pt__logo">Hypokrat<span>IA</span></p><p className="cta">Pacientes: tu Portal en <b>portal.hipokratia.health</b></p><p className="cta">Centros de salud: pide una demostración en <b>hipokratia.health</b></p></div>);
    default:
      return null;
  }
}
