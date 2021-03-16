import React, { useState } from "react";

import Frontbar from "./Frontbar";

import ToolTip from '../ToolTip';

const ToolTipComp = () => {
    return (
        <>
            <div>
                <h1>Hello</h1>
                <h5>This is TT</h5>
            </div>
        </>
    )
}

const CircularProgressBar = ({ width, height, data }) => {

    const [toolTip, setToolTip ] = useState();
    const [xCoord, setXCoord] = useState(0);
    const [yCoord, setYCoord] = useState(0);

  const tau = 2 * Math.PI;
  const min = Math.min(width, height);
  const arcWidth = 14;
  const outerRadius = min / 2;
  const edgeRadius = 10;

  const values = [];
  for (const [key, value] of Object.entries(data)) {
    if (key !== "label") values.push(value);
  }

  const colors = ["#666DB5", "#B08DE2", "#ccaaff", "#d8bffc"];

  return (
    <svg width={width} height={height} overflow="visible">
      {values.length > 0 &&
        values.map((value, index) => (
          <Frontbar
            value={value}
            tau={tau}
            width={width}
            height={height}
            color={colors[index]}
            arcWidth={arcWidth}
            outerRadius={outerRadius - index * 1.2 * arcWidth}
            edgeRadius={edgeRadius}
            setToolTip={setToolTip}
            setXCoord={setXCoord}
            setYCoord={setYCoord}
          />
        ))}
        {
            toolTip && (
                <ToolTip x={xCoord} y={yCoord} ToolTipComp={ToolTipComp} />
            )
        }
    </svg>
  );
};

export default CircularProgressBar;
