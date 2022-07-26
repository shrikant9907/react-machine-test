import React from 'react'
import { Link } from 'react-router-dom'
import "./Layout.scss"

const Layout = (props) => {
  return (
    <div className='container page-layout'>
      <nav className="navbar navbar-expand-lg navbar-light bg-white bg-light mb-4">
        <Link className="navbar-brand" to="/">Test</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/user-details">
                <span className='btn btn-primary btn-sm mb-2 ms-auto'>User Details</span>
              </Link>
            </li>
            <li className="nav-item active"> 
              <Link className="nav-link" to="/">
                <span className='btn btn-success btn-sm mb-2 ms-auto'>Add New User</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      {props.children}
    </div>
  )
}

export default Layout