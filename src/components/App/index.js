import React from 'react'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Header from '../Header'
import Landing from '../Landing'
import Footer from '../Footer'
import Welcome from '../Welcome'
import Login from '../Login'
import Signup from '../Singup'
import Errorpage from '../ErrorPage'
import './../../App.css';


function App() {
  return (
    <Router>

      <Header />

      <Switch>
        <Route exact path='/' component={Landing} />
        <Route path='/welcome' component={Welcome} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
        <Route component={Errorpage} />
      </Switch>
      
      <Footer />

    </Router>
  );
}

export default App;
