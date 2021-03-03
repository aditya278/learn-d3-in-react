import { max, scaleBand, scaleLinear, select, stack, stackOrderNone } from 'd3';
import React, { useEffect, useRef } from 'react';

const VBarChartPath = ({data, keys, width, height, colors}) => {

    const svgRef = useRef();

    const rx = 5;
    const ry = 5;

    const getArcVaalue = (rx, ry, angle, largeArcFlag, sweepFlag, dx, dy) => {
        return `a${rx},${ry} ${angle} ${largeArcFlag} ${sweepFlag} ${dx},${dy}`;
    }

    useEffect(() => {
        const svg = select(svgRef.current);

        const stackGenerator = stack()
            .keys(keys)
            .order(stackOrderNone);

        const layers = stackGenerator(data);
        console.log(layers);

        const xScale = scaleBand()
            .domain(data.map(d => d.activity))
            .range([0, width])
            .padding(0.5);

        const yScale = scaleLinear()
            .domain([0, 300])
            .range([height, 0]).nice();

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
                    M${xScale(d.data.activity)},${yScale(d[0])}
                    H${xScale(d.data.activity) + xScale.bandwidth()}
                    V${yScale(d[1])}
                    ${yScale(d[0]) === yScale(d[1]) ? '' : getArcVaalue(rx, ry, 0, 0, 0, -rx, -ry)}
                    H${xScale(d.data.activity) + ry}
                    ${yScale(d[0]) === yScale(d[1]) ? '' : getArcVaalue(rx, ry, 0, 0, 0, -rx, ry)}Z
                `)
            // .join('rect')
            // .attr('x', d => xScale(d[0]))
            // .attr('y', d => yScale(d.data.activity))
            // .attr('width', d => xScale(d[1]) - xScale(d[0]))
            // .attr('height', yScale.bandwidth());

        console.log(g);

    }, [data]);

    return (
        <svg ref={svgRef} width={width} height={height}>
            
        </svg >
    )
}

export default VBarChartPath;