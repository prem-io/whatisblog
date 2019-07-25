import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home';
import Register from './components/User/Register';
import Login from './components/User/Login';
import Logout from './components/User/Logout';
import NewBlog from './components/Blogs/NewBlog';
import ListBlogs from './components/Blogs/ListBlogs';
import ShowBlog from './components/Blogs/ShowBlog';
import EditBlog from './components/Blogs/EditBlog';

function App() {
    return (
        <BrowserRouter>
            <div>
                <Header />
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/register" component={Register}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/logout" component={Logout}/>
                        <Route path="/blogs/add" component={NewBlog}/>
                        <Route path="/blogs/edit/:id" component={EditBlog}/>
                        <Route path="/blogs/:id" component={ShowBlog}/>
                        <Route path="/blogs" component={ListBlogs}/>
                    </Switch>
            </div>
        </BrowserRouter>
    )
}

export default App