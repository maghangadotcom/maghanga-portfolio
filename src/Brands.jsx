import { useState, useSyncExternalStore } from "react";
import "./brands.css";

const brands = [
  { name: "Supply Razors", file: "supply.png", id: "supply", width: 500, height: 150 },
  { name: "Blu Atlas", file: "blu-atlas.png", id: "blu-atlas", width: 2684, height: 606 },
  { name: "Fifth Ray", file: "fifth-ray.png", id: "fifth-ray", width: 3138, height: 674 },
  { name: "Benevolence LA", file: "benevolence-la.png", id: "benevolence-la", width: 260, height: 71 },
  { name: "TechnoRV", file: "technorv.jpg", id: "technorv", width: 2030, height: 655 },
  { name: "Stryx", file: "stryx.svg", id: "stryx", width: 656, height: 184 },
  { name: "Brute Magnetics", file: "brute-magnetics.png", id: "brute-magnetics", width: 841, height: 114 },
];
const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

function BrandList({ duplicate = false }) {
  return (
    <ul className="brand-list" aria-hidden={duplicate || undefined} role="list">
      {brands.map(({ name, file, id, width, height }) => (
        <li className="brand-slot" key={id}>
          <img
            className={`brand-logo brand-logo--${id}`}
            src={`/brands/${file}`}
            width={width}
            height={height}
            alt={duplicate ? "" : name}
            decoding="async"
            draggable="false"
          />
        </li>
      ))}
    </ul>
  );
}

export default function Brands() {
  const enhanced = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
  const [paused, setPaused] = useState(false);
  return (
    <section
      className="brands wrap"
      aria-label="Selected project experience"
      data-enhanced={enhanced}
      data-paused={paused}
    >
      <div className="brands-heading">
        <p>SELECTED PROJECT EXPERIENCE</p>
        {enhanced && (
          <button
            className="brands-toggle"
            type="button"
            aria-controls="brand-marquee"
            aria-pressed={paused}
            onClick={() => setPaused((value) => !value)}
          >
            <span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span>
            {paused ? "Resume logos" : "Pause logos"}
          </button>
        )}
      </div>
      <div className="brand-window" id="brand-marquee">
        <div className="brand-track">
          <BrandList />
          {enhanced && <BrandList duplicate />}
        </div>
      </div>
    </section>
  );
}
