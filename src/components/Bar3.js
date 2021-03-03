import React, { useEffect, useRef } from 'react';
import { scaleBand, scaleLinear, select, scaleOrdinal } from 'd3';

//const color = scaleOrdinal().range(['#A293CC','#CBCBCB'])

const Bar3 = ({width, height, data}) => {
    const svgRef = useRef();
    const margin = { top: 0, right: 10, bottom: 0, left: 10 }
    const svgWidth = width - margin.left - margin.right;
    const svgHeight = height - margin.top - margin.bottom;

    useEffect(() => {
        const svg = select(svgRef.current)
            .attr('width', width)
            .attr('height', height);

        select('#group1').remove();
        
        const g = svg.append('g')
            .attr('id', 'group1')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);
        
        const xScale = scaleBand()
            .rangeRound([0, svgWidth])
            .domain(data.map((value, index) => index))
            .padding(0.1);

        const yScale = scaleLinear()
            .range([svgHeight, 0])
            .domain([0, data.reduce((total, num) => total + num)])
            .nice();
        const rx = 5;
        const ry = 5;

        const color = scaleOrdinal().range(['#A293CC','#CBCBCB']);

        g.selectAll('bar')
            .data(data)
            .enter().append('path')
                .style('fill', (d, i) => color(i))
                .transition()
                .attr('d', (value, index) => `
                    M${xScale(index)},${yScale(value) + ry}
                    a${rx},${ry} 0 0 1 ${rx},${-ry}
                    h${xScale.bandwidth() - 2 * rx}
                    a${rx},${ry} 0 0 1 ${rx},${ry}
                    v${svgHeight - yScale(value) - ry}
                    h${-(xScale.bandwidth())}Z
                `)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return (
        <svg className="container" ref={svgRef}>
        </svg>
    )
}

export default Bar3;