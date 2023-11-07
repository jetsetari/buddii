import React from "react";
import Checkbox from "react-custom-checkbox";

import "./Tickbox.scss";

function Tickbox({options, checked, onChange, value}) {
  return (
    <div className="tickbox-wrapper">
      <Checkbox
        onChange={ onChange }
        checked={checked}
        icon={
          <div className="tickbox-checked">
            <img src={require("./images/check.svg")} style={{ width: 24 }} alt="" />
          </div>
        }
        borderColor="#E1E1E1"
        borderWidth={ 1 }
        borderRadius={6}
        className="tickbox"
        size={20}
        label=""
      />
    </div>
  );
}

export default Tickbox;
