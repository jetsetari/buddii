import React from "react";

import "./TextInput.scss";

function TextInput({ value, placeholder="", label, onChange, onBlur=false, keydown = false, disabled = false}) {

    const handleKeyPress = (e) => {
      if(e.keyCode === 13){
        e.target.blur(); 
      }
    }

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
            <input type="text" className="text-input" id={ 'in-'+slugify(label) } disabled={ disabled } onBlur={() => onBlur && onBlur()} name="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={ placeholder }  onKeyDown={(e) => keydown && handleKeyPress(e)}/>
        </div>
    );
}

export default TextInput;