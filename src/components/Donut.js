import { arc, pie, scaleOrdinal, schemeCategory10, format, select, interpolate } from 'd3';
import React, { useRef, useEffect } from 'react';


const Donut = ({width, height, innerRadius, outerRadius, data}) => {

    const gRef = useRef();
    const cache = useRef(data);

    const createDonut = pie()
        .value(d => d.value)
        .sort(null);

    const createArc = arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);

    const colors = scaleOrdinal(schemeCategory10);
    const d3Format = format(".2f");

    useEffect(() => {
        const currentData = createDonut(data);
        const previousData = createDonut(cache.current);
        const group = select(gRef.current);
        const groupWithData = group.selectAll("g.arc").data(currentData);

        groupWithData.exit().remove();

        const groupWithUpdate = groupWithData
            .enter()
            .append("g")
            .attr("class", "arc");

        const path = groupWithUpdate
            .append("path")
            .merge(groupWithData.select("path.arc"));

        const arcTween = (d, i) => {
            const interpolator = interpolate(previousData[i], d);
            return t => createArc(interpolator(t));
        };

        path
            .attr("class", "arc")
            .arrt("fill", (d, i) => colors(i))
            .transition()
            .attrTween("d", )

    }, [data]);

    return (
        <svg width={width} height={height}>
            <g ref={gRef} transform={`translate(${outerRadius} ${outerRadius})`} />
        </svg>
    )
}

export default Donut;