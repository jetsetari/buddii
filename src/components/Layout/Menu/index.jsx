//libs
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getUser, logoutUserData } from "@data/redux/usersSlice";
import { logoutUser } from "@data/firebase/auth";

//styling
import './Menu.scss';

//assets
import List from "./images/list.svg";

function Menu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useSelector(getUser);
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    logoutUser();
    dispatch(logoutUserData());
    navigate("/login");
  }
  
  return (
    <nav className={ "main-navigation page-"+window.location.pathname.split('/')[1] }>
      <div className="nav">
        <NavLink to="/" className={({ isActive }) => "home" + (isActive ? " active" : "")}></NavLink>
        <NavLink to="/contacts" className={({ isActive }) => "contacts" + (isActive ? " active" : "")}></NavLink>
        <NavLink to="/reports" className={({ isActive }) => "reports" + (isActive ? " active" : "")}></NavLink>
        {user?.role === "ADMIN" &&
          <NavLink to="/admin" className={({ isActive }) => "admin" + (isActive ? " active" : "")}></NavLink>
        }
      </div>
      <div className={ `nav_userinfo ${ menuOpen ? 'active' : '' }`}>
        <div className={ `c-menu-avatar` } onClick={ () => { setMenuOpen(!menuOpen); } }>
          <div style={{backgroundImage: 'url('+user?.image+')' }} className="c-avatar" alt={`Profile picture of: ` + user?.firstName}></div>
          <div className="c-avater-info">
            <div className="c-user">
              <span className="c-avatar-name">{user?.firstName} {user?.lastName}</span>
              <span className="c-avatar-role">{user?.role ? 'admin' : user?.email}</span>
            </div>
            <div style={{backgroundImage: 'url('+List+')' }} className="open-menu"></div>
          </div>
        </div>
        <ul className={ `nav_profile  ${ menuOpen ? 'active' : '' }`}>
          <NavLink to="/admin/profile">Profile</NavLink>
          <li className="btn-logout" onClick={ () => {logout()}}>Logout</li>
        </ul>
      </div>
    </nav>
  );
}

export default Menu;