import React from 'react'
import axios from 'axios'

class Signup extends React.Component {
    state = {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
        completed: false
    }

    handleInputChange = (e) => {
        if (e.target.name === 'completed') {
            this.setState((prevState) => {
                return {completed: !prevState.completed };
            });
        } else {
            this.setState({[e.target.name]: e.target.value})
        }
    }

    render() {
        return (
            <>
            <h1>Signup</h1>
            <form  onSubmit={e => this.props.handleSignup(e, this.state)}  className="login-form">
            <div className="input-form">
                <label htmlFor="firstName">First Name</label>
                <input 
                type="text"
                onChange={this.handleInputChange}   
                value={this.state.firstName} 
                name="firstName"
                className="login-input"
                />
            </div>
            <div className="input-form">
                <label htmlFor="lastName">Last Name</label>
                <input 
                type="text"
                onChange={this.handleInputChange}   
                value={this.state.lastName} 
                name="lastName"
                className="login-input"
                />
            </div>
            <div className="input-form">
                <label htmlFor="email">Email</label>
                <input 
                type="text"
                onChange={this.handleInputChange}   
                value={this.state.email} 
                name="email"
                className="login-input"
                />
            </div>
            <div className="input-form">
                <label htmlFor="username">Username</label>
                <input 
                type="text"
                onChange={this.handleInputChange}   
                value={this.state.username} 
                name="username"
                className="login-input"
                />
            </div>
            <div className="input-form">
                <label htmlFor="password">Password</label>
                <input 
                type="text"
                onChange={this.handleInputChange}   
                value={this.state.password} 
                name="password"
                className="login-input"
                />
            </div>
            <input type="submit" className="myButton" />
            </form>
            
            </>
        )
    }
    
}

export default Signup;