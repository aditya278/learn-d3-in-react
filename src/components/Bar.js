import React, { useEffect, useRef } from 'react';
import { axisBottom, axisRight, scaleBand, scaleLinear, select, scaleOrdinal } from 'd3';

//const color = scaleOrdinal().range(['#A293CC','#CBCBCB'])

const Bar = ({width, height, data}) => {

    const svgRef = useRef();
    [width, height] = [height, width];
    useEffect(() => {

        const svg = select(svgRef.current);
        const xScale = scaleBand()
            .rangeRound([0, width])
            .domain(data.map((value, index) => index))
            .padding(0.1);
        console.log(xScale.bandwidth());
        const yScale = scaleLinear()
            .domain([0, data.reduce((total, num) => total + num)])
            .range([height, 0]);

        const color = scaleOrdinal().range(['#A293CC','#CBCBCB']);
        const clrs = ['#A293CC','#CBCBCB'];

        const rx = 10;
        const ry = 10;

        svg
            .selectAll(".bar")
            .data(data)
            .join("rect")
            .attr("class", "bar")
            .style("transform", "scale(1, -1")
            .attr("x", (value, index) => xScale(index))
            .attr("y", -height)
            .attr("width", xScale.bandwidth())
            .transition()
            .attr("fill", (d, i) => clrs[i])
            .attr("height", value => height - yScale(value))
            .attr("ry", ry)
            .attr("rx", rx)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return (
        <>
            <svg width={width} height={height} ref={svgRef} >
            </svg>
        </>
    )
}

export default Bar;