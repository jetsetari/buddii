//libs
import React, { useState, useEffect } from "react";
import Pager from "../../../../components/_default/Pager";
import { saveQuestion } from "@data/firebase/firestore/saveData";
import { getQuestions } from "@data/firebase/firestore/getData";

import { useSelector, useDispatch } from "react-redux";
import { getUser } from "@data/redux/usersSlice";
import { deleteDocFromCollection } from "@data/firebase/firestore/deleteData";


//styling
import "./Questions.scss"

//components
import DeletePopup from "@components/_default/DeletePopup";
import Popup from "@components/_default/Popup";
import EditQuestion from "./Popup/EditQuestion";
import Loading from "@components/_default/Loading";

function Questions(props) {

  const [deleteQuestionPopup, setDeleteQuestionPopup] = useState(false);
  const [popupQuestion, setPopupQuestion] = useState(false);
  const [questions, setQuestions] = useState(false);
  const [questionData, setQuestionData] = useState([]);
  const user = useSelector(getUser);

  const getQuestionData = () => {
    getQuestions((response) => {
      setQuestions(response);
    })
  }

  const handleDeleteQuestions = () => {
    deleteDocFromCollection('questions', deleteQuestionPopup.id, (callback)=> {
      getQuestionData();
    })
  }

  const saveQuestionData = () => {
    let question_data = questionData;
    question_data['company'] = user.companies[0];
    question_data['user'] = user.email;
    question_data['created'] = new Date();
    saveQuestion(question_data, (callback) => {
      getQuestionData(); setQuestionData([]); setPopupQuestion(false)
    })
  }

  useEffect(() => {
   getQuestionData();
  }, []);

  return (
    questions ? (
      <div id="questions">
        <h1>Questions</h1>
        <Popup title="Question" active={ popupQuestion } onChange={ () =>  saveQuestionData() } closePopup={ () => { setPopupQuestion(false) } }>
          <EditQuestion question={popupQuestion} setQuestionData={ setQuestionData } />
        </Popup>
        <DeletePopup onChange={handleDeleteQuestions} title="company" subject={'Delete question'} item={deleteQuestionPopup} closePopup={ setDeleteQuestionPopup } active={ deleteQuestionPopup.question } />
        <div id="btn-add" onClick={ () => setPopupQuestion('new') }>Add question</div>
        <div className="table-wrapper">
          <table>
            <tbody>
              <tr className="tbl-header"><th width="20"></th><th>Question</th><th></th></tr>
              { questions.map((question, key) => {
                return (<tr key={key}>
                  <td>
                    <div className={`icon type-${ question.type }`} />
                  </td>
                  <td>{ question.question }</td>
                  <td className="actions">
                    <div className="btn-delete" onClick={ () => setDeleteQuestionPopup(question) }></div>
                  </td>
                </tr>)
              })}
            </tbody>
          </table>
        </div>
      </div>
    ) : <Loading position="admin" />
  );
}

export default Questions;