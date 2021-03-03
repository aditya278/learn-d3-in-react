import { select, pie, arc } from 'd3';
import React, { useEffect, useRef, useState } from 'react';

import Frontbar from './Frontbar';

const CircularProgressBar = ({width, height, data}) => {
    const [value, setValue] = useState(40);

    const tau = 2 * Math.PI;
    const min = Math.min(width, height);
    const arcWidth = 8;
    const outerRadius = min/2;
    const innerRadius = min/2 - arcWidth;
    const edgeRadius = 5;

    const randomizeData = (e) => {
        e.preventDefault();
        setValue(Math.floor(Math.random() * 100 + 1));
    }

    return (
        <>
            <svg width={width} height={height}>
                <Frontbar
                    value={value}
                    tau={tau}
                    width={width}
                    height={height}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    edgeRadius={edgeRadius}
                />
            </svg>
            <button onClick={randomizeData}>Randomize data</button>
        </>
    )
}

export default CircularProgressBar;