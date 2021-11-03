const AxisBottom = ({ xScale }) => {
  return(

        xScale.domain().map((tickValue) => (
          <text
            textAnchor="end"
            x={xScale(tickValue) + xScale.bandwidth() / 2 + 100}
            y={20}
            key={tickValue}
          >
            {tickValue}
          </text>
        ))
  )
}

export {
  AxisBottom
}