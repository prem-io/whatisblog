import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Home from './components/Home';
import NewBlog from './components/Blogs/NewBlog';
import ListBlogs from './components/Blogs/ListBlogs';
import ShowBlog from './components/Blogs/ShowBlog';

function App() {
    return (
        <BrowserRouter>
            <div className="container pt-2">
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/blogs" component={ListBlogs}/>
                    <Route path="/blogs/add" component={NewBlog}/>
                    <Route path="/blogs/:id" component={ShowBlog}/>
                </Switch>
            </div>
        </BrowserRouter>
    )
}

export default App