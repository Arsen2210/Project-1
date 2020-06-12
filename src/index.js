import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { SnackbarProvider } from 'notistack';
// import * as serviceWorker from './serviceWorker';

 ReactDOM.render(
  <React.StrictMode>
  <SnackbarProvider maxSnack={2}>
    <App />
</SnackbarProvider>
  </React.StrictMode>,
  document.getElementById('root')
); 
