import {
    ActivityIndicator,
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import { colorDependingOnBackground } from '@utils';
import React from 'react';

interface DefaultButtonIconProps {}

export interface DefaultButtonProps {
    /**
     * The text to display in the button.
     */
    title: string;
    /**
     * Action triggered when the button is pressed.
     */
    onPress: () => void;
    /**
     * Disable the button depending on a state.
     */
    disabled?: boolean;
    /**
     * Uppercase the title.
     * @default false
     */
    uppercase?: boolean;
    /**
     * The color of the button.
     */
    color?: string;
    /**
     * Text color of the button.
     */
    textColor?: string;
    /**
     * Show a loading indicator when loading is true.
     */
    loading?: boolean;
    /**
     * Provide styling for the button.
     */
    style?: StyleProp<ViewStyle>;
    /**
     * Provide styling for the text conatined in the button.
     */
    textStyle?: StyleProp<TextStyle>;
    /**
     * Provide an icon that will be displayed on the left side.
     */
    iconLeft?: React.FC<DefaultButtonIconProps>;
    /**
     * * Provide an icon that will be displayed on the right side.
     */
    iconRight?: React.FC<DefaultButtonIconProps>;
}

const DefaultButton: React.FC<DefaultButtonProps> = ({
    title,
    onPress,
    disabled,
    uppercase = false,
    color,
    textColor,
    style,
    textStyle,
    loading,
    iconLeft,
    iconRight,
}) => {
    const IconLeft = iconLeft || (() => null);
    const IconRight = iconRight || (() => null);
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={[
                styles.container,
                style,
                { backgroundColor: color },
                {
                    opacity: disabled ? 0.7 : 1,
                },
            ]}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {loading && <ActivityIndicator color="white" />}
                <View
                    style={{
                        marginRight: 10,
                        marginLeft: loading ? 10 : 0,
                    }}
                >
                    <IconLeft />
                </View>

                <Text
                    style={[
                        styles.text,
                        textStyle,
                        {
                            textTransform: uppercase ? 'uppercase' : 'none',
                            marginLeft: loading ? 10 : 0,
                            color:
                                textColor ||
                                (color
                                    ? colorDependingOnBackground(color)
                                    : '#fff'),
                        },
                    ]}
                >
                    {title}
                </Text>
                <View
                    style={{
                        marginLeft: 10,
                    }}
                >
                    <IconRight />
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default DefaultButton;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        alignSelf: 'flex-start',
    },
    text: {
        fontSize: 15,
    },
});
