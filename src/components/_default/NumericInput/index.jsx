import React from "react";

import "./NumericInput.scss";

function NumericInput({ value, placeholder="", label, onChange}) {

    const slugify = (text) => {
      const from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;"
      const to = "aaaaaeeeeeiiiiooooouuuunc------"
      const newText = text?.split('').map(
        (letter, i) => letter.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i)))
      return newText?.toString().toLowerCase().trim().replace(/\s+/g, '-')
        .replace(/&/g, '-y-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-');
    }

    return (
        <div className="input text">
            { label ? (<label htmlFor={ 'in-'+slugify(label) }>{ label }</label>) : <></> }
            <input type="number" className="text-input" id={ 'in-'+slugify(label) } name="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={ placeholder } />
        </div>
    );
}

export default NumericInput;