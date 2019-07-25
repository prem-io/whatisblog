import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class FormBlog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            imageUrl: null
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState(() => ({
            title: nextProps.blog.title,
            description: nextProps.blog.description
        }))
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
        if(this.state.imageUrl !== null){
            formData.append('image', this.state.imageUrl, this.state.imageUrl.name);
        }

        this.props.handleSubmit(formData)
    }

    render() {
        return (
            <div className="container pb-4">
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
                            required
						/>
					</div>

					<div className="form-group">
						<h5 className="card-title">Description</h5>
						<textarea
							name="description"
							value={this.state.description}
							className="form-control"
							rows="6"
							placeholder="Description"
                            onChange={this.handleChange}
                            required
						/>
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

export default FormBlog
