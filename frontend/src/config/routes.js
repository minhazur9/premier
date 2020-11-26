import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import MovieIndex from '../pages/MovieIndex';

export default (
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/movies' component={MovieIndex}/>
    </Switch>
)