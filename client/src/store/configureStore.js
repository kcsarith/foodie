import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import authentication from './authentication';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

//reducer - authentication
const reducer = combineReducers({
    authentication,
});

//store
const configureStore = initialState => {
    return createStore(
        reducer,
        initialState,
        storeEnhancer
    );
};

const storeEnhancer = composeEnhancers(applyMiddleware(thunk));

export default configureStore;
