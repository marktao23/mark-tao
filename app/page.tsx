import FaceHologram from "./components/FaceHologram";

export default function Page() {
  return (
    <section className="hero">
      <div className="hero-text">
        <div className="hero-text-inner">
          <h1 className="hero-title"></h1>
          <p className="hero-subtitle">My name is Mark, and I'm a consultant based in NYC.</p>
        </div>
      </div>

      <div className="hero-visual">
        <FaceHologram />
      </div>
    </section>
  );
}
