import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthenticationParamsList } from './AuthenticationParamsList';
import { Login } from '../../screens';

interface AuthenticationStackProps {}

const Stack = createStackNavigator<AuthenticationParamsList>();

const AuthenticationStack: React.FC<AuthenticationStackProps> = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: 'green',
                },
                headerTitleAlign: 'left',
            }}
        >
            <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
    );
};

export default AuthenticationStack;
