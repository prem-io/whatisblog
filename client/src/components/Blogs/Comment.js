import React, { Component } from 'react'

class Comment extends Component {
    
    render() {
        const {comments} = this.props
        return (
            <div>
                <p>Comments - {comments.length}</p>
                <div className="card my-4">
                    <h5 className="card-header">Leave a Comment:</h5>
                    <div className="card-body">
                        <form>
                        <div className="form-group">
                            <input className="form-control" type="text" placeholder="Your name" required/>
                        </div>
                        <div className="form-group">
                            <textarea className="form-control" rows="3" placeholder="Your Comments" required/>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
                <div className="media mb-4">
                    <img className="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt=""/>
                    <div className="media-body">
                        <h5 className="mt-0">Commenter Name</h5>
                        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                    </div>
                </div>
            </div>
        )
    }
}

export default Comment
