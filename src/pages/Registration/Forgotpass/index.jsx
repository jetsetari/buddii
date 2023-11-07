//libs
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
//import { useStores } from '../../../backend/hooks/useStores';


function Forgotpass() {
  const [email, setEmail] = useState('')

  //const { uiStore } = useStores();
  const [error, setError] = useState(false);
  const [succes, setSucces] = useState(false);

  let navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(false);
    setSucces(false);
    //uiStore.changePass(email, setError, setSucces);
    // navigate("/resetpass");
  }

  return (
    <section className="wrapper registration">
      <div className="bg-clip"></div>
      <article className="registration-container">
        <h1>Forgot Password</h1>
        <p className="subtext">Enter your email to recover your password</p>
        <form onSubmit={handleSubmit} >
          <div className="input">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.currentTarget.value)} placeholder="example@test.be" />
          </div>
          <input type="submit" value="Send me instructions" />
        </form>
        { error && <span className="login-error">Error: {error}</span> }
        { succes && <span className="login-succes">Succes: {succes}</span> }
        <Link className="login-links" to="/login">Back to sign in</Link>
      </article>
    </section>
  );
}

export default Forgotpass;
