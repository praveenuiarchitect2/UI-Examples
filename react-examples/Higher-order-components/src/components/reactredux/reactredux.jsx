import React from 'react'
import $$ from 'jquery'
import { hashHistory } from 'react-router'
import InputText from '../../validationrules/inputtext'
import validateRule from '../../validationrules/validationrules'
import List from "./list";
import Form from "./form";

import './reactredux.scss'

class FormValidations extends React.Component {
  constructor() {
    super()
    this.state = {
    }

    this.handleSubmit = this.handleSubmit.bind(this)

  }

  handleSubmit() {
    var event = document.createEvent("HTMLEvents")
    event.initEvent("blur", true, true)
    var target = document.getElementsByClassName('formelement')
    for (let i = 0, len = target.length; i < len; i++) {
      target[i].dispatchEvent(event)
    }
  }
  showPreviousPage() {

  }
  render() {
    return (
      <div className="react-redux-main">
        <div className="row mt-5">
          <div className="col-md-4 offset-md-1">
            <h2>List of items</h2>
            <List />
          </div>
          <div className="col-md-4 offset-md-1">
      <h2>Add new item</h2>
      <Form />
    </div>
        </div>
      </div>
    )
  }
}

export default FormValidations
