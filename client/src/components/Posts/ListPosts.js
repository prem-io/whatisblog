import React, { Component } from 'react';
import axios from '../../config/axios';
import {Link} from 'react-router-dom';

export class ListPosts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        axios.get("/blogs")
            .then(response => {
                this.setState({posts: response.data})
            })
    }

    render() {
        console.log(this.state)
        const { posts } = this.state
        return (
            <div>
                All-posts
                {
                    posts.map(post => {
                        return <div key={post._id}>
                            <h3>{post.title}</h3>
                            <Link to={`/blogs/${post._id}`}>Read more..</Link>
                        </div>
                    })
                }
            </div>
        )
    }
}

export default ListPosts
