import React from 'react';
import './App.css';
import Navbar from './Components/layout/navbar.js';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import About from './Components/pages/about.js';
import Home from './Components/pages/home.js';
import Login from './Components/pages/login.js';
import AuthState from './Context/auth/AuthState';
import CodechefState from './Context/codechef/CodechefState';
import AlertState from './Context/alert/AlertState';
import Load from './Components/pages/load.js';
import Ranking from './Components/pages/ranking.js';
import Problem from './Components/pages/problem.js';
import ProblemPage from './Components/pages/problemPage';
import PrivateRoute from './Components/Routing/privateRoute'
require('dotenv').config()

function App() {
  return (
    

    // <h1>hi</h1>
    <AuthState>
    <AlertState>
    <CodechefState>
    <Router>
    <div className="App">
      <Navbar/>
      <Switch>
        <Route exact path='/' component={Load}/>
        <PrivateRoute exact path='/home' component={Home}/>
        <Route exact path='/about' component={About}/>
        <Route exact path='/login' component={Login}/>
        <PrivateRoute exact path='/problem/:contestcode' render={props=>(<Problem {...props}/>)} component={Problem}/>
        <PrivateRoute exact path='/problem/:contestcode/:problemcode' render={props=>(<ProblemPage {...props}/>)} component={ProblemPage}/>
        <PrivateRoute exact path='/rankings/:contestcode' render={props=>(<Ranking {...props}/>)} component={Ranking}/>

      </Switch>
    </div>
    </Router>
    </CodechefState>
    </AlertState>
    </AuthState>
  );
}

export default App;
