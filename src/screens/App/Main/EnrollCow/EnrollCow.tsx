import { HomeStackNavProps } from '@navigation';
import { CameraCapturedPicture } from 'expo-camera';
import React, { useState, useRef } from 'react';
import CameraContainer, {
    CameraContainerMethods,
    Fade,
} from 'src/components/container/CameraContainer';

interface EnrollCowProps extends HomeStackNavProps<'EnrollCow'> {}

const EnrollCow: React.FC<EnrollCowProps> = ({ navigation }) => {
    const [loading, setIsLoading] = useState(false);
    const cameraContainerRef = useRef<CameraContainerMethods>(null);

    const goBack = () => navigation.goBack();

    const handleMonitor = async (
        image: CameraCapturedPicture | undefined | null,
        setImageBase64: (imageBase64: string) => void,
        setActive: (active: boolean) => void
    ) => {
        setIsLoading(true);
        cameraContainerRef.current?.fadeBottomContainer(Fade.OUT);

        setTimeout(() => {
            setIsLoading(false);
            cameraContainerRef.current?.resetBottomContainer();
        }, 2000);
    };

    return (
        <CameraContainer
            cb={handleMonitor}
            ref={cameraContainerRef}
            {...{
                loading,
                goBack,
            }}
        />
    );
};

export default EnrollCow;
