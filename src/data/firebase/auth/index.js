import { auth, db } from '@data/firebase';
import { v4 } from "uuid";

export const createUser = (user, password, company, callback) => {
  auth.createUserWithEmailAndPassword(user.email, password).then(result => {
    let companiesRef = db.collection('companies');
    company.id = v4();
    company.created = new Date();
    companiesRef.doc(company.id).set(company).then(function(ref) {
      let usersRef = db.collection('users');
      const newUser = Object.assign({companies: [company.id], created: new Date(), last_login: new Date(), role: 'ADMIN' }, user);
      newUser.email = newUser.email.toLowerCase().trim();
      usersRef.doc(newUser.email).set(newUser).then(function(ref) {
        console.log(newUser, company);
        callback({type: 'success', data: { user : newUser, company: company } });
      }, function(error){
        callback({ type: 'error', data: error});
      })
    }, function(error) {
        callback({ type: 'error', data: error});
    });
  }).catch(error => {
      let errorMessage = error.message;
      if (error.code == 'auth/weak-password') {
        errorMessage = 'Weak Password!';
      }
      if (callback) {
        callback({ type: 'error', data: errorMessage});
      }
  });
}

export const createInviteUser = (user, password, company_id, callback) => {
  auth.createUserWithEmailAndPassword(user.email, password).then(result => {
    const companyRef = db.collection('companies').doc(company_id);
    companyRef.get().then((company) => {
      let usersRef = db.collection('users');
      const newUser = Object.assign({companies: [company_id], created: new Date(), last_login: new Date(), role: 'ADMIN' }, user);
      newUser.email = newUser.email.toLowerCase().trim();
      usersRef.doc(newUser.email).set(newUser).then(function(ref) {
        console.log(newUser, company);
        callback({type: 'success', data: { user : newUser, company: company } });
      }, function(error){
        callback({ type: 'error', data: error});
      })
    }, function(error) {
      callback({ type: 'error', data: error});
    });
  }).catch(error => {
      let errorMessage = error.message;
      if (error.code == 'auth/weak-password') {
        errorMessage = 'Weak Password!';
      }
      if (callback) {
        callback({ type: 'error', data: errorMessage});
      }
  });
}

export const loginUser = (email, password, callback) => {
  auth.signInWithEmailAndPassword(email, password).then((user) => {
    const usersRef = db.collection('users').doc(email);
    usersRef.get().then((value) => {
      let user_data = value.data();
      //@todo: save last login
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
  }).catch((error) => {
    callback({ type: 'error', data: 'Wrong credentials'});
  });
}

export const logoutUser = () => {
  auth.signOut();
}