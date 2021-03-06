import React from 'react'
import PropTypes from 'prop-types'
import Label from './Label'

function FormControl({ children, label, name, isError, error }) {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      {children}
      <span className="error-container">
        {isError && error && (
          <small className="error-message">
            X<span>{error}</span>
          </small>
        )}
      </span>
    </div>
  )
}

FormControl.propTypes = {
  children: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isError: PropTypes.bool,
  error: PropTypes.string,
}

FormControl.defaultProps = {
  isError: false,
  error: null,
}

export default FormControl
