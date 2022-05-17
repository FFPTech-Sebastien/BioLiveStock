import React from 'react';
import { Dimensions } from 'react-native';
import {
    PanGestureHandler,
    PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';

interface HalisiImageProps {
    /**
     * Width of the image.
     * @default 150
     */
    width?: number;
    /**
     * Height of the image.
     * @default 150
     */
    height?: number;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const HalisiImage: React.FC<HalisiImageProps> = ({
    width = 150,
    height = 150,
}) => {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const scale = useSharedValue(1);

    const onGestureEvent = useAnimatedGestureHandler<
        PanGestureHandlerGestureEvent,
        { x: number; y: number }
    >({
        onStart: (_, ctx) => {
            ctx.x = translateX.value;
            ctx.y = translateY.value;
            scale.value = withTiming(1.3, { duration: 100 });
        },
        onActive: ({ translationX, translationY }, ctx) => {
            translateX.value = ctx.x + translationX;
            translateY.value = ctx.y + translationY;
        },
        onEnd: () => {
            translateX.value = withSpring(0, { damping: 10, stiffness: 100 });
            translateY.value = withSpring(0);
            scale.value = withTiming(1, { duration: 100 });
        },
    });

    const rStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateX.value },
            { translateY: translateY.value },
            {
                rotateZ: `${interpolate(
                    translateX.value,
                    [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
                    [-30, 0, 30],
                    Extrapolate.CLAMP
                )}deg`,
            },
            { scale: scale.value },
        ],
    }));

    return (
        <PanGestureHandler onGestureEvent={onGestureEvent}>
            <Animated.Image
                source={require('../../../assets/Halisi.png')}
                style={[
                    {
                        width,
                        height,
                    },
                    rStyle,
                ]}
                resizeMode="contain"
            />
        </PanGestureHandler>
    );
};

export default HalisiImage;
