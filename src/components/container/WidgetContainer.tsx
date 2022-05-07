import { theme } from '@constants';
import React from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';

interface WidgetContainerProps {
    width?: string;
    onPress?: () => void;
    style?: ViewStyle | ViewStyle[];
}

const WidgetContainer: React.FC<WidgetContainerProps> = ({
    width,
    style,
    onPress,
    children,
}) => {
    return (
        <TouchableOpacity
            style={[
                {
                    width,
                    padding: 20,
                    borderColor: theme.colors.primary,
                    borderWidth: 1,
                    borderRadius: 10,
                },
                style,
            ]}
            onPress={onPress}
            activeOpacity={onPress ? 0.5 : 1}
        >
            {children}
        </TouchableOpacity>
    );
};

export default WidgetContainer;
