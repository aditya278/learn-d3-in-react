import React, { useEffect, useRef } from 'react';
import { scaleBand, scaleLinear, select, scaleOrdinal } from 'd3';
import d3Tip from 'd3-tip';

//const color = scaleOrdinal().range(['#A293CC','#CBCBCB'])

const Bar5 = ({width, height, data}) => {
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
        
        const xScale = scaleLinear()
            .range([svgHeight, 0])
            .domain([0, data.reduce((total, num) => total + num)])
            .nice();

        const yScale = scaleBand()
            .rangeRound([margin.left, svgWidth * 3.8/4])
            .domain(data.map((value, index) => index))
            .padding(0.1);

        const rx = 2;
        const ry = 2;

        const color = scaleOrdinal().range(['#A293CC','#CBCBCB']);
        const id = scaleOrdinal().range(['bar1', 'bar2']);

        const t = d3Tip()
            .attr('class', 'toolTip')
            .html(d => '<div>hello</div>');

        g.selectAll('bar')
            .data(data)
            .enter().append('path')
                .style('fill', (d, i) => color(i))
                .attr("id", (value, index) => id(index))
                .transition()
                .attr('d', (value, index) => `
                    M${xScale(value) - ry},${yScale(index)}
                    a${rx},${ry} 0 0 0 ${-rx},${ry}
                    v${yScale.bandwidth() - 2 * ry}
                    a${rx},${ry} 0 0 0 ${rx},${ry}
                    h${svgWidth}
                    v${-(yScale.bandwidth())}Z
                `)
        g.on('mouseover', (data, index, element) => t.show(data, index))
        .on('mouseleave', t.hide);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return (
        <svg className="container" ref={svgRef}>
        </svg>
    )
}

export default Bar5;