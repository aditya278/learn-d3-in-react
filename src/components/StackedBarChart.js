import { max, scaleBand, scaleLinear, select, stack, stackOrderAscending } from 'd3';
import React, { useEffect, useRef } from 'react';

const StackedBarChart = ({data, keys, width, height, colors}) => {
    const svgRef = useRef();

    useEffect(() => {
        const svg = select(svgRef.current);

        const stackGenerator = stack()
            .keys(keys)
            .order(stackOrderAscending);
            
        const layers = stackGenerator(data);
        const extent = [
            0,
            max(layers, layer => max(layer, sequence => sequence[1]))
        ];

        const xScale = scaleBand()
            .domain(data.map(d => d.activity))
            .range([0, width])
            .padding(0.25);

        const yScale = scaleLinear()
            .domain([0, 300])
            .range([height, 0]);

        const rx = 15;
        const ry = 15;

        const gWithLayers = svg.selectAll('.layer')
            .data(layers)
            .join('g')
            .attr('class', 'layer')
            .attr('fill', layer => colors[layer.key])

        const clips = gWithLayers
            .append('clipPath')
            .attr('id', layer => `region${layer.key}`)
            .selectAll('rect')
            .data(layer => layer)
            .join('rect')
            .attr('x', sequence => xScale(sequence.data.activity))
            .attr('width', xScale.bandwidth())
            .attr('y', sequence => yScale(sequence[1]))
            .attr('height', sequence => yScale(sequence[0]) + yScale(sequence[1]))
            .attr('rx', rx)
            .attr('ry', ry);

        const rects = gWithLayers
            .selectAll('.rectBars')
            .data(layer => layer)
            .join('rect')
            .attr('clip-path', `url(#regionselected)`)
            .attr('x', sequence => xScale(sequence.data.activity))
            .attr('width', xScale.bandwidth())
            .attr('y', sequence => yScale(sequence[1]))
            .attr('height', sequence => yScale(sequence[0]) - yScale(sequence[1]))

    }, [data, colors, keys, height, width]);

    return (
        <svg ref={svgRef} width={width} height={height}>
            
        </svg>
    )
}

export default StackedBarChart;