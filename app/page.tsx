import FaceHologram from "./components/FaceHologram";

export default function Page() {
  return (
    <section className="hero">
      <div className="hero-text">
        <div className="hero-text-inner">
          <h1 className="hero-title">Mark Tao</h1>
          <p className="hero-subtitle">Welcome to my journey</p>
        </div>
      </div>

      <div className="hero-visual">
        <FaceHologram />
      </div>
    </section>
  );
}