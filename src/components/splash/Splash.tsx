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
                backgroundColor: theme.colors.primary,
                flex: 1,
            }}
        >
            <Center>
                <Image
                    source={require('../../../assets/biolivestock-white.png')}
                    style={{
                        width: 300,
                        height: 300,
                    }}
                />
                <Text
                    style={{
                        fontSize: 35,
                        fontWeight: 'bold',
                        color: 'white',
                        marginBottom: 10,
                        transform: [{ translateY: -10 }],
                    }}
                >
                    Powered by
                </Text>
                <HalisiImage height={80} width={80} />
                {/* <ActivityIndicator size="large" animating={true} color="grey" /> */}
            </Center>
        </View>
    );
};
export default Splash;
