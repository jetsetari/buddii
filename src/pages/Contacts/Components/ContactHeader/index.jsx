//libs
import React, { useState, useEffect } from "react";

//styling
import "./ContactHeader.scss";

function ContactHeader({ currentContact, setEditContactPopup }) {

  return (
    <div className="contact-headline">
        { currentContact &&
          <>
            <div className="contact-image" style={{backgroundImage: 'url('+currentContact.image+')' }}>{ currentContact.image ? '' : currentContact.firstName.substring(0, 1)+''+currentContact.lastName.substring(0, 1) }</div>
            <div className="contact-details">
              <div className="contact-name" style={{display: 'flex'}}>
                <span style={{marginRight: 10}} >{ currentContact.firstName + ' ' + currentContact.lastName}</span>
              </div>
              <div className="contact-labels">
                {currentContact.labels?.map((label, idx) => (
                  (!label.audience) && (<span className="label" style={{ backgroundColor: label.color+'30', color: label.color }} key={idx}>{label.titel}</span>)
                ))}
              </div>
              <span className="contact-subline"><strong>{ currentContact.job }</strong> - { currentContact.email }</span>
              <span className="contact-address">{/* currentContact.extCompany.address */}</span>
            </div>
          </>
        }
        <div className="btn-edit" onClick={ () => setEditContactPopup(currentContact) }></div>
    </div>
  );
}

export default ContactHeader;