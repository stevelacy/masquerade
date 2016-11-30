import React from 'react'

export default function svgPointPulse (opt) {
  return (
    <g>
      {
        opt.locations.map(point => {
          const pos = opt.project([point.get(0), point.get(1)])
          return <circle
            cx={pos[0]}
            cy={pos[1]}
            r={opt.zoom}
            fill='#1FBAD6'
            key={pos}>
            <animate
              id="animation1"
              attributeName="opacity"
              begin="0s"
              dur="2s"
              repeatCount="indefinite"
              values="1;0"
            />
            <animate
              attributeName="r"
              begin="0s;animation1.start"
              dur="2s"
              repeatCount="indefinite"
              from={opt.zoom - 10}
              to={opt.zoom + 5}
            />
          </circle>
          }
        )
      }
    </g>
  )
}
