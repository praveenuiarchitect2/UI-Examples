import React from 'react'
import $$ from 'jquery'
import { hashHistory } from 'react-router'
import InputText from './../../validationrules/inputtext'
import validateRule from './../../validationrules/validationrules'

import './form.scss'

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
      <div className="welcome-main">
        <div className="col-md-4 col-lg-4">
          <div className="form-group">
            <label for="email">Name</label>
            {/* <input type="text" className="form-control " id="textbox" /> */}
            <div className="input-group inputs">
              <InputText length='32' maxlength='32' errorplacement='.input-group.inputs' type='text' name='username' id='username' className='form-control' placeholder={'Enter username'} callback={(input) => { this.state.username = input }} />
            </div>
          </div>
          <div className="form-group">
            <label for="pwd">Password:</label>
            <div className="input-group inputs">
              <InputText length='32' maxlength='32' errorplacement='.input-group.inputs' type='password' name='password' id='password' className='form-control' placeholder={'Enter password'} callback={(input) => { this.state.password = input }} />
            </div>
          </div>
          <div className="form-group">
            <label for="email">Email address:</label>
            <div className="input-group inputs">
              <InputText length='32' maxlength='32' errorplacement='.input-group.inputs' type='email' name='email' id='eamil' className='form-control' placeholder={'Enter password'} callback={(input) => { this.state.password = input }} />
            </div>
          </div>
          <div className="form-group">
            <label for="comment">Comment:</label>
            <div className="input-group inputs">
              <InputText length='32' maxlength='32' rows="5" errorplacement='.input-group.inputs' type='textarea' name='address' id='address' className='form-control' placeholder={'Enter address'} callback={(input) => { this.state.address = input }} />
            </div>
          </div>
          <div className="input-group inputs">
            <label className="radio-inline">
              <InputText length='32' maxlength='32' rows="5" errorplacement='.input-group.inputs' type='radio' name='optradio' id='optradio' className='' placeholder={'Enter address'} callback={(input) => { this.state.optradio = input }} />Male
              </label>
            <label className="radio-inline">
              <InputText length='32' maxlength='32' rows="5" errorplacement='.input-group.inputs' type='radio' name='optradio' id='optradio' className='' placeholder={'Enter address'} callback={(input) => { this.state.optradio = input }} />Female
              </label>
          </div>

          <div className="form-group input-group inputs">
            <label for="sel1">Country</label>
            {/* <select className="form-control" id="sel1">
              <option>Select</option>
              <option>India</option>
              <option>US</option>
              <option>UK</option>
              <option>Australia</option>
            </select> */}
            <InputText options={["Select", "India", "US", "UK", "Australia"]} length='32' maxlength='32' rows="5" errorplacement='.input-group.inputs' type='select' name='select' id='select' className='' placeholder={'Enter address'} callback={(input) => { this.state.select = input }} />
          </div>
          <div className="input-group inputs checkbox">
            <label className="radio-inline">
              <InputText length='32' maxlength='32' rows="5" errorplacement='.input-group.inputs' type='checkbox' name='checkbox' id='checkbox' className='' placeholder={'Enter address'} callback={(input) => { this.state.checkbox = input }} />Male
              </label>
          </div>
          <button type="button" className="btn btn-default" onClick={this.handleSubmit}>Submit</button>
        </div>
      </div>
    )
  }
}

export default FormValidations
