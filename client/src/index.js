import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import { axios } from './config/axios';
import {setUser} from './actions/userActions';

const store = configureStore()

store.subscribe(() => {
    console.log("redux store", store.getState())
})

if(localStorage.getItem("userAuthToken")){
    axios.get("/users/account", {
        headers: {
            "x-auth": localStorage.getItem("userAuthToken")
        }
    })
    .then(response => {
        store.dispatch(setUser(response.data))
    })
}

const element = (
    <Provider store={store}>
        <App />
    </Provider>
)

ReactDOM.render(element, document.getElementById('root'));