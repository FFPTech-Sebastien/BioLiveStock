import { theme } from '@constants';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { Center } from '../container';
import { HalisiImage } from '../image';

interface SplashProps {}

const Splash: React.FC<SplashProps> = () => {
    return (
        <View
            style={{
                backgroundColor: theme.colors.background,
                flex: 1,
            }}
        >
            <Center>
                <Image
                    source={require('../../../assets/biolivestock-main-logo.png')}
                    style={{
                        width: 300,
                        height: 300,
                    }}
                />
                <Text
                    style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        marginBottom: 10,
                        transform: [{ translateY: -10 }],
                    }}
                >
                    Powered by
                </Text>
                <HalisiImage height={60} width={60} />
            </Center>
        </View>
    );
};
export default Splash;
