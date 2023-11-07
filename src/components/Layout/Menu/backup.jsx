//libs
import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import lottie from "lottie-web";

//styling
import './Nav.scss';

//assets
import Avatar from '../../assets/images/nav/avatar.png';
import List from "../../assets/images/nav/list.svg";

function Nav() {
  const container = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: false,
      animationData: require("../../assets/images/nav/bel.json")
    });

    return () => {
      lottie.destroy();
    };
  }, []);

  return (
    <nav className="nav_container">
      <div className="nav">
        <NavLink
          to="/"
          className={({ isActive }) => "nav-link" + (isActive ? " home_active active" : " home")}
        >
          <div></div>
        </NavLink>

        <NavLink
          to="/slides"
          className={({ isActive }) => "nav-link" + (isActive ? " slides_active active" : " slides")}
        >
          <div></div>
        </NavLink>

        <NavLink
          to="/clients"
          className={({ isActive }) => "nav-link" + (isActive ? " clients_active active" : " clients")}
        >
          <div></div>
        </NavLink>

        <NavLink
          to="/reporting"
          className={({ isActive }) => "nav-link" + (isActive ? " reporting_active active" : " reporting")}
        >
          <div></div>
        </NavLink>

        <NavLink
          to="/map"
          className={({ isActive }) => "nav-link" + (isActive ? " map_active active" : " map")}
        >
          <div></div>
        </NavLink>

        <NavLink
          to="/admin"
          className={({ isActive }) => "nav-link" + (isActive ? " admin_active active" : " admin")}
        >
          <div></div>
        </NavLink>
      </div>

      <div className="nav_userinfo">
        <div className="c-menu-notifications" onMouseEnter={() => lottie.play()}
          onMouseLeave={() => lottie.goToAndStop(45, 10)}>
          <div style={{ width: 19, height: 19 }} ref={container}
          ></div>
          <span className="c-noti-num">4</span>
        </div>

        <div className="c-menu-avatar">
          <img src={Avatar} className="c-avatar" alt="user foto" />

          <div className="c-avater-info">
            <div>
              <p className="c-avatar-name">Tim Baekelandt</p>
              <p className="c-avatar-state">Admin</p>
            </div>
            <img src={List} alt="arrows icon" />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
