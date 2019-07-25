import React, { Component } from 'react';
import {connect} from 'react-redux';
import {axios} from '../../config/axios';
import {resetUser} from '../../actions/userActions';
import Loader from "../Loader";

export class Logout extends Component {
    componentDidMount() {
        axios.delete("/users/logout", {
            headers: {
                "x-auth": localStorage.getItem("userAuthToken")
            }
        })
        .then(response => {
            localStorage.removeItem("userAuthToken")
            this.props.dispatch(resetUser())
            this.props.history.push("/login")
        })
        .catch(err => {
            this.props.history.push("/login")
        })
    }

    render() {
        return (
            <div>
                <Loader/>
            </div>
        )
    }
}

export default connect()(Logout)
