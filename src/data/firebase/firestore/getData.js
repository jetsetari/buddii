import { db } from '@data/firebase';

export const getUserByEmail = (email, callback) => {
  console.log('---->>>>Get: getUserByEmail');
  const usersRef = db.collection('users').doc(email);
  usersRef.get().then((value) => {
    let user_data = value.data();
    if(typeof user_data.companies !== 'undefined' && user_data.companies.length){
      //@todo: hier komen meerdere companies
      const companyRef = db.collection('companies').doc(user_data.companies[0]);
      companyRef.get().then((value) => {
        callback({type: 'success', data: { user: user_data, company: value.data() } });
      }, function(error) {
        callback({ type: 'error', data: error});
      });
    } else {
      callback({ type: 'error', data: 'This user has no companies'});
    }
  }, function(error){
    callback({ type: 'error', data: error});
  })
}

export const getCompany = (company_id, callback) => {
  console.log('---->>>>Get: getCompany');
  const companyRef = db.collection('companies').doc(company_id);
  companyRef.get().then((value) => {
    callback(value.data());
  }, function(error) {
    callback({ type: 'error', data: error});
  });
}

export const getSlideshows = (company_id, callback) => {
  console.log('---->>>>Get: getSlideshows');
  let docRef = db.collection("slideshows"); //.where("companyId", "==", company_id);
  docRef.get().then((querySnapshot) => {
    if(querySnapshot.size > 0){
      let data = [];
      querySnapshot.docs.forEach(doc => {
        if(typeof doc.data().cover !== 'undefined'){
          let _data = doc.data(); _data.id = doc.id;
          data.push(_data);
        }
      })
      callback(data);
    } else {
      callback([]);
    }
  })
}

export const getSlide = (slideshow, slide, callback) => {
  console.log('---->>>>Get: getSlide');
  let docRef = db.collection("slideshows").doc(slideshow).collection("slides").doc(slide);
  docRef.get().then((_document) => {
    if(_document.exists){
      callback(_document.data());
    } else {
      callback('no found');
    }
  })
}


export const getSlideshowsById = (arr_slideshows, callback) => {
  console.log('---->>>>Get: getSlideshowsById');
  let docRef = db.collection("slideshows");//.where('id', 'in', arr_slideshows);
  docRef.get().then((querySnapshot) => {
    if(querySnapshot.size > 0){
      let data = [];
      querySnapshot.docs.forEach(doc => {
        if(typeof doc.data().cover !== 'undefined' && arr_slideshows.includes(doc.id)){
          let _data = doc.data(); _data.id = doc.id;
          data.push(_data);
        }
      })
      callback(data);
    } else {
      callback([]);
    }
  })
}

function removeFalsyElementsFromArray(someArray) {
    var newArray = [];
    for(var index = 0; index < someArray.length; index++) {
        if(someArray[index]) {
            newArray.push(someArray[index]);
        }
    }
    return newArray;
}

export const getUserSlideshows = (company_id, callback) => {
  console.log('---->>>>Get: getUserSlideshows');
  let docRef = db.collection("slideshows"); //.where("companyId", "==", company_id);
  docRef.get().then((querySnapshot) => {
    if(querySnapshot.size > 0){
      let data = {};
      let i = 0; let a = 0;
      let __length = querySnapshot.docs.length;
      querySnapshot.docs.forEach(doc => {
        let answerRef = db.collection("slideshows").doc(doc.id).collection('answers');
        answerRef.get().then((sub) => {
          i = i+1;
          if (sub.size > 0) {
            sub.docs.forEach(_a => {
              let _answer = _a.data();
              let split_id = _a.id.split("---");
              let _contact = split_id[1];
              let _question = split_id[0];

              _answer.id = _a.id;
              _answer.question = _question;
              
              if( data[_contact] === undefined ) {
                  data[_contact] = [];
                  data[_contact].slideshows = [];
              }
              if( data[_contact].slideshows[a] === undefined ) {
                data[_contact].slideshows[a] = doc.data();
                data[_contact].slideshows[a].id = doc.id;
                data[_contact].slideshows[a].answers = [];
              }
              data[_contact].slideshows[a].answers.push(_answer);
            });
            if(i == __length){
              callback(data);
            }
            a = a + 1;
          }
        })
      })
    } else {
    }
  })
}


export const getDropdownData = (collection, label, callback) => {
  console.log('---->>>>Get: getDropdownData');
  let docRef = db.collection(collection); //.where("companyId", "==", company_id);
  docRef.get().then((querySnapshot) => {
    if(querySnapshot.size > 0){
      let data = [];
      querySnapshot.docs.forEach(doc => {
        if((collection == 'slideshows'  && typeof doc.data().cover !== 'undefined') || collection != 'slideshows' ) {
          let doc_data = doc.data();
          let _label = '';
          if(Array.isArray(label)){
            label.forEach((_l, _k) => {
              _label = _label+doc_data[_l]+' ';
            })
            _label = _label.trim();
          } else {
            _label = doc_data[label];
          }
          let _data = { value: doc.id, label: _label };
          data.push(_data);
        }
      })
      callback(data);
    } else {
      callback([]);
    }
  })
}

export const getContact = (contact_id, callback) => {
  console.log('---->>>>Get: getContact');
  const contactRef = db.collection('contacts').doc(contact_id);
  contactRef.get().then((value) => {
    callback(value.data());
  }, function(error) {
    callback({ type: 'error', data: error});
  });
}

export const getContacts = (callback) => {
  console.log('---->>>>Get: getContacts');
  let docRef = db.collection("contacts"); //.where("companyId", "==", company_id); @todo
  docRef.get().then((querySnapshot) => {
    if(querySnapshot.size > 0){
      let data = [];
      querySnapshot.docs.forEach(doc => {
        let _data = doc.data(); _data.id = doc.id;
        data.push(_data);
      })
      callback(data);
    } else {
      callback([]);
    }
  })
}

export const getContactsById = (callback) => {
  console.log('---->>>>Get: getContactsById');
  let docRef = db.collection("contacts"); //.where("companyId", "==", company_id); @todo
  docRef.get().then((querySnapshot) => {
    if(querySnapshot.size > 0){
      let data = {};
      querySnapshot.docs.forEach(doc => {
        let _data = doc.data();
        data[_data.id] = _data;
      })
      callback(data);
    } else {
      callback([]);
    }
  })
}

export const getAppointments = (callback) => {
  console.log('---->>>>Get: getAppointments');
  let docRef = db.collection("appointments"); //.where("companyId", "==", company_id); @todo & contacts
  docRef.get().then((querySnapshot) => {
    if(querySnapshot.size > 0){
      let data = [];
      querySnapshot.docs.forEach(doc => {
        let _data = doc.data(); _data.id = doc.id;
        data.push(_data);
      })
      callback(data);
    } else {
      callback([]);
    }
  })
}

export const getAppointmentsFromContact = (contact, callback) => {
  console.log('---->>>>Get: getAppointmentsFromContact');
  let docRef = db.collection("appointments").where("contact", "==", contact); //.where("companyId", "==", company_id); @todo & contacts
  docRef.get().then((querySnapshot) => {
    if(querySnapshot.size > 0){
      let data = [];
      querySnapshot.docs.forEach(doc => {
        let _data = doc.data(); _data.id = doc.id;
        data.push(_data);
      })
      callback(data);
    } else {
      callback([]);
    }
  })
}

export const getQuestions = (callback) => {
  console.log('---->>>>Get: getQuestions');
  let docRef = db.collection("questions"); //.where("companyId", "==", company_id); @todo & contacts
  docRef.get().then((querySnapshot) => {
    if(querySnapshot.size > 0){
      let data = [];
      querySnapshot.docs.forEach(doc => {
        let _data = doc.data(); _data.id = doc.id;
        data.push(_data);
      })
      callback(data);
    } else {
      callback([]);
    }
  })
}

export const getQuestionList = (callback) => {
  console.log('---->>>>Get: getQuestionList');
  let docRef = db.collection("questions"); //.where("companyId", "==", company_id); @todo & contacts
  docRef.get().then((querySnapshot) => {
    if(querySnapshot.size > 0){
      let data = {};
      querySnapshot.docs.forEach(doc => {
        let _data = doc.data(); _data.id = doc.id;
        data[_data.id] = _data;
      })
      callback(data);
    } else {
      callback([]);
    }
  })
}

export const getAnswers = (slideshow_id, callback) => {
  console.log('---->>>>Get: getAnswers');
  let docRef = db.collection("answers").where("slideshow", "==", slideshow_id); //.doc(slideshow_id).collection("answers"); //.where("companyId", "==", company_id); @todo & contacts
  docRef.get().then((querySnapshot) => {
    if(querySnapshot.size > 0){
      let data = {};
      querySnapshot.docs.forEach(doc => {
        let _data = doc.data(); _data.id = doc.id;
        data[_data.id] = _data;
      })
      callback(data);
    } else {
      callback([]);
    }
  })
}

export const getLabels = (callback) => {
  console.log('---->>>>Get: getLabels');
  let docRef = db.collection("labels"); //.where("companyId", "==", company_id); @todo & contacts
  docRef.get().then((querySnapshot) => {
    if(querySnapshot.size > 0){
      let data = [];
      querySnapshot.docs.forEach(doc => {
        let _data = doc.data(); _data.id = doc.id;
        data.push(_data);
      })
      callback(data);
    } else {
      callback([]);
    }
  })
}

export const getSlideshow = (slideshow_id, callback) => {
  console.log('---->>>>Get: getSlideshow');
  let docRef = db.collection("slideshows").doc(slideshow_id).collection("slides").orderBy('slide_i');
  docRef.get().then((querySnapshot) => {
    if(querySnapshot.size > 0){
      let data = [];
      querySnapshot.docs.forEach(doc => {
        let _data = doc.data(); _data.id = doc.id;
        data.push(_data);
      })
      callback(data);
    } else {
      callback([]);
    }
  })
}

export const getLogs = (slideshow_id, slide, callback) => {
  console.log('---->>>>Get: getLogs');
  let docRef = db.collection("logs").where("slideshow", "==", slideshow_id).where("slide", "==", slide); //.doc(slideshow_id).collection("slides").doc(slide).collection('logs');
  docRef.get().then((querySnapshot) => {
    if(querySnapshot.size > 0){
      let data = [];
      querySnapshot.docs.forEach(doc => {
        let _data = doc.data(); _data.id = doc.id;
        data.push(_data);
      })
      callback(data);
    } else {
      callback([]);
    }
  })
}

export const getSlideshowLogsReports = (slideshow_id, callback) => {
  console.log('---->>>>Get: getSlideshowLogsReports');
  let docRef = db.collection("logs").where("slideshow", "==", slideshow_id) //.where("slide", "==", slide); //.doc(slideshow_id).collection("slides").doc(slide).collection('logs');
  docRef.get().then((querySnapshot) => {
    if(querySnapshot.size > 0){
      let data = [];
      let arr_slideshows = [];
      querySnapshot.docs.forEach(doc => {
        let _data = doc.data(); _data.id = doc.id;
        if(!arr_slideshows.includes(_data.slide)) {
          arr_slideshows.push(_data.slide);
          data[arr_slideshows.indexOf(_data.slide)] = [];
          data[arr_slideshows.indexOf(_data.slide)]['total_time'] = 0;
          data[arr_slideshows.indexOf(_data.slide)]['opens'] = 0;
          data[arr_slideshows.indexOf(_data.slide)]['slideshow'] = _data.slideshow;
          data[arr_slideshows.indexOf(_data.slide)]['slide'] = _data.slide;
        }
        data[arr_slideshows.indexOf(_data.slide)]['total_time'] = data[arr_slideshows.indexOf(_data.slide)]['total_time']+_data.time;
        data[arr_slideshows.indexOf(_data.slide)]['opens'] =  data[arr_slideshows.indexOf(_data.slide)]['opens']+1;
      })
      data  = data.sort( function( a, b ) { return b.total_time - a.total_time; } ).slice(0, 5);
      data.forEach((_data, key) => {
        getSlide(_data.slideshow, _data.slide, (response) => {
          data[key]['image'] = response.image;
          data[key]['slide_i'] = response.slide_i;
          if(key == data.length-1){
            callback(data);
          }
        })
      })
    } else {
      callback([]);
    }
  })
}

export const getAnswersLogsReports = (slideshow_id, callback) => {
  console.log('---->>>>Get: getAnswersLogsReports');
  getContactsById((all_contacts) => {
    getQuestionList((all_questions) => {
      let docRef = db.collection("answers").where("slideshow", "==", slideshow_id) //.where("slide", "==", slide); //.doc(slideshow_id).collection("slides").doc(slide).collection('logs');
      docRef.get().then((querySnapshot) => {
        if(querySnapshot.size > 0){
          let data = [];
          let arr_questions = [];
          querySnapshot.docs.forEach(doc => {
            let _data = doc.data(); _data.id = doc.id;
            if(!arr_questions.includes(_data.question)) {
              arr_questions.push(_data.question);
              data[arr_questions.indexOf(_data.question)] = [];
              data[arr_questions.indexOf(_data.question)]['answers'] = [];
              data[arr_questions.indexOf(_data.question)]['question'] = all_questions[_data.question].question;
              data[arr_questions.indexOf(_data.question)]['type'] = all_questions[_data.question].type;
            }
            data[arr_questions.indexOf(_data.question)]['answers'].push({ answer: _data.answer, datetime: _data.datetime, contact: all_contacts[_data.contact] });
          })
          callback(data);        
        } else {
          callback([]);
        }
      })
    })
  })
  
}

export const getContactLogsReports = (slideshow_id, callback) => {
  console.log('---->>>>Get: getContactLogsReports');
  let docRef = db.collection("logs").where("slideshow", "==", slideshow_id) //.where("slide", "==", slide); //.doc(slideshow_id).collection("slides").doc(slide).collection('logs');
  docRef.get().then((querySnapshot) => {
    if(querySnapshot.size > 0){
      let data = [];
      let arr_slideshows = [];
      querySnapshot.docs.forEach(doc => {
        let _data = doc.data(); _data.id = doc.id;
        if(!arr_slideshows.includes(_data.contact)) {
          arr_slideshows.push(_data.contact);
          data[arr_slideshows.indexOf(_data.contact)] = [];
          data[arr_slideshows.indexOf(_data.contact)]['total_time'] = 0;
          data[arr_slideshows.indexOf(_data.contact)]['opens'] = 0;
          data[arr_slideshows.indexOf(_data.contact)]['slideshow'] = _data.slideshow;
          data[arr_slideshows.indexOf(_data.contact)]['slide'] = _data.slide;
          data[arr_slideshows.indexOf(_data.contact)]['contact'] = _data.contact;
        }
        data[arr_slideshows.indexOf(_data.contact)]['total_time'] = data[arr_slideshows.indexOf(_data.contact)]['total_time']+_data.time;
        data[arr_slideshows.indexOf(_data.contact)]['opens'] =  data[arr_slideshows.indexOf(_data.contact)]['opens']+1;
      })
      data  = data.sort( function( a, b ) { return b.total_time - a.total_time; } ).slice(0, 5);
      data.forEach((_data, key) => {
        getContact(_data.contact, (response) => {
          data[key]['firstName'] = response.firstName;
          data[key]['lastName'] = response.lastName;
          data[key]['email'] = response.email;
          data[key]['image'] = response.image;
          if(key == data.length-1){
            callback(data);
          }
        })
      })
    } else {
      callback([]);
    }
  })
}

export const getSlideshowLogs = (slideshow_id, contact_id, callback) => {
  console.log('---->>>>Get: getSlideshowLogs');
  let docRef = db.collection("logs").where("contact", "==", contact_id).where("slideshow", "in", slideshow_id) //.where("slide", "==", slide); //.doc(slideshow_id).collection("slides").doc(slide).collection('logs');
  let _slideshows = {};
  slideshow_id.forEach((value, key) => {
    _slideshows[value] = [];
    _slideshows[value]['total_time'] = 0;
    _slideshows[value]['opens'] = 0;
  })
  docRef.get().then((querySnapshot) => {
    if(querySnapshot.size > 0){
      let data = [];
      querySnapshot.docs.forEach(doc => {
        let _data = doc.data(); _data.id = doc.id;
        _slideshows[_data.slideshow]['total_time'] = _slideshows[_data.slideshow]['total_time']+_data.time;
        _slideshows[_data.slideshow]['opens'] = _slideshows[_data.slideshow]['opens']+1;
      })
      callback(_slideshows);
    } else {
      callback([]);
    }
  })
}

export const getUserAnswers = (contact_id, callback) => {
  console.log('---->>>>Get: getUserAnswers');
  let docRef = db.collection("answers").where("contact", "==", contact_id)
  docRef.get().then((querySnapshot) => {
    if(querySnapshot.size > 0){
      let data = [];
      querySnapshot.docs.forEach(doc => {
        let _data = doc.data(); _data.id = doc.id;
        data.push(_data);
      })
      callback(data);
    } else {
      callback([]);
    }
  })
}

export const getCollectionFromCompany = (collection, callback) => {
  console.log('---->>>>Get: getCollectionFromCompany');
  let docRef = db.collection(collection); //.where("companyId", "==", company_id); @todo & contacts
  docRef.get().then((querySnapshot) => {
    if(querySnapshot.size > 0){
      let data = [];
      querySnapshot.docs.forEach(doc => {
        let _data = doc.data(); _data.id = doc.id;
        data.push(_data);
      })
      callback(data);
    } else {
      callback([]);
    }
  })
}

