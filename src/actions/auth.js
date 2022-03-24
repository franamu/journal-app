import { types } from '../types/types';
import { firebase, googleAuthProvider, auth } from '../firebase/firebase-config';

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(login(1234, 'aja'));
    }, 3500)
  }
};

export const startRegisterWithEmailPasswordName = (email, password, name) => {
  return (dispatch) => {
    auth.createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        await user.updateProfile({ displayName: name })
        dispatch(login(user.uid, user.displayName));
      }).catch(e => console.log(e))
  }
}

export const startGoogleLogin = () => {
  return (dispatch) => {
    firebase.auth().signInWithPopup(googleAuthProvider)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName))
      }).catch(e => console.log(e))
  }
}

export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    name: displayName
  }
})