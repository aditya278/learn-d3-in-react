import React from "react";

const ToolTip = ({ x, y, width, height, ToolTipComp }) => {

  return (
    <foreignObject x={x + 10} y={y + 10} width={100} height={100}>
        <ToolTipComp />
    </foreignObject>
  );
};

export default ToolTip;