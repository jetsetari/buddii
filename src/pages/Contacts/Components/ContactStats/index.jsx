//libs
import React, { useState, useEffect } from "react";
import moment from "moment";
import { Radio, PlayCircle } from 'react-feather';

//styling
import "./ContactStats.scss";

function ContactStats({ slideshows, questions, slideshowLogs, answers }) {
  
  return (
    <div className="contact-stats">
      { slideshows.length && questions.length ? (
        <div className="question">
          { slideshows.map((item, key) => {
            return (
              <div key={ key } className="slideshow-stats">
                <div className="stats-header">
                  <div className="sh-cover" style={{ backgroundImage: `url(${item.cover?.replace('.jpg', '_1360x1024.jpg')})` }}></div>
                  <div className="sh-details">
                    <span className="shd-name">{ item.name }</span>
                    <span className="shd-descr">{ item.description }</span>
                    { slideshowLogs && slideshowLogs[item.id] && (
                      <div className="shd-stats">
                        <Radio size={20} color="#000" /><span>{ moment("2015-01-01").startOf('day').seconds(slideshowLogs[item.id].total_time).format('mm:ss') }</span>
                        <PlayCircle size={20} color="#000" /><span>{ slideshowLogs[item.id].opens }</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="stats-answers">
                  { questions && answers?.map((value, key) => {
                    if(value.slideshow == item.id){
                      return (
                        <div key={key} className="answer">
                          <div className={`icon type-${ questions.filter(question => question.id == value.question)[0]?.type }`}></div>
                          <span className="q">{ questions.filter(question => question.id == value.question)[0]?.question }</span>
                          <span className="a">{ value.answer }</span>
                        </div>
                      )
                    }
                  })}
                </div>
              </div>
            )
          }) }
        </div>
      ) : (<div className="slideshow-stats empty">{ !slideshows ? 'Loading...' : 'No slideshow data' }</div>)
      }
    </div>
  );
}

export default ContactStats;