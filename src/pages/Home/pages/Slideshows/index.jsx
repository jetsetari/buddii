//libs
import React, { useEffect, useRef, useState, useCallback } from "react";

//styling
import './Slideshows.scss';

import Popup from "@components/_default/Popup";
import { getSlideshow, getQuestions, getContact} from "@data/firebase/firestore/getData";
import { saveSlideId, saveLog, saveQuestion } from "@data/firebase/firestore/saveData";
import { updateSlidesAi, disableAI } from "@data/firebase/firestore/updateData";
import Stats from "./Popup/Stats";
import Info from "./Popup/Info";
import QuestionBox from "./components/QuestionBox";
import Timer from "./components/Timer";
import { useParams, useSearchParams } from "react-router-dom";
import { getMainColor } from '@data/helpers';
import { removeDuplicates, getContrastColor, rgbToHex } from '@data/helpers';
import { Theme, Color, BackgroundColor } from '@adobe/leonardo-contrast-colors';
import Loading from "@components/_default/Loading";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "@data/redux/usersSlice";
import EditQuestion from "@pages/Admin/pages/Questions/Popup/EditQuestion";

function Slideshows(props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentPage, setCurrentPage] = useState('view');
  const [slideStats, setSlideStats] = useState(false);
  const [slideInfo, setSlideInfo] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [questionAdd, setQuestionAdd] = useState(false);
  const [questions, setQuestions] = useState(false);
  const [artificial, setArtificial] = useState(false);
  const [questionsCurrent, setQuestionsCurrent] = useState(false);
  const [colorsCurrent, setColorsCurrent] = useState(false);

  const [currentClient, setCurrentClient] = useState(false)

  const [questionBox, setQuestionBox] = useState(false);
  const [allUsedQuestions, setAllUsedQuestions] = useState([]);

  const [slides, setSlides] = useState([]);
  const imgElement = useRef(null);
  const [deleteQuestionPopup, setDeleteQuestionPopup] = useState(false);

  const [currentSeconds, setCurrentSeconds] = useState(0);
  const [addNewQuestion, setAddNewQuestion] = useState(true);

  const [questionData, setQuestionData] = useState();
  const [popupQuestion, setPopupQuestion] = useState(false);

  const {id} = useParams();
  const [searchParams] = useSearchParams();
  let contact_id = searchParams.get('c');
  
  const user_store = useSelector(getUser);

  const windowFullScreen = () => {
    let element = document.getElementById('slideshows');
    setFullScreen(true);
    if(element.requestFullscreen) 
        element.requestFullscreen();
    else if(element.mozRequestFullScreen)
        element.mozRequestFullScreen();
    else if(element.webkitRequestFullscreen)
        element.webkitRequestFullscreen();
    else if(element.msRequestFullscreen)
        element.msRequestFullscreen();
  }

  const getSlideshowData = () => {
    getSlideshow(id, (response) => {
      let all_used_questions = [];
      response.forEach((value, key) => {
        if(value.questions instanceof Array){
          all_used_questions = removeDuplicates(all_used_questions.concat(value.questions));
        }
      })
      setLoading(false);
      setAllUsedQuestions(all_used_questions);
      setSlides(response);
    });
  }

  const generateAi = () => {
    if(!artificial){
      setLoading(true);
      let theme_colors = [];
      slides.forEach((value, key) => {
        let contrast_color = getContrastColor(slides[key].main_color);
        let bgMain = new BackgroundColor({
          name: 'bgMain',
          colorKeys: [rgbToHex(slides[key].main_color)],
          ratios: [2, 3, 4.5, 8]
        });
        let colorContrast = new Color({
          name: 'colorContrast', colorKeys: [contrast_color], ratios: [3, 4.5]
        });
        let theme = new Theme({colors: [bgMain, colorContrast], backgroundColor: bgMain, lightness: 97});
        let colors = {
          id: slides[key].id,
          main: slides[key].main_color,
          contrast: contrast_color,
          text: theme.contrastColorPairs.background,
          inactive: theme.contrastColorPairs.bgMain100,
          button: theme.contrastColorPairs.bgMain400
        };
        theme_colors.push(colors);
      })
      updateSlidesAi(id, theme_colors, (reponse) => {
        getSlideshowData();
        setArtificial(true);
        setLoading(false);
      });
    } else {
      disableAI(id, (response) => {
        getSlideshowData();
        setArtificial(false);
        setLoading(false);
      })
    }
  }
 
  useEffect(() => {
    getSlideshowData();
    if (document.addEventListener) {
       document.addEventListener('fullscreenchange', exitWindowFullScreen, false);
       document.addEventListener('mozfullscreenchange', exitWindowFullScreen, false);
       document.addEventListener('MSFullscreenChange', exitWindowFullScreen, false);
       document.addEventListener('webkitfullscreenchange', exitWindowFullScreen, false);
    }
  }, [document.addEventListener]);

  useEffect(() => {
    if(contact_id && contact_id != '_none'){
      getContact(contact_id, (callback) => {
        setCurrentClient(callback)
      });
    }
    getQuestions((response) => {
      setQuestions(response);
    });
  }, []);

  useEffect(() => {
    if(slides[currentSlide] && slides[currentSlide].questions && slides[currentSlide].questions.length){
      let question_result = (questions && slides[currentSlide].questions) ? questions.filter(_q => slides[currentSlide].questions.includes(_q.id)): [];
      setQuestionsCurrent(question_result);
    } else {
      setQuestionsCurrent(false);
    }
    if(slides[currentSlide] && slides[currentSlide].colors){
      setColorsCurrent(slides[currentSlide].colors);
    } else {
      setColorsCurrent(false);
    }
  }, [currentSlide, slides, questions]);

  const addQuestionToSlide = (question, slide, slideshow, key) => {
    setLoading(true);
    let slide_i = slides.filter(_s => _s.id == slide)[0].slide_i-1;
    let arr_questions = (typeof slides[slide_i].questions == 'undefined') ? [] : slides[slide_i].questions;
    arr_questions.push(question);
    arr_questions = removeDuplicates(arr_questions);
    saveSlideId(slideshow, slide, { questions : arr_questions }, (response) => {
      getSlideshowData();
    })
    setQuestionAdd(false);
  } 

  const exitWindowFullScreen = () => {
    if (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement){
      setFullScreen(false);
    }
  }

  const changeSlide = (index) => {
    if(currentClient){
      saveLog(id, slides[currentSlide].id, currentClient.id, user_store.email, currentSeconds, (response) => {
      });
    }
    setCurrentSlide(index);
  }

  // const escFunction = useCallback((event) => {
  //   if (event.key === "ArrowUp") {
  //     changeSlide(currentSlide+1);
  //   }
  //   if(event.key === "ArrowDown") {
  //     changeSlide(currentSlide1);
  //   }
  // }, []);

  // useEffect(() => {
  //   document.addEventListener("keydown", escFunction, false);
  //   return () => {
  //     document.removeEventListener("keydown", escFunction, false);
  //   };
  // }, []);

  const removeQuestionToSlide = (question, slide, slideshow) => {
    setLoading(true);
    let slide_i = slides.filter(_s => _s.id == slide)[0].slide_i-1;
    let arr_questions = (typeof slides[slide_i].questions == 'undefined') ? [] : slides[slide_i].questions;
    var index = arr_questions.indexOf(question);
    if (index !== -1) {
      if(arr_questions.length === 1){
        arr_questions = [];
      } else {
        arr_questions = arr_questions.splice(index, 1);
      }
    }
    saveSlideId(slideshow, slide, { questions : arr_questions }, (response) => {
      getSlideshowData();
    })
  } 

  const saveQuestionData = () => {
    let question_data = questionData;
    question_data['company'] = user_store.companies[0];
    question_data['user'] = user_store.email;
    question_data['created'] = new Date();
    saveQuestion(question_data, (callback) => {
      getQuestions((response) => {
        setQuestions(response);
        setAddNewQuestion(false);
      });
    })
  }


  return (
    <div id="slideshows" className={ (fullScreen)?'fullscreen':'' }>
      { loading && <Loading /> }
      <Popup title="Slide stats" active={ slideStats } closePopup={ setSlideStats } savePopup={false} cancel={false}>
        { (slides[currentSlide] && id) && <Stats currentSlide={slides[currentSlide].id} currentClient={contact_id} currentSlideShow={id} currentSeconds={ currentSeconds }  /> }
      </Popup>
      <Popup title="Add question to slide"  onChange={ () => saveQuestionData() } active={ questionAdd } closePopup={ () => setQuestionAdd(false) } savePopup={addNewQuestion ? 'Save' : false} cancel={addNewQuestion ? true : false}>
        { addNewQuestion ? (
          <>
            <EditQuestion question={popupQuestion} setQuestionData={setQuestionData} />
            <div className="question" style={{ marginTop: 20 }} onClick={ () => { setAddNewQuestion(false); } }>
              Go back and choose existing question
            </div>
          </>
        ) : (
          <> 
            {
              questions && questions.map((value, key) => {
                if(!allUsedQuestions.includes(value.id)) {
                  return (
                    <div key={key} className="question" onClick={ () => { addQuestionToSlide(value.id, questionAdd, id, (key-1)); } }>
                      <div className={`icon type-${value.type}`} />
                      {value.question}
                    </div>
                  )
                }
              })
            }
            <div className="btn-new question" onClick={ () => { setAddNewQuestion(true); } }>
              Add New question
            </div>
          </>)
        }
      </Popup>
      <Popup title="Slide info" active={ slideInfo } closePopup={ setSlideInfo } savePopup={false} cancel={false}>
        { (slides && currentSlide && id) && <Info  currentSlide={ (slides[currentSlide] ? slides[currentSlide].id : false) } currentSlideShow={id} /> }
      </Popup>
      <div id="slideshow-locator">
        <div className="toggle-wrapper">
          <div className="toggle-menu">
            <div onClick={() => setCurrentPage('view')} className={ `toggle ${currentPage === 'view' && 'active'}`}><span>View</span></div>
            <div onClick={() => setCurrentPage('questions')} className={ `toggle ${currentPage === 'questions' && 'active'}`}><span>Questions</span></div>
          </div>
        </div>
        <div className="slide-thumbs">
          { slides.map((item, index) => (
            <a href={ '#slide-'+(index+1) } key={index} className={'thumb '+((currentSlide == index) ? 'active' : '') } onClick={ (e) => changeSlide(index) } style={{backgroundImage: 'url('+item.image.replace('.jpg', '_1360x1024.jpg')+')' }}></a>
          ))}
        </div>
      </div>
      { currentPage === 'view' && slides.length ? (
        <div className="slideshow-wrapper">
          { 
            (contact_id !== '_none') && (
              <Timer currentSlide={slides[currentSlide]} client={currentClient} setCurrentSeconds={setCurrentSeconds} />
            )
          }
          { questionBox && questionsCurrent && (
            <QuestionBox currentSlide={slides[currentSlide]}  client={currentClient} artificial={artificial} questionsCurrent={questionsCurrent} currentSlideShow={id} colorsCurrent={ colorsCurrent } setQuestionBox={setQuestionBox} />
          )}
          <div  className="slideshow-content" style={{ backgroundImage: 'url('+slides[currentSlide].image.replace('.jpg', '_1360x1024.jpg')+')' }}></div>
          <div className="slideshow-tools">
            <div onClick={ () => windowFullScreen() } className="btn btn-fullscreen"></div>
            { (!questionBox && questionsCurrent) && (
              <div onClick={ () => setQuestionBox(true) } className="btn btn-forms"></div>
            )}
            <div onClick={ () => setSlideInfo(true) } className="btn btn-info"></div>
            {/*<div onClick={ () => setSlideStats(true) } className="btn btn-share"></div>*/}
            <div onClick={ () => setSlideStats(true) } className="btn btn-stats"></div>
            { questionBox && <div onClick={ () => generateAi() } className={`btn btn-ai ${artificial?'active':''}`}></div> }
          </div>
        </div>
      ) : (
        <div className="questions-wrapper">
          { slides.map((item, index) => (
            <div key={index} className="question-list" id={ '#slide-'+(index+1) }>
              <div className="list-header">
                <h2>Slide {index+1}</h2>
                <button  onClick={ () => { setQuestionAdd(item.id);  } }>Add question</button>
              </div>
              { item.questions && item.questions.length ? (
                <div className="table-wrapper">
                  <table>
                    <tbody>
                      <tr className="tbl-header"><th width="20"></th><th>Question</th><th></th></tr>
                      { item.questions.map((question, key) => {
                        return (<tr key={ key }>
                          <td>
                            <div className={`icon type-${ questions.filter(_q => _q.id == question)[0]?.type }`} />
                          </td>
                          <td>{ questions.filter(_q => _q.id == question)[0]?.question }</td>
                          <td className="actions">
                            <div className="btn-delete" onClick={ () => removeQuestionToSlide(question, item.id, id) }></div>
                          </td>
                        </tr>)
                      })}
                    </tbody>
                  </table>
                </div>
                ) : (<div className="no-questions" onClick={ () => setQuestionAdd(item.id) }><span>Add question</span></div>)
              }
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default Slideshows;