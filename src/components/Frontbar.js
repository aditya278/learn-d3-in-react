import { arc, interpolate, select, transition } from 'd3';
import React, { useEffect, useRef } from 'react'

const Frontbar = ({width, height, value, tau, innerRadius, outerRadius, edgeRadius}) => {
    const pathRef = useRef();
    const initialValue = 0;

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

    }, [value, tau, innerRadius, outerRadius, edgeRadius]);

    return (
        <g className="front-bar-group" transform={`translate(${(width/2)}, ${(height/2)})`} fill={'blue'}>
            <path ref={pathRef} />
        </g>
    )
}

export default Frontbar;