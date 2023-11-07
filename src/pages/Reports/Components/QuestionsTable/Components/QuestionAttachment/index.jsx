//libs
import React, {useEffect, useState} from "react";

//styling
import "./QuestionAttachment.scss";

import gitaar_1 from './images/gitaar-1.png';
import gitaar_2 from './images/gitaar-2.jpg';
import gitaar_3 from './images/gitaar-3.png';
import gitaar_4 from './images/gitaar-4.jpg';

function QuestionAttachment({ data }) {
  let images = [
    gitaar_1, gitaar_2, gitaar_3, gitaar_4 
  ];
  return (
    <div className="question-attachment">
      {
        images.map((value) => {
          return <div className="attachment" style={{ backgroundImage: `url(${value})` }} />
        })
      }
    </div>
  );
}

export default QuestionAttachment;