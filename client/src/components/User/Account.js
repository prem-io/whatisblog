import React, { Component } from 'react'

export class Account extends Component {
    render() {
        console.log(localStorage.getItem('userAuthToken'))
        return (
            <div>
                Account Page
            </div>
        )
    }
}

export default Account
