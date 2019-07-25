import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Home from './components/Home';
import Header from './components/Header';
import NewBlog from './components/Blogs/NewBlog';
import ListBlogs from './components/Blogs/ListBlogs';
import ShowBlog from './components/Blogs/ShowBlog';
import EditBlog from './components/Blogs/EditBlog';
import Footer from './components/Footer';

function App() {
    return (
        <BrowserRouter>
            <div>
                <Header />
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/blogs/add" component={NewBlog}/>
                        <Route path="/blogs/edit/:id" component={EditBlog}/>
                        <Route path="/blogs/:id" component={ShowBlog}/>
                        <Route path="/blogs" component={ListBlogs}/>
                    </Switch>
                <Footer />
            </div>
        </BrowserRouter>
    )
}

export default App