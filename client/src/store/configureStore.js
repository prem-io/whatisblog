import {createStore, combineReducers} from 'redux';

import userReducers from '../reducers/userReducers';

const configureStore = () => {
    const store = createStore(combineReducers({
        user: userReducers
    }))

    return store
}

export default configureStore