//@todo: deze nog

//libs
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
//import { useStores } from '../../../backend/hooks/useStores';
//styling
import './RegisterMail.scss';

//assets
import Google from "../../../assets/images/google.svg";
import { createInviteUser } from "@data/firebase/auth";
import { validateEmail, validatePassword } from '@data/helpers'
import { loginUserData } from "@data/redux/usersSlice";


import Loading from "@components/_default/Loading";


const RegisterMail = () => {
	const dispatch = useDispatch();
	const queryParams = new URLSearchParams(window.location.search);

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [company, setCompany] = useState('');
	const [role, setRole] = useState('');
	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');
	const [terms, setTerms] = useState(false);
	const [pasAnimatie, setPasAnimatie] = useState(true);
	const [pasAnimatie2, setPasAnimatie2] = useState(true);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);

	//const { uiStore, userStore } = useStores();
	let navigate = useNavigate();

	useEffect(() => {
		setFirstName(queryParams.get('firstName') ? queryParams.get('firstName') : 'Naam van add user');
		setLastName(queryParams.get('lastName') ? queryParams.get('lastName') :'Achternaam van add user');
		setRole(queryParams.get('role'));
		setEmail(queryParams.get('mail'));
		setCompany(queryParams.get('company'))
	},[])

	const handleSubmit = async e => {
		e.preventDefault(); setError(false);
	    if(validateFields()){
	    		let user = { firstName: firstName, lastName: lastName, email: email };
	      	createInviteUser(user, password, company, (callback) => {
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
		loading ? <Loading /> : (
			<section className="wrapper registration">
				<div className="bg-clip"></div>
				<article className="registration-container signup">
					<h1>Sign up to Buddii</h1>
						<p className="subtext">Complete your details below</p>
						<form noValidate='novalidate' onSubmit={handleSubmit}>
							<div className="register_form_grid">
								<div className="input">
									<label htmlFor="name">First Name</label>
									<input required className="in-input" type="text" name="name" id="name" value={firstName} onChange={(e) => setFirstName(e.currentTarget.value)} placeholder="example" />
								</div>
								<div className="input">
									<label htmlFor="last_name">Last Name</label>
									<input required className="in-input" type="text" name="last_name" id="last_name" value={lastName} onChange={(e) => setLastName(e.currentTarget.value)} placeholder="example" />
								</div>

								<div className="input email">
									<label htmlFor="email">Email</label>
									<input required className="in-input" type="email" name="email" id="email" value={email} readOnly placeholder="example@test.be" />
								</div>
								<div className="input">
									<label htmlFor="password">Password</label>
									<input required className="in-input" type={pasAnimatie ? "password" : "text"} name="password" id="password" value={password} onChange={(e) => setPassword(e.currentTarget.value)} placeholder="example" />
								</div>
								<div className="input">
									<label htmlFor="password2">Confirm Password</label>
									<input required className="in-input" type={pasAnimatie2 ? "password" : "text"} name="password2" id="password2" value={password2} onChange={(e) => setPassword2(e.currentTarget.value)} placeholder="example" />
								</div>
							</div>
							<div className="checkbox">
								<input required value={terms} onChange={(e) => setTerms(!terms)}type="checkbox" id="terms" />
								<label className="in-checkbox" htmlFor="terms">I agree with the <Link to="/terms">Terms and conditions</Link></label>
							</div>
							<input required type="submit" value="Register" />
						</form>
						{ error && <span className="login-error">Error: {error}</span> }
				</article>
			</section>
		)
	);
}

export default RegisterMail;
