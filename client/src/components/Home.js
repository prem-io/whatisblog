import React, { Component } from 'react';
// import axios from '../config/axios';
import {Link} from 'react-router-dom';

import ListPosts from './Posts/ListPosts';

class Home extends Component {

    render() {
        return (
            <div>
                <h2>Home Page</h2>
                <Link to="/blogs/add">Create Blog</Link>
                <ListPosts />
            </div>
        )
    }
}

export default Home
