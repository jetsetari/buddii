import React, { useEffect, useState, useCallback } from "react";

import TextInput from "@components/_default/TextInput";
import DropDown from "@components/_default/DropDown";
import DragDropInput from '@components/_default/DragDropInput/DragDropInput';


import "./EditContact.scss";
import createVatIdMask from 'text-mask-vat-id';
import DropInput from "@components/_default/DropInput";
import { getContact, getDropdownData, getCollectionFromCompany } from "@data/firebase/firestore/getData";

const EditContact = ({ contact, setContact }) => {
  const [contactDetails, setContactDetails] = useState(contact);
  const [labels, setLabels] = useState([]);
  const [error, setError] = useState(false);
  const [contactLabels, setContactLabels] = useState([]);

  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    setContactDetails(contact);
  }, [contact]);

  useEffect(() => {
    getDropdownData('extCompanies', 'name', (response) => {
      setCompanies(response);
    })
    getCollectionFromCompany('labels', (response) => {
      setLabels(response);
    })
  }, [])

  const setContactData = (value, key) => {
    let save = { ...contactDetails };
    save[key] = value;
    console.log(save);
    setContact(save);
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
            <TextInput label="Phone number" placeholder="Phone number" value={ contactDetails.phone } onChange={ (e) => setContactData(e, 'phone') }/>
          <DragDropInput onFinishUpload={ (e) => setContactData(e, 'image')  } uploadPath="/contacts/" fileName={false} type="image" file={ contactDetails.image } accept={{'text/image': ['.png', '.jpg', '.jpeg']}}/>
          <TextInput label="Job title" placeholder="Job title" value={ contactDetails.job } onChange={ (e) => setContactData(e, 'job') }/>
          <div className="full-width" style={{ marginTop: 20 }}>
            <DropInput selected={contact.labels} label="Labels" placeholder="Add you audience" items={labels}  onChange={ (e) => setContactData(e, 'labels') }/>
          </div>
          <div className="full-width company">
            <DropDown options={companies} value={ contactDetails.extCompany } onChange={ (e) => setContactData(e, 'extCompany') } label="Company" placeholder="Select company" />
          </div>
        </div>
      ) }
        {error && <span className="main-error">Error: {error}</span>}
      </div>
    </div>
  );
}

export default EditContact;
