import { select } from 'd3-selection';
import { curveLinearClosed, line } from 'd3-shape';
import React, { useEffect, useRef } from 'react';

const Star = ({size, x, y, value, borderWidth, borderColor, starColor, backgroundColor, index}) => {
    const pathRef = useRef();
    const borderPathRef = useRef();
    const clipRectRef = useRef();
    const clipPathRef = useRef();

    const l = line().x( d => d.x ).y(d => d.y).curve(curveLinearClosed);
    const rad = (deg) => deg * Math.PI/180;
    const cos = (deg) => Math.cos(rad(deg));
    const sin = (deg) => Math.sin(rad(deg));
    const tan = (deg) => Math.tan(rad(deg));

    useEffect(() => {

        const n = size;
        const m = n/2;
        const h = m * tan(36);
        const k = h / sin(72);

        const coordinates = [
            {x: x, y: y},
            {x: x + k, y: y},
            {x: x + m, y: y - h},
            {x: x + n - k, y: y},
            {x: x + n, y: y},
            {x: x + n - k * cos(36), y: y + k * sin(36)},
            {x: x + n * cos(36), y: y + n * sin(36)},
            {x: x + m, y: y + h},
            {x: x + n - n * cos(36),y: y + n * sin(36)},
            {x: x + k * cos(36), y: y + k * sin(36)},
        ];

        const path = select(pathRef.current);
        path.attr('d', l(coordinates))
            .style('stroke-width', 0)
            .style('fill', starColor);

        const clipPath = select(clipPathRef.current);
        clipPath.attr('id', `clipStar${index}`)
            .append('path')
                .attr('d', l(coordinates));

        const clipRect = select(clipRectRef.current);
        clipRect.attr('x', x + (size * value))
            .attr('y', y - h)
            .attr('width', size - size * value)
            .attr('height', size)
            .attr('clip-path', `url(#clipStar${index})`)
            .style('fill', backgroundColor);

        const borderPath = select(borderPathRef.current);
        borderPath.attr('d', l(coordinates))
            .style('stroke-width', borderWidth)
            .style('fill', 'none')
            .style('stroke', borderColor);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [size, x, y, value, borderWidth, borderColor, starColor, backgroundColor]);

    return (
        <g>
            <path ref={pathRef} />
            <clipPath ref={clipPathRef} />
            <rect ref={clipRectRef} />
            <path ref={borderPathRef} />
        </g>
    )
}

export default Star;