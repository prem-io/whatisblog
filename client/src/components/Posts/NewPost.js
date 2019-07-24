import React, { Component } from 'react';
import axios from '../../config/axios';
import {Link} from 'react-router-dom';

export class NewPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            imageUrl: null
        }
    }

    handleChange = (e) => {
        e.persist()
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    fileHandle = (e) => {
        e.persist()
        this.setState({
            imageUrl: e.target.files[0]
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let formData = new FormData()

        formData.append('title', this.state.title)
        formData.append('description', this.state.description)
        formData.append('image', this.state.imageUrl, this.state.imageUrl.name);
        
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'x-auth': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDM3ZGJlNjdhN2M0MzEyYThmNzc0YjYiLCJjcmVhdGVkQXQiOjE1NjM5NDIwMzg5ODYsImlhdCI6MTU2Mzk0MjAzOH0.c5SgXtJYm77z_qEiUAdiATCLDU9C5_XheeXDsF9agjM"
            }
        }

        axios.post("/blogs", formData, config)
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error)
            });

        console.log(formData)
    }

    render() {
        return (
            <div className="card">
				<form className="card-body" onSubmit={this.handleSubmit}>
					<div className="form-group">
						<h5 className="card-title">Title</h5>
						<input
							type="text"
							name="title"
							className="form-control"
							value={this.state.title}
							placeholder="Title"
							onChange={this.handleChange}
						/>
					</div>

					<div className="form-group">
						<h5 className="card-title">Description</h5>
						<textarea
							name="description"
							value={this.state.description}
							className="form-control"
							rows="2"
							placeholder="Description"
							onChange={this.handleChange}
						></textarea>
					</div>

                    <div className="form-group">
                        <h5 className="card-title">Upload Image</h5>
                        <input type="file" name="imageUrl" onChange={this.fileHandle}/>
                    </div>
                    
					<button type="submit" className="btn btn-primary">Submit</button>
					<span> </span>
					<Link to="/" className="btn btn-primary">Back</Link>
				</form>
			</div>
        )
    }
}

export default NewPost
