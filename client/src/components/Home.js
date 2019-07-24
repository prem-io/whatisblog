import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import ListBlogs from './Blogs/ListBlogs';

class Home extends Component {

    render() {
        return (
            <div>
                <h2>Home Page</h2>
                <Link to="/blogs/add">Create Blog</Link>
                <ListBlogs />
            </div>
        )
    }
}

export default Home
