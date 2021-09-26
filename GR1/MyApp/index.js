/**
 * @format
 */

import React, { Component } from 'react';
import {AppRegistry} from 'react-native';
import { Provider } from 'react-redux';
import App from './App';
import {name as appName} from './app.json';
import store from './src/reducers';
class MyApp extends Component {
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        );
    };
}

AppRegistry.registerComponent(appName, () => MyApp);
