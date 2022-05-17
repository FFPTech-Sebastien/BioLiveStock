import React, { useEffect } from 'react';
import {
    CowAgeWidget,
    CowHealthWidget,
    CowNumberWidget,
    CowSpeciesWidget,
} from '@components';
import { Cow, fetchCows, RootState, useAppDispatch } from '@state';
import { HomeStackNavProps } from '@navigation';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import TimerWidget from 'src/components/widget/TimerWidget';
import { Simulator } from 'src/services/simulator';
import { useSelector } from 'react-redux';

type HomeProps = HomeStackNavProps<'Home'>;

const Home: React.FC<HomeProps> = ({ navigation }) => {
    const dispatch = useAppDispatch();
    const { cows } = useSelector((state: RootState) => state.cow);

    const handleCow = (cow: Cow) => {};

    useEffect(() => {
        const simulator = new Simulator(cows, {
            loop: true,
        });
        simulator
            .addData(
                {
                    images: [],
                    age: 5,
                    rfid: 5,
                    status: 'healthy',
                    weight: 150,
                },
                handleCow
            )
            .start();
    }, [cows]);

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
                <TimerWidget />
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
                    <CowHealthWidget
                        onPress={() => navigation.push('HealthCow')}
                    />
                    <CowAgeWidget onPress={() => navigation.push('AgeCow')} />
                    <CowSpeciesWidget
                        onPress={() => navigation.push('SpeciesCow')}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

export default Home;
