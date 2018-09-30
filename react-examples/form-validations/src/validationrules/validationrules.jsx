const ValidationRules = {
  username: function (name) {
    let reg = /^[A-Za-z]+$/i
    let validateEmail = function (email) {
      let emailId = /\S+@\S+\.\S+/
      let userIdWithDot = /\S+\S+\.\S+/
      let userIdWithUnderscore = /\S+\S+\_\S+/
      return emailId.test(email) ||
        userIdWithDot.test(email) ||
        userIdWithUnderscore.test(email)
    }
    if (name.trim().length && reg.test(name)) {
      return true
    } else {
      return validateEmail(name)
    }
  },
  email: function (name) {
    let validateEmail = function (email) {
      var reg = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/i
      return reg.test(email)
    }
    return validateEmail(name)
  },
  password: function (name) {
    return name.trim().length
  },
  month: function (name) {
    let reg = /(^0{0,1}[1-9]$)|(^1[0-2]$)/
    let msg = ''
    if (name.trim().length === 0) {
      msg = "Enter valid month"
      return { status: false, msg: msg }
    }
    if (!reg.test(name)) {
      msg = "Enter valid month"
      return { status: false, msg: msg }
    }
    return { status: true, msg: '' }
  },
  year: function (name) {
    let reg = /^(19|20)\d{2}$/
    let cyear = new Date().getFullYear() - 17
    let year = parseInt(name, 10)
    let msg = ''
    if (name.trim().length === 0) {
      msg = "Enter valid year"
      return { status: false, msg: msg }
    }
    if (!(reg.test(name) && year < cyear)) {
      msg = "Enter valid year"
      return { status: false, msg: msg }
    }
    return { status: true, msg: '' }
  },
  phone: function (name, type) {
    // let reg = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/
    let reg = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
    if (!reg.test(name)) {
      return { status: false, msg: "Enter valid phone number" }
    } else {
      return { status: true, msg: "Enter valid phone number" }
    }
  },
  address: function (value) {
    let addLen = value.trim().length
    let reg = /^[a-zA-Z0-9,\- ]+$/
    return reg.test(value) && addLen > 0 && addLen <= 30
  },
  city: function (value) {
    let reg = /^[a-zA-Z\u0080-\u024F\s\/\-\)\(\`\.\"\']+$/
    let cityLen = value.trim().length
    return cityLen > 0 && cityLen <= 15 && reg.test(value)
  },
  zipcode: function (value) {
    function isValidPostalCode (postalCode, countryCode) {
      let postalCodeRegex = ''
      switch (countryCode) {
        case 'US':
          postalCodeRegex = /^([0-9]{5})(?:[-\s]*([0-9]{4}))?$/
          break
        case 'CA':
          postalCodeRegex = /^([A-Z][0-9][A-Z])\s*([0-9][A-Z][0-9])$/
          break
        default:
          postalCodeRegex = /^(?:[A-Z0-9]+([- ]?[A-Z0-9]+)*)?$/
      }
      return postalCodeRegex.test(postalCode)
    }
    return value.trim().length === 5 && isValidPostalCode(value, 'US')
  }
}

export default ValidationRules
