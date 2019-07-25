import React, { Component } from 'react';
import {axios} from '../config/axios';
import {connect} from 'react-redux';
import {setUser} from '../actions/userActions'; 

import ListBlogs from './Blogs/ListBlogs';

class Home extends Component {

    componentDidMount() {
        axios.get('/users/account', {
            headers: {
                "x-auth": localStorage.getItem('userAuthToken')
            }
        })
            .then(response => {
                const user = response.data
                this.props.dispatch(setUser(user))
            })
            .catch(err => {
                this.props.history.push('/login')
            })
    }

    render() {
        return (
            <div className="container pt-2">
                <ListBlogs />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Home)
