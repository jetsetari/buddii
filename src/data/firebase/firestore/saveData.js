import { db } from '@data/firebase';
import { v4 } from "uuid";

export function saveUser(data, callback) {
  console.log('---->>>>Save: User');
  let docRef = db.collection('user');
  docRef.doc(data.email).set(data, {merge: true}).then(() => {
      callback(true);
  }).catch(error => {
      callback(false);
  });
}

export function saveCompany(data, callback) {
  console.log('---->>>>Save: Company');
  let docRef = db.collection('user');
  let company_id = v4();
  docRef.doc(company_id).set(data, {merge: true}).then(() => {
      callback(company_id);
  }).catch(error => {
      callback(false);
  });
}

export function saveExtCompany(id, data, callback) {
  console.log('---->>>>Save: Company');
  let docRef = db.collection('extCompanies');
  let company_id = !id ? v4() : id;
  docRef.doc(company_id).set(data, {merge: true}).then(() => {
      callback(company_id);
  }).catch(error => {
      callback(false);
  });
}

export function saveLabel(id, data, callback) {
  console.log('---->>>>Save: Label');
  let docRef = db.collection('labels');
  let label_id = !id ? v4() : id;
  docRef.doc(label_id).set(data, {merge: true}).then(() => {
      callback(label_id);
  }).catch(error => {
      callback(false);
  });
}

export function saveSlideshow(data, callback) {
  console.log('---->>>>Save: Slideshow');
  let docRef = db.collection('slideshows');
  let slideshow_id = v4();
  console.log(slideshow_id, data);
  docRef.doc(slideshow_id).set(data, {merge: true}).then(() => {
      callback(slideshow_id);
  }).catch(error => {
      callback(false);
  });
}

export function saveSlide(slideshow_id, data, callback) {
  console.log('---->>>>Save: Slideshow');
  let docRef = db.collection('slideshows').doc(slideshow_id).collection('slides');
  let slide_id = v4();
  console.log(slide_id, data);
  docRef.doc(slide_id).set(data, {merge: true}).then(() => {
      callback(slide_id);
  }).catch(error => {
      callback(false);
  });
}

export function saveSlideId(slideshow_id, slide_id, data, callback) {
  console.log('---->>>>Save: SlideId');
  let docRef = db.collection('slideshows').doc(slideshow_id).collection('slides');
  docRef.doc(slide_id).set(data, {merge: true}).then(() => {
      callback(slide_id);
  }).catch(error => {
      callback(false);
  });
}


export function saveQuestion(data, callback) {
  console.log('---->>>>Save: User');
  let docRef = db.collection('questions');
  let question_id = v4();
  docRef.doc(question_id).set(data, {merge: true}).then(() => {
      callback(true);
  }).catch(error => {
      callback(false);
  });
}

export function saveLog(slideshow, slide, contact, user, time, callback) {
  console.log('---->>>>Save: Log');
  let docRef = db.collection('logs');//.doc(slideshow).collection('slides').doc(slide).collection('logs');
  let log_id = v4();
  let data = { user: user, time: time, datetime: new Date(), contact: contact, slideshow: slideshow, slide: slide };
  docRef.doc(log_id).set(data, {merge: true}).then(() => {
      callback(log_id);
  }).catch(error => {
      callback(false);
  });
}

export function saveAnswer(slideshow, question, slide_id, answer, user_id, callback) {
  console.log('---->>>>Save: Answer');
  let doc_id = slideshow+'--'+question+'--'+user_id;
  let docRef = db.collection('answers');
  let data = {
    slideshow: slideshow,
    question: question,
    contact: user_id,
    slide: slide_id, 
    datetime: new Date(), 
    answer: answer 
  };
  docRef.doc(doc_id).set(data, {merge: true}).then(() => {
      callback(question);
  }).catch(error => {
      callback(false);
  });
}

export function saveAppointment(date, slideshow, contact, user, callback) {
  console.log('---->>>>Save: Company');
  let docRef = db.collection('appointments');
  let appointment_id = v4();
  let data = { date: date, slideshow: slideshow, contact: contact, user: user };
  docRef.doc(appointment_id).set(data, {merge: true}).then(() => {
      callback(appointment_id);
  }).catch(error => {
      callback(false);
  });
}

export function saveAppointmentDone(appointment_id, done, callback) {
  console.log('---->>>>Save: SlideId');
  let data = { done: done }
  let docRef = db.collection('appointments');
  docRef.doc(appointment_id).set(data, {merge: true}).then((data) => {
      callback(data);
  }).catch(error => {
      callback(false);
  });
}

export function inviteUser(company, user) {
  console.log('---->>>>Save: Invite User');
  let docRef = db.collection('mail');
  docRef.doc().set({
    to: user.email,
    message: {
      subject: `You've been invited to join the Buddii platform`,
      html: `http://localhost:3000/registermail?firstName=${user.firstName}&lastName=${user.lastName}&mail=${user.email}&company=${company}`.replace(/ /g, '%20')
    }
  })
}

