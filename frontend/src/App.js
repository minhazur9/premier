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
    user: {}
  }

  componentDidMount() {
    if (this.state.loggedIn) {
      axios.get('http://localhost:8000/premier/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then((response) => {
          this.setState({ username: response.data.username, user: response.data});
        });
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
          user: response.data.user
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
        this.setState({
          loggedIn: true,
          username: response.data.username,
          user: response.data.user
        });
      });
  };

  // Destroy token to logout
  handleLogout = () => {
    localStorage.removeItem('token');
    this.setState({ loggedIn: false, username: '', user:{} });
  };

  render() {
    return (
      <div className="app-container">
        <Navbar logOut={this.handleLogout} loggedIn={this.state.loggedIn}/>
        <main>
        <Routes user={this.state.user} loggedIn={this.state.loggedIn} handleSignup={this.handleSignup} handleLogin={this.handleLogin}/>
        </main>
        <Footer/>
      </div>
    );
  }
  
}

export default App;
