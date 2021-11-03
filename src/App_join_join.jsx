import React, { useRef, useEffect } from 'react';
import { useData } from './useData';
import { scaleBand, scaleLinear, axisBottom, axisLeft } from 'd3';
import { AxisLeft } from './components/AxisLeft'
import { AxisBottom } from './components/AxisBottom';
import { HeatMap } from './components/HeatMap';

import { d3, select, selectAll, keys } from 'd3'

const width = 1100;
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

    const symbols = data["columns"].filter((sym) => sym!=="symbol").map((sym)=>sym.split('_')[0].toUpperCase())

    const yScale = scaleBand()
      .domain(symbols)
      .range([0, innerHeight])

    const xScale = scaleBand()
      .domain(symbols)
      .range([0, innerWidth])


    const colorScale = scaleLinear()
      .range(["red", "green"])
      .domain([-1, 1])

    const svg = select(svgRef.current)
      .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)

    const tickers = Array.from(new Set(data.map(d => d.symbol)))
    const x = scaleBand()
      .range([0, innerWidth])
      .domain(tickers)
      .padding(0.05)

    svg.append("g")
      .style("font-size", 15)
      .attr("transform", `translate(0, ${innerHeight-margin.bottom})`)
      .call(axisBottom(x).tickSize(0))
      .select('.domain').remove()

    const y = scaleBand()
      .range([innerHeight, 0])
      .domain(tickers)
      .padding(0.05)

    svg.append("g")
      .style("font-size", 15)
      .call(axisLeft(y).tickSize(0))
      .select(".domain").remove()


    svg.selectAll()
      .data(data, (d)=>{
        // console.log(Object.keys(d).map((k)=>d[k].toString()).join(':'))
        // console.log(data)
        return (Object.keys(d).map((k)=>d[k].toString()).join(':'))
      })
      .append("g")
      .data(data, (d)=>{
          return Object.keys(d).map((k)=>k.split('_')[0].toUpperCase())
        })
        .join("rect")
        .attr("x", (d)=>{
          return x(Object.keys(d).map((k)=>k.split('_')[0].toUpperCase()))
          // return x(d["symbol"])
        })
        .attr("y", (d)=>{
          // console.log(d.symbol)
          return y(Object.keys(d).map((k)=>k.split('_')[0].toUpperCase()))
        })
        .attr("width", x.bandwidth())
        .attr("height", y.bandwidth())
        .style("fill", "red")




  })


  return (
    <svg width={width} height={height + margin.top + margin.bottom} transform="translate(0,0)" ref={svgRef}>

    </svg>
  );
}

export default App;
