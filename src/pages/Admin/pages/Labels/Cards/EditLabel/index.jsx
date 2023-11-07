import React, { useEffect, useState } from "react";

import TextInput from "../../../../../../components/_default/TextInput";

import "./EditLabel.scss";
import { colors } from './data';


const EditLabel = ({ label, setLabel, error }) => {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");
  //const [contacts, setContacts] = useState([]);

  useEffect(() => {
    setName(label.name ? label.name : '');
    setDescription(label.description ? label.description : '');
    setColor(label.color ? label.color : '');
    //setContacts(label.contacts ? label.contacts : []);
  },[label])

  useEffect(() => {
    setLabel({...label,
      name: name,
      description: description,
      color: color,
      //contacts: contacts,
    })
  }, [name, description, color])

  // const handleContactClick = (item) => {
  //   if (!contacts.includes(item.id)){
  //     setContacts([...contacts, item.id])
  //   }else{
  //     setContacts(contacts.filter(array => {
  //       return array !== item.id
  //     }))
  //   }
  // }
  return (
    <div className="label-edit">
      <TextInput label="Name" value={ name } onChange={(e) => setName(e)} placeholder="Name of your label" />
      <TextInput label="Description" value={ description } onChange={(e) => setDescription(e)} placeholder="Description of your label" />
      <label>Color</label>
      <div className="colors">
        { colors.map((setOfColors, key) => {
            return <div key={key} className={`color${ (color === setOfColors) ? ' selected' :  ''}`} style={{ backgroundColor: setOfColors }} onClick={() => setColor(setOfColors)}></div> 
          }) 
        }
      </div>
      { error && <span className="main-error">{error}</span> }
    </div>
  );
}

export default EditLabel;


