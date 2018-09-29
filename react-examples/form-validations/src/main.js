import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, hashHistory } from 'react-router'
import Welcome from './components/welcome/welcome'
import FormValidations from './components/form/form'
require('../node_modules/jquery/dist/jquery.js')
require('../node_modules/jquery-ui-dist/jquery-ui.js')
require('es6-promise/auto')
require('../node_modules/bootstrap/dist/css/bootstrap.min.css')
require('../node_modules/font-awesome/css/font-awesome.css')
require('../node_modules/lato-font/css/lato-font.css')
require('../node_modules/bootstrap/dist/js/bootstrap.min.js')
require('../node_modules/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css')
require('../node_modules/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js')
require('../node_modules/owl-slider/js/owl.carousel.js')
require('../node_modules/owl-slider/css/owl.carousel.css')
require('../node_modules/owl-slider/css/owl.theme.default.css')
require('../node_modules/rangeslider.js/dist/rangeslider.js')
import './styles/_base.scss'
import './styles/core.scss'

// ========================================================
// Store Instantiation
// ========================================================
// const initialState = window.___INITIAL_STATE__
// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root')

const checkLoggedIn = (nextState, replace) => {
//  if (!localStorage.getItem('authobj')) {
//     replace({
//       pathname: '/formvalidation'
//     })
//   } 
}



let render = () => {
  ReactDOM.render(
    <Provider>
      <Router history={hashHistory}>
        <Route component={Welcome} path='/welcomepage'>
          <Route components={FormValidations} path='/formvalidation' onEnter={checkLoggedIn}/>
          <Route component={FormValidations} path='/' onEnter={checkLoggedIn} />
        </Route>
      </Router>
    </Provider>,
    MOUNT_NODE)
}

// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    // Development render functions
    const renderApp = render
    const renderError = (error) => {
      const RedBox = require('redbox-react').default

      ReactDOM.render(
        <RedBox error={error} />, MOUNT_NODE)
    }

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp()
      } catch (error) {
        // console.error(error)
        renderError(error)
      }
    }

    // Setup hot module replacement
    module.hot.accept('./components/welcome/welcome', () => setImmediate(() => {
      ReactDOM.unmountComponentAtNode(MOUNT_NODE)
      render()
    }))
  }
}

// ========================================================
// Go!
// ========================================================
render()
