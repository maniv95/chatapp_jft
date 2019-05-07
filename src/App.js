/*eslint-disable*/
import React, { Component } from 'react';
import { BrowserRouter as Router, Route , Switch } from "react-router-dom";
import { withRouter } from 'react-router';
import LandingPage from './LandingPage';
import Register from './Register';
import Login from './Login';
import Chat from './Chat';
import history from './history';
const all = () => (
  <div>
  <LandingPage/>
  </div>
)
const register = () => (
 <div>
 <Register/>
 </div>
)
const login = () => (
 <div>
 <Login/>
 </div>
)
const chat = () => (
 <div>
 <Chat/>
 </div>
)
class App extends Component {
  render() {
    return ( 
      <Switch>
        <Route exact path ="/" component ={all} />
        <Route  path = "/Register" component = {register} />
        <Route  path = "/Login"  component = {login} />
        <Route  path = "/ChatPage"    component = {chat} />  
       </Switch> 
    )
  }
}
export default withRouter(App);
