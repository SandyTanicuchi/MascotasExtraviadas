import "./Services.css";

import service1 from "../../assets/images/IconoService1.png";
import service2 from "../../assets/images/Localizacion.png";
import service3 from "../../assets/images/IconoService2.png";

function Services() {
  return (
    <section id="servicios" className="services">

      <div className="container">

        <h2 className="section__title">Servicios</h2>

        <p className="section__subtitle">
          Ofrecemos seguridad a sus hermosas mascotas.
        </p>

        <div className="services__grid">

          <div className="service-item">
            <img src={service1} alt="" />

            <h3>
              Localiza y encuentra a tu mascota.
            </h3>

            <a href="#" className="button button--small">
              Más información
            </a>
          </div>

          <div className="service-item">
            <img src={service2} alt="" />

            <h3>
              Revisa la posición en tiempo real.
            </h3>

            <a href="#" className="button button--small">
              Más información
            </a>
          </div>

          <div className="service-item">
            <img src={service3} alt="" />

            <h3>
              Crea una comunidad de mascotas.
            </h3>

            <a href="#" className="button button--small">
              Más información
            </a>
          </div>

        </div>

      </div>

    </section>
  );
}

export default Services;