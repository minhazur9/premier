import React from 'react';
import axios from 'axios';

class Home extends React.Component {

    componentDidMount() {
        axios.get('http://localhost:8000/premier/profile')
            .then((response) => console.log(response.data))
    }
    render() {
        return (
            <h1>Home</h1>
        )
    }
}

export default Home;