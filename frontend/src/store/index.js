import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import serverReducer from './server';
import usersReducer from './user';
import channelsReducer from './channel';
import messagesReducer from './message';
import unreadReducer from './unread';
import friendsReducer from './friend';

const rootReducer = combineReducers({
    session: sessionReducer,
    servers: serverReducer,
    users: usersReducer,
    channels: channelsReducer,
    messages: messagesReducer,
    unread: unreadReducer,
    friends: friendsReducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
