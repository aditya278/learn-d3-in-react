import React from 'react';
import { arc } from 'd3';

const SmileyFace = ({width, height, radius}) => {

    const centerX = width/2;
    const centerY = height/2;
    const strokeWidth = 15;

    const eyeOffsetX = radius/2.5;
    const eyeOffsetY = radius/2.5;
    const eyeRadius = radius/6.5;

    const mouthWidth = radius/10;
    const mouthRadius = radius - 100;

    const mouthArc = arc()
        .innerRadius(mouthRadius)
        .outerRadius(mouthRadius + mouthWidth)
        .startAngle(Math.PI / 2)
        .endAngle(Math.PI * 3/2)

    return (
        <svg width={width} height={height}>
            <g transform={`translate(${centerX}, ${centerY})`}>
                <circle 
                    r={radius - strokeWidth}
                    fill="yellow"
                    stroke="black"
                    strokeWidth={strokeWidth}
                />
                <circle
                    cx={-eyeOffsetX}
                    cy={-eyeOffsetY}
                    r={eyeRadius}
                />
                <circle
                    cx={eyeOffsetX}
                    cy={-eyeOffsetY}
                    r={eyeRadius}
                />
                <path d={mouthArc()} />
            </g>
        </svg>
    )
}

export default SmileyFace;