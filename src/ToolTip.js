import { select } from "d3-selection";
import React, { useEffect, useRef } from "react";

const foreignObjectStyle = {
    background: 'yellow',
    fontSize: '9px',
    textAlign: 'left',
    overflow: 'visible',
    zIndex: 999
}

const ToolTip = ({ x, y, ToolTipComp }) => {
    const foreignObjectRef = useRef();

    // useEffect(() => {
    //     select(foreignObjectRef.current).raise();
    // }, []);

  return (
    <foreignObject style={foreignObjectStyle} ref={foreignObjectRef} x={x + 10} y={y + 10} width={100} height={100}>
        <ToolTipComp />
    </foreignObject>
  );
};

export default ToolTip;