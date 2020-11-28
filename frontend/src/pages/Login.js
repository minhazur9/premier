import React from 'react'

class Login extends React.Component {
    state = {
        username: '',
        password: '',
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

    handleFormSubmit = (event) => {
        event.preventDefault();
    }

    render() {
        return (
            <>
            <h1>Login</h1>
            <form className="login-form">
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

export default Login;