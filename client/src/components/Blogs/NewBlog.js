import React from 'react'
import {axios, headers} from '../../config/axios';

import FormBlog from './FormBlog';

function NewBlog(props) {

    const handleSubmit = (formData) => {
        console.log("NEW", formData)
        axios.post('/blogs', formData, headers)
            .then(response => {
                props.history.push(`/blogs/${response.data._id}`)
            })
    }

    return (
        <div className="container">
            <FormBlog handleSubmit={handleSubmit}/>
        </div>
    )
}

export default NewBlog
