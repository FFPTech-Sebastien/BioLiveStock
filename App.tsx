import React from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import Routes from './src/navigation/Routes';
import store from './src/state/store';

export default function App() {
    return (
        <Provider store={store}>
            <StatusBar style="light" />
            <Routes />
        </Provider>
    );
}
