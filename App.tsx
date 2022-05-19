import React from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import store from 'src/state/store';
import Routes from 'src/navigation/Routes';

export default function App() {
    return (
        <Provider store={store}>
            <StatusBar style="auto" />
            <Routes />
        </Provider>
    );
}
