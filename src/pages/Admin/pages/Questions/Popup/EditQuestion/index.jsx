import React, { useState, useEffect } from "react";

import "./EditQuestion.scss";
import TextInput from "@components/_default/TextInput";
import NumericInput from "@components/_default/NumericInput";
import DropDown from "@components/_default/DropDown";
import Tickbox from "@components/_default/Tickbox";


const EditQuestion = ({ question, setQuestionData }) => {

  const [type, setType] = useState(question);
  const [options, setOptions] = useState([]);
  const [optionText, setOptionText] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [showTime, setShowTime] = useState(false);
  const [allQuestionData, setAllQuestionData] = useState(false);

  let question_types = [
    { type: 'long', label: 'Text' },
    { type: 'numeric', label: 'Numeric Value' },
    { type: 'single', label: 'Single option' },
    { type: 'multiple', label: 'Multiple option' },
    //{ type: 'date', label: 'Datetime' },
    //{ type: 'image', label: 'Image upload' },
  ];

  useEffect(() => {
    setAllQuestionData({
      question: questionText, type: type, settings: {}
    });
  }, [questionText]);

  useEffect(() => {
    setQuestionData(allQuestionData);
  }, [allQuestionData]);

  useEffect(() => {
    setOptions([]); setOptionText('');
    setAllQuestionData({
      question: questionText, type: type, settings: {}
    });
  }, [type]);

  const addOption = () => {
    let _options = options;
    _options.push(optionText);
    setOptions(_options); setOptionText('');
    addQuestionData(_options, 'options');
  }

  const deleteOption = (key) => {
    let _options = [...options];
    _options.splice(key,1);
    setOptions(_options); setOptionText('');
    addQuestionData(_options, 'options');
  }

  const addQuestionData = (value, key) => {
    let _question_data = allQuestionData;
    if(typeof _question_data['settings'] === 'undefined'){
       _question_data['settings'] = {};
       if(_question_data.type == 'numeric'){
        _question_data['settings']['type'] = 'slider';
       }
    }
    _question_data['settings'][key] = value;
    console.log(_question_data);
    setAllQuestionData(_question_data);
  }

  return (
    <div className="edit-question">
      <TextInput label="Question" value={questionText} onChange={(e) => { setQuestionText(e) }} placeholder="Describe your question" />
      {
        (!type) ? (
          <div className="new-question">
            <span className="q-type">Select question type</span>
            <div className="question-types">
              {
                question_types.map((value, key) => {
                  return(
                    <div key={key} className="type" onClick={ () => setType(value.type) }>
                      <div className={`icon type-${value.type}`}></div>
                      <span>{ value.label }</span>
                    </div>
                  )
                })
              }
            </div>
          </div>
        ) : (
          <div className="add-question">
              <span className="q-type">Type: <u onClick={ () => setType(false) }>{ question_types.filter(types => types.type == type)[0].label }</u></span>
              <div className="answer-data">
                {
                  (type == 'long') ? (
                    <NumericInput label="Max characters" onChange={(e) => { addQuestionData(Number(e), 'max') }} placeholder="Leave empty for unlimited" />
                  ) : (type == 'numeric') ? (
                    <>
                      <DropDown options={[{ value: 'slider', label: 'Slider' }, { value: 'input', label: 'Input' }]} label="Show as" onChange={(e) => { addQuestionData(e.value, 'type') }} placeholder="Type" />
                      <div className="grid">
                        <NumericInput label="Minimum value" onChange={(e) => { addQuestionData(Number(e), 'min') }} placeholder="Min Value" />
                        <NumericInput label="Maximum value" onChange={(e) => { addQuestionData(Number(e), 'max') }} placeholder="Max Value" />
                      </div>
                    </>
                  ) : (type == 'single' || type == 'multiple') ? (
                    <div>
                      <div className="add-option">
                        <TextInput label="Add option" value={optionText} onChange={(e) => { setOptionText(e) }} placeholder="Enter from option" />
                        <button className="c-add-button" onClick={() => addOption() }>Add  option</button>
                      </div>
                      {
                        options.map((value, key) => {
                          return (
                            <div key={key} className={`option ${type}`}>
                              <div className={`icon type-${type}`}></div>
                              <span>{ value }</span>
                              <div  onClick={() => deleteOption(key) } className="btn-delete" />
                            </div>
                          )
                        })
                      }
                    </div>
                  ) : (type == 'multiple') ? (
                    <div>Multiple</div>
                  ) : (type == 'date') ? (
                    <div>
                      <Tickbox checked={showTime} onChange={ () => { addQuestionData(!showTime, 'time'); setShowTime(!showTime)  } } label={'Time'} /> Show time
                    </div>
                  ) : (type == 'image') ? (
                    <div></div>
                  ) : <></>
                }
              </div>
          </div>
        )
      }
    </div>
  );
}

export default EditQuestion;
