import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthenticationStack } from './Authentication';

interface RoutesProps {}

const Routes: React.FC<RoutesProps> = () => {
    return (
        <NavigationContainer>
            <AuthenticationStack />
        </NavigationContainer>
    );
};

export default Routes;
