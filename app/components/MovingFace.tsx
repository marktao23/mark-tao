"use client";

import { useEffect, useState } from "react";

export default function MovingFace() {
  const [position, setPosition] = useState({ x: window.innerWidth / 2 - 75, y: window.innerHeight / 2 - 75 });
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(pos => {
        // small random movement around current position
        const deltaX = Math.sin(angle) * 3 + (Math.random() - 0.5) * 4;
        const deltaY = Math.cos(angle) * 3 + (Math.random() - 0.5) * 4;

        let newX = pos.x + deltaX;
        let newY = pos.y + deltaY;

        // keep it roughly in the viewport
        newX = Math.max(0, Math.min(window.innerWidth - 150, newX));
        newY = Math.max(0, Math.min(window.innerHeight - 150, newY));

        return { x: newX, y: newY };
      });

      // rotate angle slightly each tick for smooth circular-ish motion
      setAngle(a => a + 0.05);
    }, 16);

    return () => clearInterval(interval);
  }, [angle]);

  return (
    <img
      src="/Mark_Headshot.jpg"
      alt="Mark"
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        width: "150px",
        height: "150px",
        borderRadius: "50%",
        transform: `rotate(${angle}rad)`,
        transition: "transform 0.1s linear",
      }}
    />
  );
}