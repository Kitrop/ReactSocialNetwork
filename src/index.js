import React, { StrictMode } from 'react'
import './index.css'
import reportWebVitals from './reportWebVitals'
import ReactDOM from 'react-dom'
import App from './App'
import store from './redux/redux-store'
import {Provider} from 'react-redux'
import {createGlobalStyle} from 'styled-components'
import {BrowserRouter} from 'react-router-dom'


const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Monaco, sans-serif;
  }`

ReactDOM.render(
    <StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <GlobalStyle/>
                <App/>
            </Provider>
        </BrowserRouter>
    </StrictMode>,
    document.getElementById('root')
)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
