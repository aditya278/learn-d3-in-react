import React, { useRef, useEffect, useContext } from "react";
import { select, selectAll, scaleOrdinal, extent, pie, arc } from "d3";

import { toolTipContext } from "../useTooltip";
import ToolTip from "../ToolTip";

const width = 150;
const height = 250;
const radius = Math.min(width, height) / 2 - 1;
const innerRadius = radius - 14;
const colors = [
  "#4B4188",
  "#666DB5",
  "#935393",
  "#B08DE2",
  "#7B65B7",
  "#C1A9E5",
  "#E0AFDE",
  "#E8CBF4",
  "#E0B6F0",
];
const data = [
  {
    label: "accounting",
    value: 206,
  },
  {
    label: "admin & clerical",
    value: 92,
  },
  {
    label: "automotive",
    value: 40,
  },
  {
    label: "banking",
    value: 79,
  },
  {
    label: "information technology",
    value: 14,
  },
  {
    label: "biotech",
    value: 26,
  },
  {
    label: "broadcast journalism",
    value: 12,
  },
];
export default function DoughnutChart() {
  const { toolTip, setToolTip } = useContext(toolTipContext);

  const svgRef = useRef();
  const color = scaleOrdinal()
    .domain(extent(data, (d) => d.label))
    .range(colors);
  useEffect(() => {
    const svg = select(svgRef.current);
    const createPie = pie()
      .sort(null)
      .value((d) => d.value)
      .padAngle(0.015);
    const path = arc().innerRadius(innerRadius).outerRadius(radius);
    const getToolTipData = (d) => {
      const label = d.data.label;
      return label;
    };
    const pieData = createPie(data);
    const arch = svg
      .selectAll(".arc")
      .data(pieData)
      .enter()
      .append("g")
      .attr("class", "arc")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
      .attr("fill", (d) => color(d.data.label));
    arch
      .append("path")
      .attr("d", path)
      .on("mouseover", (d) => setToolTip(d))
      .on("mouseleave", (d) => setToolTip(false))
      .append("title")
      .text((d) => getToolTipData(d));
  }, []);
  return (
    <>
      <svg width={width} height={height} ref={svgRef}>
        {toolTip && <ToolTip x={20} y={40} info={{ label: "hello" }} />}
      </svg>
    </>
  );
}
