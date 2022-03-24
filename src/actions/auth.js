import { types } from '../types/types';
import { firebase, googleAuthProvider, auth } from '../firebase/firebase-config';
import { finishLoading, startLoading } from './ui';
import Swal from 'sweetalert2'

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch((startLoading()));
    auth.signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
      })
      .catch(e => {
        Swal.fire('Error', e.message, 'error');
      })
      .finally(() => {
        dispatch(finishLoading())
      })
  }
};

export const startRegisterWithEmailPasswordName = (email, password, name) => {
  return (dispatch) => {
    auth.createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        await user.updateProfile({ displayName: name })
        dispatch(login(user.uid, user.displayName));
      })
      .catch(e => {
        Swal.fire('Error', e.message, 'error');
      })
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
});

export const startLogout = () => {
  return async (dispatch) => {
    await auth.signOut();
    dispatch(logout());
  }
};


export const logout = () => ({
  type: types.logout
});