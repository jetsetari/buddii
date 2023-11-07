//libs
import React, {useEffect, useState} from "react";
import moment from 'moment';
import { getCollectionFromCompany } from "@data/firebase/firestore/getData";
import { saveAppointmentDone } from "@data/firebase/firestore/saveData";
import { deleteDocFromCollection } from "@data/firebase/firestore/deleteData";
import { findInList } from '@data/helpers';

//styling
import "./Appointment.scss";


//assets
import Tickbox from "@components/_default/Tickbox";

const Appointment = ({openSlideshow, item, date, slideshows, contacts, closeAppointments}) => {
  const [currentDate, setCurrentDate] = useState(false);
  const [submenu, setSubmenu] = useState(false);

  const switchCheck = (e, id) => {
    saveAppointmentDone(id, e, (callback) => {})
  }

  const removeAppointment = (id) => {
    deleteDocFromCollection('appointments', id, (callback) => {
      closeAppointments();
    })
  }

  return (
    slideshows && contacts && (
      <>
        { (moment(item.date.toDate()).format('DD/MM/YYYY') === date) ? (
          <div className="appointment">
            <div className="a-time">
              <hr/><hr/>
                <span>{moment(item.date.toDate()).format('hh:mm')}</span>
              <hr/><hr/>
            </div>
            <div className="a-box" >
              <div className="a-picture" onClick={ ()=> {} } style={{backgroundImage: `url(${ findInList(contacts, 'id',item.contact, ['image']) })` }}></div>
              <div className="a-client">
                <span className="a-name">{ findInList(contacts, 'id',item.contact, ['firstName']) } { findInList(contacts, 'id',item.contact, ['lastName']) }</span>
                <span className="a-company">{ findInList(contacts, 'id',item.contact, ['email']) }</span>
              </div>
              <div className="a-info">
                <div className="a-submenu" onClick={() => setSubmenu(prevVal => (!prevVal ? item.id : false) ) }></div>
                {
                  (submenu == item.id) && (
                    <div className="submenu">
                      <div className="sub-item item-delete" onClick={ () => { removeAppointment(item.id) } }>Delete</div>
                    </div>
                  )
                }
                <a href="#" onClick={ () => openSlideshow(item.slideshow, item.contact) }  className="play-slideshow"></a>
                <div className="a-user" style={{backgroundImage: `url(${ slideshows && findInList(slideshows, 'id', item.slideshow, ['cover'])?.replace('.jpg', '_1360x1024.jpg') })` }}></div>
                {/* <div className="a-slideshow"></div>*/}
              </div>
            </div>
            <div className="a-done">
              <Tickbox onChange={ (e) => { switchCheck(e, item.id) } } checked={ item.done } />
            </div>
          </div>
        ) : <></> }
      </>
    )
  );
};

export default Appointment;