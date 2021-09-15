import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
      <div className="nav-site-link-container">
        <NavLink className="nav-link" to="/login">Log In</NavLink>
        <NavLink className="nav-link" to="/signup">Sign Up</NavLink>
      </div>
      </>
    );
  }

  return (
    <nav className="nav-container">
      <div className="nav-logo">
        <NavLink exact to="/" className="nav-link">
          <i className="fab fa-flickr"></i>
        </NavLink>
        <h1 className="nav-snapr">Snapr</h1>
      </div>
      <ul>
        <li>
          {isLoaded && sessionLinks}
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
