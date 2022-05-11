import React, { useEffect } from 'react';
import {
    CowHealthWidget,
    CowNumberWidget,
    Timer,
    WidgetContainer,
} from '@components';
import { fetchCows, useAppDispatch } from '@state';
import { HomeStackNavProps } from '@navigation';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

type HomeProps = HomeStackNavProps<'Home'>;

const Home: React.FC<HomeProps> = ({ navigation }) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchCows());
    }, [dispatch]);

    return (
        <ScrollView
            contentContainerStyle={{
                flex: 1,
                padding: 20,
            }}
        >
            <View style={{ flex: 1 }}>
                <WidgetContainer>
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Timer />
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    ></View>
                </WidgetContainer>
                <View
                    style={{
                        marginTop: 10,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                    }}
                >
                    <CowNumberWidget
                        onPress={() => navigation.push('ListCow')}
                    />
                    <CowHealthWidget />
                    <CowHealthWidget />
                    <CowHealthWidget />
                </View>
            </View>
        </ScrollView>
    );
};

export default Home;
