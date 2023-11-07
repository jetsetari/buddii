//libs
import React, { useState, useEffect } from "react";

//styling
import "./Users.scss"

//componennts
import Popup from "@components/_default/Popup";
import DeletePopup from "@components/_default/DeletePopup";
import UserDetails from "./Popup/UserDetails";
import InviteUser from "./Popup/InviteUser";
import EditUser from "./Popup/EditUser";
import Pager from "@components/_default/Pager";
import { getCollectionFromCompany } from "@data/firebase/firestore/getData";
import { inviteUser } from "@data/firebase/firestore/saveData";

import { useSelector } from "react-redux";
import { getUser } from "@data/redux/usersSlice";

const Users = (props) => {
  const [currentUser, setCurrentUser] = useState(false);
  const [inviteUserPopup, setInviteUserPopup] = useState(false);
  const [editUserPopup, setEditUserPopup] = useState(false);
  const [deleteUserPopup, setDeleteUserPopup] = useState(false);

  const [mail, setMail] = useState(false);
  const [firstName, setFirstName] = useState(false);
  const [lastName, setLastName] = useState(false);
  const [role, setRole] = useState(false);
  const [error, setError] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const [changeUserData, setChangeUserData] = useState(false);

  const [users, setUsers] = useState([]);
  const user_store = useSelector(getUser);

  useEffect(() => {
    getCollectionFromCompany('users', (response) => {
      setUsers(response);
    })
  }, []);


  const editUser =  (e) => {
    console.log(e);
    //inviteUser();

    // //userStore.updateUser(user, editUserPopup.email)
    // setEditUserPopup(false)
  }

  const addUserHandler = async (e) => {
    console.log(changeUserData);
    e.preventDefault();
    setError(false);
    setConfirm(false);
    if(changeUserData.firstName == '' || changeUserData.lastName == '' || changeUserData.email == ''){
      setError('Please fill in all fields');
    } else {
      console.log(user_store);
      inviteUser(user_store.companies[0], changeUserData);
      setConfirm('Check your mail or share this link: '+`http://localhost:3000/registermail?firstName=${changeUserData.firstName}&lastName=${changeUserData.lastName}&mail=${changeUserData.email}&company=${user_store.companies[0]}`.replace(/ /g, '%20'));
    }
  }


  const userDataPull = (pull) => {
    setChangeUserData(pull);
    console.log(pull);
  }

  const deleteUser = (user) => {
    //companyStore.removeEmployee(user.email);
    setDeleteUserPopup(false);
  }

  return (
    <>
      <div id="users">
        <h1>Users & Permissions</h1>
        <Popup title="User Details" savePopup={ false } cancel={ false } onChange={addUserHandler} active={ currentUser } closePopup={ setCurrentUser }>
          <UserDetails user={ currentUser } />
        </Popup>
        <Popup title="Invite User" saveTitle={"Invite"} onChange={addUserHandler} active={ inviteUserPopup } closePopup={ setInviteUserPopup }>
          <InviteUser dataPull={userDataPull} setMailCallback={setMail} setFirstNameCallback={setFirstName} setLastNameCallback={setLastName} setRoleCallback={setRole}/>
          { error && <span style={{ marginTop: 15 }} className="main-error">{error}</span> }
        </Popup>
        <Popup title="Edit User" saveTitle={"Edit user"} onChange={editUser} active={ editUserPopup } closePopup={ setEditUserPopup }>
          <EditUser dataPull={userDataPull} user={ editUserPopup } />
        </Popup>
        <DeletePopup title="user" onChange={deleteUser} subject={deleteUserPopup.first_name+` `+deleteUserPopup.last_name} closePopup={ setDeleteUserPopup } active={ deleteUserPopup } />
        <div id="btn-add" onClick={ () => setInviteUserPopup(true) }>Add user</div>
        { confirm && <span className="login-succes">{ confirm }</span> }
        <div className="table-wrapper">
          <table>
            <tbody>
            <tr className="tbl-header"><th>Member</th><th colSpan="3">Role</th></tr>
              { users.map((user, key) => {
                return (
                  <tr key={key}>
                    <td>
                      <div className="user">
                        <div className="avatar" style={{backgroundImage: 'url('+ user.image +')' }}></div>
                        <div className="user-details">
                          <span className="user-name">{ user.firstName } { user.lastName }</span>
                          <span className="user-email">{ user.email }</span>
                        </div>
                      </div>
                    </td>
                    <td>{ user.role }</td>
                    <td><div className="btn-details" onClick={ () => setCurrentUser(user) }>View Details</div></td>

                      <td className="actions">
                        {/*uiStore.currentUser.id !== user.id &&
                          <div className="btn-delete" onClick={ () => setDeleteUserPopup(user) }></div>
                        */}
                        {/*<div className="btn-edit" onClick={ () => setEditUserPopup(user) }></div>*/}
                      </td>

                  </tr>)
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Users;