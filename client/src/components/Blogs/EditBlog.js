import React, { Component } from 'react';
import {axios, headers} from '../../config/axios';

import FormBlog from './FormBlog';

class EditPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            blog: {}
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(`blogs/${id}`, headers)
            .then(response => {
                this.setState({
                    blog: response.data
                })
            })
    }

    handleSubmit = (formData) => {
        axios.put(`blogs/${this.state.blog._id}`, formData, headers)
            .then(response => {
                this.props.history.push(`/blogs/${response.data._id}`)
            })
    }

    render() {
        return (
            <div>
                <h2>Edit Blog</h2>
                <FormBlog blog={this.state.blog} handleSubmit={this.handleSubmit}/>
            </div>
        )
    }
}

export default EditPost
