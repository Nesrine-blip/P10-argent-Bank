import './Features.css';


function Features() {
  return (
    <section className="features">
      <h2 className="sr-only">Features</h2>
      
      {/* CARTE 1 : Chat / Service client */}
      <div className="feature-item">
        <div className="feature-icon">
          <i className="fa fa-comments" aria-hidden="true"></i>
        </div>
        <h3 className="feature-title">You are our #1 priority</h3>
        <p className="feature-description">
          Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.
        </p>
      </div>

      {/* CARTE 2 : Argent / Taux d'intérêt */}
      <div className="feature-item">
        <div className="feature-icon">
          <i className="fa fa-money" aria-hidden="true"></i>
        </div>
        <h3 className="feature-title">More savings means higher rates</h3>
        <p className="feature-description">
          The more you save with us, the higher your interest rate will be!
        </p>
      </div>

      {/* CARTE 3 : Sécurité */}
      <div className="feature-item">
        <div className="feature-icon">
          <i className="fa fa-shield" aria-hidden="true"></i>
        </div>
        <h3 className="feature-title">Security you can trust</h3>
        <p className="feature-description">
          We use top of the line encryption to make sure your data and money is always safe.
        </p>
      </div>
    </section>
  );
}

export default Features;