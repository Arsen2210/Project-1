import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { SnackbarProvider } from 'notistack';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import reducer from './store/reducer'
import loggerMiddleware from 'redux-logger';
import './index.css';


const middleware=applyMiddleware(thunkMiddleware,loggerMiddleware);

const store=createStore(reducer,middleware)

ReactDOM.render(
    <BrowserRouter>
      <SnackbarProvider maxSnack={2}>
        <Provider store={store}>
          <App />
        </Provider> 
      </SnackbarProvider>
    </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.unregister()