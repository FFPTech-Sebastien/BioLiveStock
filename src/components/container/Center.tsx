import React from 'react';
import { View } from 'react-native';

interface CenterProps {}

const Center: React.FC<CenterProps> = ({ children }) => {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {children}
        </View>
    );
};

export default Center;
