
import React from 'react'
import { hashHistory } from 'react-router'

import './welcome.scss'

class Welcome extends React.Component {
  constructor() {
    super()
    this.state = {
      showForm: false
    }

    this.handleClick = this.handleClick.bind(this)
    this.getData = this.getData.bind(this)
    this.showPreviousPage = this.showPreviousPage.bind(this) 
  }
  getData (data) {
    this.setState(data)
  }

  handleClick (e) {
    let tar = e.target.name
    this.setState({ showForm: true })
    if (tar === '1') {
      hashHistory.push('/formvalidation')
    } else if (tar === '3') { 
      hashHistory.push('/react-redux')
    } else if (tar === '2'){
      hashHistory.push('/hoc')
    }
  }
  showPreviousPage() {
    this.setState({ showForm: false })
    hashHistory.push('/')
  }

  render() {
    let childrenWithProps = React.cloneElement(this.props.children, { ...this.props.children.props, getData: this.getData })
    if (this.state.pageLabels) {
      pageLabels = this.state.pageLabels
    }
    let showForm = this.state.showForm
    return (
      <div className="welcome-main">
        <h1 className="well ui-example ui-title">
          UI Examples
        </h1>
        <div className="tab-section">
          <div className="panel with-nav-tabs panel-default">
            <div className="panel-heading">
              <ul className="nav nav-tabs">
                <li className="active nav-item">
                  <a className="" data-toggle="tab" href="#reactjstab">ReactJS</a>
                </li>
                <li>
                  <a href="#reactnative" data-toggle="tab">
                    React Native
                </a>
                </li>
                <li><a href="#angular2" data-toggle="tab">Angular 2</a></li>
                <li className="dropdown">
                  <a href="#" data-toggle="dropdown">Dropdown <span className="caret"></span></a>
                  <ul className="dropdown-menu" role="menu">
                    <li><a href="#oojs" data-toggle="tab">Object Oriented JS</a></li>
                    <li><a href="#nodejs" data-toggle="tab">Nodejs</a></li>
                    <li><a href="#meanstack" data-toggle="tab">MEAN Stack</a></li>
                    <li><a href="#javascript" data-toggle="tab">Javascript</a></li>
                    <li><a href="#html" data-toggle="tab">HTML/HTML5</a></li>
                    <li><a href="#css" data-toggle="tab">CSS/CSS3</a></li>
                    <li><a href="#typescript" data-toggle="tab">TypeScript</a></li>
                    <li><a href="#designpatterns" data-toggle="tab">Design Patterns</a></li>
                    <li><a href="#tools" data-toggle="tab">Tools/Build</a></li>
                    <li><a href="#es6" data-toggle="tab">Tools/Build</a></li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className="panel-body panel-body-height">
              <div className="tab-content">
                <div className="tab-pane fade in active" id="reactjstab">
                  <div className={showForm ? 'hide' : 'show'}>
                    <ul>
                      <li><a onClick={this.handleClick} name="1">Form Validations.</a></li>
                      <li><a onClick={this.handleClick} name="2">Higher Order Components</a></li>
                      <li><a  onClick={this.handleClick} name="3">React/Redux</a></li>
                      <li><a href="#">Stateless/Stateful Components</a></li>
                      <li><a href="#">FAQ's</a></li>
                    </ul>
                  </div>
                  <div className={showForm ? 'show' : 'hide'}>
                  <div className="row">
                    <div className="col-md-4 col-lg-4">
                      <a  class="previous" onClick={this.showPreviousPage}>&laquo; Previous</a>
                    </div>
                  </div>
       
                    {childrenWithProps}
                  </div>
                </div>
                <div className="tab-pane fade  " id="reactnative">React Native  Content</div>
                <div className="tab-pane fade " id="angular2">Angular2</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Welcome
