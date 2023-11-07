//libs
import React, { useEffect, useState } from "react";
import _ from "underscore";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "@data/redux/usersSlice";
import { getQuestions, getUserSlideshows, getUserAnswers } from "@data/firebase/firestore/getData";
import moment from "moment";
//styling
import './Contacts.scss';

//components
import Search from "@components/_default/Search";
import UserDetails from "../Home/Cards/UserDetails";
import DropDown from "@components/_default/DropDown";
import EditContact from "./Popup/EditContact";

import { getContacts } from "@data/firebase/firestore/getData";
import { updateContact } from "@data/firebase/firestore/updateData";
import { validateEmail, removeDuplicates } from '@data/helpers'
import { getSlideshowsById, getAppointments, getSlideshowLogs } from "@data/firebase/firestore/getData";
import Loading from "@components/_default/Loading";

//data
import Popup from "@components/_default/Popup";
import { useNavigate, useParams } from "react-router-dom";
import { Radio, PlayCircle } from 'react-feather';

const Contacts = () => {
  const user_store = useSelector(getUser);
  const [contactList, setContactList] = useState(false);
  const [activeClient, setActiveClient] = useState(0);
  const [slideshows, setSlideshows] = useState(false);
  const [filter, setFilter] = useState(false);
  const [selectCompany, setSelectCompany] = useState('');
  const [filterGender, setFilterGender] = useState(false);
  const [editContactPopup, setEditContactPopup] = useState(false);
  const [filter_companies, setFilter_companies] = useState([]);
  const [filter_labels, setFilter_labels] = useState([]);
  const [filter_audience, setFilter_audience] = useState([]);
  const [active_labels, setActive_labels] = useState([]);
  const [active_audience, setActive_audience] = useState([]);
  const [contact, setContact] = useState(false);
  const [search, setSearch] = useState('');
  const [error, setError] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [slideshowLogs, setSlideshowLogs] = useState(false);

  let navigate = useNavigate();
  const {id} = useParams()

  const getContactData = () => {
    setLoading(true);
    getContacts((response) => {
      setLoading(false);
      setContactList(response);
    });
  }

  useEffect(() => {
    setSlideshows(false);
    contactList[activeClient] && getUserAnswers(contactList[activeClient].id, (response) => {
      let arr_slideshows = [];
      response.forEach((value, key) => {
        arr_slideshows.push(value.slideshow);
      })

      setAnswers(response);
      arr_slideshows = removeDuplicates(arr_slideshows);
      if(arr_slideshows.length){
        getSlideshowLogs(arr_slideshows, contactList[activeClient].id, (callback) => {
          setSlideshowLogs(callback);
        })
      }
      
      getSlideshowsById(arr_slideshows, (response) => {      
        getQuestions((_question) => {
          setSlideshows(response);
          setQuestions(_question);
        })
      })
    });
  }, [activeClient, user_store, contactList]);

  useEffect(() => {
    getContactData();
  }, []);

  const updateContactData = (data) => {
    updateContact(contactList[activeClient].id, data, (response) => {
      getContactData();
    })
  };
  
  const updateContactPopup = () => {
    updateContactData(contact);
  }


  let putInTheList = (array, id) => {
    let list = [];
    if(array.includes(id)){
      list = _.without(array, id);
    } else {
      list = _.union(array, [id]);
    }
    return list;
  }

  const addFilterLabel = (label) => {
    if (label.audience) {
      let result = filter_labels
      result.push(label);
      setFilter_audience(result);
      setActive_audience(putInTheList(active_audience, label.id));
    } else {
      let result = filter_audience
      result.push(label);
      setFilter_labels(result);
      setActive_labels(putInTheList(active_labels, label.id));
    }
  }

  const arrayCompare = (array1, array2) => {
      // Loop for array1
      for(let i = 0; i < array1.length; i++) {
          // Loop for array2
          for(let j = 0; j < array2.length; j++) {
              // Compare the element of each and
              // every element from both of the
              // arrays
              if(array1[i].text === array2[j].titel) {
                  // Return if common element found
                  return true;
              } 
          }
      }
      // Return if no common element exist
      return false;
  }

  
  
  return (
    <div id="contacts">
      
      { contactList.length ? (
        <>
          <Popup title="New contact" cancel={ true } active={ editContactPopup } onChange={ updateContactPopup } closePopup={ setEditContactPopup } >
            <EditContact setContact={setContact} contact={ contactList[activeClient] } />
          </Popup>
          <div id="contacts-list">
            <div className="search-client">
              <Search callback={setSearch}/>
              {/*<div className={ `btn-filter ${filter&&'active'}` } onClick={ () => setFilter(prevState => !prevState) } />*/}
            </div>
            { filter ? (
                <div className="filter-details">
                  <div className="filter-box">
                    {/*<h3>Labels</h3>
                    <div className="filter-labels">
                      labelStore.labels.map((label, idx) => (
                        // MAAK HIGHLIGHT ITEM wanneer in filter_label
                        <div key={idx} className={`label ${ active_labels.includes(label.id) ? 'active' : '' }`} onClick={() => addFilterLabel(label)} style={{ color: label.color }}>{label.titel}</div>
                      ))
                      
                    </div>*/}
                  </div>
                  <div className="filter-box">
                    {/*<h3>Audience</h3>
                    <div className="filter-audience">
                    labelStore.audience.map((audience, idx) => (
                      // MAAK HIGHLIGHT ITEM wanneer in filter_audience
                        <div key={idx} className={`audience ${ active_audience.includes(audience.id) ? 'active' : '' }`} onClick={() => addFilterLabel(audience)} style={{ backgroundColor: audience.color+'30', color: audience.color }}>{audience.titel}</div>
                      ))
                    </div>*/}
                  </div>
                  {/*
                  <div className="filter-box">
                    <h3>Gender</h3>
                    <div className="filter-gender">
                      <div onClick={ () => setFilterGender('male') } className={ `gender male ${filterGender==='male'&&'active'}`}></div>
                      <div onClick={ () => setFilterGender('female') } className={ `gender female ${filterGender==='female'&&'active'}`}></div>
                    </div>
                  </div>*/}
                  <div className="filter-box">
                    <h3>Company</h3>
                    <DropDown options={ filter_companies } value={ selectCompany } onChange={(e) => setSelectCompany(e)} placeholder="All" />
                  </div>
                </div>
              ) : (
                <ul className="full-list">
                  { 
                    contactList.map((user, key) => {
                    if ( user.firstName?.toLowerCase().includes(search?.toLowerCase()) 
                      || user.lastName?.toLowerCase().includes(search?.toLowerCase()) 
                      || user.email?.toLowerCase().includes(search?.toLowerCase())
                      || user.extCompany?.toLowerCase().includes(search?.toLowerCase())
                      || search === ''
                     ) {
                      if(!selectCompany || user.extCompany.name === selectCompany.label){
                        if(filter_labels.length === 0 || arrayCompare(user.labels, filter_labels)) {
                          if(filter_audience.length === 0 || arrayCompare(user.audiences, filter_audience)){
                            return (<li key={key} className={ (key === activeClient) ? 'active' : '' } onClick={ () => { setActiveClient(key) }} >
                              <div className="avatar" style={{backgroundImage: 'url('+user.image+')' }}></div>
                              <span>{user.firstName + ' ' + user.lastName}</span>
                            </li>)}
                          }
                        }
                      }}
                    )}
                </ul>
              )
            }
            <div className="new-client">
              <div className="btn-new" onClick={ () =>{ setContactList(false); setEditContactPopup(true); } }>Create New Contact</div>
            </div>
          </div>
          <div id="client-details">
            <div className="user-headline">
                { contactList[activeClient] &&
                  <>
                    <div className="user-image" style={{backgroundImage: 'url('+contactList[activeClient].image+')' }}></div>
                    <div className="user-details">
                      <div className="user-name" style={{display: 'flex'}}>
                        <span style={{marginRight: 10}} >{ contactList[activeClient].firstName + ' ' + contactList[activeClient].lastName}</span>
                      </div>
                      <div className="user-labels">
                        {contactList[activeClient].labels?.map((label, idx) => (
                          (!label.audience) && (<span className="label" style={{ backgroundColor: label.color+'30', color: label.color }} key={idx}>{label.titel}</span>)
                        ))}
                      </div>
                      <span className="user-subline"><strong>{ contactList[activeClient].job }</strong> - { contactList[activeClient].email }</span>
                      <span className="user-address">{ contactList[activeClient].extCompany.address }</span>
                    </div>
                  </>
                }
              <div className="btn-edit" onClick={ () => setEditContactPopup(contactList[activeClient]) } />
            </div>
            {
              slideshows.length && questions.length && contactList ? (
                <div className="question">
                  {
                    slideshows.map((item, key) => {
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
                                )
                              }
                              
                            </div>
                          </div>
                          <div className="stats-answers">
                            {
                              questions && answers.map((value, key) => {
                                if(value.slideshow == item.id){
                                  return (
                                    <div key={key} className="answer">
                                      <div className={`icon type-${ questions.filter(question => question.id == value.question)[0]?.type }`}></div>
                                      <span className="q">{ questions.filter(question => question.id == value.question)[0]?.question }</span>
                                      <span className="a">{ value.answer }</span>
                                    </div>
                                  )
                                }
                                
                              })
                            }
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              ) : (
                <div className="slideshow-stats empty">
                  { !slideshows ? 'Loading...' : 'No slideshow data' }
                </div>
              )
            }
          </div>
          <div id="client-actions">
            {contactList[activeClient] &&
              <UserDetails updateContactData={ updateContactData } contact={ contactList[activeClient] } header={ false }  />
            }
          </div>
        </>
      ) : (
        loading ? (
          <Loading />
        ) : (
          <div className="no-contacts">
            <div className="btn-firstcontact" onClick={ () => setEditContactPopup(true) }>No contacts yet, <span>Create first contact</span></div>
          </div>
        ))
      }
    </div>
  );
}

export default Contacts;