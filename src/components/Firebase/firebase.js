import app from 'firebase/app';
import 'firebase/auth'
import 'firebase/firestore'

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
        app.initializeApp(Config)
        this.auth = app.auth()
        this.db = app.firestore()
    }

    // inscription
    signupUser = (email, password) => 
        this.auth.createUserWithEmailAndPassword(email, password)
    
    //connexion

    loginUser = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password)

    //deconnexion

    signoutUser = () =>
        this.auth.signOut()

    // reset the password

    passwordReset = email => {
        this.auth.sendPasswordResetEmail(email)
    }
    

    user = uid => this.db.doc('users/'+uid);

}

export default Firebase