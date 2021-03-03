import React, { useEffect, useRef } from 'react';
import { scaleBand, scaleLinear, select, scaleOrdinal } from 'd3';

//const color = scaleOrdinal().range(['#A293CC','#CBCBCB'])

const Bar2 = ({width, height, data}) => {

    const svgRef = useRef();

    useEffect(() => {

        const svg = select(svgRef.current);
        const xScale = scaleBand()
            .range([0, width])
            .domain(data.map((value, index) => index))
        
        const yScale = scaleLinear()
            .domain([0, Math.max(...data)])
            .range([height, 0]);

        const color = scaleOrdinal().range(['#A293CC','#CBCBCB']);
        const id = scaleOrdinal().range(['bar1', 'bar2']);

        svg
            .selectAll(".bar")
            .data(data)
            .join("rect")
            .attr("class", "bar")
            .attr("id", (value, index) => id(index))
            .style("transform", "scale(1, -1")
            .attr("x", (value, index) => {
                return index!==0 ? xScale(index) - width/4 : xScale(index);
            })
            .attr("y", -height)
            .attr("width", xScale.bandwidth() + width/4)
            .transition()
            .attr("fill", (d, index) => color(index))
            .attr("height", value => height - yScale(value))
            
        select('#bar1').raise();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return (
        <>
            <svg width={width} height={height} ref={svgRef} >
            </svg>
        </>
    )
}

export default Bar2;