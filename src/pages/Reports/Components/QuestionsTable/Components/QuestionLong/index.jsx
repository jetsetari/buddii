//libs
import React, {useEffect, useState} from "react";

//styling
import "./QuestionLong.scss";
import moment from "moment";

function QuestionLong({ data }) {

  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    setAnswers(data.answers);
  }, [data]);

  const answerDetail = (value, answer) => {
    return (<>
      <td>
        <div className="answer">
          <div className="answer-details">
            <span className="answer-name">{ answer }</span>
            <span className="answer-client">{ value.contact.firstName } { value.contact.lastName }</span>
          </div>
        </div>
      </td>
      <td align="left"><i>{moment(value.datetime.toDate()).format('DD MMMM - hh:mm')}</i></td>
      <td><div className="avatar" style={{backgroundImage: 'url('+value.contact.image+')' }}></div></td>
    </>)
  }

  return (
    data && (
      <div className="question-long">
        <table>
          <thead>
            <tr className="tbl-header"><th>Answer</th><th align="right">Date & time</th><th></th></tr>
          </thead>
          <tbody>
            { 
              answers.map((value, key) => {
                return Array.isArray(value.answer) ? (
                  value.answer.map((answer, _k) => <tr key={key+'-'+_k}>{ answerDetail(value, answer) }</tr>)
                ) : (
                  <tr key={key}>{ answerDetail(value, value.answer) }</tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    )
  );
}

export default QuestionLong;