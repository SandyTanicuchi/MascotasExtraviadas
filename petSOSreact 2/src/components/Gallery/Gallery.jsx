import "./Gallery.css";

import busqueda from "../../assets/images/Busqueda.jpg";
import mapa from "../../assets/images/Mapa.jpg";
import alarma from "../../assets/images/Alarma.webp";
import comunidad from "../../assets/images/Comunidad.jpeg";

function Gallery() {
  return (
    <section id="galeria" className="gallery">

      <div className="container">

        <h2 className="section__title">Galería</h2>

        <div className="gallery__grid">

          <div className="gallery__item">
            <img src={busqueda} alt="" />
          </div>

          <div className="gallery__item">
            <img src={mapa} alt="" />
          </div>

          <div className="gallery__item">
            <img src={alarma} alt="" />
          </div>

          <div className="gallery__item">
            <img src={comunidad} alt="" />
          </div>

        </div>

      </div>

    </section>
  );
}

export default Gallery;