import { theme } from '@constants';
import React, { Children, cloneElement, isValidElement, useMemo } from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';

export interface WidgetContainerProps {
    width?: string;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
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
            {Children.map(children, (child) => {
                if (isValidElement(child)) {
                    return cloneElement(child, {
                        test: 'azer',
                    });
                }
                return child;
            })}
        </TouchableOpacity>
    );
};

export default WidgetContainer;
