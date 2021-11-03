import { select, pointer } from 'd3';

const HeatMap = ({data, colorScale}) => {
  const tooltip = select('#svg')
    .append("div")
    .style("opacity", 0.5)
    .attr("class", "tooltip")
    .style("background-color", "red")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")


  const mouseover = function(d) {
    tooltip
      .style("opacity", 1)
    select(this)
      .style("stroke", "black")
      .style("opacity", 1)
  }

  const mousemove = function(d) {
    console.log("d.val")
  }

   var mouseleave = function(d) {
    tooltip
      .style("opacity", 0)
      select(this)
      .style("stroke", "none")
      .style("opacity", 0.8)
  }

  const svg = select("#svgEl")
  console.log(svg)
  svg.select()
    .enter()
    .append("rect")
      .attr("x", 50)
      .attr("y", 50)
      .attr("width", 100)
      .attr("height", 100)
      .attr("fill", "red")
      .attr("id", "tooltip")

  const handleToolTip = (e, score) => {
    let el = e.target
    el.setAttribute("stroke", "yellow")
    el.setAttribute("stroke-width", 4)
    tooltip
      .style("opacity", 1)
      .style("left", "50px")
      .style("top", "50px")
  }

  const mouseLeave = (e) => {
    let el = e.target;
    el.setAttribute("stroke", "none")
  }

  return (
        data.map((d, i)=>{
          return (
            Object.entries(d).filter(([key, _]) => key!== "SYMBOL").map((o,j)=>{
              return (
                <g key={j} transform={`translate(${i*100}, ${j*100})`}>
                  <rect
                    width={100}
                    height={100}
                    fill={colorScale(o[1])}
                    onMouseEnter={(e)=> handleToolTip(e, o[1], i, j)}
                    onMouseLeave={(e)=> mouseLeave(e)}
                  >
                    <title>{o[1]}</title>
                  </rect>
                  <text transform={`translate(25, 50)`}>{o[1]}</text>
                </g>
              )
            })
          )
        })
  )
}

export {
  HeatMap
}
