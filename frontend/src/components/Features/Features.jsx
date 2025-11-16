import './Features.css';
function Features() {
  const featuresData = [
    {
      id: 1,
      icon: "fa fa-comments",
      title: "You are our #1 priority",
      description: "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
    },
    {
      id: 2,
      icon: "fa fa-money",
      title: "More savings means higher rates",
      description: "The more you save with us, the higher your interest rate will be!"
    },
    {
      id: 3,
      icon: "fa fa-shield",
      title: "Security you can trust",
      description: "We use top of the line encryption to make sure your data and money is always safe."
    }
  ];

  return (
    <section className="features">
      <h2 className="sr-only">Features</h2>
      
      {featuresData.map((feature) => (
        <div key={feature.id} className="feature-item">
          <div className="feature-icon">
            <i className={feature.icon} aria-hidden="true"></i>
          </div>
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </div>
      ))}
    </section>
  );
}
export default Features;


