import React from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import Home from '../pages/Home';
import MovieDetails from '../pages/movies/MovieDetails';
import MovieIndex from '../pages//movies/MovieIndex';
import ShowDetails from '../pages/shows/ShowDetails';
import ShowIndex from '../pages/shows/ShowIndex';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import ProfileDetails from '../pages/ProfileDetails';
import ProfileIndex from '../pages/ProfileIndex';


const Routes = (props) => {

    const history = useHistory();

    const redirect = () => {
        history.push("/");
    }

    const loggedIn = props.loggedIn;

    const user = props.user;

    const userId = props.userId

    const shows = props.showArray;

    const movies = props.movieArray;


    return (
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/movies/:movieId' render={(props) => <MovieDetails movies={movies} user={user} loggedIn = {loggedIn} movieId={props.match.params.movieId} />}/>
        <Route path='/movies' component={MovieIndex}/>
        <Route path='/shows/:showId' render={(props) => <ShowDetails shows={shows} user={user} loggedIn = {loggedIn} showId={props.match.params.showId} />}/>
        <Route path='/shows' component={ShowIndex}/>
        <Route path="/login" render={() => <Login handleLogin={props.handleLogin} redirect={redirect}/>}/>
        <Route path='/signup' render={() => <Signup handleSignup={props.handleSignup} redirect={redirect}/>}/>
        <Route path='/profiles/:profileId' component={(props) => <ProfileDetails userId={userId} loggedIn = {loggedIn} profileId={props.match.params.profileId}/>}/>
        <Route path='/profiles' component={ProfileIndex}/>
    </Switch>
    )
}

export default Routes;