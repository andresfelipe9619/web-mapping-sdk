import React, { Component } from 'react';
import Map from "./components/map/Map";
import Home from './components/home/Home.js';
import Login from './components/auth/Login.js';
import Navbar from './components/header/Navbar'
import Register from './components/auth/Register.js';
import Footer from './components/footer/Footer.js';
import Dashboard from './components/dashboard/Dashboard.js';
import NoMatch from './components/home/NoMatch.js';
import PrivateRoute from './components/auth/PrivateRoute';
// import Contact from './components/contact/Contact.js';
import { Route, withRouter, Switch } from 'react-router-dom';
import './App.css';
import {
  Grid,
  Header,
  Segment,
  Dimmer,
  Loader,
  Container
} from "semantic-ui-react";


class App extends Component {

  render() {
    return (
      <div>
        <Navbar></Navbar>
        <Container style={{ marginTop: '7em' }}>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/mapa' component={Map} />
            <Route path='/usuarios' component={Dashboard} /> 
            <Route exact path='/ingreso' component={Login} />
            <Route exact path='/registro' component={Register} />
            <Route component={NoMatch} />
          </Switch>
        </Container>
        <Footer></Footer>
      </div>
    );
  }
}

export default withRouter(App);