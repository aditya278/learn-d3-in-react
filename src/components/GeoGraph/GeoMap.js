import React, { useState, useEffect, useRef } from "react";
import { geoPath, geoAlbersUsa } from "d3-geo";
import { feature, mesh } from 'topojson-client';
import { select, selectAll } from "d3-selection";
import { scaleLinear } from "d3-scale";
import { max } from "d3-array";

const GeoMap = ({ stateJson, width, height, data, field }) => {
    const gRef = useRef();
    const pathRef = useRef();

    var projection = geoAlbersUsa()
        .scale((width+height)/1.5)
        .translate([width/2, height/2]);  // scale things down so see entire US

    const path = geoPath().projection(projection);
    const states = new Map(stateJson.objects.states.geometries.map(d => [d.id, d.properties]));

    const maxDomain = max(data.map(e => e[field]));
    const colors = scaleLinear().domain([0, maxDomain]).range(['#7ab8ff', '#1f3349']);

    const findColor = (d) => {
        const state = d.properties.name;
        const stateData = data.filter(e => e.label === state);
        // if(stateData.length)
        //     return colors(stateData[0][field]);
        // return colors(0);
        if(stateData.length) {
            if(stateData[0][field])
                return colors(stateData[0][field]);
        }
        return '#C4C4C4';
    }

    useEffect(() => {
        const featureData = feature(stateJson, stateJson.objects.states).features;
        const g = select(gRef.current)
            .selectAll('path')
            .data(featureData)
            .join('path')
                .attr('fill', d => findColor(d))
                .attr('class', 'state')
                .style('opacity', 1)
                .attr('d', path)
                .on('mouseover', mouseOverHandler)
                .on('mouseleave', mouseLeaveHandler)
            .append('title')
                .text(d => `${d.properties.name}, ${states.get(d.id.slice(0, 2)).name}`);

        const topoMesh = mesh(stateJson, stateJson.objects.states, (a, b) => a !== b);

        const svgPath = select(pathRef.current)
            .datum(topoMesh)
            .attr('fill', 'none')
            .attr('stroke', 'white')
            .attr('stroke-width', '2')
            .attr('stroke-linejoin', 'round')
            .attr('d', path);

    }, [data, field]);
    
    const mouseOverHandler = (d) => {
        selectAll(".state")
            .transition()
            .duration(100)
            .style("opacity", .4)
        select(d.target)
            .transition()
            .duration(100)
            .style("opacity", 1);
    }

    const mouseLeaveHandler = (d) => {
        selectAll(".state")
            .transition()
            .duration(100)
            .style("opacity", 1)
            .attr('stroke-width', '3')
            .style("stroke", 'white')
        select(d.target)
            .transition()
            .duration(100)
            .style("stroke", "transparent")
    }

    return (
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
            <g className="states" ref={gRef} />
            {/* onMouseOver={d => mouseOverHandler(d)} onMouseLeave={d => mouseLeaveHandler(d)} /> */}
            <path ref={pathRef} />
        </svg>
    )
}

export default GeoMap;