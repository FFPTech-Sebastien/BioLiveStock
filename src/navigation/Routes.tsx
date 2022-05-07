import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerTabs } from './App';

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
