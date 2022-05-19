import React, { useCallback, useEffect, useState } from 'react';
import {
    CowAgeWidget,
    CowHealthWidget,
    CowNumberWidget,
    CowSpeciesWidget,
} from '@components';
import {
    addCow,
    Cow,
    CowSpecies,
    CowStatus,
    fetchCows,
    RootState,
    useAppDispatch,
} from '@state';
import { HomeStackNavProps } from '@navigation';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import TimerWidget from 'src/components/widget/TimerWidget';
import { Simulator } from 'src/services/simulator';
import { useSelector } from 'react-redux';
import { useSocket } from '@contexts';

type HomeProps = HomeStackNavProps<'Home'>;

const Home: React.FC<HomeProps> = ({ navigation }) => {
    const dispatch = useAppDispatch();
    const { user } = useSelector((state: RootState) => state.user);
    const { cows } = useSelector((state: RootState) => state.cow);
    const { socket } = useSocket();
    const [data, setData] = useState<Cow[]>([]);

    useEffect(() => {
        socket?.emit('JOIN_COW_ROOM', user.id);
        socket?.on('SEND_COWS', () => {
            socket?.emit('SYNC_COWS', cows);
        });

        return () => {
            socket?.off('SEND_COWS');
        };
    }, [cows, socket, user]);

    useEffect(() => {
        if (data.length === 0) {
            socket?.emit('SYNC_COWS', cows);
            setData(cows);
        }
    }, [socket, cows, data.length]);

    const handleCow = useCallback(
        (cow: Cow) => {
            console.log(cow);
            socket?.emit('ADD_COW', cow);
            dispatch(addCow(cow));
        },
        [dispatch, socket]
    );

    useEffect(() => {
        if (data.length === cows.length) {
            const simulator = new Simulator(
                cows,
                {
                    loop: true,
                },
                () => ({
                    age: Math.floor(Math.random() * 10),
                    status: ['healthy', 'sick', 'dead'][
                        Math.floor(Math.random() * 3)
                    ] as CowStatus,
                    species: 'Black Angus' as CowSpecies,
                    weight: Math.floor(Math.random() * 100),
                    rfid: Math.floor(Math.random() * 100),
                    stats: [8.5, 6.5, 4.5, 4.5],
                    images: [],
                })
            );
            simulator.addData(handleCow).start();
        }
    }, [cows, data, handleCow]);

    // useEffect(() => {
    //     dispatch(fetchCows());
    // }, [dispatch]);

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
