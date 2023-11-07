//libs
import React, {useEffect, useState} from "react";

//styling
import "./QuestionSingle.scss";
import LineChart from "@components/Charts/LineChart";

import { chart_data } from './data';

function QuestionSingle({ data }) {

  return (
    <div className="question-numeric">
      <LineChart chartdata={ chart_data } />
    </div>
  );
}

export default QuestionSingle;