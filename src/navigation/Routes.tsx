import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './App/Main/MainStack';
import DrawerTabs from './App/DrawerTabs';

interface RoutesProps {}

const Routes: React.FC<RoutesProps> = () => {
    return (
        <NavigationContainer>
            {/* <MainStack /> */}
            <DrawerTabs />
        </NavigationContainer>
    );
};

export default Routes;
