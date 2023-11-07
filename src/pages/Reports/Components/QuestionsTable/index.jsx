//libs
import React, { useState, useEffect } from "react";

//styling
import "./QuestionsTable.scss";
import { getAnswersLogsReports } from "@data/firebase/firestore/getData";

import QuestionNumeric from "./Components/QuestionNumeric";
import QuestionMultiple from "./Components/QuestionMultiple";
import QuestionSingle from "./Components/QuestionSingle";
import QuestionAttachment from "./Components/QuestionAttachment";
import QuestionLong from "./Components/QuestionLong";
import QuestionDate from "./Components/QuestionDate";

const questionTypes = {
  numeric: <QuestionNumeric />,
  multiple: <QuestionMultiple />,
  single: <QuestionSingle />,
  image: <QuestionAttachment />,
  long: <QuestionLong />,
  date: <QuestionDate />
};


const getQuestionType = (type, data) => {
  //return <QuestionLong data={data} />;
  let _return = false;
  switch(type){
    case 'numeric' : _return = <QuestionNumeric data={data} />; break;
    case 'multiple' :_return = <QuestionLong data={data} />; break;  // _return = <QuestionMultiple data={data} />; break;
    case 'single' : _return = <QuestionLong data={data} />; break;  //_return = <QuestionSingle data={data} />; break;
    case 'image' : _return = <QuestionAttachment data={data} />; break;
    case 'long' : _return = <QuestionLong data={data} />; break;
    case 'date' : _return = <QuestionDate data={data} />; break;  
  }
  return _return;
}


function QuestionsTable({ currentSlideshow, questions }) {

  const [activeKey, setActiveKey] = useState(0);
  const [_questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAnswersLogsReports(currentSlideshow.id, (response) =>{
      setQuestions(response);
      setLoading(false);
    });
  }, [currentSlideshow])

  return (
    <div className="q-table-wrapper">
      { loading ? <span className="message">Loading data...</span> : (
        <>
        { _questions.length && _questions[activeKey] ? (
          <div className="questions-table">
            <div className="table-wrapper questions">
                <h2>Questions</h2>
                <ul className="question-list">
                  {
                    _questions.map((question, key)=> {
                      return (<li key={key} className={`icon type-${ question.type } ${ key == activeKey ? ' active' : '' }`} onClick={ () => setActiveKey(key) }>{ question.question }</li>)
                    })
                  }
                </ul>
            </div>
            <div className="table-wrapper answers">
                <h3>{ _questions[activeKey].question }</h3>
                { getQuestionType(_questions[activeKey].type, _questions[activeKey]) }
            </div>
          </div>)  : <span className="message">No answer data yet</span>
        }
        </>
      )}
    </div>
  );
}

export default QuestionsTable;