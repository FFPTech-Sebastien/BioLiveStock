import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import {
    CowHealthWidget,
    CowNumberWidget,
    WidgetContainer,
} from '../../../../components';
import { HomeStackNavProps } from '../../../../navigation/App/Main/MainParamsList';
import { fetchCows, RootState, useAppDispatch } from '../../../../state';

type HomeProps = HomeStackNavProps<'Home'>;

const Home: React.FC<HomeProps> = ({ navigation }) => {
    const dispatch = useAppDispatch();
    const { cows, status } = useSelector((state: RootState) => state.cow);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCows());
        }
    }, [status, dispatch]);

    return (
        <ScrollView contentContainerStyle={{ flex: 1, padding: 20 }}>
            <View style={{ flex: 1 }}>
                <WidgetContainer>
                    <Text>Time</Text>
                </WidgetContainer>
                <View
                    style={{
                        marginTop: 10,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <CowNumberWidget navigation={navigation} />
                    <CowHealthWidget />
                </View>
            </View>
        </ScrollView>
    );
};

export default Home;
