import React from 'react';
import axios from 'axios';

class Home extends React.Component {

    state = {
        movies: [],
        shows: []
    }

    render() {
        return (
            <div className='edge'>
            <h1 className='title-logo'>Premier</h1>
            </div>
        )
    }
}

export default Home;