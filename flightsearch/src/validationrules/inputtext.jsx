import React from 'react'
import $$ from 'jquery'
import './commonvalidation.scss'
import validForm from './validationrules'

class InputText extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      pageLabel: '',
      message: ''
    }
  }
  handleChange(e) {
    var setErroNode = function (event, _this, message) {
      let errorMsg = message
      if (!$$(event.target).parents(_this.props.errorplacement).next('p.invalid').length) {
        $$(event.target).parents(_this.props.errorplacement).after('<p class="invalid">' + errorMsg + '</p>')
        if (_this.props.errorBorderPlacement) {
          $$(event.target).parents(_this.props.errorBorderPlacement).addClass('invalid-bdr')
        } else {
          $$(event.target).parents(_this.props.errorplacement).addClass('invalid-bdr')
        }
      } else {
        $$(event.target).parents(_this.props.errorplacement).next('p.invalid').remove()
        if (_this.props.errorBorderPlacement) {
          $$(event.target).parents(_this.props.errorBorderPlacement).removeClass('invalid-bdr')
        } else {
          $$(event.target).parents(_this.props.errorplacement).removeClass('invalid-bdr')
        }
        $$(event.target).parents(_this.props.errorplacement).after('<p class="invalid">' + errorMsg + '</p>')
        if (_this.props.errorBorderPlacement) {
          $$(event.target).parents(_this.props.errorBorderPlacement).addClass('invalid-bdr')
        } else {
          $$(event.target).parents(_this.props.errorplacement).addClass('invalid-bdr')
        }
      }
      _this.props.callback(e.target.value)
    }
    var removeErrorNode = function (event, _this) {
      $$(e.target).parents(_this.props.errorplacement).next('p.invalid').remove()
      if (_this.props.errorBorderPlacement) {
        $$(event.target).parents(_this.props.errorBorderPlacement).removeClass('invalid-bdr')
      } else {
        $$(event.target).parents(_this.props.errorplacement).removeClass('invalid-bdr')
      }
      _this.props.callback(e.target.value)
    }

    let st = {}
    switch (this.props.name) {
      case 'phone':
        st = validForm.phone(e.target.value, e.target.id)
        if (!st.status) {
          setErroNode(e, this, st.msg)
        } else {
          removeErrorNode(e, this)
        }
        break
      case 'address':
        st = validForm.address(e.target.value, e.target.id)
        if (!st) {
          setErroNode(e, this, "Enter valid address")
        } else {
          removeErrorNode(e, this)
        }
        break
      case 'city':
        st = validForm.billCity(e.target.value, e.target.id)
        if (!st) {
          setErroNode(e, this, "Enter valid city")
        } else {
          removeErrorNode(e, this)
        }
        break
      case 'postalCode':
        st = validForm.billZip(e.target.value, e.target.id)
        if (!st) {
          setErroNode(e, this, "Enter valid postal code")
        } else {
          removeErrorNode(e, this)
        }
        break
      case 'email':
        if (this.props.name === 'email') {
          if (!validForm.email(e.target.value)) {
            setErroNode(e, this, "Enter valid email id")
          } else {
            removeErrorNode(e, this)
          }
        }
        break
      case 'username':
        if (!validForm.username(e.target.value)) {
          setErroNode(e, this, "Enter valid username")
        } else {
          removeErrorNode(e, this)
        }
        break;
      case 'password':
        if (!validForm.password(e.target.value)) {
          setErroNode(e, this, "Enter valid password")
        } else {
          removeErrorNode(e, this)
        }
        break
      case 'optradio':
        let ele = $$('[name=optradio]')
        let isChecked = false
        for (let i = 0, len = ele.length; i < len; i++) {
          if (ele[i].checked) {
            isChecked = true
          }
        }
        if (!isChecked && !e.target.checked) {
          setErroNode(e, this, "Please select one of the option")
        } else {
          removeErrorNode(e, this)
        }
        break
      case 'checkbox':
        if (!e.target.checked) {
          setErroNode(e, this, "Please select checkbox")
        } else {
          removeErrorNode(e, this)
        }
        break
      case "select":
        if (e.target.selectedIndex == 0) {
          setErroNode(e, this, "Please select one of the option")
        } else {
          removeErrorNode(e, this)
        }
        break
    }
  }
  render() {

    if (this.props.type == 'text' || this.props.type == 'password' || this.props.type == 'email' || this.props.type == 'phone') {
      return (
        <input type={this.props.type} name={this.props.name}
          id={this.props.id} ref={this.props.name} className={this.props.className + ' formelement'} defaultValue={this.props.defaultValue}
          data-automation-id={this.props.autId}
          value={this.props.value} placeholder={this.props.placeholder} onBlur={this.handleChange} onChange={this.handleChange} />
      )
    } else if (this.props.type == 'textarea') {
      return (
        <textarea type={this.props.type} name={this.props.name}
          id={this.props.id} className={this.props.className + ' formelement'} defaultValue={this.props.defaultValue}
          data-automation-id={this.props.autId}
          value={this.props.value} placeholder={this.props.placeholder} onBlur={this.handleChange} onChange={this.handleChange} />
      )
    } else if (this.props.type == 'radio') {
      return (
        <input type={this.props.type} name={this.props.name}
          id={this.props.id} className={this.props.className + ' formelement'} defaultValue={this.props.defaultValue}
          data-automation-id={this.props.autId}
          value={this.props.value} placeholder={this.props.placeholder} onFocus={this.handleChange} onBlur={this.handleChange} onChange={this.handleChange} />
      )
    } else if (this.props.type == 'checkbox') {
      return (
        <input type={this.props.type} name={this.props.name}
          id={this.props.id} className={this.props.className + ' formelement'} defaultValue={this.props.defaultValue}
          data-automation-id={this.props.autId}
          value={this.props.value} placeholder={this.props.placeholder} onFocus={this.handleChange} onBlur={this.handleChange} onChange={this.handleChange} />
      )
    }
    else if (this.props.type == 'select') {
      return (
        <select type={this.props.type} name={this.props.name}
          id={this.props.id} className={this.props.className + ' formelement form-control'} defaultValue={this.props.defaultValue}
          data-automation-id={this.props.autId} onFocus={this.handleChange} onBlur={this.handleChange} onChange={this.handleChange}>
          {this.props.options.map((item, index) => {
            return <option>{item}</option>
          })}
        </select>
      )
    }
  }
}
InputText.defaultProps = {
  autId: 'data-automation-id-default-input-text'
}

export default InputText
