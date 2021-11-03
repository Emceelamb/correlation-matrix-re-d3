const AxisLeft = ({yScale}) => {
  return(
    yScale.domain().map(tickValue => (
      <text
        textAnchor="end"
        x={70} dy=".32em"
        y={yScale(tickValue) + yScale.bandwidth() / 2 }
        key={tickValue}
      >
        {tickValue}
      </text>
    ))
  )
}

export {
  AxisLeft
}