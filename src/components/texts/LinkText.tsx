import React from 'react';
import { Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

interface LinkTextProps {
    /**
     * The text to display.
     */
    text: string;
    /**
     * Action triggered when the text is pressed.
     */
    onPress: () => void;
    /**
     * Provide styling for the container.
     */
    containerStyle?: ViewStyle;
    /**
     *  Provide styling for the text.
     */
    textStyle?: TextStyle | TextStyle[];
    /**
     * Number of spaces to add before the text.
     * @default 0
     */
    space?: number;
}

const LinkText: React.FC<LinkTextProps> = ({
    text,
    onPress,
    containerStyle,
    textStyle,
    space = 0,
}) => {
    return (
        <TouchableOpacity onPress={onPress} style={[containerStyle]}>
            <Text style={textStyle}>
                {space !== 0 &&
                    Array.from({ length: space }, (_, i) => (
                        <Text key={i}>&nbsp;</Text>
                    ))}
                {text}
            </Text>
        </TouchableOpacity>
    );
};

export default LinkText;
