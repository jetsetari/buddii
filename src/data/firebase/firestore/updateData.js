import { db } from '@data/firebase';
import { v4 } from "uuid";

export function updateSlideshow(id, data, callback) {
  console.log('---->>>>Update: Slideshow', id, data);
  let docRef = db.collection('slideshows');
  docRef.doc(id).set(data, {merge: true}).then(() => {
      callback(id);
  }).catch(error => {
      callback(false);
  });
}

export function updateCompany(id, data, callback) {
  console.log('---->>>>Update: Company', id, data);
  let docRef = db.collection('companies');
  docRef.doc(id).set(data, {merge: true}).then(() => {
      callback(id);
  }).catch(error => {
      callback(false);
  });
}

export function updateUser(id, data, callback) {
  console.log('---->>>>Update: User', id, data);
  let docRef = db.collection('users');
  docRef.doc(id).set(data, {merge: true}).then(() => {
      callback(id);
  }).catch(error => {
      callback(false);
  });
}

export function updateContact(id, data, callback) {
  console.log('---->>>>Update: Contact', id, data);
  let docRef = db.collection('contacts');
  let _id = !id ? v4() : id;
  docRef.doc(_id).set(data, {merge: true}).then(() => {
      callback(id);
  }).catch(error => {
      callback(false);
  });
}

export function updateSlidesAi(slideshow, data, callback) {
  let key = 0;
  db.collection("slideshows").doc(slideshow).collection('slides').orderBy('slide_i').get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc){
        doc.ref.update({
            colors: data[key]
        });
        key++;
        if(key === querySnapshot.size) {
          let docRef = db.collection('slideshows');
          docRef.doc(slideshow).set({ ai : true }, {merge: true}).then(() => {
              callback(slideshow);
          }).catch(error => {
              callback(false);
          });
        }
      })
  });
}

export function disableAI(slideshow, callback) {
    let docRef = db.collection('slideshows');
    docRef.doc(slideshow).set({ ai : false }, {merge: true}).then(() => {
        callback(slideshow);
    }).catch(error => {
        callback(false);
    });
}

// export function updatePosition(slideshow, position callback) {
//     let docRef = db.collection('slideshows');
//     docRef.doc(slideshow).set({ x }, {merge: true}).then(() => {
//         callback(slideshow);
//     }).catch(error => {
//         callback(false);
//     });
// }



