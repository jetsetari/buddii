import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import 'firebase/compat/firestore';
import { getStorage } from "firebase/storage";

const config = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId
};

if (!firebase.apps.length) {
  firebase.initializeApp(config)
  //firebase.analytics();
}

const db = firebase.firestore();
const auth = firebase.auth();
const storage = getStorage(firebase.initializeApp(config));
//const perf = firebase.performance();


export { db, auth, storage };