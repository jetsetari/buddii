import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "@data/redux/usersSlice";
import { getUserByEmail } from "@data/firebase/firestore/getData";
import { loginUserData } from "@data/redux/usersSlice";

//DATA
import * as firebase from "@data/firebase";
import Authentication from "@data/routes";

function App() {
  const [authUser, setAuthUser] = useState(null);
  const user_store = useSelector(getUser);
  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth.onAuthStateChanged((user) => {
      setAuthUser(Boolean(user));
      if(Boolean(user) && !user_store){
        if(localStorage.getItem('isAuthenticated')){
          let localstorage_data = JSON.parse(localStorage.getItem('isAuthenticated'));
          dispatch(loginUserData(localstorage_data.data.user, localstorage_data.data.company));
        } else {
          getUserByEmail(user.email, (response) => {
            localStorage.setItem('isAuthenticated', JSON.stringify(response));
            dispatch(loginUserData(response.data.user, response.data.company));
          })
        }
      }
      if(!Boolean(user)){
        localStorage.removeItem('isAuthenticated');
      }
    })
  }, [authUser, user_store]);

  return (
    <>
      <Helmet>
        <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDbOkflzFX2y8DqZS4E1uf5rPcFfhxkubk&libraries=places"/>
      </Helmet>
      { authUser !== null ? (<Authentication signed={authUser} />) : (<div className="loading">Loading</div>)}
    </>
  );
}

export default App;
