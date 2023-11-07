import React, { useEffect, useRef, useState, useCallback } from "react";
import update from 'react-addons-update';

import "./Info.scss";
import TextInput from "@components/_default/TextInput";
import _ from "underscore";

import { info_data } from './data';
import { getLogs} from "@data/firebase/firestore/getData";

const Info = ({ currentSlide, currentSlideShow }) => {

  const [infoData, setInfoData] = useState(info_data);
  const [slideInfo, setSlideInfo] = useState('');
  const [logData, setLogData] = useState([]);


  const setEditable = (index) => {
    let newData = update(infoData, {[index]: {readonly: {$set: !infoData[index].readonly}}} );
    if(newData[index].readonly){
      console.log('@yarl: Nu saven');
    }
    setInfoData(newData);
  }
  const changeText = (text, index) => {
    let newData = update(infoData, {[index]: {text: {$set: text.target.value}}} );
    setInfoData(newData);
  }

  useEffect(() => {
    console.log('😘');
    getLogs(currentSlideShow, currentSlide, (response) =>{
      console.log(response);
    })
  }, []);

  return (
    <div className="slide-info">
      <TextInput label="Add info" value={ slideInfo } onChange={ (e) => setSlideInfo(e) } placeholder="Fill in and press enter to add" />
      <ul className="info-list">
        { infoData.map((info, index) => {
            return (
              <li key={ index }>
                <div className="user-image" style={{backgroundImage: 'url('+info.image+')' }}></div>
                <input className="info-text" onChange={ (text) => { changeText(text, index)  } } readOnly={info.readonly} type="text" value={ info.text } />
                <div className="btn-delete"></div>
                <div className="btn-edit" onClick={ () => setEditable(index)  }></div>
              </li>
            )
          })
        }
      </ul>
    </div>
  );
}

export default Info;
