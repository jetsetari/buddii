import React from "react";

import "./Loading.scss";

function Loading({ position = '' }) {
  return (
  	<div className={ 'loading-component '+position }>
    	<div className="loading-spinner">
    		<div></div><div></div>
    	</div>
    </div>
  );
}

export default Loading;