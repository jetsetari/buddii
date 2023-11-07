import React, { useEffect, useRef, useState, useCallback } from "react";

import "./AddQuestion.scss";

//components

//data
import { observer } from "mobx-react-lite";
import TextInput from "../../../../../../components/_default/TextInput";
import { useStores } from "../../../../../../backend/hooks/useStores";
import Question from "../../../../../../backend/models/question";
import EditQuestion from "@/pages/Admin/pages/Questions/Popup/EditQuestion";

const AddQuestion = observer(({currentSlideshow, slideshowId, slide, newQuestion}) => {

  const {questionStore} = useStores();
  const [addNewQuestion, setAddNewQuestion] = useState(true);

  const addQuestionsToSlide = (e) => {
    e.preventDefault();
    let data = [];
    let questions = questionStore.selectedQuestions
    let oldQuestions = currentSlideshow?.questions[slide-1].vragen;

    oldQuestions.forEach(question => {
      data.push(question.id);
    })

    questions.forEach(question => {
      data.push(question.id)
    })

    questionStore.addQuestionToSlide(data, slideshowId, slide);
  }

  return (
    addNewQuestion ? (
      <div className="addQuestion">
        <div className="search">
          <div className="search-input">
            <TextInput />  
          </div>
         
          <button className="search-button" onClick={() => newQuestion(true)}>Add new</button>
        </div>
        <div className="questions-container">
          {questionStore.questions.map(question => (
            <div className={`question ${questionStore.selectedQuestions.filter(selectedQuestion => selectedQuestion === question).length > 0 ? 'active' : ''}`} onClick={() => questionStore.setSelectedQuestions(question)}>
               <div className={`icon type-${ question.type }`} />
               <p className="question-text">{question.vraag}</p>
            </div>
          ))}
        </div>
        <button className="addQuestion-button" onClick={(e) => addQuestionsToSlide(e)}>Add question to slide</button>
      </div>
    ) : (
      <EditQuestion question={popupQuestion} setQuestionData={ setQuestionData } />
    )
  );
})

export default AddQuestion;


