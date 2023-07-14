import { useState } from "react";
import "./App.css";

function App() {
  const [{ x, y }, setPosition] = useState({
    x: 0,
    y: 0,
  });
  const dndHandler = (clickEvent) => {
    const pointerMoveHandler = (moveEvent) => {
      console.log(`pointer move x:${moveEvent.clientX} y:${moveEvent.clientY}`);
      const deltaX = moveEvent.clientX - clickEvent.clientX;
      const deltaY = moveEvent.clientY - clickEvent.clientY;

      setPosition({
        x: x + deltaX,
        y: y + deltaY,
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
    <>
      <div
        style={{ transform: `translateX(${x}px) translateY(${y}px)` }}
        onPointerDown={dndHandler}
        className={"box"}
      ></div>
    </>
  );
}

export default App;
