import "./Hero.css";
import retriever from "../../assets/images/Retriever.png";

function Hero() {
  return (
    <main className="hero">

      <div className="container hero__container">

        <div className="hero__content">
          <h2>
            ¡No pierdas <span className="hero__highlight">
            a tus grandes amigos!
            </span>
          </h2>

          <a href="#servicios" className="button hero__button">
            Más información
          </a>
        </div>

        <div className="hero__image">
          <img src={retriever} alt="Perro Retriever" />
        </div>

      </div>

      <div className="hero__services">

        <div className="service-card">
          <p>Mascotas</p>
        </div>

        <div className="service-card">
          <p>Mapa</p>
        </div>

        <div className="service-card">
          <p>Alertas</p>
        </div>

        <div className="service-card">
          <p>Comunidad</p>
        </div>

      </div>

    </main>
  );
}

export default Hero;