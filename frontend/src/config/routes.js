import React from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import Home from '../pages/Home';
import MovieDetails from '../pages/movies/MovieDetails';
import MovieIndex from '../pages//movies/MovieIndex';
import ShowDetails from '../pages/shows/ShowDetails';
import ShowIndex from '../pages/shows/ShowIndex';
import Login from '../pages/Login';
import Signup from '../pages/Signup';


const Routes = (props) => {

    const history = useHistory();

    const redirect = () => {
        history.push("/");
    }

    const loggedIn = props.loggedIn;

    const user = props.user;

    return (
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/movies/:movieId' component={MovieDetails}/>
        <Route path='/movies' component={MovieIndex}/>
        <Route path='/shows/:showId' render={(props) => <ShowDetails user={user} loggedIn = {loggedIn} showId={props.match.params.showId} />}/>
        <Route path='/shows' component={ShowIndex}/>
        <Route path="/login" render={() => <Login handleLogin={props.handleLogin} redirect={redirect}/>}/>
        <Route path='/signup' component={() => <Signup handleSignup={props.handleSignup} redirect={redirect}/>}/>
    </Switch>
    )
}

export default Routes;