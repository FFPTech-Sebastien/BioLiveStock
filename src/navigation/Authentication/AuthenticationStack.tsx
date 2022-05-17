import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthenticationParamsList } from './AuthenticationParamsList';
import { Register } from '@screens';

interface AuthenticationStackProps {}

const Stack = createStackNavigator<AuthenticationParamsList>();

const AuthenticationStack: React.FC<AuthenticationStackProps> = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                headerStyle: {
                    backgroundColor: 'green',
                },
                headerTitleAlign: 'left',
            }}
        >
            <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
    );
};

export default AuthenticationStack;
