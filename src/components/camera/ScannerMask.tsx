import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Pressable, View } from 'react-native';

interface ScannerMaskProps {
    /**
     * Action triggered when the mask is pressed.
     */
    onPress: () => void;
    /**
     * Size of the mask.
     * @default 50
     */
    size?: number;
    /**
     * Border with of the mask.
     * @default 2
     */
    borderWidth?: number;
    /**
     * Border color of the mask.
     * @default 'white'
     */
    borderColor?: string;
    /**
     * Duration of the animation.
     * @default 500ms
     */
    duration?: number;
    /**
     * Scale of the animation.
     * @default 1.2
     */
    scale?: number;
    /**
     * Radius of the corners.
     * @default 0
     */
    radius?: number;
}

const ScannerMask: React.FC<ScannerMaskProps> = ({
    onPress,
    size = 50,
    borderWidth = 2,
    borderColor = 'white',
    duration = 500,
    scale = 1.2,
    radius = 0,
}) => {
    const startValue = useRef(new Animated.Value(1)).current;

    const leftTop = {
        borderLeftWidth: borderWidth,
        borderTopWidth: borderWidth,
        borderColor,
    };
    const leftBottom = {
        borderLeftWidth: borderWidth,
        borderBottomWidth: borderWidth,
        borderColor,
    };
    const rightTop = {
        borderRightWidth: borderWidth,
        borderTopWidth: borderWidth,
        borderColor,
    };
    const rightBottom = {
        borderRightWidth: borderWidth,
        borderBottomWidth: borderWidth,
        borderColor,
    };

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(startValue, {
                    toValue: scale,
                    useNativeDriver: true,
                    duration,
                    easing: Easing.linear,
                }),
                Animated.timing(startValue, {
                    toValue: 1,
                    useNativeDriver: true,
                    duration,
                    easing: Easing.linear,
                }),
            ]),
            {
                iterations: -1,
            }
        ).start();
    }, [startValue]);

    return (
        <Animated.View
            style={{
                width: size,
                aspectRatio: 1,
                marginVertical: 10,
                transform: [
                    {
                        scale: startValue,
                    },
                ],
            }}
        >
            <Pressable style={{ flex: 1 }} onPress={onPress}>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            ...leftTop,
                            borderTopLeftRadius: radius,
                        }}
                    />
                    <View style={{ flex: 1 }} />
                    <View
                        style={{
                            flex: 1,
                            ...rightTop,
                            borderTopRightRadius: radius,
                        }}
                    />
                </View>
                <View style={{ flex: 1 }} />
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            ...leftBottom,
                            borderBottomLeftRadius: radius,
                        }}
                    />
                    <View style={{ flex: 1 }} />
                    <View
                        style={{
                            flex: 1,
                            ...rightBottom,
                            borderBottomRightRadius: radius,
                        }}
                    />
                </View>
            </Pressable>
        </Animated.View>
    );
};

export default ScannerMask;
