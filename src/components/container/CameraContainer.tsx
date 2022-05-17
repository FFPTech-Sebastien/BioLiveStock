import { Camera, CameraCapturedPicture } from 'expo-camera';
import { FlipType, manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { ExpoCamera } from '../../components/camera';
import { FaceCoordinate, YawAngle } from '../../components/camera/ExpoCamera';
import { theme } from '@constants';
import { TransparentBackButton } from '../buttons';
import BottomContainer from './BottomContainer';
import LoadingOverlay from './LoadingOverlay';
import Overlay from './Overlay';

export type EyesOpenProbability = {
    leftEyeOpenProbability: number;
    rightEyeOpenProbability: number;
};

const AnimatedBottomContainer =
    Animated.createAnimatedComponent(BottomContainer);

const smileThreshold = 0.5;
const yawAngle: YawAngle = {
    threshold: 40,
    color: 'red',
};

interface CameraContainerProps {
    /**
     * Callback called when the user clicks on the confirm icon.
     * All of these params have to be defined in the funcion from the parent component even if they are not used to avoid Typescript errors.
     *
     * @param image the image captured by the camera
     * @param setImageBase64 the function to set the image base64 to show the bounding box
     * @param setActive the function to set the active state
     */
    cb: (
        image: CameraCapturedPicture | null | undefined,
        setImageBase64: (image: string) => void,
        setActive: (active: boolean) => void
    ) => void;
    /**
     * Displays an loading overlay depending on the loading state.
     */
    loading: boolean;
    /**
     * Method called when the user clicks on the back button place on the top left of the screen.
     */
    goBack: () => void;
    /**
     * Reference to the camera container methods.
     */
    ref?: React.Ref<CameraContainerMethods>;
}

/**
 * Methods that can be used from a parent component through a ref.
 */
export interface CameraContainerMethods {
    fadeBottomContainer: (fade: Fade) => void;
    resetBottomContainer: () => void;
}

export enum Fade {
    IN = 0,
    OUT = 1,
}

const CameraContainer: React.FC<CameraContainerProps> = React.forwardRef<
    CameraContainerMethods,
    CameraContainerProps
>(({ loading, cb, goBack }, ref) => {
    const cameraRef = useRef<Camera>(null);
    const faceCoordinates = useRef<FaceCoordinate>(null);
    const [cameraReady, setCameraReady] = useState(false);
    const [captureDisabled, setCaptureDisabled] = useState(false);
    const [type, setType] = useState<'front' | 'back'>('front');
    const [flashMode, setFlashMode] = useState<'on' | 'off'>('off');
    const [faceDetected, setFaceDetected] = useState(false);
    const [yawExceeded, setYawExceeded] = useState(false);
    const [hasSmiled, setHasSmiled] = useState(false);
    const [image, setImage] = useState<CameraCapturedPicture | null>();
    const [active, setActive] = useState(false);

    const recognized = useSharedValue(0);
    const progress = useSharedValue(0);

    // Inject the methods to the parent component through a ref.
    useImperativeHandle(ref, () => ({
        fadeBottomContainer: (fade: Fade) => {
            recognized.value = withSpring(fade);
        },
        resetBottomContainer: () => {
            progress.value = withSpring(0, {}, () => {
                recognized.value = withSpring(0);
            });
        },
    }));

    const onFaceDetected = (detected: boolean) => setFaceDetected(detected);

    const onYawAngleExceeded = (exceeded: boolean) => setYawExceeded(exceeded);

    useEffect(() => {
        // setCaptureDisabled(yawExceeded || !faceDetected);
        setCaptureDisabled(!faceDetected);
    }, [faceDetected, yawExceeded]);

    const onSmile = () => setHasSmiled(true);

    const onSmileWithProbability = (probability: number) => {
        if (!loading && !captureDisabled && hasSmiled && probability < 0.1) {
            handleCapture();
            setHasSmiled(false);
        }
    };

    // const onEyesClosed = ({
    //     leftEyeOpenProbability,
    //     rightEyeOpenProbability,
    // }: EyesOpenProbability) => {
    //     if (rightEyeOpenProbability < 0.05 && leftEyeOpenProbability > 0.5) {
    //         setTimeout(() => {
    //             switchCamera();
    //         }, 500);
    //     }
    //     if (
    //         leftEyeOpenProbability < 0.05 &&
    //         rightEyeOpenProbability > 0.5 &&
    //         faceDetected
    //     ) {
    //         setTimeout(() => {
    //             handleCapture();
    //         }, 500);
    //     }
    // };

    const rStyle = useAnimatedStyle(() => ({
        width: interpolate(progress.value, [0, 1], [80, 60]) + '%',
    }));

    const switchCamera = () => {
        setType(type === 'front' ? 'back' : 'front');
    };
    const toggleFlash = () => {
        setFlashMode(flashMode === 'on' ? 'off' : 'on');
    };

    const handleCapture = async () => {
        if (!cameraRef.current) return;

        let image = await cameraRef.current.takePictureAsync({
            base64: true,
            quality: 0,
        });

        if (type === 'front') {
            image = await manipulateAsync(
                image.uri,
                [{ rotate: 180 }, { flip: FlipType.Vertical }],
                { compress: 1, format: SaveFormat.PNG, base64: true }
            );
        }
        setActive(true);
        setImage(image);
        progress.value = withSpring(1);
    };

    const setImageBase64 = (base64: string) => {
        setImage({
            ...image!,
            uri: `data:image/png;base64,${base64}`,
        });
    };

    const bottomContainerStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: interpolate(recognized.value, [0, 1], [0, 300]),
                },
            ],
        };
    });

    return (
        <>
            <TransparentBackButton onPress={goBack} />
            {loading && (
                <Overlay opacity={0.5}>
                    <LoadingOverlay size="large" color="white" />
                </Overlay>
            )}
            {active ? (
                <Image
                    source={{
                        uri: image?.uri,
                    }}
                    style={{
                        ...StyleSheet.absoluteFillObject,
                    }}
                    resizeMode="cover"
                />
            ) : (
                <ExpoCamera
                    ref={cameraRef}
                    {...{
                        faceCoordinates,
                        setCameraReady,
                        cameraReady,
                        type,
                        flashMode,
                        onFaceDetected,
                        onSmile,
                        smileThreshold,
                        onSmileWithProbability,
                        yawAngle,
                        onYawAngleExceeded,
                    }}
                />
            )}

            <AnimatedBottomContainer
                style={[
                    bottomContainerStyle,
                    {
                        justifyContent: 'center',
                    },
                ]}
            >
                <Animated.View
                    style={[
                        rStyle,
                        {
                            width: '80%',
                            alignItems: 'center',
                            borderWidth: 1.2,
                            borderColor: 'white',
                            borderRadius: 20,
                            padding: 5,
                        },
                    ]}
                >
                    <View
                        style={{
                            backgroundColor: '#fff',
                            width: '100%',
                            height: 80,
                            borderRadius: 15,
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                        }}
                    >
                        {active ? (
                            <>
                                <TouchableOpacity
                                    disabled={loading}
                                    style={[
                                        {
                                            padding: 15,
                                            opacity: loading ? 0.5 : 1,
                                        },
                                    ]}
                                    onPress={() => {
                                        setImage(null);
                                        setActive(false);
                                        progress.value = withSpring(0);
                                    }}
                                >
                                    <AntDesign
                                        name="close"
                                        size={24}
                                        color="red"
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() =>
                                        cb(image, setImageBase64, setActive)
                                    }
                                    disabled={loading}
                                    style={[
                                        {
                                            padding: 10,
                                            opacity: loading ? 0.5 : 1,
                                        },
                                    ]}
                                >
                                    <Ionicons
                                        name="checkmark-outline"
                                        size={24}
                                        color={theme.colors.primary}
                                    />
                                </TouchableOpacity>
                            </>
                        ) : (
                            <>
                                <TouchableOpacity onPress={toggleFlash}>
                                    <Ionicons
                                        name={`md-flash-${
                                            flashMode === 'on'
                                                ? 'sharp'
                                                : 'outline'
                                        }`}
                                        size={25}
                                        color="black"
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={handleCapture}
                                    disabled={captureDisabled}
                                    style={{
                                        opacity: captureDisabled ? 0.5 : 1,
                                    }}
                                >
                                    <View style={[styles.captureOutline]}>
                                        <View style={[styles.capture]} />
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={switchCamera}>
                                    <MaterialCommunityIcons
                                        name="camera-switch-outline"
                                        size={25}
                                        color="black"
                                    />
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </Animated.View>
            </AnimatedBottomContainer>
        </>
    );
});

const styles = StyleSheet.create({
    captureOutline: {
        borderWidth: 2,
        borderColor: theme.colors.primary,
        borderRadius: 20,
        width: 50,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    capture: {
        width: 40,
        aspectRatio: 1,
        backgroundColor: theme.colors.primary,
        borderRadius: 15,
    },
});

export default CameraContainer;
