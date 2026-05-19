import { useEffect, useRef, useState } from "react";
import "./CustomCursor.css";

function CustomCursor() {
  const [position, setPosition] = useState({ x: -300, y: -300 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const rafRef = useRef(null);

  useEffect(() => {
    let current = { x: -300, y: -300 };
    let target  = { x: -300, y: -300 };
    const lerp  = (a, b, t) => a + (b - a) * t;

    const animate = () => {
      current.x = lerp(current.x, target.x, 0.18);
      current.y = lerp(current.y, target.y, 0.18);
      setPosition({ x: Math.round(current.x), y: Math.round(current.y) });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    const onMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    const isClickable = (el) => {
      if (!el || el === document.body || el === document.documentElement) return false;
      const tag = el.tagName;
      if (["BUTTON","A","INPUT","SELECT","TEXTAREA","LABEL"].includes(tag)) return true;
      if (el.getAttribute("role") === "button") return true;
      if (el.classList.contains("cursor-pointer")) return true;
      try {
        if (window.getComputedStyle(el).cursor === "pointer") return true;
      } catch (_) {}
      return isClickable(el.parentElement);
    };

    const onOver  = (e) => setIsPointer(isClickable(e.target));
    const onLeave = () => setIsHidden(true);
    const onEnter = () => setIsHidden(false);
    const onDown  = () => setIsClicking(true);
    const onUp    = () => setIsClicking(false);

    window.addEventListener("mousemove",    onMove,  { passive: true });
    document.addEventListener("mouseover",  onOver,  { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mousedown",  onDown);
    document.addEventListener("mouseup",    onUp);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove",    onMove);
      document.removeEventListener("mouseover",  onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mousedown",  onDown);
      document.removeEventListener("mouseup",    onUp);
    };
  }, []);

  // The cursor element MUST NOT intercept any mouse events.
  // We use pointer-events: none on both the wrapper and image.
  // The element is purely visual — all actual clicking goes through to the page.
  return (
    <div
      className={`a3-cursor${isPointer ? " is-pointer" : ""}${isHidden ? " is-hidden" : ""}${isClicking ? " is-clicking" : ""}`}
      style={{
        left: `${position.x}px`,
        top:  `${position.y}px`,
      }}
      aria-hidden="true"
    >
      <img
        src="/cursor-character.png"
        alt=""
        className="a3-cursor-img"
        draggable={false}
      />
    </div>
  );
}

export default CustomCursor;
