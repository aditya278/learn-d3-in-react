import React, { useEffect, useRef } from 'react';
import { scaleBand, scaleLinear, select, scaleOrdinal } from 'd3';

//const color = scaleOrdinal().range(['#A293CC','#CBCBCB'])

const Bar4 = ({width, height, data}) => {
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
            .rangeRound([margin.left, svgWidth * 3.8/4])
            .domain(data.map((value, index) => index))
            .padding(0.1);

        const yScale = scaleLinear()
            .range([svgHeight, 0])
            .domain([0, data.reduce((total, num) => total + num)])
            .nice();
        const rx = 2;
        const ry = 2;

        const color = scaleOrdinal().range(['#A293CC','#CBCBCB']);
        const id = scaleOrdinal().range(['bar1', 'bar2']);

        g.selectAll('bar')
            .data(data)
            .enter().append('path')
                .style('fill', (d, i) => color(i))
                .attr("id", (value, index) => id(index))
                .transition()
                .attr('d', (value, index) => `
                    M${index!==0 ? xScale(index) - xScale(index)/2 : xScale(index)},${yScale(value) + ry}
                    a${rx},${ry} 0 0 1 ${rx},${-ry}
                    h${xScale.bandwidth() - 2 * rx}
                    a${rx},${ry} 0 0 1 ${rx},${ry}
                    v${svgHeight - yScale(value) - ry}
                    h${-(xScale.bandwidth())}Z
                `)
        
        select(`#${id(0)}`).raise();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return (
        <svg className="container" ref={svgRef}>
        </svg>
    )
}

export default Bar4;