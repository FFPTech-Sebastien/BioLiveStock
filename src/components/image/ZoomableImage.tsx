import React from 'react';
import { Dimensions, ImageProps, ImageStyle, StyleProp } from 'react-native';
import {
    PinchGestureHandler,
    PinchGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

export const clamp = (
    value: number,
    lowerBound: number,
    upperBound: number
) => {
    'worklet';
    return Math.min(Math.max(lowerBound, value), upperBound);
};

interface ZoomableImageProps extends ImageProps {
    width?: number;
    height?: number;
    style?: StyleProp<ImageStyle>;
}

const ZoomableImage: React.FC<ZoomableImageProps> = ({
    width = WIDTH,
    height = HEIGHT,
    style,
    ...props
}) => {
    const scale = useSharedValue(1);
    const focalX = useSharedValue(0);
    const focalY = useSharedValue(0);
    const onGestureEvent =
        useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
            onActive: (e) => {
                scale.value = clamp(e.scale, 1, 4);
                focalX.value = e.focalX;
                focalY.value = e.focalY;
            },
            onEnd: () => {
                scale.value = withTiming(1);
            },
        });

    const animatedStyles = useAnimatedStyle(() => {
        return {
            zIndex: 99,
            transform: [
                { translateX: focalX.value },
                { translateY: focalY.value },
                { translateY: -height / 2 },
                { translateX: -width / 2 },
                { scale: scale.value },
                { translateX: -focalX.value },
                { translateY: -focalY.value },
                { translateY: height / 2 },
                { translateX: width / 2 },
            ],
        };
    });

    return (
        <PinchGestureHandler onGestureEvent={onGestureEvent}>
            <Animated.Image
                {...props}
                style={[
                    animatedStyles,
                    {
                        height: height,
                        resizeMode: 'cover',
                    },
                    style,
                ]}
            />
        </PinchGestureHandler>
    );
};

export default ZoomableImage;
