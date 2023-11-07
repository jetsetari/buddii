import React from "react";
import Dropdown from 'react-dropdown';

import "./Dropdown3.scss";

function DropDown3({options, onChange, value, placeholder, lightmode=false}) {

  return (
    <div>
      <Dropdown options={options} onChange={onChange} value={value} placeholder={placeholder} className={lightmode ?'dropdown3 dropdown_lightmode' : 'dropdown3'}/>
    </div>
  );
}

export default DropDown3;
