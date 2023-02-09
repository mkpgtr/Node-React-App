import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {Provider} from 'react-redux'
import { store } from './redux/store'

// ! not much redux is actually used.
// ! not changing the redux parts for the fear of messing things up.

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>

    <App  />
    </Provider>
  </React.StrictMode>,
)
