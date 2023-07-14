import React from "react";
import DndComponent from "@/js/dndComponent";

const DndComponentTest = () => {
  return (
    <div style={{ width: "800px", height: "1000px" }}>
      <DndComponent boxWidth={"50px"} boxHeight={"50px"} boxMargin={"14px"} />
    </div>
  );
};

export default DndComponentTest;
