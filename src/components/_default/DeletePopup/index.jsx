import React from "react";

import "./DeletePopup.scss";

function DeletePopup({title = 'this item', subject, closePopup, active, onChange, item  }) {

return (
  active?.role !== "admin" || !active.role  ? (
      <div className={ 'delete-popup' + (active ? ' active' : '') }>
      <div className="bg-close" onClick={() => closePopup(false)} />
      <div className="popup-outer">
        <div className="popup-inner">
          <div className="delete-message">Move { subject } to bin</div>
          <div className="delete-areyousure">Are you sure you want to delete <strong>{ active?.email ? active?.email : active }?</strong> You can’t undo this action.</div>
        </div>
        <>
          <div className="popup-actions">
            <div className="btn-delete" onClick={() => {onChange(item ? item : active); closePopup(false);}}>Delete</div>
            <div className="btn-cancel"  onClick={() => closePopup(false)}>Cancel</div>
          </div>
        </>
      </div>
    </div>
  ):(
    <div className={ 'delete-popup' + (active ? ' active' : '') }>
    <div className="bg-close" onClick={() => closePopup(false)} />
    <div className="popup-outer">
      <div className="popup-inner">
        <div className="delete-message">Non deletable user</div>
        <div className="delete-areyousure">This user is an <strong>admin!</strong> You can't delete this user, please change his role and try again.</div>
      </div>
      <>
        <div className="popup-actions">
          <div className="btn-cancel"  onClick={() => closePopup(false)}>Cancel</div>
        </div>
      </>
    </div>
  </div>
  )
)

}

export default DeletePopup;