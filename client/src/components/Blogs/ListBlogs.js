import React, { Component } from 'react';
import {axios, headers} from '../../config/axios';
import {withRouter, Link} from 'react-router-dom';
import base64Arraybuffer from 'base64-arraybuffer';
import Loader from '../Loader';

class ListBlogs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            blogs: [],
            isAdmin: true
        }
    }

    componentDidMount() {
        axios.get("/blogs")
            .then(response => {
                this.setState({blogs: response.data})
            })
            .catch((err) => {
                this.props.history.push("/")
            })
    }

    handleRemove(id) {
		const confirmRemove = window.confirm('Are you sure?')
		if(confirmRemove) {
			axios.delete(`/blogs/${id}`, headers)
				.then((response) => {
                    this.setState((prevState) => ({
                        blogs: prevState.blogs.filter(blog => {
                            return blog._id !== response.data._id
                        })
                    }))
				})
		}
    }

    render() {
        const { blogs } = this.state
        return (
            <div className="container pt-4">
                {blogs.length === 0 && <Loader />}
                <div className="row">
                    {
                        blogs.map(blog => {
                        return <div className="col-sm-4" key={blog._id}>
                                <div className="card mb-4">
                                    <img src={'data:image/jpeg;base64,'+ base64Arraybuffer.encode(blog.imageUrl.data)} className="card-img-top" alt="..."/>
                                    <div className="card-body">
                                        <h5 className="card-title">{blog.title}</h5>
                                        <p className="card-text">{blog.description.substr(0,60)}</p>
                                        <div className="row">
                                            <div className="col">
                                                <Link to={`/blogs/${blog._id}`}>Read more..</Link>
                                                <p className="card-text"><small className="text-muted">Posted on {blog.createdAt.substr(0,10)}</small></p>
                                            </div>
                                            <div className="col">
                                                {
                                                    this.state.isAdmin && <div className="float-right">
                                                        <Link className="btn btn-outline-info btn-sm mr-2" to={`/blogs/edit/${blog._id}`}>Edit</Link>	
                                                        <button type="button" className="btn btn-outline-danger btn-sm"
                                                            onClick={this.handleRemove.bind(this, `${blog._id}`)}>Delete</button>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(ListBlogs);
