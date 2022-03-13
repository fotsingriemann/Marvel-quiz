import {initializeApp} from "firebase/app";

const Config = {
  apiKey: "AIzaSyA5wm2ianW8oE2A9VBQtoATzPfhIRf9GGM",
  authDomain: "marvel-quiz-8b891.firebaseapp.com",
  projectId: "marvel-quiz-8b891",
  storageBucket: "marvel-quiz-8b891.appspot.com",
  messagingSenderId: "143447774872",
  appId: "1:143447774872:web:6eb0fc7b344edebbe6a2ed"
};

class Firebase{
    constructor(){
        initializeApp(Config)
    }
}

export default Firebase