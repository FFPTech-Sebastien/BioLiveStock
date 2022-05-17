import { theme } from '@constants';
import React, { useCallback, useEffect, useRef } from 'react';
import {
    Animated as Animation,
    Easing,
    StyleProp,
    StyleSheet,
    TextInputProps,
    View,
    ViewStyle,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Animated, {
    interpolateColor,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

export interface InputWithErrorProps extends TextInputProps {
    /**
     * Uppercase the label.
     * @default false
     */
    uppercaseLabel?: boolean;
    /**
     * Label displayed above the input.
     */
    label?: string;
    /**
     * Provide styling for the container.
     */
    containerStyle?: StyleProp<ViewStyle>;
    /**
     * Provide an error message to display below the input.
     */
    error?: string;
    /**
     * Provide an icon that will be displayed on the right side.
     */
    iconLeft?: React.FC;
    /**
     * Provide an icon that will be displayed on the left side.
     */
    iconRight?: React.FC;
}

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const InputWithError: React.FC<InputWithErrorProps> = ({
    uppercaseLabel = false,
    label,
    containerStyle,
    error,
    iconLeft,
    iconRight,
    ...props
}) => {
    const IconLeft = iconLeft || (() => null);
    const IconRight = iconRight || (() => null);
    const inputRef = useRef<TextInput>(null);
    const focus = useSharedValue(false);
    const shakeAnimation = useRef(new Animation.Value(0)).current;

    const progress = useDerivedValue(() => {
        return withTiming(focus.value ? 1 : 0);
    }, [focus.value]);

    const startShake = useCallback(() => {
        shakeAnimation.setValue(0);
        Animation.timing(shakeAnimation, {
            toValue: 1,
            duration: 150,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();
    }, [shakeAnimation]);

    useEffect(() => {
        if (error) {
            startShake();
        }
    }, [error, startShake]);

    const labelStyle = useAnimatedStyle(() => {
        const color = interpolateColor(
            progress.value,
            [0, 1],
            ['#000000', theme.colors.primary]
        );

        return {
            color,
        };
    });

    const borderStyle = useAnimatedStyle(() => {
        const borderColor = interpolateColor(
            progress.value,
            [0, 1],
            ['#f3efef', theme.colors.primary]
        );

        return {
            borderColor,
        };
    });

    const textStyle = useAnimatedStyle(() => ({
        color: interpolateColor(
            progress.value,
            [0, 1],
            ['#000000', theme.colors.primary]
        ),
    }));

    return (
        <View style={[styles.container, containerStyle]}>
            <View>
                {label && (
                    <Animated.Text
                        style={[
                            styles.label,
                            labelStyle,
                            {
                                textTransform: uppercaseLabel
                                    ? 'uppercase'
                                    : 'none',
                            },
                        ]}
                        onPress={() => {
                            inputRef.current?.focus();
                        }}
                    >
                        {label}
                    </Animated.Text>
                )}
                <Animated.View
                    style={[
                        styles.input,
                        borderStyle,
                        {
                            alignItems: 'center',
                            flexDirection: 'row',
                        },
                    ]}
                >
                    <IconLeft />
                    <AnimatedTextInput
                        ref={inputRef}
                        onFocus={() => {
                            focus.value = true;
                        }}
                        onBlur={() => {
                            focus.value = false;
                        }}
                        style={[
                            textStyle,
                            {
                                flex: 1,
                            },
                        ]}
                        selectionColor={theme.colors.primary}
                        enablesReturnKeyAutomatically
                        {...props}
                    />
                    <IconRight />
                </Animated.View>
                {!!error && (
                    <Animation.Text
                        style={[
                            styles.error,
                            {
                                transform: [
                                    {
                                        translateX: shakeAnimation.interpolate({
                                            inputRange: [0, 0.25, 0.5, 0.75, 1],
                                            outputRange: [0, -10, 10, -10, 0],
                                        }),
                                    },
                                ],
                            },
                        ]}
                    >
                        {error}
                    </Animation.Text>
                )}
            </View>
        </View>
    );
};

export default InputWithError;

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
    },
    label: {
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 10,
        alignSelf: 'flex-start',
    },
    input: {
        padding: 10,
        height: 45,
        backgroundColor: '#f3efef',
        color: '#000000',
        borderWidth: 1,
        fontSize: 13,
        borderRadius: 10,
    },
    error: {
        marginTop: 3,
        color: 'red',
        fontWeight: '700',
    },
});
