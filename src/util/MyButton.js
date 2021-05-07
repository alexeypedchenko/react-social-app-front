import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'

/* eslint-disable-next-line */
export default ({ children, onClick, tip, btnClassName, tipClassName, tipPosition = 'top'}) => (
  <Tooltip title={tip} className={tipClassName} placement={tipPosition}>
    <IconButton onClick={onClick} className={btnClassName}>
      { children }
    </IconButton>
  </Tooltip>
)
