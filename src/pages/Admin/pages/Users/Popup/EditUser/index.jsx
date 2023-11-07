import React, { useEffect, useState, useCallback } from "react";

import TextInput from "../../../../../../components/_default/TextInput";
import DropDown from "../../../../../../components/_default/DropDown";
import DragDropInput from '../../../../../../components/_default/DragDropInput/DragDropInput';

import "./EditUser.scss";
import { observer } from "mobx-react-lite";

const EditUser = observer(({ user, dataPull }) => {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [job, setJob] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState({});

  useEffect(() => {
    setRole(user.role ? user.role : '');
    setEmail(user.email ? user.email : '');
    setName(user.firstName ? user.firstName : '');
    setLastName(user.lastName ? user.lastName : '');
    setJob(user.job ? user.job : '');
    setPhone(user.phone ? user.phone : '');
    setImage(user.image ? user.image : '');
  }, [user]);

  const onDropImage = useCallback((acceptedFiles) => {
    acceptedFiles.map((file) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        setImage(
         file,
        );
      };
      reader.readAsDataURL(file);
      return file;
    });
  }, []);

  useEffect(() => {
    dataPull({role: role, firstName: name, lastName: lastName, phone: phone, job: job, image: image});
  }, [role, email, name, lastName, phone, job, image])


  return (
    <div className="user-edit">
      <div className="input">
        <label>E-mail</label>
        <span className="description">{ user.email }</span>
      </div>
      <div className="user-edit-main">
        {/* <div className="user-edit-upload"> */}
        {/* {user.image ? (
          <p>{user.image}</p>
        ):( */}
            <DragDropInput onDrop={onDropImage} accept={{'image/jpeg': ['.jpeg', '.png']}}/>
        {/* )} */}
        {/* </div> */}
        <div className="user-edit-details">
          <TextInput label="First Name" value={ name } onChange={setName} placeholder={user.firstName ? user.firstName : 'Your first name'} />
          <TextInput label="Last Name" value={ lastName } onChange={setLastName} placeholder={user.lastName ? user.lastName : 'Your last name'} />
          <TextInput label="Job title" value={ job } onChange={setJob} placeholder={user.job ? user.job : "Your job title"} />
          <TextInput label="Phone number" value={ phone } onChange={setPhone} placeholder={user.phone ? user.phone : "Your phone number"} />
        </div>
      </div>
      <DropDown options={[{ label: 'User', value: "user" }, { label: "Admin", value: 'admin' }]} value={ role } onChange={(e) => setRole(e.value)} label="Role" placeholder="Select role" />
    </div>
  );
})

export default EditUser;
