import React from 'react'
import PropTypes from 'prop-types'
import { Box } from 'components'

function AppBar({ children }) {
  return (
    <Box
      tag="header"
      direction="row"
      align="center"
      justify="between"
      background="light-2"
      pad={{ vertical: 'small', horizontal: 'medium' }}
      elevation="none"
    >
      {children}
    </Box>
  )
}

AppBar.propTypes = {
  children: PropTypes.element.isRequired,
}

export default AppBar
