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
                console.log(response.data)
                this.setState({
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
        let {title, description, createdAt, img, comments} = this.state
        if(title) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <h2 className="mt-4">{title}</h2>
                            <hr/>
                            <p>Posted on <em>{createdAt}</em></p>
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
