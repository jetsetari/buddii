//libs
import React, { useState, useCallback, useEffect } from "react";

//styling
import "./Profile.scss"

import TextInput from "@components/_default/TextInput";
import DropDown from "@components/_default/DropDown";
import DragDropInput from '@components/_default/DragDropInput/DragDropInput';
import * as firebase from "@data/firebase";
import { getUserByEmail, getCompany } from "@data/firebase/firestore/getData";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "@data/firebase/firestore/updateData";
import { loginUserData } from "@data/redux/usersSlice";
import Loading from "@components/_default/Loading";

const Profile = (props) => {
  const [userDetails, setUserDetails] = useState(false);
  const [error, setError] = useState(false);
  const [succes, setSucces] = useState(false);
  const dispatch = useDispatch();

  const setUserData = (value, key) => {
    setSucces(false);
    let save = { ...userDetails };
    save[key] = value;
    setUserDetails(save);
  } 

  const onFinishUpload = (data) => {
    //let image = data.replace('.jpg', '_1360x1024.jpg');
    let image = data;
    setUserData(image, 'image')
  }

  useEffect(()=> {
    firebase.auth.onAuthStateChanged((user) => {
      getUserByEmail(user.email, (response) => {
        setUserDetails(response.data.user);
      })
    })
  }, []);

  const updateCompanyHandler = async (e) => {
    e.preventDefault();
    setError(false); setSucces(false);
    if (
      userDetails.firstName && userDetails.lastName
    ){
      updateUser(userDetails.email, userDetails, (response) => {
        setSucces('Updated sucessfully');
        getUserByEmail(userDetails.email, (response) => {
          dispatch(loginUserData(response.data.user, response.data.company));
        })
      })
    } else{
      setError('Please fill out all fields');
    }
  }

  return (
    userDetails ? (
      <div id="profile">
        <h1>Profile</h1>
        <div className="form">
          <DragDropInput onFinishUpload={ onFinishUpload } uploadPath="/users/" fileName={userDetails.email} type="image" file={ userDetails.image } accept={{'text/image': ['.png', '.jpg', '.jpeg']}}/>
          <div className="input"><label>E-mail</label><input type="text" readOnly="readOnly" value={ userDetails.email } /></div>
          <TextInput label="First Name" placeholder="Your name" value={ userDetails.firstName } onChange={ (e) => setUserData(e, 'firstName') }/>
          <TextInput label="Last Name" placeholder="Your last name" value={ userDetails.lastName } onChange={ (e) => setUserData(e, 'lastName') }/>
          <TextInput label="Job" placeholder="Your job in the company" value={ userDetails.job } onChange={ (e) => setUserData(e, 'job') }/>
          <TextInput label="Phone" placeholder="Your phone number" value={ userDetails.phone } onChange={ (e) => setUserData(e, 'phone') }/>
        </div>
        <input type="submit" name="submit" value="Save changes" onClick={(e) => {updateCompanyHandler(e)}}/>
        { succes && <span className="login-succes">Succes: {succes}</span> }
        { error && <span className="login-error">Error: {error}</span> }
      </div>
    ) : <Loading position="admin" />
  );
}

export default Profile;