import React from 'react';
import {NavLink, Link} from 'react-router-dom';

function Navbar(props) {
    return (
        <nav>
    <div className="nav-wrapper #03a9f4 light-blue">
      <Link to="/" className="brand-logo">Logo</Link>
      <ul className="left hide-on-med-and-down">
        <li><a href="collapsible.html" className='movies-tab'>Movies</a></li>
        <li><a href="collapsible.html">TV Shows</a></li>
      </ul>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><NavLink exact to="/" activeClassName='activeNav'>Signup</NavLink></li>
        <li><a href="collapsible.html">Login</a></li>
      </ul>
    </div>
  </nav>
    )
}

export default Navbar;