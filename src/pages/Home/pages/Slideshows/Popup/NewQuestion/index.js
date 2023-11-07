import React, { useEffect, useRef, useState, useCallback } from "react";

import "./NewQuestion.scss";

//components

//data
import { observer } from "mobx-react-lite";
import TextInput from "../../../../../../components/_default/TextInput";
import { useStores } from "../../../../../../backend/hooks/useStores";
import TagsInput from "../../../../../../components/_default/TagsInput";
import Question from "../../../../../../backend/models/question"
import NumericInput from "../../../../../../components/_default/NumericInput";


const NewQuestion = observer(({currentSlideshow, slideshowId, slide}) => {

  const {uiStore, questionStore} = useStores();

  const [type, setType] = useState('multiple');
  const [vraag, setVraag] = useState('');
  const [keuzes, setKeuzes] = useState([]);
  const [chooseType, setChooseType] = useState(false);

  let types = [
    {label: 'Short Answer', short: 'short'},
    {label: 'Numeric Value', short: 'numeric'},
    {label: 'Multiple Option', short: 'multiple'},
    {label: 'Image Upload', short: 'image'},
    {label: 'Long Answer', short: 'long'},
    {label: 'Single Option', short: 'single'},
    {label: 'Datetime', short: 'date'},
    {label: 'attachment', short: 'attachment'}
  ]

  const handleCreateQuestion = (e) => {
    e.preventDefault();
    
    const question = new Question({
      keuzes: keuzes,
      type: type,
      vraag: vraag,
      company: uiStore.currentCompany.id
    });

    questionStore.createQuestion(question)
  }

  const getQuestionTypes = () => {
    switch (type) {
      case 'short':
        return (
          <div>
              <NumericInput label="min characters" />
              <NumericInput label="max characters" />
            </div>
        )
      case 'multiple':
        return <TagsInput label="make possible answers" tags={keuzes} onChange={setKeuzes}/>
      case 'long':
        return (
          <div>
            <NumericInput label="min characters" />
            <NumericInput label="max characters" />
          </div>
        )
      case 'numeric':
        return (
          <div>
            <NumericInput label="min" />
            <NumericInput label="max" />
          </div>
        )
      case 'multiple':
        return <TagsInput label="Make the possibilities" tags={keuzes} onChange={setKeuzes}/>
    }
  }

  return (
      <div className="newQuestion">
          <TextInput label="Question" value={vraag} onChange={setVraag}/>
          <div className="types">
            {types.map((stringType) => (
              <div className={`type ${type === stringType.short ? ('active') : ('')}`} onClick={() => setType(stringType.short)}>
                <span className={`icon type-${ stringType.short }`}></span>
                <span className={`type-text`}>{stringType.label}</span>
              </div>
            ))}
          </div>
          {getQuestionTypes()}
        <button onClick={(e) => handleCreateQuestion(e)}>Create new question</button>
      </div>

  );
})

export default NewQuestion;
