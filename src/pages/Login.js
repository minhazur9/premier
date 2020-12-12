import React from 'react'

class Login extends React.Component {
    state = {
        username: '',
        password: '',
        completed: false,
        invalid: false
    }

    // Set state to the current input
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
            <h1 className="login-header">Login</h1>
            <form  onSubmit={e => {
                this.props.handleLogin(e, this.state)
                this.props.redirect()
            }} 
            className="login-form">
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
                type="password"
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