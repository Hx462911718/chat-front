import React, { Component, PropTypes } from 'react'
import classnames from "classnames"
import "./Svg.scss"
class Svg extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    const props = this.props;
    const { hash,herf,title, className, ...others } = props;
    return (
      <svg className={classnames("svg-default",{[`${className}`]:true})} title={title}>
      </svg>
    )
  }
}

export default Svg
