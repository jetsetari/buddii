//libs
import React, {useEffect, useState} from "react";

//styling
import "./QuestionMultiple.scss";
import LineChart from "@components/Charts/LineChart";

import { chart_data } from './data';

function QuestionMultiple({ data }) {

  return (
    <div className="question-numeric">
      <LineChart chartdata={ chart_data } />
    </div>
  );
}

export default QuestionMultiple;

