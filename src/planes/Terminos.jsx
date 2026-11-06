// planes/Terminos.jsx — planes.hipokratia.health/terminos
// Términos del servicio de HypokratIA Gestión. Si cambian, subir VERSION aquí y
// TERMINOS_VERSION en el backend (modules/inscripcion/servicio.py): cada
// inscripción guarda qué versión aceptó y cuándo.
const VERSION = "6 de noviembre de 2026";
const CORREO = "contacto@hipokratia.health";

export default function Terminos() {
  return (
    <div className="pl">
      <header className="pl-cab pl-cab--corta">
        <div className="pl-ancho">
          <a className="pl-marca" href="/">
            <img src="/logo.png" alt="" width="34" height="34" />
            <span>Hypokrat<b>IA</b> Gestión</span>
          </a>
          <h1>Términos del servicio</h1>
          <p className="pl-sub">Versión del {VERSION}</p>
        </div>
      </header>
      <main className="pl-ancho pl-legal">
        <section className="pl-tarjeta">
          <h2>1. Quién presta el servicio</h2>
          <p>HypokratIA Gestión es un producto de Sociedad Traumatológica y Kinésica Integral del Maule SpA (T&amp;K),
            RUT 77.566.441-K, Curicó, Chile. Contacto: <a href={`mailto:${CORREO}`}>{CORREO}</a>.</p>

          <h2>2. Qué es el servicio</h2>
          <p>Un software en línea para profesionales y centros de salud: ficha clínica electrónica, agenda, documentos
            (recetas, órdenes, informes), dictado con inteligencia artificial y el Portal HypokratIA para pacientes.
            El plan Externo Completo incluye además una página pública de reservas.</p>

          <h2>3. Quién puede inscribirse</h2>
          <ul>
            <li>Profesionales de la salud habilitados en Chile. Verificamos el RUT en el Registro Nacional de Prestadores
              Individuales de la Superintendencia de Salud.</li>
            <li>Si no apareces en ese registro, la inscripción queda en revisión y podemos aprobarla o rechazarla.</li>
            <li>Los datos que entregas deben ser verdaderos. La cuenta es personal: no compartas tu usuario ni tu contraseña.</li>
          </ul>

          <h2>4. Mes de prueba</h2>
          <ul>
            <li>El primer mes es gratis y no pide tarjeta. Hay una sola prueba por RUT.</li>
            <li>Antes de que termine te enviamos el link para pagar el primer mes.</li>
            <li>Si al terminar la prueba no se ha pagado, la cuenta se anula: no podrás ingresar, la página de reservas y
              tu perfil en el Portal dejan de estar disponibles, y las horas futuras se anulan avisando a cada paciente.</li>
            <li>Las fichas clínicas no se borran (ver punto 7). Si pagas después, reactivamos la cuenta.</li>
          </ul>

          <h2>5. Precio y pago</h2>
          <ul>
            <li>El precio es mensual, en pesos chilenos, con impuestos incluidos, y es el publicado en
              {" "}<a href="/">planes.hipokratia.health</a> al momento de pagar.</li>
            <li>Se paga por adelantado cada mes con el link de pago que enviamos. Si un mes no se paga, la cuenta se suspende
              hasta que se pague.</li>
            <li>Podemos cambiar los precios avisándote con al menos 30 días de anticipación.</li>
          </ul>

          <h2>6. Tus responsabilidades como profesional</h2>
          <ul>
            <li>Eres responsable de la atención que das y de lo que registras en la ficha. Lo que genera la inteligencia
              artificial es una ayuda: debes revisarlo antes de guardarlo, imprimirlo o entregarlo.</li>
            <li>Respecto de los datos de tus pacientes, tú eres el responsable de su tratamiento; HypokratIA los trata por
              encargo tuyo, solo para prestar el servicio.</li>
            <li>Debes usar el servicio conforme a la Ley 20.584 (derechos y deberes de los pacientes), la Ley 19.628 y la
              Ley 21.719 (protección de datos personales) y las normas de tu profesión.</li>
          </ul>

          <h2>7. Fichas clínicas y datos</h2>
          <ul>
            <li>La ley exige conservar la ficha clínica por al menos 15 años. Por eso las fichas no se eliminan aunque la
              cuenta termine o se anule; quedan resguardadas y disponibles para el paciente y para ti cuando la ley lo permita.</li>
            <li>Puedes pedirnos una copia de las fichas de tus pacientes escribiendo a {CORREO}.</li>
            <li>El detalle de cómo tratamos los datos está en la{" "}
              <a href="https://portal.hipokratia.health/privacidad">Política de privacidad</a>.</li>
          </ul>

          <h2>8. Disponibilidad</h2>
          <p>Hacemos lo razonable para que el servicio funcione siempre y respaldamos la información a diario, pero puede
            haber interrupciones por mantenimiento o fallas de terceros. No respondemos por daños indirectos ni lucro cesante.</p>

          <h2>9. Término</h2>
          <p>Puedes dejar de usar el servicio cuando quieras, simplemente no renovando el pago. Podemos suspender o terminar
            una cuenta si se usa de forma ilegal, se entregan datos falsos o no se paga.</p>

          <h2>10. Cambios y ley aplicable</h2>
          <p>Si cambiamos estos términos te avisaremos por correo. Se rigen por la ley chilena y cualquier controversia se
            somete a los tribunales de Curicó.</p>
        </section>
      </main>
      <footer className="pl-pie">
        <div className="pl-ancho">
          <span>Hypokrat<b>IA</b> · <a href="/">Planes y precios</a> · <a href={`mailto:${CORREO}`}>{CORREO}</a></span>
        </div>
      </footer>
    </div>
  );
}
