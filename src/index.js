import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import Firebase from './components/Firebase/index'
import FirebaseContexte from './components/Firebase/contexte'

ReactDOM.render(
  <FirebaseContexte.Provider value={new Firebase()}>
    <App />
   </FirebaseContexte.Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
