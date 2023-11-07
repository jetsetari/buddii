import React from "react";
import Dropdown from 'react-dropdown';

import "./SmallDropdown.scss";

function SmallDropdown({options, onChange, value, placeholder, lightmode=false}) {

  return (
    <div>
      <Dropdown options={options} onChange={onChange} value={value} placeholder={placeholder} className={lightmode ?'small-dropdown lightmode' : 'small-dropdown'}/>
    </div>
  );
}

export default SmallDropdown;
