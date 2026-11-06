// planes/PantallasPlanes.jsx — la pantalla grande del set en el video de planes.
// Recibe los precios vigentes (datos) para mostrarlos tal como los dicen los avatares.
import Pantalla from "../Pantallas.jsx";
import { gruposCentro, pesos } from "./precios.js";

export default function PantallaPlanes({ id, datos }) {
  const p = datos || {};
  switch (id) {
    case "planes-marca":
      return (<div className="pt pt--marca"><p className="pt__logo">Hypokrat<span>IA</span> Gestión</p><p className="pt__lema">Planes y precios</p><p className="pt__lugar">Mensuales · IVA incluido</p></div>);
    case "plan-base":
      return (<div className="pt pt--usado"><p className="pt__titulo">Externo Base · 1 profesional</p><p className="pt__grande">{pesos(p.externo_base)} <small className="pl-mes">/mes</small></p>
        <div className="escribe">{["📋 Ficha clínica", "🗓 Agenda", "🖨 Recetas y órdenes", "🎙 Dictado con IA"].map((t, i) => <span key={t} style={{ animationDelay: `${0.25 * i}s` }}>{t}</span>)}</div></div>);
    case "plan-completo":
      return (<div className="pt pt--usado"><p className="pt__titulo">Externo Completo · 1 profesional</p><p className="pt__grande">{pesos(p.externo_completo)} <small className="pl-mes">/mes</small></p>
        <div className="escribe">{["Todo lo del Base", "🌐 Página de reservas propia", "📱 Apareces en el Portal HypokratIA"].map((t, i) => <span key={t} style={{ animationDelay: `${0.25 * i}s` }}>{t}</span>)}</div></div>);
    case "plan-centro":
      return (<div className="pt pt--usado"><p className="pt__titulo">Centro · por usuario al mes</p>
        <div className="pl-grupos">{gruposCentro(p).map(({ precio, nombres }, i) => (
          <div key={precio} style={{ animationDelay: `${0.25 * i}s` }}><b>{pesos(precio)}</b><span>{nombres.join(" · ")}</span></div>))}</div></div>);
    case "plan-incluye":
      return (<div className="pt pt--usado"><p className="pt__titulo">Incluido en todos los planes</p><p className="pt__grande">Portal y app para tus pacientes</p>
        <div className="escribe">{["📋 Su ficha", "⏰ Recordatorios", "👥 Cuidadores", "💊 Cotizador de recetas"].map((t, i) => <span key={t} style={{ animationDelay: `${0.25 * i}s` }}>{t}</span>)}</div></div>);
    case "plan-ley":
      return (<div className="pt pt--ley"><p className="pt__titulo">🔒 Seguro y legal</p>
        <div className="leyes"><div><b>Ley 20.584</b><span>Derechos y deberes del paciente</span></div><div><b>Ley 21.719</b><span>Protección de datos personales</span></div></div>
        <div className="escribe"><span>✓ Profesionales verificados en la Superintendencia de Salud</span></div></div>);
    case "plan-modulos":
      return (<div className="pt pt--usado"><p className="pt__titulo">Módulos adicionales · a cotizar</p>
        <div className="escribe">{["🏠 Atención a domicilio", "📹 Telemedicina", "📸 Dermatología en línea"].map((t, i) => <span key={t} style={{ animationDelay: `${0.25 * i}s` }}>{t}</span>)}</div></div>);
    case "plan-final":
      return (<div className="pt pt--final"><p className="pt__logo">Hypokrat<span>IA</span> Gestión</p><p className="cta">Calcula tu centro en <b>planes.hipokratia.health</b></p><p className="cta">Escríbenos: <b>contacto@hipokratia.health</b></p></div>);
    default:
      return <Pantalla id={id} />;
  }
}
