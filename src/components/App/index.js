import React from 'react'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Header from '../Header'
import Landing from '../Landing'
import Footer from '../Footer'
import Welcome from '../Welcome'
import Login from '../Login'
import Signup from '../Singup'
import Errorpage from '../ErrorPage'
import ForgetPassword from '../ForgetPassword'
import QuizOver from '../QuizOver'
import './../../App.css';
import {IconContext} from 'react-icons'
import {MathJaxContext} from 'better-react-mathjax'

function App() {

    const config = {
        loader: { load: ["input/asciimath"] }
    };

  return (
    <Router>
      <MathJaxContext config={config}>
        <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>

            <Header />

            <Switch>
              <Route exact path='/' component={Landing} />
              <Route path='/welcome' component={Welcome} />
              <Route path='/login' component={Login} />
              <Route path='/signup' component={Signup} />
              <Route path='/forgetpassword' component={ForgetPassword}/>
              <Route path='/quizover' component={QuizOver}/>
              <Route component={Errorpage} />
            </Switch>
            
            <Footer />

        </IconContext.Provider>
      </MathJaxContext>
    </Router>
  );
}

export default App;
