import React, { useState, useEffect, useRef } from 'react';
import { select } from 'd3';

function Circles() {

  const [data, setData] = useState([10, 20, 30, 40, 50]);
  const svgRef = useRef();

  useEffect(() => {
    const svg = select(svgRef.current);
    svg
      .selectAll("circle")    
      .data(data)
      .join("circle")
      .attr("r", value=>value)
      .attr("cx", value => value * 2)
      .attr("cy", value => value * 1)
      .attr("stroke", "red");
  }, [data]);

  return (
    <div className="App">
      <svg ref={svgRef} width={500} height={500}></svg>
      <button onClick={() => setData(data.map(x => x * 2))}>Increase Size</button>
      <button onClick={() => setData(data.map(x => x / 2))}>Decrease Size</button>
    </div>
  );
}

export default Circles;