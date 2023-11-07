import React, { useState, useEffect } from 'react';
import DropDown from '@components/_default/DropDown';
import Draggable from 'react-draggable';
import DatePicker from "react-datepicker";
import DragDropInput from "@components/_default/DragDropInput/DragDropInput";
import ReactSlider from "react-slider";
import TextInput from "@components/_default/TextInput";
import NumericInput from "@components/_default/NumericInput";
import "react-datepicker/dist/react-datepicker.css";
import { removeDuplicates, getContrastColor, rgbToHex } from '@data/helpers';
import { saveAnswer } from "@data/firebase/firestore/saveData";
import { getAnswers } from "@data/firebase/firestore/getData";

import "./QuestionBox.scss";

const QuestionBox = ({currentSlideShow, currentSlide, artificial, colorsCurrent, questionsCurrent, setQuestionBox, client}) => {
  const [questionI, setQuestionI] = useState(0);
  const [answerTyping, setAnswerTyping] = useState(false);
  const [allAnswers, setAllAnswers] = useState(false);
  const [questionId, setQuestionId] = useState(false);
  const [saving, setSaving] = useState(false);
  const [extraTrigger, setExtraTrigger] = useState(false);

  const prevQuestion = () => {
    if(questionI > 0){
      setQuestionI(questionI-1);
    }
  }

  const nextQuestion = () => {
    if(questionI < (questionsCurrent.length-1) ) {
      setQuestionI(questionI+1);
    }
  }

  useEffect(() => {
    setQuestionI(0);
  }, [currentSlide]);


  useEffect(() => {
    let question_id = false;
    if(typeof questionsCurrent[questionI] !== 'undefined'){
      question_id = (questionsCurrent[questionI].id) ? questionsCurrent[questionI].id : false;
      setQuestionId(question_id);
    } 
    
    if(allAnswers && question_id) {
      let _answer = (typeof allAnswers[currentSlideShow+'--'+question_id+'--'+client.id] == 'undefined') ? '' : allAnswers[currentSlideShow+'--'+question_id+'--'+client.id].answer;
      setAnswerTyping(_answer); 
    }
  }, [questionI, allAnswers]);

  useEffect(() => {
    setAnswerTyping(false);
    getAnswers(currentSlideShow, (response) => {
      setAllAnswers(response);
    })
  }, [currentSlide]);

  useEffect(() => {
    if(client){
      const delayDebounceFn = setTimeout(() => {
        if(answerTyping){
          saveData(answerTyping);
        }
      }, 2000)
      return () => clearTimeout(delayDebounceFn)
    }
  }, [answerTyping, extraTrigger]);

  const changeAnswer = (e) => {
    if(client){
      setSaving('Saving...');
    }
    setAnswerTyping(e);
  }


  const saveData = (answer) => {
    console.log(answer);
    //(slideshow, question, slide_id, answer, user_id, callback)
    saveAnswer(currentSlideShow, questionsCurrent[questionI].id, currentSlide.id, answer,client.id, (response) => {
      console.log(response);
      setTimeout(() => {
        setSaving(false);
      }, 1000);
    });
  }

  const AddToMultiple = (value) => {
    let arr_new = [];
    if(answerTyping && Array.isArray(answerTyping) ){
      arr_new = answerTyping;
    }
    if(arr_new.includes(value)) {
      const index = arr_new.indexOf(value);
      arr_new.splice(index, 1);
    } else {
      arr_new.push(value);
    }
    changeAnswer(arr_new);
    setExtraTrigger(arr_new.length);
  }


  return (
    <Draggable  bounds={{left: 0, top: 0}} handle=".handle" position={null} scale={1} onStop={ (e) => { console.log(e) } }>
      <div className="slideshow-question" style={{ backgroundColor: artificial && colorsCurrent && rgbToHex(currentSlide?.colors?.main) }}>
      <div className="handle" style={{ backgroundColor: artificial && colorsCurrent && currentSlide?.colors?.contrast }}></div>
      <span className="question-i" style={{ color: artificial && colorsCurrent && currentSlide?.colors?.contrast }}>Question {questionI+1}/{ questionsCurrent.length }</span>
      <div className="btn-close"  onClick={ () => setQuestionBox(false) } style={{ color: artificial && colorsCurrent && currentSlide?.colors?.contrast, backgroundColor: artificial && colorsCurrent && currentSlide?.colors?.button }}></div>
      {
        questionsCurrent[questionI] && (
          <div className="question-tools">
            <span className="question-q" style={{ color: artificial && colorsCurrent && currentSlide?.colors?.text }}>{ questionsCurrent[questionI].question }</span>
            <div className="question-answer">
              {(questionsCurrent[questionI].type=='long') && (
                <TextInput label={''} value={ answerTyping ? answerTyping : '' }  placeholder="Type your answer" onChange={ (e) => changeAnswer(e) }/>
              )}
              {(questionsCurrent[questionI].type=='numeric') && (
                <>
                { (questionsCurrent[questionI].settings.type == 'slider') && (
                  <div>
                    <ReactSlider className="type-slider"  value={answerTyping} onChange={ (e) => changeAnswer(e)} thumbClassName="slider-thumb" trackClassName="slider-track" min={questionsCurrent[questionI].settings.min} max={questionsCurrent[questionI].settings.max} renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>} />
                  </div>
                )}
                { (questionsCurrent[questionI].settings.type == 'input') && (
                  <NumericInput label={''} value={ (allAnswers && allAnswers[questionsCurrent[questionI]].id) ? allAnswers[questionsCurrent[questionI]].id.answer : '' } placeholder="Type your answer"  onChange={ (e) => changeAnswer(e) }/>
                )}
                </>
              )}
              {(questionsCurrent[questionI].type=='single') && (
                <div className="options single" style={{ color: artificial && colorsCurrent && colorsCurrent?.button }}>
                  { questionsCurrent[questionI].settings.options.map((value, key) => {
                    return (<div key={key} onClick={(e) => changeAnswer(value)} className={`option ${(answerTyping==value)?'selected':''}`}><div className="icon type-single"></div>{value}</div>)
                  })
                  }
                </div>
              )}
              {(questionsCurrent[questionI].type=='multiple') && (
                <div className="options multiple">
                  { questionsCurrent[questionI].settings.options.map((value, key) => {
                    return (<div key={key} onClick={(e) => AddToMultiple(value)}  className={`option ${( Array.isArray(answerTyping) && answerTyping.includes(value))?'selected':''}`}><div className="icon type-multiple"></div> {value}</div>)
                  })
                  }
                </div>
              )}
              {(questionsCurrent[questionI].type=='date') && (
                <div>Date</div>
              )}
              {(questionsCurrent[questionI].type=='image') && (
                <DragDropInput onFinishUpload={ () => {} } uploadPath="/answers/" fileName={'nofilename'} type="image" accept={{'text/image': ['.png', '.jpg', '.jpeg']}}/>
              )}
            </div>
            { saving && <div className="main-succes">{ saving }</div> }
          </div>
        )
      }
      {
        (questionsCurrent.length > 1 ) && (
          <div className="question-controls">
            <div className="btn-prev" onClick={ () => prevQuestion() } style={{ color: artificial && colorsCurrent?.contrast, backgroundColor: artificial && colorsCurrent?.inactive }}>Previous</div>
            <div className="btn-next" onClick={ () => nextQuestion() } style={{ color: artificial && colorsCurrent?.contrast, backgroundColor: artificial && colorsCurrent?.button }}>Next</div>
          </div>
        )
      }
      </div>
    </Draggable>
  )
};

export default QuestionBox;


