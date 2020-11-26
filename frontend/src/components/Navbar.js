import React from 'react';
import {NavLink, Link} from 'react-router-dom';

function Navbar(props) {
    return (
        <nav>
    <div className="nav-wrapper #03a9f4 light-blue">
      <Link to="/" className="brand-logo">Premier</Link>
      <ul className="left hide-on-med-and-down">
        <li><NavLink to="/movies" className='link movies-tab'>Movies</NavLink></li>
        <li><a href="collapsible.html" className='link'>TV Shows</a></li>
      </ul>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><NavLink exact to="/" className='link' >Signup</NavLink></li>
        <li><a href="collapsible.html" className='link'>Login</a></li>
      </ul>
    </div>
  </nav>
    )
}

export default Navbar;