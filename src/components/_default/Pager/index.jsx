import React from "react";

import "./Pager.scss";

const Pager = ({ current=1, max=3, setPager }) => {


  let pageItems = [];
  for (var i = 1; i <= max; i++) {
      pageItems.push(<div key={i} className={ `page`+(i === current ? ` page-current`: ``) }>{ i }</div>);
  }

  return (
  <div className="pager">
    { (current > 1) && <div className="btn-previous" onClick={() => current > 0 && setPager(current - 1)}></div> }
    { pageItems }
    { (max >= current) && <div className="btn-next" onClick={() => current < max && setPager(current + 1)}></div> }
  </div>
  );
}

export default Pager;