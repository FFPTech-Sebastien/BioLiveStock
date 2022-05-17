import React from 'react';
import {
    StyleProp,
    StyleSheet,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

interface TransparentBackButtonProps {
    /**
     * Action triggered when the button is pressed.
     */
    onPress: () => void;
    /**
     * Provide styling for the button.
     */
    style?: StyleProp<ViewStyle>;
    /**
     * Provide an icon that will be displayed on the top left.
     */
    backIcon?: React.ReactNode;
}

const TransparentBackButton: React.FC<TransparentBackButtonProps> = ({
    onPress,
    style,
    backIcon,
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.topIcon,
                {
                    left: '8%',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                style,
            ]}
        >
            <View
                style={{
                    width: '100%',
                    height: '100%',
                    paddingVertical: 25,
                    paddingHorizontal: 20,
                    borderRadius: 17,
                    backgroundColor: 'white',
                    opacity: 0.3,
                    position: 'absolute',
                }}
            />
            {backIcon ? (
                backIcon
            ) : (
                <AntDesign name="left" size={15} color="white" />
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    topIcon: {
        position: 'absolute',
        top: '8%',
        zIndex: 99,
    },
});

export default TransparentBackButton;
