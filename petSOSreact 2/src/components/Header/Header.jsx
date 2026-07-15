import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Header.css";

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className={`header ${scrolled ? "header--scrolled" : ""}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container header__container">

        <h1 className="navbar__logo">
          Pet <span className="navbar__logo--primary">SOS</span>
        </h1>

        <nav className="nav">
          <ul className="nav__menu">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/#nosotros">Nosotros</Link></li>
            <li><Link to="/servicios">Servicios</Link></li>
            <li><Link to="/#app">App</Link></li>
            <li><Link to="/#galeria">Galería</Link></li>
            <li><Link to="/#contacto">Contacto</Link></li>
            {user && (
              <li><Link to="/mascotas">Mis Mascotas</Link></li>
            )}
            <li>
              <motion.div
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.97 }}
              >
                {user ? (
                  <button onClick={handleLogout} className="nav__login nav__login--button">
                    Cerrar sesión
                  </button>
                ) : (
                  <Link to="/login" className="nav__login">
                    Acceso
                  </Link>
                )}
              </motion.div>
            </li>
          </ul>
        </nav>

      </div>
    </motion.header>
  );
}

export default Header;