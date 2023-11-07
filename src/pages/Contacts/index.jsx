//libs
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUser } from "@data/redux/usersSlice";
import { getQuestions, getUserAnswers } from "@data/firebase/firestore/getData";

//styling
import './Contacts.scss';

//components

import UserDetails from "../Home/Cards/UserDetails";
import EditContact from "./Popup/EditContact";
import ContactsList from "./Components/ContactsList";
import ContactHeader from "./Components/ContactHeader";
import ContactStats from "./Components/ContactStats";

import { getContacts } from "@data/firebase/firestore/getData";
import { updateContact } from "@data/firebase/firestore/updateData";
import { removeDuplicates } from '@data/helpers'
import { getSlideshowsById, getSlideshowLogs } from "@data/firebase/firestore/getData";
import Loading from "@components/_default/Loading";

//data
import Popup from "@components/_default/Popup";

const Contacts = () => {
  const user_store = useSelector(getUser);
  const [contactList, setContactList] = useState(false);
  const [activeClient, setActiveClient] = useState(0);
  const [slideshows, setSlideshows] = useState(false);
  const [selectCompany, setSelectCompany] = useState('');
  const [editContactPopup, setEditContactPopup] = useState(false);
  const [contact, setContact] = useState(false);
  const [newContact, setNewContact] = useState(false);
  
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [slideshowLogs, setSlideshowLogs] = useState(false);

  const [savingContact, setSavingContact] = useState(false);
  const [error, setError] = useState(false);

  const getContactData = () => {
    setLoading(true);
    getContacts((response) => {
      setLoading(false);
      setSavingContact(false);
      setContactList(response);
    });
  }

  useEffect(() => {
    setSlideshows(false);
    contactList[activeClient] && getUserAnswers(contactList[activeClient].id, (response) => {
      let arr_slideshows = [];
      response.forEach((value, key) => {
        arr_slideshows.push(value.slideshow);
      })
      setAnswers(response);
      arr_slideshows = removeDuplicates(arr_slideshows);
      if(arr_slideshows.length){
        getSlideshowLogs(arr_slideshows, contactList[activeClient].id, (callback) => {
          setSlideshowLogs(callback);
        })
      }
      
      getSlideshowsById(arr_slideshows, (response) => {      
        getQuestions((_question) => {
          setSlideshows(response);
          setQuestions(_question);
        })
      })
    });
  }, [activeClient, user_store, contactList]);

  useEffect(() => {
    getContactData();
  }, []);

  const updateContactData = (data) => {
    setError(false);
    console.log(data);
    if(!data.firstName || !data.lastName || !data.email) {
      setSavingContact(false);
      setError('Fill in all fields');
    } else {
      let _id = (editContactPopup.id) ? editContactPopup.id : false;
      updateContact(_id, data, (response) => {
        setSavingContact('Saved');
        setEditContactPopup(false);
        getContactData();
      })
    }
  };
  
  const updateContactPopup = () => {
    setSavingContact('Saving...');
    updateContactData(contact);
  }

  const createNewContact = () => {
    setNewContact({ firstName: '', id: false, lastName: '', labels: [], email: '', job: '', phone: '', extCompany: '' });
    setEditContactPopup(true);
  }

  return (
    <div id="contacts">
      { contactList.length ? (
        <>
          <Popup title="New contact" cancel={ true } active={ editContactPopup } onChange={ updateContactPopup } closePopup={ setEditContactPopup } >
            <EditContact setContact={setContact} contact={ editContactPopup } />
            { savingContact && <span className="main-succes">{ savingContact }</span> }
            { error && <span className="main-error">{ error }</span> }
          </Popup>
          <ContactsList createNewContact={createNewContact} contactList={contactList} activeClient={activeClient} setActiveClient={setActiveClient}  />
          <div id="client-details">
            <ContactHeader currentContact={ contactList[activeClient] } setEditContactPopup={setEditContactPopup} />
            <ContactStats slideshows={ slideshows } answers={answers} slideshowLogs={slideshowLogs} questions={ questions } />
          </div>
          <div id="client-actions">
            {contactList[activeClient] && <UserDetails updateContactData={ updateContactData } contact={ contactList[activeClient] } header={ false }  />}
          </div>
        </>
      ) : (
        loading ? (
          <Loading />
        ) : (
          <div className="no-contacts">
            <div className="btn-firstcontact" onClick={ () => setEditContactPopup(true) }>No contacts yet, <span>Create first contact</span></div>
          </div>
        ))
      }
    </div>
  );
}

export default Contacts;