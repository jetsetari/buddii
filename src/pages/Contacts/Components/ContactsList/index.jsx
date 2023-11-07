//libs
import React, { useState, useEffect } from "react";

//styling
import "./ContactsList.scss";

//Components
import Search from "@components/_default/Search";

function ContactsList({ contactList, activeClient, setActiveClient, createNewContact }) {

  const [search, setSearch] = useState('');

  return (
    <div id="contacts-list">
      <div className="search-client">
        <Search callback={setSearch}/>
      </div>
      <ul className="full-list">
        { 
          contactList.map((user, key) => {
            if ( user.firstName?.toLowerCase().includes(search?.toLowerCase()) 
              || user.lastName?.toLowerCase().includes(search?.toLowerCase()) 
              || user.email?.toLowerCase().includes(search?.toLowerCase())
              //|| user.extCompany?.toLowerCase().includes(search?.toLowerCase())
              || search === ''
             ) {
                return (
                  <li key={key} className={ (key === activeClient) ? 'active' : '' } onClick={ () => { setActiveClient(key) }} >
                    <div className="avatar" style={{backgroundImage: 'url('+user.image+')' }}>{ user.image ? '' : user.firstName.substring(0, 1)+''+user.lastName.substring(0, 1) }</div>
                    <span>{user.firstName + ' ' + user.lastName}</span>
                  </li>
                )
              }
            })
          }
      </ul>
      <div className="new-client">
        <div className="btn-new" onClick={ () =>{ createNewContact() } }>Create New Contact</div>
      </div>
    </div>
  );
}

export default ContactsList;