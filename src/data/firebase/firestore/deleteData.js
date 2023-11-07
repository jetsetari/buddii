import { db } from '@data/firebase';

export function deleteDocFromCollection(collection, id,  callback) {
  let docRef = db.collection(collection).doc(id);
  docRef.delete().then(() => {
    callback(true);
  })
}