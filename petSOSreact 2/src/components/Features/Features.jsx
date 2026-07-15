import "./Features.css";

function Features() {
  return (
    <section className="features">

      <div className="container">

        <h2 className="features__title">
          ¿Por qué PetSOS?
        </h2>

        <p className="features__subtitle">
          Características que nos hacen únicos
        </p>

        <div className="features__container">

          <div className="feature__card">
            <h3>Tiempo Real</h3>
            <p>Ubica a tu mascota al instante.</p>
          </div>

          <div className="feature__card">
            <h3>100% Seguro</h3>
            <p>Tus datos están protegidos.</p>
          </div>

          <div className="feature__card">
            <h3>Fácil de Usar</h3>
            <p>Interfaz intuitiva y moderna.</p>
          </div>

          <div className="feature__card">
            <h3>Alertas</h3>
            <p>Notificaciones inmediatas.</p>
          </div>

        </div>

      </div>

    </section>
  );
}

export default Features;