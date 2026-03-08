// src/App.jsx
import MovingFace from "./components/MovingFace";
import FaceHologram from "./components/FaceHologram";




export default function App() {
  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ fontSize: 32, marginBottom: 16 }}>Mark Tao</h1>
      <FaceHologram />
    </main>
  );
}