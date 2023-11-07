import React, { useEffect, useRef, useState } from "react";
import TextInput from "@components/_default/TextInput";

import Tickbox from "@components/_default/Tickbox";
import Popup from "@components/_default/Popup";
import Cards from "@components/_default/Cards";
import { getAppointmentsFromContact, getSlideshows, getCollectionFromCompany } from "@data/firebase/firestore/getData";
import { updateContact } from "@data/firebase/firestore/updateData";
import { saveAppointmentDone } from "@data/firebase/firestore/saveData";

import moment from "moment";
import { findInList } from '@data/helpers';

import AddAppointment from "../AddAppointment";
import "./UserDetails.scss";

const UserDetails = ({ contact, header=true, updateContactData }) => {
  const [appointmentList, setAppointmentList] = useState(false);

  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [slideshows, setSlideshows] = useState(false);
  const [note, setNote] = useState("");
  const [labels, setLabels] = useState(false)

  useEffect(() => {
    getSlideshows(false, (response) => {
      setSlideshows(response);
    })
    getCollectionFromCompany('labels', (response) => {
      setLabels(response);
    })
  }, [])

  useEffect(() => {
    setAppointmentList(false);
    contact && getAppointmentsFromContact(contact.id, (response) => {
      setAppointmentList(response);
    });
    contact && setNote(contact.note ? contact.note : '')
  }, [contact]);

  const switchCheck = (e, id) => {
    saveAppointmentDone(id, e, (callback) => {})
  }


  return (
    <div className="user-details">
    { contact &&
       !header &&
        <Cards title="Add apointment" active={appointmentOpen} closeCard={setAppointmentOpen}>
          <AddAppointment list={false} contact={contact}/>
        </Cards>
      }
      <div className="user-box">
       { contact && header &&
          <div className="user-headline">
            <div className="user-image" style={{backgroundImage: 'url('+contact?.image+')' }}></div>
            <div className="user-details">
              <span className="user-name">{ contact.name }</span>
              <span className="user-subline"><strong>{ contact.companyId.name }</strong> - {contact.email}</span>
              <span className="user-address">{ contact.companyId.location.address }</span>
            </div>
          </div>
        }
      </div>
      { (appointmentList && appointmentList.length) ? (
        <div className="user-box">
          {/* !header && <div className="btn-add" onClick={ () => setAppointmentOpen(true) } /> */}
          <h3>Appointments</h3>
          <div className="user-appointments">
            {appointmentList.map((appointment, idx) => {
              return (
                <div className={`appointment ${ (moment(appointment.date.toDate()).format('DDMMYYYY') == moment().format('DDMMYYYY')) ? 'now' : '' }`} key={ idx }>
                  <Tickbox onChange={ (e) => { switchCheck(e, appointment.id) } } checked={ appointment.done } />
                  <span className="app-slideshow">{ slideshows && findInList(slideshows, 'id', appointment.slideshow, ['name']) }</span>
                  <span className="app-date">{ moment(appointment.date.toDate()).format('D MMM ') }</span>
                  <span className="app-time">{ moment(appointment.date.toDate()).format('h:mm') }</span>
                  {/*<a href="#" className="btn-edit" onClick={ () => setAppointmentOpen(true) }></a>*/}
                </div>
              )
            })}
          </div>
        </div>
      ) : <></> }
      { contact && contact.labels && (
        <div className="user-box">
          <h3>Labels</h3>
          <div className="user-audience">
            { labels && contact.labels.map((label, idx) => (
               <div className="label" key={idx} style={{ backgroundColor: findInList(labels, 'id',label, ['color']), color: '#040415' }}>{ findInList(labels, 'id',label, ['name']) }</div>
            ))}
          </div>
        </div>
      )}
      <div className="user-box">
        <h3>Notes</h3>
          <TextInput keydown={true} value={ note } placeholder="Notes for this contact" onChange={setNote} className="user-note" onBlur={ () => { updateContactData({note:note}) } } />
      </div>
    </div>
  );
}

export default UserDetails;
