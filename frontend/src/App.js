import React from 'react'
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Routes from './config/routes';
import axios from 'axios';
import './App.css';


class App extends React.Component {
  state = {
    loggedIn: localStorage.getItem('token') ? true : false,
    username: '',
    user: {},
    userId: '',
    showArray: [],
    movieArray: []
  }

  componentDidMount() {
    if (this.state.loggedIn) {
      axios.get('http://localhost:8000/premier/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then((response) => {
          this.setState({ username: response.data.username, user: response.data, userId: response.data.id})
          axios.get(`http://localhost:8000/premier/profiles/${this.state.userId}/movies/`)
          .then((response) => this.setState({movieArray:response.data}))
          axios.get(`http://localhost:8000/premier/profiles/${this.state.userId}/shows/`)
          .then((response) => this.setState({showArray:response.data}))
        })
      
    }
  }

  // Get token from login
  handleLogin = (e,data) => {
    e.preventDefault();
    axios.post('http://localhost:8000/accounts/token/', {username: data.username, password: data.password})
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        this.setState({
          loggedIn: true,
          username: response.data.user.username,
          user: response.data.user,
          userId: response.data.user.id

        });
      })
      .catch((error) => {
        console.log('Invalid');
        this.setState({error:true});
        })
  };

  // Create a user and get token to login
  handleSignup = (e, data) => {
    e.preventDefault();
    axios.post('http://localhost:8000/premier/users/', 
    { username: data.username, 
      password: data.password, 
      first_name: data.firstName, 
      last_name: data.lastName,
      email: data.email
    })
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        const userId = response.data.id;
        this.setState({
          loggedIn: true,
          username: response.data.username,
          user: response.data.user,
          userId: userId
        });
      });
  };

  // Destroy token to logout
  handleLogout = () => {
    localStorage.removeItem('token');
    this.setState({ loggedIn: false, username: '', user:{}, userId:'' });
  };

  render() {
    return (
      <div className="app-container">
        <Navbar userId={this.state.userId} logOut={this.handleLogout} loggedIn={this.state.loggedIn}/>
        <main>
        <Routes movieArray={this.state.movieArray} showArray={this.state.showArray} user={this.state.user} loggedIn={this.state.loggedIn} handleSignup={this.handleSignup} handleLogin={this.handleLogin}/>
        </main>
        <Footer/>
      </div>
    );
  }
  
}

export default App;
