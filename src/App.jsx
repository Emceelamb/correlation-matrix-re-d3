import React, { useRef, useEffect } from 'react';
import { useData } from './useData';
import { scalePoint, scaleBand, scaleLinear, axisBottom, axisLeft } from 'd3';
import { AxisLeft } from './components/AxisLeft'
import { AxisBottom } from './components/AxisBottom';
import { HeatMap } from './components/HeatMap';

import { csv, d3, select, selectAll, keys } from 'd3'

const width = 1200;
const height = 1100;
const margin = {
  top: 100,
  right: 0,
  bottom: 0,
  left:100
};

const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.left - margin.right;
const App = () => {
  const svgRef = useRef(null);

  const csvUrl = "https://gist.githubusercontent.com/Emceelamb/184a627df887fc945d202c69333cb133/raw/037c58a8325d6730fbdb2eb9aa4644cd1ba14c93/correlation_matrix"

  const data = useData(csvUrl)


  useEffect(() => {

    if(!data){
      return <pre>Loading...</pre>
    }

    console.log(data)

    const domain = Array.from(new Set(data.map(d=>d.x)))

    const colorScale = scaleLinear()
      .domain([-1, 1])
      .range(["red", "green"])

    const svg = select(svgRef.current)
      .append("g")
        .attr("transform", `translate(100, ${margin.top})`)

    const x = scalePoint()
      .range([0, innerWidth])
      .domain(domain)

    const y = scalePoint()
      .range([0, innerHeight])
      .domain(domain)

    svg.append("g")
      .style("font-size", 15)
      .attr("class", "yAxis")
      .call(axisLeft(y).tickSize(0).tickPadding(20))
      .select(".domain").remove()

    svg.select('.yAxis')
      .attr("transform", "translate(-10, 50)")



    svg.append("g")
      .style("font-size", 15)
      .attr("class", "xAxis")
      .call(axisBottom(x).tickSize(0).tickPadding(20))
      .select(".domain").remove()

    svg.select('.xAxis')
      .attr("transform", "translate(50, -50)")

    const el = svg.selectAll('.cor')
      .data(data)
      .join("g")
        .attr("class", "cor")
        .attr("transform", (d) =>  `translate(${x(d.x)}, ${y(d.y)})`)

    el.append("rect")
      .attr("width", "100")
      .attr("height", "100")
      .attr("fill", d => colorScale(d.value))

  })


  return (
    <svg width={width + margin.left} height={height + margin.top + margin.bottom} transform="translate(0,0)" ref={svgRef}>
    </svg>
  );
}

export default App;
