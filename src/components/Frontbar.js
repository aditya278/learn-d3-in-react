import { arc, format, interpolate, interpolateNumber, select, transition, pointer, gray } from 'd3';
import React, { useState, useEffect, useRef } from 'react'

import ToolTip from "../ToolTip";

const formatNumber = format(",d");

const ToolTipComp = () => {
  return (
    <>
      <div style={{backgroundColor: 'gray'}}>
        <h1>Hello</h1>
        <h5>This is TT</h5>
      </div>
    </>
  );
};

const Frontbar = ({width, height, color, value, tau, arcWidth, outerRadius, edgeRadius}) => {

  const [showToolTip, setShowToolTip] = useState(false);
  const [xCoord, setXCoord] = useState(0);
  const [yCoord, setYCoord] = useState(0);

    const pathRef = useRef();
    const textRef = useRef();
    const initialValue = 0;
    const innerRadius = outerRadius - arcWidth;

    const arcGenerator = arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
        .startAngle(0)
        .cornerRadius(edgeRadius);

    const arcTween = (newAngle) => (d) => {
        const customInterpolate = interpolate(d.endAngle, newAngle);
        return (t) => {
            d.endAngle = customInterpolate(t);
            return arcGenerator(d);
        };
    };

    useEffect(() => {
        const g = select(pathRef.current)
            .datum({ endAngle : (initialValue / 100) * tau});

        const t = transition().duration(800);

        g.transition(t)
            .duration(750)
            .attrTween('d', arcTween((value * tau) / 100, arcGenerator));

        g.on('mouseover', (event, d) => {
                g.raise();
                setXCoord(pointer(event)[0]);
                setYCoord(pointer(event)[1]);
                setShowToolTip(true)
            })
            .on('mouseleave', d => setShowToolTip(false));

        const textValue = select(textRef.current);
        textValue
            .transition(t)
            .tween("text", () => {
                const i = interpolateNumber(textValue.text().replace(/,/g, ""), value);
                return (t) => {
                    textValue.text(formatNumber(i(t)) + '%');
                }
            });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, tau, innerRadius, outerRadius, edgeRadius]);

    const textStyle = {
        fontSize: `${arcWidth * 1.05}px`,
        fontWeight: 'bold'
    }

    return (
        <g className="front-bar-group" transform={`translate(${(width/2)}, ${(height/2)})`} fill={color}>
            <path ref={pathRef} />
            <text transform={`translate(-34, -${outerRadius- arcWidth})`} ref={textRef} style={textStyle} />
            {showToolTip && (
            <ToolTip x={xCoord} y={yCoord} ToolTipComp={ToolTipComp} />
            )}
        </g>
    )
}

export default Frontbar;