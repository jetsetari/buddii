import React, { useEffect, useState } from "react";

import TextInput from "@components/_default/TextInput";
import Search from "@components/_default/Search";

import "./EditAudience.scss";
import { users, colors } from './data';
//import { useStores } from "../../../../../../backend/hooks/useStores";


const EditAudience = ({ audience, setAudience }) => {
  //const { uiStore, contactStore } = useStores();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setName(audience.titel ? audience.titel : '');
    setDescription(audience.description ? audience.description : '');
    setColor(audience.color ? audience.color : '');
    setContacts(audience.contacts ? audience.contacts : []);
  },[audience])

  useEffect(() => {
    setAudience({...audience,
      titel: name,
      description: description,
      color: color,
      contacts: contacts,
      //company: uiStore?.currentCompany?.id
    })
  }, [name, description, color, contacts])

  const handleContactClick = (item) => {
    if (!contacts.includes(item.id)){
      setContacts([...contacts, item.id])
    }else{
      setContacts(contacts.filter(array => {
        return array !== item.id
      }))
    }
  }

  // useEffect(() => {
  //   let names
  //   contactStore.contacts.map((contact) => {
  //     console.log(search);
  //     names = 
  //   })

  // }, [search])


  return (
    <div className="audience-edit">
      <TextInput label="Name" value={ name } onChange={(e) => setName(e)}placeholder="Name of your audience" />
      <TextInput label="Description" value={ description } onChange={(e) => setDescription(e)}placeholder="Description of your audience" />
      <div className="colors">
        { colors.map((setOfColors, key) => {
            return <div className={`color${ (color == setOfColors) ? ' selected' :  ''}`} style={{ backgroundColor: setOfColors }} onClick={() => setColor(setOfColors)}></div> 
          }) 
        }
      </div>

      {/*contactStore.contacts.length > 0 ? (
        <>
          <label>Search by name or email</label>
          <div className="search-items">

          <Search callback={setSearch}/>
          {contactStore.contacts.map((contact, key) => {
            if ( contact.firstName?.toLowerCase().includes(search?.toLowerCase()) 
              || contact.lastName?.toLowerCase().includes(search?.toLowerCase()) 
              || contact.email?.toLowerCase().includes(search?.toLowerCase())
              || search === '') {
              return (
                <div key={key} className={`item ${contacts.includes(contact.id) ? ' selected' : '' }`} onClick={() => handleContactClick(contact)}>
                  <div className="avatar" style={{backgroundImage: 'url('+contact.image+')' }} />
                  <div className="user-details">{ contact.firstName + ' ' + contact.lastName}</div>
                </div>
              )
            }
          })}
          </div>
        </>
      ):(
        <p>You don't have any contacts yet!</p>
      )*/}

    </div>
  );
}

export default EditAudience;
