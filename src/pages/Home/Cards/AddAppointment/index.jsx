import React, { useEffect, useState } from "react";
import DropDown from "@components/_default/DropDown";
import Search from "@components/_default/Search";

import { contacts, userList, slideshows, time, dates } from './data';

import { SelectDatepicker } from 'react-select-datepicker';
import ReactTimePicker from "react-ts-timepicker";
import "./AddAppointment.scss";
import { getDropdownData, getCollectionFromCompany } from "@data/firebase/firestore/getData";
import { saveAppointment } from "@data/firebase/firestore/saveData";

import moment from "moment";

const AddAppointment = ({list = true, contact, closeAppointments}) => {

  //const {uiStore, appointmentStore, companyStore, slideshowStore, contactStore,} = useStores();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [selectedSlideshow, setSelectedSlideshow] = useState('');
  const [selectedContact, setSelectedContact] = useState('');
  const [selectedUserList, setSelectedUserList] = useState('');
  const [employees, setEmployees] = useState([]);
  const [slideshows, setSlideshows] = useState([]);
  const [contacts, setContacts] = useState([]);

  const [visible, setVisible] = useState(false);
  const [maxDate, setMaxDate] = useState(new Date());
  const [error, setError] = useState(false);
  const [success, setSucces] = useState(false);

  useEffect(() => {

  }, [])

  const addAppointmentHandler = async (e) => {
    setError(false);
    if(selectedSlideshow == '' || selectedContact == '' || selectedUserList == ''){
      setError('Please fill in all fields');
    } else {
      setSucces('Saving...');
      let date = new Date(selectedDate);
      let time = new Date(selectedTime);
      let day = date.getDate();
      let month = date.getMonth();
      let year = date.getFullYear();
      let hours = time.getHours();
      let minutes = time.getMinutes();
      let saveTheDate = new Date(year, month, day, hours, minutes, 0, 0);

      saveAppointment(saveTheDate, selectedSlideshow.value, selectedContact, selectedUserList.value, (response) => {
        setSucces(false);
        closeAppointments();
      });
    }
    e.preventDefault();
  }

  useEffect(() => {
    getDropdownData('slideshows', 'name', (response) => {
        setSlideshows(response);
    })
    getDropdownData('users', 'email', (response) => {
        setEmployees(response);
    })
    getCollectionFromCompany('contacts', (response) => {
        setContacts(response);
    })
  }, [])

  return (
    <div className="add-apointment">
      <div className="date-select">
        <SelectDatepicker selectedDate={selectedDate} onDateChange={setSelectedDate} />
      </div>
      <div className="time-select">
        <label>Time</label>
        <ReactTimePicker onChange={setSelectedTime} value={selectedTime} step={5} timeFormat={'HH:mm'} />
      </div>
      <hr />
      <DropDown options={slideshows} value={selectedSlideshow} onChange={(e) => setSelectedSlideshow(e)} placeholder="Slideshow" />
      <DropDown options={employees} value={selectedUserList} onChange={(e) => setSelectedUserList(e)} placeholder="Team Member" />
      <hr />
      {list === true ?
        <div className="contacts">
          {/*<div className="search-contact">
            <Search />
            <button>Add contact</button>
          </div>*/}
          <div className="contact-results">
            { contacts.map((item, index) => (
                <div className={ (selectedContact == item.id ? "contact selected" : "contact") } onClick={() => setSelectedContact(item.id)} key={index}>
                  <div className="contact-image" style={{backgroundImage: 'url('+item.image+')' }}></div>
                  <span className="contact-name">{item.firstName + ' ' + item.lastName}</span>
                </div>
              )) }
          </div>
          { success && <span className="main-succes">{ success }</span> }
          { error && <span className="main-error">{ error }</span>  }
          <button className="btn-save" onClick={ (e) => addAppointmentHandler(e) }>Add appointment</button>
        </div>
      :
        <div className="contacts">
          <div className="contact-results">
              <div className={ "contact selected" }>
                <div className="contact-image" style={{backgroundImage: `url(${contact.image})` }}></div>
                <span className="contact-name">{contact.firstName + ' ' + contact.lastName}</span>
              </div>
          </div>
          { success && <span className="main-succes">{ success }</span> }
          { error && <span className="main-error">{ error }</span>  }
          <button onClick={ (e) => addAppointmentHandler(e) }>Add appointment</button>
        </div>
      }
    </div>
  );
}

export default AddAppointment;
