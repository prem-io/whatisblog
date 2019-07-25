import React, { Component } from 'react';
import {axios} from '../../config/axios';
import {Link} from 'react-router-dom';
import base64Arraybuffer from 'base64-arraybuffer';
import Loader from '../Loader';
import Comment from './Comment';
import './styles.css';
import UserCard from './UserCard';

export class ShowPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            _id: '',
            user: {},
            avatar: '',
            title: '',
            description: '',
            createdAt: '',
            img: '',
            comments: []
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(`/blogs/${id}`)
            .then(response => {
                this.setState({
                    _id: response.data._id,
                    user: response.data.user,
                    avatar: 'data:image/jpeg;base64,'+ base64Arraybuffer.encode(response.data.user.avatar.data),
                    title: response.data.title,
                    description: response.data.description,
                    createdAt: response.data.createdAt.substr(0,10),
                    img: 'data:image/jpeg;base64,'+ base64Arraybuffer.encode(response.data.imageUrl.data),
                    comments: response.data.comments
                })
            })
    }

    render() {
        let {_id, title, description, createdAt, img} = this.state
        if(_id) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="row">
                                <div className="col">
                                    <h2 className="mt-4">{title}</h2>
                                </div>
                                <div className="col">
                                    <div className="float-right mt-4">
                                        <button className="btn btn-outline-info mr-2">Edit</button>
                                        <button className="btn btn-outline-danger">Delete</button>
                                    </div>
                                </div>
                            </div>
                            <hr/>
                            <span>Posted on <em>{createdAt}</em></span>
                            <hr/>
                            <img className="img-fluid rounded" src={img} alt=""/>
                            <hr/>
                            <p className="lead">{description}</p>
                            <Link style={{color: 'Black'}} to="/">Back</Link>
                            <hr/>
                            <Comment comments={this.state.comments}/>
                        </div>
                        <UserCard user={this.state.user} avatar={this.state.avatar}/>
                    </div>
                </div>
            )
        } else {
            return(
                <Loader />
            )
        }
    }
}
// "http://placehold.it/900x300"
export default ShowPost
