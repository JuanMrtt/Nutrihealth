import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { Switch, Route, Redirect } from 'react-router-dom'

import Recipes from './components/pages/index/Recipes'
import Index from './components/pages/index/Index'


import PreSignup from './components/pages/auth/signup/PreSignup'
import Signup from './components/pages/auth/signup/Signup'
import Login from './components/pages/auth/login/Login'

import NavBar from './components/ui/NavBar'
import Profile from './components/pages/profile/Profile'

import AuthServices from './services/auth.services'



class App extends Component {

  constructor() {
    super()
    this.state = { loggedInUser: null }
    this.services = new AuthServices()
  }


  componentDidUpdate = (prevProps, prevState) => console.log("El estado de App se ha actualizado:", this.state)
  componentDidMount = () => {
    // console.log("este es el component did mount....")
    // console.log(this.state.loggedInUser)
    this.fetchUser()
  }


  setTheUser = userObj => this.setState({ loggedInUser: userObj })
  fetchUser = () => {
    this.services.loggedin()
      .then(theUser => {
        // console.log(theUser)
        this.setState({ loggedInUser: theUser })
      })
      .catch(() => this.setState({ loggedInUser: false }))
  }


  render() {
    // console.log(this.state.loggedInUser)
    return (
      <>
        <NavBar setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} />

        <Switch>
          <Route exact path="/recipes" render={() => <Recipes />} />

          <Route exact path="/" render={() => <Index />} />
          {/* <Route path="/presignup" render={() => <PreSignup setTheUser={this.setTheUser} />} /> */}
          <Route path="/signup" render={() => <Signup setTheUser={this.setTheUser} />} />
          <Route path="/login" render={props => <Login setTheUser={this.setTheUser} {...props} />} />
          <Route path="/profile" render={() => this.state.loggedInUser ? <Profile loggedInUser={this.state.loggedInUser} /> : <Redirect to="/" />} />
        </Switch>
      </>
    );
  }
}

export default App;