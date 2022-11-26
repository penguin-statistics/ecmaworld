import { store } from "@exusiai-dev/coredata/src/store";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
