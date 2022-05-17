import React, { useEffect, useRef, useState } from 'react';
import { Camera, CameraProps } from 'expo-camera';
import { Dimensions, View } from 'react-native';
import Canvas, { CanvasRenderingContext2D } from 'react-native-canvas';
import * as FaceDetector from 'expo-face-detector';

import { Face } from 'expo-camera/build/Camera.types';
import { EyesOpenProbability } from '../container/CameraContainer';

const { width, height } = Dimensions.get('window');

export type FaceCoordinate = {
    x: number;
    y: number;
    width: number;
    height: number;
};

export type YawAngle = {
    threshold: number;
    color: string;
};

interface ExpoCameraProps extends CameraProps {
    setCameraReady: React.Dispatch<React.SetStateAction<boolean>>;
    cameraReady: boolean;
    /**
     * Coordinates of the face.
     */
    faceCoordinates?: React.Ref<FaceCoordinate>;
    /**
     * Reference of the camera to be used in the component.
     */
    ref?: React.Ref<Camera>;
    /**
     * Method called whenever a face is detected.
     */
    onFaceDetected?: (detected: boolean) => void;
    openEyeThreshold?: number;
    /**
     * Method called every time a face is detected and passing the eyes open probability to do with what you want from the parent component.
     */
    onEyesClosed?: ({
        leftEyeOpenProbability,
        rightEyeOpenProbability,
    }: EyesOpenProbability) => void;
    /**
     * Method called every time a face is detected and passing the smiling probability to do with what you want from the parent component.
     */
    onSmileWithProbability?: (smileProbability: number) => void;
    /**
     * Method called when a smile is detected and when the smiling probability is greater or equal to the threshold.
     */
    onSmile?: () => void;
    smileThreshold?: number;
    /**
     * The yaw angle is the angle between the camera's forward vector and the line between the camera's position and the face's center.
     * @default threshold: 0.5
     * @default color: 'red'
     */
    yawAngle?: YawAngle;
    /**
     * Method triggered when the yaw angle is exceeded.
     * @param exceeded
     */
    onYawAngleExceeded?: (exceeded: boolean) => void;
}

const ExpoCamera: React.FC<ExpoCameraProps> = React.forwardRef<
    Camera,
    ExpoCameraProps
>(
    (
        {
            faceCoordinates,
            setCameraReady,
            cameraReady,
            type = 'front',
            onFaceDetected,
            onEyesClosed,
            onSmile,
            onSmileWithProbability,
            smileThreshold,
            yawAngle = {
                threshold: 0.5,
                color: 'red',
            },
            onYawAngleExceeded,
            ...props
        },
        ref
    ) => {
        const [permission, setPermission] = useState<string>('');
        const canvas = useRef<Canvas>();
        const context = useRef<CanvasRenderingContext2D>();

        const handleCanvas = (can: Canvas) => {
            if (can) {
                can.width = width;
                can.height = height;
                const ctx: CanvasRenderingContext2D = can.getContext('2d');
                ctx.strokeStyle = 'white';
                ctx.lineWidth = 3;
                ctx.fillStyle = 'white';
                ctx.globalAlpha = 0.3;
                context.current = ctx;
                canvas.current = can;
            }
        };

        const changeCtxColor = (color: string) => {
            const ctx = context.current;
            if (ctx) {
                ctx.strokeStyle = color;
                ctx.fillStyle = color;
            }
        };

        const handleFacesDetected = ({ faces }: { faces: Face[] }) => {
            if (!cameraReady) return;
            context.current?.clearRect(0, 0, width, height);
            let faceDetected = false;
            if (faces.length) {
                const ctx = context.current;
                faceDetected = true;
                if (ctx) {
                    const face = faces[0];
                    const {
                        bounds,
                        rightEyeOpenProbability,
                        leftEyeOpenProbability,
                        smilingProbability,
                        yawAngle: yaw,
                    } = face;
                    const {
                        size: { width, height },
                        origin: { x, y },
                    } = bounds;
                    if (faceCoordinates) {
                        faceCoordinates.current = {
                            x,
                            y,
                            width,
                            height,
                        };
                    }
                    onEyesClosed?.({
                        rightEyeOpenProbability,
                        leftEyeOpenProbability,
                    });
                    if (
                        onSmile &&
                        smileThreshold &&
                        smilingProbability > smileThreshold
                    ) {
                        onSmile();
                    }
                    onSmileWithProbability?.(smilingProbability);
                    // if (yawAngle) {
                    //     let exceeded = false;
                    //     if (
                    //         yaw < -yawAngle.threshold ||
                    //         yaw > yawAngle.threshold
                    //     ) {
                    //         exceeded = true;
                    //         changeCtxColor(yawAngle.color);
                    //     } else {
                    //         exceeded = false;
                    //         changeCtxColor('white');
                    //     }
                    //     if (onYawAngleExceeded) {
                    //         onYawAngleExceeded(exceeded);
                    //     }
                    // }

                    ctx.strokeRect(x, y, width, height);
                    ctx.fillRect(x, y, width, height);
                }
            } else {
                faceDetected = false;
            }
            onFaceDetected?.(faceDetected);
        };

        useEffect(() => {
            (async () => {
                const { status } = await Camera.requestCameraPermissionsAsync();
                setPermission(status);
            })();
        }, []);

        if (permission !== 'granted') {
            return (
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'black',
                    }}
                />
            );
        }

        return (
            <View
                style={{
                    flex: 1,
                }}
            >
                <Camera
                    ref={ref}
                    type={type}
                    flashMode={'on'}
                    autoFocus={true}
                    onCameraReady={() => {
                        setCameraReady(true);
                    }}
                    onFacesDetected={handleFacesDetected}
                    faceDetectorSettings={{
                        mode: FaceDetector.FaceDetectorMode.accurate,
                        detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
                        runClassifications:
                            FaceDetector.FaceDetectorClassifications.all,
                        minDetectionInterval: 100,
                        tracking: true,
                    }}
                    style={{ height: '100%', width: '100%' }}
                    {...props}
                />

                <Canvas
                    ref={handleCanvas}
                    style={{
                        position: 'absolute',
                        zIndex: 999,
                        width: '100%',
                        height: '100%',
                    }}
                />
            </View>
        );
    }
);

export default ExpoCamera;
