import React, { Component } from 'react';
import {axios} from '../../config/axios';
import {Link} from 'react-router-dom';

export class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    handleChange = (e) => {
        e.persist()
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post("/users/login", formData)
            .then(response => {
                if(response.data.token) {
                    localStorage.setItem("userAuthToken", response.data.token)
                    this.props.history.push("/")
                } else {
                    alert("user not found")
                    this.props.history.push("/register")
                }
            })
    }
    
    render() {
        return (
            <div className="container pt-5 col-sm-4">
                <div className="card">
                    <div className="card-body">
                     <h5 className="card-title text-center">LOGIN</h5>
                        <form onSubmit = {this.handleSubmit}>
                            <div className="form-group">
                            Email
                            <input
                                type='text'
                                name='email'
                                placeholder='E-mail'
                                className="form-control" 
                                onChange={this.handleChange} required/>
                            </div>
                            
                            <div className="form-group">
                            Password
                            <input
                                type='password' 
                                name='password'
                                placeholder='Password'
                                className="form-control"
                                onChange={this.handleChange} required/>
                            </div>
                            
                            <div className="form-group">
                                <input type='submit' className="btn btn-primary mr-2" />
                                <Link to="/" className="btn btn-primary">Back</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login
