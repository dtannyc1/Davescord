import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './css_reset.css';
import './index.css';
import App from './App';
import configureStore from './store';
import * as sessionActions from './store/session'
import csrfFetch from './store/csrf';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
}

function Root() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    );
}

const renderApp = () => {
    ReactDOM.render(
        <React.StrictMode>
            <Root />
        </React.StrictMode>,
        document.getElementById('root')
    );
}

if (sessionStorage.getItem("X-CSRF-Token") === null ||
        sessionStorage.getItem("currentUserId") === null) {
    store.dispatch(sessionActions.restoreSession()).then(renderApp)
} else {
    renderApp();
}
