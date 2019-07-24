import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Home from './components/Home';
import NewPost from './components/Posts/NewPost';
import ListPosts from './components/Posts/ListPosts';
import ShowPost from './components/Posts/ShowPost';

function App() {
    return (
        <BrowserRouter>
            <div className="container pt-2">
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/explore" component={ListPosts}/>
                    <Route path="/blogs/add" component={NewPost}/>
                    <Route path="/blogs/:id" component={ShowPost}/>
                </Switch>
            </div>
        </BrowserRouter>
    )
}

export default App