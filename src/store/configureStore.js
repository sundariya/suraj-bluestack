import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {logger} from 'redux-logger';
import rootReducer from "src/store/reducer";

const configureStore = () => {
    const store = createStore(rootReducer, applyMiddleware(thunk, logger));
    return store;
}

export default configureStore;