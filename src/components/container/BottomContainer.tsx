import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

interface BottomContainerProps {
    /**
     * Percentage or absolute value of the bottom position of the container.
     * @default '5%''
     */
    bottom?: string | number;
    /**
     * Provide styling for the container.
     */
    style?: StyleProp<ViewStyle>;
}

class BottomContainer extends React.Component<BottomContainerProps> {
    static defaultProps = {
        bottom: '5%',
    };

    render() {
        const { bottom, style, children } = this.props;
        return (
            <View
                style={[
                    {
                        position: 'absolute',
                        bottom: bottom,
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'space-around',
                        zIndex: 9999,
                    },
                    style,
                ]}
            >
                {children}
            </View>
        );
    }
}

export default BottomContainer;
