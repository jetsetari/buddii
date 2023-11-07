import React from "react";

import "./Cards.scss";

function Cards({children, title, closeCard, active, save = false, onSubmit }) {

return (
    <>
      <div className={ 'main-card-bg' + (active ? ' active' : '') } onClick={() => closeCard(false)} />
      <div className={ 'main-card' + (active ? ' active' : '') }>
        <h2>{ title }</h2>
        <div className="btn-close" onClick={() => closeCard(false)}>Close</div>
        <div className="card-inner">
          {children}
        </div>
        {save && (
          <div className="card-actions">
            <span className="btn-save" onClick={(e) => onSubmit(e)}>Save</span>
            <span className="btn-cancel" onClick={() => closeCard(false)}>Cancel</span>
          </div>
        )}
      </div>
    </>
  );
}

export default Cards;