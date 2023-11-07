import React, { useEffect, useState, useCallback } from "react";

import TextInput from "@components/_default/TextInput";
import DropDown from "@components/_default/DropDown";
import DragDropInput from '@components/_default/DragDropInput/DragDropInput';
import MaskedInput from 'react-text-mask';
import { WithContext as ReactTags } from 'react-tag-input';

import "./EditContact.scss";
import { observer } from "mobx-react-lite";
import createVatIdMask from 'text-mask-vat-id';
//import { useStores } from "@backend/hooks/useStores";
import DropInput from "@components/_default/DropInput";
//import ExtCompany from "@backend/models/extCompany";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

import { getContact, getCollectionFromCompany } from "@data/firebase/firestore/getData";

const EditContact = ({ contact, setContact }) => {
  const [contactDetails, setContactDetails] = useState(contact);
  const [error, setError] = useState(false);

  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    setContactDetails(contact);
  }, [contact]);

  useEffect(() => {
    getCollectionFromCompany('extCompanies', (response) => {
      setCompanies(response);
    })
  })

  const onFinishUpload = () => {
    console.log(contact);
    //console.log(data, contactList[activeClient], activeClient); 
    //updateContactData({ image: data });
    // //let image = data.replace('.jpg', '_1360x1024.jpg');
    // console.log(id);
    // getContact(id, (response) => {
    //   console.log(response);
    //   setContact(response);
    //   setContactDetails(response);
    //   setContactData(data, 'image');
    // })
  }

  const setContactData = (value, key) => {
    //setSucces(false);
    let save = { ...contactDetails };
    save[key] = value;
    setContact(save);
    console.log(save);
    setContactDetails(save);
  } 


  return (
    <div className="contact-edit">
      <div className="contact-edit-main">
      { contactDetails && (
        <div className="contact-edit-details">
          
          <TextInput label="First Name" placeholder="Contact name" value={ contactDetails.firstName } onChange={ (e) => setContactData(e, 'firstName') }/>
          <TextInput label="Last Name" placeholder="Contact last name" value={ contactDetails.lastName } onChange={ (e) => setContactData(e, 'lastName') }/>
          <TextInput label="Email" placeholder="Contact email" value={ contactDetails.email } onChange={ (e) => setContactData(e, 'email') }/>
          <DragDropInput onFinishUpload={ (e) => setContactData(e, 'image')  } uploadPath="/contacts/" fileName={false} type="image" file={ contactDetails.image } accept={{'text/image': ['.png', '.jpg', '.jpeg']}}/>

          <div className="full-width">
            {/* <TextInput label="Audiences" value={ audiences } onChange={setAudiences} placeholder={'Audiences'} /> */}
            {/* <DropInput selected={contact.audiences} label="Audiences" placeholder="Add you audience" items={audienceSuggestions} onChange={setAudiences}/>*/}
          </div>
          <TextInput label="Job title" placeholder="Job title" value={ contactDetails.job } onChange={ (e) => setContactData(e, 'job') }/>
          <TextInput label="Phone number" placeholder="Phone number" value={ contactDetails.phone } onChange={ (e) => setContactData(e, 'phone') }/>

          <div className="full-width company">
            <DropDown options={companies} value={ extCompany.name } onChange={(e) => setExtCompany(e)} label="Company" placeholder="Select company" />

            {/* createCompany ? (
              <div>
                <TextInput label="Company" value={ companyName } onChange={setCompanyName} placeholder="Name of your company" />
                <MaskedInput className="in-input" guide={false} name="vat" type="text" id="vat" label="VAT" required mask={mask} placeholder="BE 1234 567 890" onChange={e => setVat(e.target.value.toUpperCase())} />
                <GooglePlacesAutocomplete selectProps={{
                  value: companyAddress,
                  onChange: setCompanyAddress
                }}/>
                <span className="btn-create" onClick={ () => {setCreateCompany(false);}}>Select existin company</span>
                <button onClick={ (e) => {createExtCompany(e)}}>Save company</button>
              </div>
              ) : (
              <>
                <DropDown options={companies} value={ extCompany.label } onChange={(e) => setExtCompany(e)} label="Company" placeholder="Select company" />
                <span className="btn-create" onClick={ () => setCreateCompany(true) }>Create new company</span>
              </>)
            */}
          </div>
        </div>
      ) }
        {error && <span className="main-error">Error: {error}</span>}
      </div>
    </div>
  );
}

export default EditContact;
