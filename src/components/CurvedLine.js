import React, { useState, useEffect, useRef } from 'react';

import { select, line, curveCardinal } from 'd3';

const CurvedLine = () => {

    const [data, setData] = useState([25, 30, 45, 60, 20]);
    const svgRef = useRef();

    useEffect(() => {
        const svg = select(svgRef.current);
        const myLine = line()
            .x((value, i) => i * 50)
            .y((value) => 300-value)
            .curve(curveCardinal);

        svg
            .selectAll("path")
            .data([data])
            .join("path")
            .attr("d", value=> myLine(value))
            .attr("fill", "none")
            .attr("stroke", "blue")
    }, [data]);

    return (
        <>
            <svg ref={svgRef} width={300} height={300}></svg>
            <button onClick={() => setData(data.map(value => value + 5))}>Update Data</button>
        </>
    )
}

export default CurvedLine;