import "./Footer.css";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">

      <div className="container footer__container">

        <div className="footer__brand">
          <h2>
            Pet <span>SOS</span>
          </h2>

          <p>
            Ayudamos a encontrar y proteger
            a tus mascotas mediante tecnología
            y comunidad.
          </p>
        </div>


        <div className="footer__links">

          <h3>Enlaces</h3>

          <a href="#">Inicio</a>
          <a href="#nosotros">Nosotros</a>
          <a href="#servicios">Servicios</a>
          <a href="#contacto">Contacto</a>

        </div>


        <div className="footer__contact">

          <h3>Contacto</h3>

          <p>📞 +593 984943767</p>

          <p>
            ✉ petsos@gmail.com
          </p>


          <div className="social__icons">

            <a href="#">
              <FaFacebookF/>
            </a>

            <a href="#">
              <FaInstagram/>
            </a>

            <a href="#">
              <FaTwitter/>
            </a>

          </div>

        </div>


      </div>


      <div className="footer__bottom">

        © 2026 PetSOS | Todos los derechos reservados

      </div>


    </footer>
  );
}

export default Footer;