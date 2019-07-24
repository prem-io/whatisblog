import React, { Component } from 'react';

import ListBlogs from './Blogs/ListBlogs';

class Home extends Component {

    render() {
        return (
            <div className="container pt-4">
                <ListBlogs />
            </div>
        )
    }
}

export default Home
