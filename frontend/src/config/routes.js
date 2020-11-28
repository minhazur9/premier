import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import MovieDetails from '../pages/MovieDetails';
import MovieIndex from '../pages/MovieIndex';
import Login from '../pages/Login';

export default (
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/movies/:movieId' component={MovieDetails}/>
        <Route path='/movies' component={MovieIndex}/>
        <Route path='/login' component={Login}/>
    </Switch>
)