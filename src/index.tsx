import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {configureStore, createAction, createReducer} from "@reduxjs/toolkit";
import {Provider, DefaultRootState} from 'react-redux'
import {Size} from "./size";

declare module "react-redux" {
    interface DefaultRootState {
        window: Size
    }
}

const initialState: DefaultRootState = {
    window: {
        width: window.innerWidth,
        height: window.innerHeight,
    }
}

const resizeAction = createAction<Size>("resize");

const store = configureStore({
    reducer: createReducer(initialState, builder => builder
        .addCase(resizeAction, (state, action) => {
            state.window = action.payload
        }))
});

window.addEventListener("resize", ev => {
    store.dispatch(resizeAction({
        width: window.innerWidth,
        height: window.innerHeight,
    }))
})

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
