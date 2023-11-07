//libs
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '@data/helpers'
import { loginUser } from "@data/firebase/auth";
import { loginUserData } from "@data/redux/usersSlice";
import { useDispatch } from 'react-redux';
import Loading from "@components/_default/Loading";

//styling
import './Login.scss';

const Login = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async e => {
    e.preventDefault(); setError(false);
    if(validateFields()){
      setLoading(true);
      loginUser(email, password, (callback) => {
        if(callback.type == 'success'){
          dispatch(loginUserData(callback.data.user, callback.data.company));
          navigate('/');
        } else {
          setError(callback.data);
        }
        setLoading(false);
      })
    }
  };

  const validateFields = () => {
    let _return = true; 
    if (!password || !email) {
      _return = false; setError('Please fill out all fields');
    } else if (!validateEmail(email)){
      _return = false; setError('Your email is not an email-address');
    }
    return _return;
  }

  return (
    loading ? <Loading /> : (
      <section className="wrapper registration">
        <div className="bg-clip"></div>
        <article className="registration-container">
          <h1>Sign in to Buddii</h1>
          <p className="subtext">Enter your details below</p>
          <form onSubmit={handleSubmit}>
            <div className="input">
              <label className="in-input">Username or Email</label>
              <input type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.currentTarget.value)} placeholder="example@test.be" />
            </div>
            <div className="input">
              <label className="in-input">Password</label>
              <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.currentTarget.value)} placeholder="Password" />
            </div>
            { error && <span className="login-error">Error: {error}</span> }
            <input type="submit" className="btn-submit loading" value="Login" />
          </form>
          <Link to="/register" className="btn-signup">Don't have an account? <span>Sign up</span></Link>
          <Link className="login-links" to="/forgotpass">Forgot Password?</Link>
        </article>
      </section>
    )
  );
}

export default Login;