//libs
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
//import { useStores } from '../../../backend/hooks/useStores';


//assets

function Resetpass({location}) {
  const queryParams = new URLSearchParams(window.location.search);
  const oobCode = queryParams.get('oobCode');
  const [password, setPassword] = useState("")
  const [verify, setVerify] = useState("")
  const [pasAnimatie, setPasAnimatie] = useState(true)
  // const [pasAnimatie2, setPasAnimatie2] = useState(true)
  const [error, setError] = useState(false);
  let regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  let navigate = useNavigate();
  //const { uiStore } = useStores();

  useEffect(() => {
    if(!oobCode) {
      navigate('/forgotpass');
    }
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      password === verify &&
      regularExpression.test(password)
    ){
      //uiStore.fullResetPassword(oobCode, password, navigate)
    }else{
      errorHandler();
    }
   
  }

  const errorHandler = () => {
    if (!regularExpression.test(password)){
      setError('Password must contain one number and one special character');
    }else if (password !== verify) {
      setError('Your password and confirmation password do not match.');
    }
  }

  // const container = useRef(null);
  // const container2 = useRef(null);

  return (
    <section className="wrapper registration">
      <div className="bg-clip"></div>
      <article className="registration-container">
        <h1>Reset password</h1>
        <p className="subtext">Choose a new password</p>
        <form onSubmit={handleSubmit}>
          <div className="input">
            <label for="password">Password</label>
            <input type={pasAnimatie ? "password" : "text"} name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="example" />
          </div>

          <div className="input">
            <label for="verpassword">Verify password</label>
            <input type={pasAnimatie ? "password" : "text"} name="verpassword" id="password" value={verify} onChange={(e) => setVerify(e.target.value)} placeholder="example" />
          </div>
          <input type="submit" value="Reset Password" />
          { error && <span className="login-error">Error: {error}</span> }
        </form>
      </article>
    </section>
  );
}

export default Resetpass;
