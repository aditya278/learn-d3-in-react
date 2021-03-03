import { max, scaleBand, scaleLinear, select, stack, stackOffsetNone, stackOrderAscending } from 'd3';
import React, { useEffect, useRef } from 'react';

const StackedBarChartHorizontal = ({data, keys, width, height, colors}) => {
    const svgRef = useRef();

    useEffect(() => {
        const svg = select(svgRef.current);

        const stackGenerator = stack()
            .keys(keys)
            .order(stackOrderAscending);
            
        const layers = stackGenerator(data);
        console.log(layers)

        const yScale = scaleBand()
            .domain(data.map(d => d.activity))
            .range([height, 0])
            .padding(0.35);

        const xScale = scaleLinear()
            .domain([0, 300])
            .range([0, width]).nice();

        const rx = 15;
        const ry = 15;

        const gWithLayers = svg.selectAll('.layer')
            .data(layers)
            .join('g')
            .attr('class', 'layer')
            .attr('fill', layer => colors[layer.key])

        // const clips = gWithLayers
        //     .append('clipPath')
        //     .attr('id', layer => `region${layer.key}`)
        //     .selectAll('rect')
        //     .data(layer => layer)
        //     .join('rect')
        //     .attr('x', sequence => -xScale(sequence[0]))
        //     .attr('height', yScale.bandwidth())
        //     .attr('y', sequence => yScale(sequence.data.activity))
        //     .attr('width', sequence => {
        //         console.log(sequence) 
        //         return xScale(sequence[1])
        //     })
        //     .attr('rx', rx)
        //     .attr('ry', ry);

        const rects = gWithLayers
            .selectAll(`.rectBars`)
            .data(layer => layer)
            .join('rect')
            .attr('clip-path', `url(#regionselected)`)
            .attr('x', sequence => xScale(sequence[0]))
            .attr('height', yScale.bandwidth())
            .attr('y', sequence => yScale(sequence.data.activity))
            .attr('width', sequence => xScale(sequence[1]) - xScale(sequence[0]))

    }, [data, colors, keys, height, width]);

    return (
        <svg ref={svgRef} width={width} height={height}>
            
        </svg>
    )
}

export default StackedBarChartHorizontal;