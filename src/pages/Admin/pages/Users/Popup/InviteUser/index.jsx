import React, { useEffect, useState } from "react";

import TextInput from "@components/_default/TextInput";
import DropDown from "@components/_default/DropDown";

import "./InviteUser.scss";

const InviteUser = ({dataPull, setMailCallback, setFirstNameCallback, setLastNameCallback, setRoleCallback}) => {

  const [role, setRole] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const [error, setError] = useState(false);
  const [succes, setSucces] = useState(false);
  
  useEffect(() => {
    dataPull({firstName: name, lastName: lastName, email: email, role: role});
  }, [name, email, role, lastName])

  useEffect(() => {
    setError(false);
    setSucces(false);

    if (email){
      email !== '' && setMailCallback(email);
      name !== '' && setFirstNameCallback(name);
      lastName !== '' && setLastNameCallback(lastName);
      role !== '' && setRoleCallback(role);
    }

  }, [email, name, lastName, role])

  return (
    <div className="user-add">
      <TextInput label="First Name" onChange={setName} value={name} placeholder="Your name"/>
      <TextInput label="Last Name" onChange={setLastName} value={lastName} placeholder="Your last name"/>
      <TextInput label="E-mail" onChange={setEmail}  value={email} placeholder="Your e-mail" />
      {/*<DropDown options={[{ label: 'User', value: "user" }, { label: "Admin", value: 'admin' }]} value={ role } onChange={(e) => setRole(e.value)} label="Role" placeholder="Select role" />*/}
    </div>

  );
}

export default InviteUser;
