import React from 'react';
import {NavLink, Link} from 'react-router-dom';

function Navbar(props) {
    return (
        <nav>
    <div className="nav-wrapper #03a9f4 light-blue">
      <a href="/" className="brand-logo">Premier</a>
      <ul className="left hide-on-med-and-down">
        <li><NavLink to="/movies" className='link movies-tab'>Movies</NavLink></li>
        <li><NavLink to="/shows" className='link'>TV Shows</NavLink></li>
        <li><NavLink exact to="/profiles" className='link'>Users</NavLink></li>
      </ul>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
      {props.loggedIn
          ? <><li><NavLink to={`/profiles/${props.userId-1}`} className="link">My Account</NavLink></li>
          <li><Link to="#" onClick={props.logOut} className='link'>Logout</Link></li></>
          :  <><li><NavLink to="/signup" className='link' >Signup</NavLink></li>
              <li><NavLink to="/login" className='link'>Login</NavLink></li></>
      }
        
      </ul>
    </div>
  </nav>
    )
}

export default Navbar;