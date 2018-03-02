import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDSj5UDiR6zJJI7GgSdLocmEH1uPRLgDqc",
    authDomain: "info343-final-project-a6ecd.firebaseapp.com",
    databaseURL: "https://info343-final-project-a6ecd.firebaseio.com",
    projectId: "info343-final-project-a6ecd",
    storageBucket: "info343-final-project-a6ecd.appspot.com",
    messagingSenderId: "615489600758"
  };
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
