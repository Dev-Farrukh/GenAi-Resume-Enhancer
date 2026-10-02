import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import "./Leaders.scss";

/* First item is the founder and is centered on load. Replace names, roles and photos
   (e.g. import photo from "../../../assets/team/founder.jpg"). */
const leaders = [
  { id: 1, name: "Farrukh", role: "Founder & CEO", img: "src/assets/founder.webp" },
  { id: 4, name: "Antigravity", role: "Jr. Developer", img: "src/assets/antigravity.webp" },
  { id: 2, name: "Qoder", role: "Jr. AI Engineer", img: "src/assets/qoder.webp" },
  { id: 3, name: "Claude", role: "Jr. QA Engineer", img: "src/assets/claude.webp" },
  { id: 5, name: "Stitch", role: "Jr. UI/UX Designer", img: "src/assets/stitch.webp" },
];

export default function Leaders() {
  const [active, setActive] = useState(0);
  const [narrow, setNarrow] = useState(false);
  const reduce = useReducedMotion();
  const n = leaders.length;

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 700px)");
    const update = () => setNarrow(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const go = (d) => setActive((p) => (p + d + n) % n);

  // shortest circular distance from the active card: ... -2 -1 0 1 2 ...
  const offsetOf = (i) => {
    const half = Math.floor(n / 2);
    return ((i - active + n + half) % n) - half;
  };

  const gap = narrow ? 190 : 340; // how far side cards sit from the center

  return (
    <section className="leaders" id="leaders">
      <header className="sec-head">
        <span className="tag">Our leaders</span>
        <h2>Meet the people behind GenAI Resume Enhancer.</h2>
      </header>

      <div
        className="leaders__stage"
        role="region"
        aria-roledescription="carousel"
        aria-label="Our leaders"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(1);
          if (e.key === "ArrowLeft") go(-1);
        }}
      >
        <motion.div className="leaders__track" onPanEnd={(_, info) => {
          if (info.offset.x < -60) go(1);
          else if (info.offset.x > 60) go(-1);
        }}>
          {leaders.map((l, i) => {
            const o = offsetOf(i);
            const abs = Math.abs(o);
            const isCenter = o === 0;
            const visible = abs <= 1;
            const side = Math.sign(o);

            return (
              <motion.figure
                key={l.id}
                className={`lcard ${isCenter ? "lcard--center" : ""}`}
                aria-hidden={!visible}
                aria-label={visible && !isCenter ? `Show ${l.name}` : undefined}
                role={visible && !isCenter ? "button" : undefined}
                tabIndex={visible && !isCenter ? 0 : -1}
                onClick={() => visible && !isCenter && setActive(i)}
                onKeyDown={(e) => { if (e.key === "Enter" && visible && !isCenter) setActive(i); }}
                initial={false}
                animate={{
                  x: (visible ? o : side) * gap,
                  z: isCenter ? 0 : visible ? -180 : -360,
                  rotateY: visible ? o * 38 : side * 38, // side cards turn out
                  scale: isCenter ? 1 : 0.88,
                  opacity: visible ? 1 : 0,
                  filter: isCenter ? "grayscale(0) brightness(1)" : "grayscale(1) brightness(0.5)",
                }}
                transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 140, damping: 20, mass: 0.9 }}
                style={{ pointerEvents: visible ? "auto" : "none" }}
              >
                <img src={l.img} alt={l.name} draggable={false} />
                <figcaption>
                  <strong>{l.name}</strong>
                  <span>{l.role}</span>
                </figcaption>
              </motion.figure>
            );
          })}
        </motion.div>
      </div>

      <div className="leaders__nav">
        <button className="lbtn" onClick={() => go(-1)} aria-label="Previous leader"><ArrowLeft size={18} /></button>
        <div className="ldots" aria-hidden="true">
          {leaders.map((l, i) => (
            <i key={l.id} className={i === active ? "is-on" : ""} />
          ))}
        </div>
        <button className="lbtn" onClick={() => go(1)} aria-label="Next leader"><ArrowRight size={18} /></button>
      </div>
    </section>
  );
}
