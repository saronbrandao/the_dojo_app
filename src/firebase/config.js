import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAaLjD06tc0YIpa3vct7gGgbPif3tCsjAE',
  authDomain: 'thedojosite-ca24f.firebaseapp.com',
  projectId: 'thedojosite-ca24f',
  storageBucket: 'thedojosite-ca24f.appspot.com',
  messagingSenderId: '986244369856',
  appId: '1:986244369856:web:8a3f3813a2f3d0517b4c25',
};

// init firebase

firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

// timestamp
const timestamp = firebase.firestore.timestamp;

export { projectFirestore, projectAuth, timestamp };
