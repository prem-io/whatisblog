import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';

const store = configureStore()

store.subscribe(() => {
    console.log("redux store", store.getState())
})

const element = (
    <Provider store={store}>
        <App />
    </Provider>
)

ReactDOM.render(element, document.getElementById('root'));