import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export class UserCard extends Component {
    render() {
        const {user, avatar} = this.props
        return (
            <div className="col-md-4">
                <div className="card my-4">
                    <div className="box-part text-center">
                        <img className="round" src={avatar} alt=""/>
                        <div className="title mt-2">
                            <h4>{user.username}</h4>
                        </div>
                        <div className="text">
                            <p><em>Bio</em></p>
                            <span>{user.bio}</span>
                        </div>
                        <Link className="contact" to="/contact">Contact Me</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserCard
