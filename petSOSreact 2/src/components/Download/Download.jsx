import "./Download.css";

import appImage from "../../assets/images/AppPetSOS.png";
import playstore from "../../assets/images/playstore.png";
import googleplay from "../../assets/images/googleplay.png";

function Download() {
  return (
    <section id="app" className="download">

      <div className="container download__container">

        <div className="download__image">
          <img src={appImage} alt="App PetSOS" />
        </div>

        <div className="download__info">

          <h2>Descarga la App PetSOS</h2>

          <p>
            Encuentra mascotas perdidas, recibe alertas
            y conecta con tu comunidad.
          </p>

          <div className="download__buttons">
            <img src={playstore} alt="Play Store" />
            <img src={googleplay} alt="Google Play" />
          </div>

        </div>

      </div>

    </section>
  );
}

export default Download;