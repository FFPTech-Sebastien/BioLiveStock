import React from 'react';
import { ActivityIndicator, ActivityIndicatorProps, View } from 'react-native';

interface LoadingOverlayProps extends ActivityIndicatorProps {}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ ...props }) => {
    return (
        <View>
            <ActivityIndicator {...props} />
        </View>
    );
};

export default LoadingOverlay;
