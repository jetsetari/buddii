//libs
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { validateEmail, validatePassword } from '@data/helpers'
import { setUser } from "@data/redux/usersSlice";

//styling
import './Signup.scss';

function CompanyDetails() {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [terms, setTerms] = useState(false)
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleSubmit = async e => {
    e.preventDefault(); setError(false);
    if(validateFields()){
      //@todo: Check if email in database
      const user = { firstName: firstName, lastName: lastName, email: email };
      dispatch(setUser(user));
      navigate('/register/companydetails', { state: { password: password } });
    }
  };

  const validateFields = () => {
    let _return = true; 
    if (!firstName || !lastName || !email) {
      _return = false; setError('Please fill out all fields');
    } else if (!validateEmail(email)){
      _return = false; setError('Your email is not an email-address');
    } else if (!validatePassword(password)){
      _return = false; setError('Password must contain one number and one special character');
    } else if (password !== password2) {
      _return = false; setError('Your password and confirmation password do not match.');
    } else if (!terms) {
      _return = false; setError('Please accept our terms and conditions');
    }
    return _return;
  }

  return (
    <section className="wrapper registration">
      <div className="bg-clip"></div>
      <div className="signup-flow">
        <div className="flow-box">
          <span className="num active">1</span>
          <i>Create Admin</i>
        </div>
        <div className="flow-box">
          <span className="num">2</span>
        </div>
      </div>
      <article className="registration-container signup">
        <h1>Sign up to Buddii</h1>
          <p className="subtext">Enter your details below</p>
          <form noValidate='novalidate' onSubmit={handleSubmit}>
            <div className="signup_form_grid">
              <div className="input">
                <label htmlFor="name">First Name</label>
                <input required className="in-input" type="text" name="name" id="name" value={firstName} onChange={(e) => setFirstName(e.currentTarget.value)} placeholder="John" />
              </div>
              <div className="input">
                <label htmlFor="last_name">Last Name</label>
                <input required className="in-input" type="text" name="last_name" id="last_name" value={lastName} onChange={(e) => setLastName(e.currentTarget.value)} placeholder="Appelseed" />
              </div>
              <div className="input email">
                <label htmlFor="email">Email</label>
                <input required className="in-input" type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.currentTarget.value)} placeholder="example@test.be" />
              </div>
              <div className="input">
                <label htmlFor="password">Password</label>
                <input required className="in-input" type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.currentTarget.value)} placeholder="Password" />
              </div>
              <div className="input">
                <label htmlFor="password2">Confirm Password</label>
                <input required className="in-input" type="password" name="password2" id="password2" value={password2} onChange={(e) => setPassword2(e.currentTarget.value)} placeholder="Confirm password" />
              </div>
            </div>
            <div className="checkbox">
              <input required value={terms} onChange={(e) => setTerms(!terms)}type="checkbox" id="terms" />
              <label className="in-checkbox" htmlFor="terms">I agree with the <Link to="/terms">Terms and conditions</Link></label>
            </div>
            <input required type="submit" value="Next" />
          </form>
          { error && <span className="login-error">Error: {error}</span> }
          <div className="signup-logins">
            <p className="login-links">Already have an account? <Link to="/login">Sign In</Link></p>
          </div>
      </article>
    </section>
  );
}

export default CompanyDetails;
