import React from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { logout } from '@state';

interface LogoutProps {}

const LogoutIcon: React.FC<LogoutProps> = () => {
    const dispatch = useDispatch();
    const handleLogout = () => {
        Alert.alert('Sign out?', 'You have to sign in again to use the app.', [
            {
                text: 'Cancel',
            },
            {
                text: 'Sign Out',
                onPress: () => {
                    dispatch(logout());
                },
            },
        ]);
    };

    return (
        <TouchableOpacity onPress={handleLogout}>
            <MaterialCommunityIcons name="logout" size={24} color="#5879ee" />
        </TouchableOpacity>
    );
};

export default LogoutIcon;
