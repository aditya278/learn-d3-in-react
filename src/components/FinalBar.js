import {
  scaleBand,
  scaleLinear,
  scaleOrdinal,
  select,
  stack,
  stackOrderNone,
} from "d3";
import React, { useEffect, useRef } from "react";

// const data = [
//   { label: 0, value: 10 },
//   { label: 1, value: 20 },
//   { label: 2, value: 30 },
//   { label: 3, value: 40 },
//   { label: 4, value: 50 },
//   { label: 5, value: 60 },
//   { label: 6, value: 70 },
//   { label: 7, value: 80 },
//   { label: 8, value: 90 },
//   { label: 9, value: 100 },
// ];

const width = 280;
const height = 70;
const rx = 6;
const ry = 6;
const padding = 0.15;

const BarChart = ({data, color}) => {
  const svgRef = useRef(null);
  const gRef = useRef(null);

  const margin = { top: 0, right: 0, bottom: 0, left: 0 };
  const graphWidth = width - margin.left - margin.right;
  const graphHeight = height - margin.top - margin.bottom;

  const outputDomain = [0, 110];
  const variant = "default";
  const viewType = "vertical";
  const colors = scaleOrdinal(color);
  const ids = scaleOrdinal(["bar1", "bar2"]);

  let isGrouping = false;

  let allKeys = [];

  data.forEach((d, i) => {
    let keys = Object.keys(d);

    if (keys.includes("__type")) isGrouping = true;

    keys = keys.filter((item) => {
      return item !== "label" && item.indexOf("__") !== 0;
    });

    allKeys.push(...keys);
  });

  allKeys = [...Array.from(new Set(allKeys))];

  const getArcValue = (rx, ry, angle, largeArcFlag, sweepFlag, dx, dy) =>
    `a${rx},${ry} ${angle} ${largeArcFlag} ${sweepFlag} ${dx},${dy}`;

  const moveTo = (x, y) => `M${x},${y}`;
  const horizontalLineTo = (x) => `H${x}`;
  const verticalLineTo = (y) => `V${y}`;

  let xScale;
  let x1Scale;
  let yScale;
  let y1Scale;

  if (viewType === "vertical") {
    xScale = scaleBand()
      .domain(data.map((d) => d.label))
      .range([margin.left, graphWidth])
      .padding(padding);

    x1Scale = scaleBand()
      .domain(data.map((d) => d.__type))
      .rangeRound([margin.left, xScale.bandwidth()])
      .padding(padding / 4);

    yScale = scaleLinear()
      .domain(outputDomain)
      .range([height, margin.top])
      .nice();
  } else {
    yScale = scaleBand()
      .domain(data.map((d) => d.label))
      .range([graphHeight, margin.top])
      .padding(padding);

    y1Scale = scaleBand()
      .domain(data.map((d) => d.__type))
      .rangeRound([yScale.bandwidth(), margin.top])
      .padding(padding / 4);

    xScale = scaleLinear()
      .domain(outputDomain)
      .range([margin.left, graphWidth])
      .nice();
  }

  useEffect(() => {
    const stackGenerator = stack().keys(allKeys).order(stackOrderNone);

    const layers = stackGenerator(data);

    const group = select(gRef.current);
    group.selectAll("*").remove();

    let groupWithLayers = group
      .selectAll("group")
      .data(layers)
      .join("g")
      .classed("group", true);

    if (variant === "stacked") {
      groupWithLayers = groupWithLayers.style("fill", (d) => colors(d.key));
    }

    let path = groupWithLayers
      .selectAll("rect")
      .data((d) => d)
      .enter()
      .append("path");

    if (variant !== "stacked") {
      path = path
        .style("fill", (d, i) => colors(i))
        .attr("id", (d, i) => ids(i));
    }

    path.attr(
      "d",
      (d) =>
        `
          ${
            viewType === "vertical"
              ? verticalPathGenerator(d)
              : horizontalPathGenerator(d)
          }Z
          `
    );

    select(`#${ids(0)}`).raise();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, colors, height, width]);

  const verticalPathGenerator = (d) => {
    let startPosition;
    let bandwidth;
    if (isGrouping) {
      startPosition = xScale(d.data.label) + 1.2 * x1Scale(d.data.__type);
      bandwidth = x1Scale.bandwidth();
    } else {
      startPosition = xScale(d.data.label);
      bandwidth = xScale.bandwidth();
    }

    if (variant === "overlapped") {
      startPosition -= xScale(d.data.label) / 2;
    }

    return `
      ${moveTo(startPosition, yScale(d[0]))}
      ${horizontalLineTo(startPosition + bandwidth)}
      ${verticalLineTo(yScale(d[1]))}
      ${
        yScale(d[0]) === yScale(d[1])
          ? ""
          : getArcValue(rx, ry, 0, 0, 0, -rx, -ry)
      }
      ${horizontalLineTo(startPosition + rx)}
      ${
        yScale(d[0]) === yScale(d[1])
          ? ""
          : getArcValue(rx, ry, 0, 0, 0, -rx, ry)
      }
    `;
  };

  const horizontalPathGenerator = (d) => {
    let startPosition;
    let bandwidth;
    if (isGrouping) {
      startPosition =
        height - (yScale(d.data.label) + 1.2 * y1Scale(d.data.__type));
      bandwidth = y1Scale.bandwidth();
    } else {
      startPosition = height - yScale(d.data.label);
      bandwidth = yScale.bandwidth();
    }

    return `
      ${moveTo(xScale(d[0]), startPosition)}
      ${verticalLineTo(startPosition - bandwidth)}
      ${horizontalLineTo(xScale(d[1]))}
      ${
        xScale(d[0]) === xScale(d[1])
          ? ""
          : getArcValue(rx, ry, 0, 0, 1, rx, ry)
      }
      ${verticalLineTo(startPosition - ry)}
      ${
        xScale(d[0]) === xScale(d[1])
          ? ""
          : getArcValue(rx, ry, 0, 0, 1, -rx, ry)
      }
    `;
  };

  return (
    <svg ref={svgRef} width={graphWidth} height={graphHeight}>
      <g className="layer" ref={gRef}></g>
    </svg>
  );
};

export default BarChart;
