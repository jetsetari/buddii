//libs
import React, {useEffect, useState} from "react";

//styling
import "./QuestionNumeric.scss";

import LineChart from "@components/Charts/LineChart";

import { chart_data } from './data';


function QuestionNumeric({ data }) {

  const [answers, setAnswers] = useState(false);

  useEffect(() => {
    setAnswers(false);
    let _answers = {};
    _answers['colors'] = ['#009722', '#009722', '#FFAB2E'];
    _answers['title'] = false;
    _answers['data'] = [];
    console.log(data);
    data.answers.forEach((value, key) => {
      _answers['data'][key] = { label_image : value.contact.image, values: [value.answer], label: value.contact.firstName  }
    });
    console.log(chart_data);
    console.log(_answers);
    setAnswers(_answers);
    
  }, [data]);
  

  return (
    <div className="question-numeric">
      { answers && <LineChart chartdata={ answers } /> }
    </div>
  );
}

export default QuestionNumeric;