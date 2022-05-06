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
                headerShown: false,
                // headerStyle: {
                //     backgroundColor: colors.primary,
                // },
                headerTitleStyle: {
                    color: '#fff',
                },
                headerTitleAlign: 'left',
            }}
        >
            <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
    );
};

export default AuthenticationStack;
