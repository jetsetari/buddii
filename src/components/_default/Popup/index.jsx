import React, { useState, useEffect, useRef } from "react";

import "./Popup.scss";

function Popup({children, title, onChange, closePopup, active, cancel = true, savePopup = true, saveTitle = "Save"  }) {
  const [popupTooHigh, setPopupTooHigh] = useState(false);
  const ref = useRef(null)


  useEffect(() => {
    if(ref.current.clientHeight < window.outerHeight/2) {
      setPopupTooHigh(true);
    }
  }, []);

  return (
    <div className={ 'main-popup' + (active ? ' active' : '') + (popupTooHigh ? ' big' : 'small') }>
      <div className="bg-close" onClick={() => {closePopup(false)} }/>
      <div className="popup-outer" ref={ref} >
        <div className="btn-close" onClick={() => {closePopup(false)} } />
        <h2>{ title }</h2>
        <div className="popup-inner">{children}</div>
        <>
          { (cancel || savePopup) && (
            <div className="popup-actions">
              <>{ savePopup && <div className="btn-save" onClick={(e) => onChange(e, closePopup)}>{ saveTitle }</div> }</>
              <>{ cancel && <div className="btn-cancel"  onClick={() => closePopup(false)}>Cancel</div> }</>
            </div>
          )}
        </>
      </div>
    </div>
  );
}

export default Popup;