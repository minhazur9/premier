import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import MovieDetails from '../pages/MovieDetails';
import MovieIndex from '../pages/MovieIndex';
import ShowDetails from '../pages/ShowDetails';
import ShowIndex from '../pages/ShowIndex';
import Login from '../pages/Login';
import Signup from '../pages/Signup';


const Routes = (props) => (
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/movies/:movieId' component={MovieDetails}/>
        <Route path='/movies' component={MovieIndex}/>
        <Route path='/shows/:showId' component={ShowDetails}/>
        <Route path='/shows' component={ShowIndex}/>
        <Route path="/login" render={() => <Login handleLogin={props.handleLogin}/>}/>
        <Route path='/signup' component={() => <Signup handleSignup={props.handleSignup}/>}/>
    </Switch>
)

export default Routes;