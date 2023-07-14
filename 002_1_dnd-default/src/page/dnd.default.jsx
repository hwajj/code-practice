import React, { useRef, useState } from "react";
import "@/scss/dnd.default.scss";
import { inrange } from "@/js/util.js";

const DndDefault = () => {
  const containerRef = useRef(null);
  const boxRef = useRef(null);

  const [{ x, y }, setPosition] = useState({
    x: 0,
    y: 0,
  });
  const dndHandler = (clickEvent) => {
    const container = containerRef.current.getBoundingClientRect();
    const box = boxRef.current.getBoundingClientRect();
    const boxMarginValue = parseInt(
      getComputedStyle(boxRef.current).getPropertyValue("margin"),
      10
    );
    const pointerMoveHandler = (moveEvent) => {
      console.log(`pointer move x:${moveEvent.clientX} y:${moveEvent.clientY}`);
      const deltaX = moveEvent.clientX - clickEvent.clientX;
      const deltaY = moveEvent.clientY - clickEvent.clientY;

      setPosition({
        x: inrange(
          x + deltaX,
          Math.floor(-container.width / 2 + box.width / 2 + boxMarginValue),
          Math.floor(container.width / 2 - box.width / 2 - boxMarginValue)
        ),
        // y: y + deltaY,
        y: inrange(
          y + deltaY,
          Math.floor(-container.height / 2 + box.height / 2 + boxMarginValue),
          Math.floor(container.height / 2 - box.height / 2 - boxMarginValue)
        ),
      });
    };

    // 3️⃣
    const pointerUpHandler = (e) => {
      console.warn(`>>>>pointerup x:${e.clientX} y:${e.clientY}`);
      document.removeEventListener("pointermove", pointerMoveHandler);
    };

    // 1️⃣클릭이벤트 발생 시
    document.addEventListener("pointermove", pointerMoveHandler);
    document.addEventListener("pointerup", pointerUpHandler, { once: true });
    document.addEventListener("pointerleave", pointerUpHandler, { once: true });
  };
  return (
    <div className="container" ref={containerRef}>
      <div
        style={{ transform: `translateX(${x}px) translateY(${y}px)` }}
        onPointerDown={dndHandler}
        className={"box"}
        ref={boxRef}
      ></div>
    </div>
  );
};

export default DndDefault;
