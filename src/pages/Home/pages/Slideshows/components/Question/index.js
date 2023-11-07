import { observer } from 'mobx-react-lite';
import React from 'react'
import { useState, useEffect } from 'react';
import DropDown from '../../../../../../components/_default/DropDown';

import "./Question.scss";

const Question = observer(({currentSlide, question}) => {

    return (
      <div className="question-container">
      	<div key={currentSlide} id={ '#slide-'+(currentSlide+1) }>
					<h1 style={{color: 'white'}}>Question</h1>
					{question.vragen ? (
						question.vragen.map((question, key) => (
								question.type === 'multiple' ? (
									<div key={key}>
										<h2 style={{color: 'white'}}>{ question.vraag }</h2>
										<DropDown options={question.keuzes}/>
									</div>	
									
								):(
									<></>
								)
						))
					) : (
						<div className="no-questions"><span>Create your first question</span></div>
					)}
				</div>
    	</div>
    )
})

export default Question;