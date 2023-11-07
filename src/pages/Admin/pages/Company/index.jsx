//libs
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUser } from "@data/redux/usersSlice";
import * as firebase from "@data/firebase";
import { getUserByEmail, getCompany } from "@data/firebase/firestore/getData";
import { updateCompany } from "@data/firebase/firestore/updateData";
import { loginUserData } from "@data/redux/usersSlice";
import Loading from "@components/_default/Loading";

//styling
import "./Company.scss"

//Components
import TextInput from "@components/_default/TextInput";
import NumericInput from "@components/_default/NumericInput";
import DropDown from "@components/_default/DropDown";
import Tickbox from "@components/_default/Tickbox";
import Popup from "@components/_default/Popup";
import CropLogo from "./Popup/CropLogo";

//assets
import { optionsCountries, socials, optionsSector } from '@data/helpers/data'
import DragDropInput from "@components/_default/DragDropInput/DragDropInput";

const EditCompany = (props) => {
  const user_store = useSelector(getUser);
  const [companyDetails, setCompanyDetails] = useState(false);
  const [companyId, setCompanyId] = useState(false);
  const [invoiceAddress, setInvoiceAddress] = useState(false);
  const [companyAddress, setCompanyAddress] = useState(false);
  const [error, setError] = useState(false);
  const [succes, setSucces] = useState(false);

  //CROP DETAILS
  const [cropLogoPopup, setCropLogoPopup] = useState(false);
  
  const setCompanyData = (value, key) => {
    setSucces(false);
    let save = { ...companyDetails };
    save[key] = value;
    setCompanyDetails(save);
  } 

  useState(()=> {
    firebase.auth.onAuthStateChanged((user) => {
      if(user_store){
        setCompanyId(user_store.companies[0]);
        getCompany(user_store.companies[0], (response) => {
          setCompanyDetails(response);
        });
      }
    })
  }, [user_store]);

  const onFinishUpload = (data) => {
    //let image = data.replace('.jpg', '_1360x1024.jpg');
    let image = data;
    setCompanyData(image, 'image')
  }

  const updateCompanyHandler = async (e) => {
    e.preventDefault();
    setError(false); setSucces(false);
    if (
      companyDetails.name && companyDetails.vat && companyDetails.sku && 
      companyDetails.country && companyDetails.sector &&  companyDetails.site
      && companyId
    ){
      updateCompany(companyId, companyDetails, (response) => {
        setSucces('Updated sucessfully');
      })
    } else{
      setError('Please fill out all fields');
    }
  }

  return (
    <div id="company">
        { companyDetails ? (
          <>
            <h1>Main Details</h1>
            <div className="form">
              <TextInput label="Company name" placeholder="Your company name" value={ companyDetails.name } onChange={ (e) => setCompanyData(e, 'name') }/>
              <DragDropInput onFinishUpload={ onFinishUpload } uploadPath="/companies/" fileName={companyId} type="image" file={ companyDetails.image } accept={{'text/image': ['.png', '.jpg', '.jpeg']}}/>
              <TextInput label="VAT Number" placeholder="BE 012345678" value={ companyDetails.vat } onChange={ (e) => setCompanyData(e, 'vat') }/>
              <NumericInput label="SKU's" placeholder="0" value={ companyDetails.sku } onChange={ (e) => setCompanyData(e, 'sku')}/>
              <DropDown options={ optionsCountries } value={ companyDetails.country } onChange={ (e) => setCompanyData(e.value, 'country') } label="Country" placeholder="Select country" />
              <TextInput label="Company website" placeholder="https://example.com" value={ companyDetails.site } onChange={ (e) => setCompanyData(e, 'site') }/>
              <DropDown options={ optionsSector } value={ companyDetails.sector } onChange={ (e) => setCompanyData(e.value, 'sector') } label="Sector" placeholder="Select from list" />
              <NumericInput label="Employees" placeholder="0" value={ companyDetails.employees } onChange={ (e) => setCompanyData(e, 'employees') }/>
            </div>
            <h2>Invoice address</h2>
            <div className="form">
              <TextInput label="Address" placeholder="Address" value={ companyDetails.address } onChange={ (e) => setCompanyData(e, 'address') }/>
              <TextInput label="Postal Code" placeholder="Postal Code " value={ companyDetails.postalCode } onChange={ (e) => setCompanyData(e, 'postalCode') }/>
              <TextInput label="City" placeholder="City" value={ companyDetails.city } onChange={ (e) => setCompanyData(e, 'city') }/>
              <DropDown options={ optionsCountries } value={ companyDetails.invoiceCountry  } onChange={ (e) => setCompanyData(e.value, 'invoiceCountry') } label="Country" placeholder="Select country" />
            </div>
            <h2>Company address</h2>
            <label className="label-tickbox" onClick={ (e) => setCompanyData(!companyDetails.companyCheck, 'companyCheck') }><Tickbox checked={ companyDetails.companyCheck } /><span>Same as  invoice address</span></label>
            { !companyDetails.companyCheck && (
              <div className="form">
                <TextInput label="Address" placeholder="Address" value={ companyDetails.companyAddress } onChange={ (e) => setCompanyData(e, 'companyAddress') } />
                <TextInput label="Postal Code" placeholder="Postal Code " value={ companyDetails.companyPostal } onChange={ (e) => setCompanyData(e, 'companyPostal') } />
                <TextInput label="City" placeholder="City" value={ companyDetails.companyCity } onChange={ (e) => setCompanyData(e, 'companyCity') } />
                <DropDown options={ optionsCountries } value={ companyDetails.companyCountry  } onChange={ (e) => setCompanyData(e.value, 'companyCountry') } label="Country" placeholder="Select country" />
              </div>)}
             <input type="submit" name="submit" value="Save changes" onClick={(e) => {updateCompanyHandler(e)}}/>
            { succes && <span className="login-succes">Succes: {succes}</span> }
            { error && <span className="login-error">Error: {error}</span> }
          </>
        ) : <Loading position="admin" />
      }
     
    </div>
  );
}

export default EditCompany;