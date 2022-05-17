import { theme } from '@constants';
import React, { useMemo } from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';

export interface WidgetContainerProps {
    /**
     * Width of the widget.
     */
    width?: string;
    /**
     * Action triggered when the widget is pressed.
     */
    onPress?: () => void;
    /**
     * Provide styling for the container.
     */
    style?: StyleProp<ViewStyle>;
    /**
     * If yes, the content will be centered.
     */
    center?: boolean;
}

const WidgetContainer: React.FC<WidgetContainerProps> = ({
    width,
    style,
    onPress,
    center,
    children,
}) => {
    const centerStyle: ViewStyle = useMemo(() => {
        return {
            justifyContent: 'center',
            alignItems: 'center',
        };
    }, []);

    return (
        <TouchableOpacity
            style={[
                center ? centerStyle : {},
                {
                    width,
                    padding: 20,
                    marginTop: 10,
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
