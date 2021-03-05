import { scaleBand, scaleLinear, select, stack, stackOrderNone } from 'd3';
import React, { useEffect, useRef } from 'react';

const HGroupedStacked = ({data, keys, width, height, colors}) => {

    const svgRef = useRef();

    const rx = 3;
    const ry = 3;

    const getArcVaalue = (rx, ry, angle, largeArcFlag, sweepFlag, dx, dy) => {
        return `a${rx},${ry} ${angle} ${largeArcFlag} ${sweepFlag} ${dx},${dy}`;
    }

    useEffect(() => {
        const svg = select(svgRef.current);

        const stackGenerator = stack()
            .keys(keys)
            .order(stackOrderNone);

        const layers = stackGenerator(data);

        const yScale = scaleBand()
            .domain(data.map(d => d.label))
            .range([height, 0])
            .padding(0.5);

        const y1Scale = scaleBand()
            .domain(data.map(d => d.__type))
            .range([yScale.bandwidth(), 0])
            .padding(0.12);

        const xScale = scaleLinear()
            .domain([0, 1300])
            .range([0, width]).nice();

        const g = svg.append('g')
            .attr('class', 'layer')
            .selectAll('group')
            .data(layers)
            .join('g')
            .classed('group', true)
            .style('fill', (d) => colors[d.key])
            .selectAll('rect')
            .data(d => d)
            .enter().append('path')
                .attr('d', d => `
                    M${xScale(d[0])},${yScale(d.data.label) + 1.2 * y1Scale(d.data.__type)}
                    V${yScale(d.data.label) + 1.2 * y1Scale(d.data.__type) - y1Scale.bandwidth()}
                    H${xScale(d[1])}
                    ${xScale(d[0]) === xScale(d[1]) ? '' : getArcVaalue(rx,ry, 0, 0, 1, rx, ry)}
                    V${yScale(d.data.label) + 1.2 * y1Scale(d.data.__type) - ry}
                    ${xScale(d[0]) === xScale(d[1]) ? '' : getArcVaalue(rx, ry, 0,0,1, -rx, ry)}Z
                `)
            // .join('rect')
            // .attr('x', d => xScale(d[0]))
            // .attr('y', d => yScale(d.data.label))
            // .attr('width', d => xScale(d[1]) - xScale(d[0]))
            // .attr('height', yScale.bandwidth());

    }, [data]);

    return (
        <svg ref={svgRef} width={width} height={height}>
            
        </svg >
    )
}

export default HGroupedStacked;