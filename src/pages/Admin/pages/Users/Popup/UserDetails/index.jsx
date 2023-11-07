import React from "react";

import "./UserDetails.scss";

const UserDetails = ({ user }) => {

  return (
    <div className="user-details">
      <div className="user-header">
        <div className="user-avatar" style={{backgroundImage: 'url('+user.image+')'}}></div>
        <div className="user-subheader">
          <span className="user-name">{ user.firstName } { user.lastName }</span>
          <span className="user-email">{ user.email }</span>
        </div>
      </div>
      <div className="user-details">
        <div className="user-line">
          <strong>Role</strong>
          <span>{ user.role }</span>
        </div>
        <div className="user-line">
          <strong>Phone number</strong>
          <span>{user.phone}</span>
        </div>
        <div className="user-line">
          <strong>Functie</strong>
          <span>{user.job}</span>
        </div>
        <div className="user-line">
          {/* <strong>Invitation</strong>
          <span>Accepted on 17 Februari 2022 at 22:23</span> */}
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
