import "./Contact.css";

function Contact() {
  return (
    <section id="contacto" className="contact-section">

      <div className="container contact__wrapper">

        <div className="contact__form">

          <h2>¿Tienes preguntas? Escríbenos</h2>

          <form>

            <input type="text" placeholder="Nombre" />

            <input type="email" placeholder="Correo" />

            <input type="tel" placeholder="Celular" />

            <textarea placeholder="Observaciones"></textarea>

            <label className="checkbox-label">
              <input type="checkbox" />
              Acepto términos y condiciones
            </label>

            <button className="button">
              Enviar
            </button>

          </form>

        </div>

        <div className="contact__map">

          <iframe
           src="https://www.google.com/maps?q=Escuela%20Politécnica%20Nacional%20Quito%20Ecuador&output=embed"
           title="Mapa PetSOS"
           loading="lazy"
          ></iframe>

        </div>

      </div>

    </section>
  );
}

export default Contact;