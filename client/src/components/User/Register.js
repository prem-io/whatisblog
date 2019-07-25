import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {axios} from '../../config/axios';

export class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
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
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }
        console.log(formData)
        axios.post('/users/register', formData)
            .then(response => {
                if(response.data.errors) {
                    alert(response.data.alert);
                } else {
                    this.props.history.push("/login");
                }
            })
    }

    render() {
        return (
            <div className="container pt-5 col-sm-4">
                <div className="card">
                    <div className="card-body">
                     <h5 className="card-title text-center">REGISTER</h5>
                        <form onSubmit = {this.handleSubmit}>
                            <div className="form-group">
                            Username
                            <input
                                type='text'
                                name='username'
                                placeholder='Username'
                                className="form-control" 
                                onChange={this.handleChange} required/>
                            </div>

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

export default Register
