import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import authentication from './authentication';

<<<<<<< HEAD
=======

>>>>>>> main
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

const reducer = combineReducers({
    authentication,


});

const configureStore = initialState => {
    return createStore(
        reducer,
        initialState,
        storeEnhancer
    );
};

const storeEnhancer = composeEnhancers(applyMiddleware(thunk, logger));

<<<<<<< HEAD
export default configureStore;
=======
export default configureStore;
>>>>>>> main
