import React, { Component } from 'react';
import {axios} from '../../config/axios';
import {Link} from 'react-router-dom';

export class ListBlogs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            blogs: []
        }
    }

    componentDidMount() {
        axios.get("/blogs")
            .then(response => {
                this.setState({blogs: response.data})
            })
    }

    render() {
        const { blogs } = this.state
        return (
            <div>
                All-posts
                {
                    blogs.map(blog => {
                        return <div key={blog._id}>
                            <h3>{blog.title}</h3>
                            <Link to={`/blogs/${blog._id}`}>Read more..</Link>
                        </div>
                    })
                }
            </div>
        )
    }
}

export default ListBlogs
