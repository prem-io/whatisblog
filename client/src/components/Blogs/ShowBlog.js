import React, { Component } from 'react';
import {axios} from '../../config/axios';
import {Link} from 'react-router-dom';

export class ShowPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            createdAt: '',
            img: ''
        }
    }

    arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    }

    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(`/blogs/${id}`)
            .then(response => {
                // console.log(response.data.imageUrl.data)
                var base64Flag = 'data:image/jpeg;base64,';
                var imageStr = this.arrayBufferToBase64(response.data.imageUrl.data);
                this.setState({
                    title: response.data.title,
                    description: response.data.description,
                    createdAt: response.data.createdAt,
                    img: base64Flag + imageStr
                })
            })
    }

    render() {
        let {title, description, createdAt, img} = this.state
        return (
            <div>
                ShowPost
                <h3>{title}</h3>
                <p><em>{createdAt}</em></p>
                <img src={img} alt=""/>
                <p>{description}</p>
                <Link to="/">Back</Link>
            </div>
        )
    }
}

export default ShowPost
