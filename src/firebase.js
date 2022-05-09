import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDl20gKEOq0Yw-EFvd0AHbWKXN1nvcotTs",
    authDomain: "yt-clone-ashu.firebaseapp.com",
    projectId: "yt-clone-ashu",
    storageBucket: "yt-clone-ashu.appspot.com",
    messagingSenderId: "178146130104",
    appId: "1:178146130104:web:cec6098e0f25e3d6db5c4d"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase.auth()