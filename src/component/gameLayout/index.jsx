import React, { Component } from 'react'
import { Outlet } from 'react-router-dom'

import Petal from '../petal'

export default class GameLayout extends Component {
  changeTheme() {
    if (document.body.classList.length === 0) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }

  render() {
    return (
      <>
        <div className="mod_orient_layer"></div>
        {/* <!-- petals --> */}
        <Petal />
        {/* <!-- header --> */}
        <div className="header">
          <i className="mode_toggle" onClick={() => this.changeTheme()}></i>
          <i className="miraitowa"></i>
        </div>

        <Outlet />

        <div className="torii"></div>
      </>
    )
  }
}
