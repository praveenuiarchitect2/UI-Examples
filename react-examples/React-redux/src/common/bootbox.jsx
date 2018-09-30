import bootbox from 'bootbox'
import toastr from 'toastr'

require('toastr/toastr.scss')

const obj = {
  alert: function (opt) {
    toastr.options = {
      'closeButton': true,
      'debug': false,
      'newestOnTop': false,
      'progressBar': false,
      'positionClass': 'toast-top-center',
      'preventDuplicates': true,
      'onclick': null,
      'showDuration': !opt.extraduration ? '400' : '600',
      'hideDuration': !opt.extraduration ? '2000' : '5000',
      'timeOut': !opt.extraduration ? '5000' : '10000',
      'extendedTimeOut': !opt.extraduration ? '2000' : '5000',
      'showEasing': 'swing',
      'hideEasing': 'linear',
      'showMethod': 'fadeIn',
      'hideMethod': 'fadeOut'
    }

    if (opt.type === 'error') {
      toastr['error'](decodeURI(opt.message))
    } else {
      toastr['success'](decodeURI(opt.message))
    }
    if (opt.callback) {
      opt.callback()
    }
    // bootbox.alert(options)
  },
  confirm: function (opt) {
    bootbox.confirm(opt)
  }
}

export default obj
