import React from 'react';
import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

interface OverlayProps {
    /**
     * Opacity of the overlay.
     * @default '0.8'
     */
    opacity?: number;
    /**
     * Background color of the overlay.
     * @default 'grey'
     */
    backgroundColor?: string;
    children: ReactNode;
}

const Overlay: React.FC<OverlayProps> = ({
    opacity = 0.8,
    backgroundColor = 'grey',
    children,
}) => {
    return (
        <View
            style={{
                ...StyleSheet.absoluteFillObject,
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1,
            }}
        >
            <View
                style={{
                    ...StyleSheet.absoluteFillObject,
                    opacity,
                    backgroundColor,
                }}
            />
            {children}
        </View>
    );
};

export default Overlay;
