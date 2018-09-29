
import React from 'react'
import { hashHistory } from 'react-router'

import './form.scss'

class FormValidations extends React.Component {
  constructor() {
    super()
    this.state = {
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit() {

  }

  render() {
    return (
      <div className="welcome-main">
        Here is form FormValidations
      </div>
    )
  }
}

export default FormValidations
