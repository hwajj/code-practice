import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

function inrange(v, min, max) {
  if (v < min) return min;
  if (v > max) return max;
  return v;
}
const Container = styled.div`
  border: 2px solid blue;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div`
  margin: ${(props) => props.margin};
  width: ${(props) => props.width};
  position: absolute;
  height: ${(props) => props.height};
  background-color: whitesmoke;
  transform: translateX(var(--x)) translateY(var(--y));
`;

// Cre
const DndComponent = ({
  boxWidth = "200px",
  boxHeight = "200px",
  boxMargin = "10px",
}) => {
  const containerRef = useRef(null);
  const boxRef = useRef(null);
  const [{ x, y }, setPosition] = useState({
    x: 0,
    y: 0,
  });
  useEffect(() => {
    boxRef.current.style.setProperty("--x", x + "px");
    boxRef.current.style.setProperty("--y", y + "px");
  }, [x, y]);

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
    <Container ref={containerRef}>
      <Box
        onPointerDown={dndHandler}
        className={"box"}
        ref={boxRef}
        width={boxWidth}
        height={boxHeight}
        margin={boxMargin}
      />
    </Container>
  );
};

export default DndComponent;
