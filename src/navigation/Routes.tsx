import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerTabs } from './App';
import { getCurrentUser, RootState, useAppDispatch } from '@state';
import { useSelector } from 'react-redux';
import { AuthenticationStack } from './Authentication';
import { getItem } from 'src/services';
import { Splash } from '@components';

interface RoutesProps {}

const Routes: React.FC<RoutesProps> = () => {
    const { isLoggedIn, isLoading } = useSelector(
        (state: RootState) => state.user
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        getItem('jwt_token').then((token) => {
            // if a token is stored in local storage, get the user depending on the token
            if (token) {
                dispatch(getCurrentUser());
            }
        });
    }, []);

    if (isLoading) {
        return <Splash />;
    }

    return (
        <NavigationContainer>
            {isLoggedIn ? <DrawerTabs /> : <AuthenticationStack />}
        </NavigationContainer>
    );
};

export default Routes;
