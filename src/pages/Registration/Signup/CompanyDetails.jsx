//libs
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { optionsCountries, socials, optionsSector } from '@data/helpers/data'
import MaskedInput from 'react-text-mask';
import createVatIdMask from 'text-mask-vat-id';
import { useSelector } from "react-redux";
import { getUser } from "@data/redux/usersSlice";
import { createUser } from "@data/firebase/auth";
import { loginUserData } from "@data/redux/usersSlice";
import { useDispatch } from 'react-redux';
import Loading from "@components/_default/Loading";

//styling
import './Signup.scss';

//compontents
import DropDown from "@components/_default/DropDown";

function CreateAdmin(props) {
  const [name, setName] = useState('');
  const [employees, setEmployees] = useState('');
  const [vat, setVat] = useState('');
  const [website, setWebsite] = useState('');
  const [sku, setSku] = useState('');
  const [social, setsocial] = useState(null);
  const [country, setCountry] = useState('')
  const [sector, setSector] = useState('')
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { state } = useLocation();
  const navigate = useNavigate();

  const mask = createVatIdMask({ localeFormat: true });
  const user = useSelector(getUser);

  useEffect(() => {
    if(!user || !state.password){
      navigate('/register');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); setError(false);
    if(validateFields()){
      const company = { name: name, vat: vat, sector: sector, country: country, site: website, sku: Number(sku), found_on: social, employees: Number(employees) };
      if(user && state.password){
        setLoading(true);
        createUser(user, state.password, company, (callback) => {
          if(callback.type == 'success'){
            dispatch(loginUserData(callback.data.user, callback.data.company));
            navigate('/');
          } else {
            setError(callback.data);
          }
          setLoading(false);
        })
      } else {
        navigate('/register');
      }
    }
  }

  const validateFields = () => {
    let _return = true; 
    if (!name || !vat || !sector || !country || ! website || !sku || !social || !employees) {
      _return = false; setError('Please fill out all fields');
    }
    return _return;
  }

  const handleSocial = (val) => {
    setsocial(val)
  }

  return (
    loading ? <Loading /> : (
      <section className="wrapper registration">
        <div className="bg-clip"></div>
        <div className="signup-flow">
          <div className="flow-box">
            <span className="num">1</span>
          </div>
          <div className="flow-box">
            <span className="num active">2</span>
            <i>Company Details</i>
          </div>
        </div>
        <article className="registration-container signup">
          <h1>Sign up to Buddii</h1>
          <p className="subtext">Company details</p>
          <form noValidate="novalidate" onSubmit={handleSubmit}>
            <div className="signup_form_grid">
              <div className="input">
                <label htmlFor="company">Company Name</label>
                <input required className="in-input" type="text" name="company" id="company" value={name} onChange={(e) => setName(e.target.value)} placeholder="example" />
              </div>
              <div className="input">
                <label htmlFor="employees">Employees</label>
                <input required className="in-input" type="number" name="employees" id="employees" placeholder="0" value={employees} onChange={(e) => setEmployees(e.target.value)} />
              </div>
              <div className="input">
                <label htmlFor="vat">
                  <div className="info-label">VAT number</div>
                  <div className="info">
                    <span>VAT number must start with country code and after the company number<i></i></span>
                  </div>
                </label>
                <MaskedInput className="in-input" guide={false} name="vat" type="text" id="vat" required mask={mask} placeholder="BE 1234 567 890" onChange={e => setVat(e.target.value.toUpperCase())} />
              </div>
              <div className="input">
                <label>Sector</label>
                <DropDown options={optionsSector} onChange={(e) => setSector(e.value)} placeholder="Sector" />
              </div>
              <div className="input">
                <label htmlFor="website">Company website</label>
                <input required className="in-input" type="text" name="website" id="website" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://www.example.be" />
              </div>
              <div className="input">
                <label>Country</label>
                <DropDown options={optionsCountries} onChange={(e) => setCountry(e.value)} placeholder="Country" />
              </div>
              <div className="input">
                <label htmlFor="sku">SKU’s</label>
                <input required className="in-input" type="number" name="sku" id="sku" value={sku} onChange={(e) => setSku(e.target.value)} placeholder="example" />
              </div>
              <div className="signup_labels">
                <label>Where did you find us?</label>
                <div className="signup_socials">
                  {socials.map((item, index) => (
                    <div key={index} onClick={() => handleSocial(item.val)} className={social === item.val ? `signup_social signup_social_${item.val}` : `signup_social`}>
                      {item.img && <img src={item.img} alt={item.name} /> }
                      <p>{item.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <input type="submit" value="Finish" />
          </form>
          { error && <span className="login-error">Error: {error}</span> }
        </article>
      </section>
    )
  );
}

export default CreateAdmin;
