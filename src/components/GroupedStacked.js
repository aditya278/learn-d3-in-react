import { max, scaleBand, scaleLinear, select, stack, stackOrderNone } from 'd3';
import React, { useEffect, useRef } from 'react';

const GroupedStacked = ({data, keys, width, height, colors}) => {

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
        console.log(layers);

        const xScale = scaleBand()
            .domain(data.map(d => d.label))
            .rangeRound([0, width])
            .padding(0.5);
        
        const x1Scale = scaleBand()
            .domain(data.map(d => d.__type))
            .rangeRound([0, xScale.bandwidth()])
            .padding(0.12);

        const yScale = scaleLinear()
            .domain([0, 1300])
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
                    M${xScale(d.data.label) + 1.2 * x1Scale(d.data.__type)},${yScale(d[0])}
                    H${xScale(d.data.label) + 1.2 * x1Scale(d.data.__type) + x1Scale.bandwidth() + rx}
                    V${yScale(d[1])}
                    ${yScale(d[0]) === yScale(d[1]) ? '' : getArcVaalue(rx, ry, 0, 0, 0, -rx, -ry)}
                    H${xScale(d.data.label) + 1.2 * x1Scale(d.data.__type) + rx}
                    ${yScale(d[0]) === yScale(d[1]) ? '' : getArcVaalue(rx, ry, 0, 0, 0, -rx, ry)}Z
                `)
            // .join('rect')
            // .attr('x', d => xScale(d.data.label) + x1Scale(d.data.__type))
            // .attr('y', d => yScale(d[1]))
            // .attr('width', x1Scale.bandwidth())
            // .attr('height', d => yScale(d[0]) - yScale(d[1]));

    }, [data]);

    return (
        <svg ref={svgRef} width={width} height={height}>
            
        </svg >
    )
}

export default GroupedStacked;