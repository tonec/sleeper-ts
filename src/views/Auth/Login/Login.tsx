import React, { ReactNode } from 'react'
import { Centered } from 'components'
import LoginFormContainer from './LoginFormContainer'

function Login(): ReactNode {
  return (
    <Centered title="Log in">
      <LoginFormContainer />
    </Centered>
  )
}

export default Login
