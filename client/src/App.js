import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import Index from './components/pages/index/Index'
import NavBar from './components/ui/NavBar/NavBar'
import Recipes from './components/pages/recipes-search/Recipes'
import Signup from './components/pages/auth/signup/Signup'
import Login from './components/pages/auth/login/Login'
import Profile from './components/pages/profile/Profile'
import SearchNutri from './components/pages/search-nutri/Search-nutri'
import Menu from './components/pages/profile/Menu/Menu'
import AuthServices from './services/auth.services'



class App extends Component {

  constructor() {
    super()
    this.state = { loggedInUser: null }
    this.authservices = new AuthServices()
  }

  componentDidMount = () => this.fetchUser()


  setTheUser = userObj => this.setState({ loggedInUser: userObj })


  fetchUser = () => {
    this.authservices.loggedin()
      .then(theUser => this.setState({ loggedInUser: theUser }))
      .catch(() => this.setState({ loggedInUser: false }))
  }


  render() {

    return (
      <div className="App">
        <NavBar setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} />

        <main>
          <Switch>
            <Route exact path="/" render={props => <Index setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} {...props} />} />
            <Route exact path="/recipes" render={() => <Recipes setTheUser={this.setTheUser} />} />
            <Route path="/search-nutri" render={props => this.state.loggedInUser ? <SearchNutri loggedInUser={this.state.loggedInUser} setTheUser={this.setTheUser} {...props} /> : <Redirect to="/" />} />
            <Route path="/signup" render={props => <Signup setTheUser={this.setTheUser} {...props} />} />
            <Route path="/login" render={props => <Login setTheUser={this.setTheUser} {...props} />} />
            <Route path="/profile" render={props => this.state.loggedInUser ? <Profile loggedInUser={this.state.loggedInUser} setTheUser={this.setTheUser} {...props} /> : <Redirect to="/" />} />
            <Route path="/my-menu" render={props => this.state.loggedInUser ? <Menu loggedInUser={this.state.loggedInUser} setTheUser={this.state.setTheUser} {...props} /> : <Redirect to='/' />} />
          </Switch>
          <link href="https://fonts.googleapis.com/css?family=Quicksand|Raleway|Sen&display=swap" rel="stylesheet"></link>
        </main>
      </div>
    );
  }
}

export default App;
