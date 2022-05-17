import React, { useEffect } from 'react';
import {
    CowAgeWidget,
    CowHealthWidget,
    CowNumberWidget,
    Timer,
    WidgetContainer,
} from '@components';
import { fetchCows, useAppDispatch } from '@state';
import { HomeStackNavProps } from '@navigation';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

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
                            alignItems: 'center',
                        }}
                    >
                        <Timer />
                        <View
                            style={{
                                marginTop: 10,
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                                width: '100%',
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}
                            >
                                <MaterialCommunityIcons
                                    name="temperature-celsius"
                                    size={20}
                                    color="black"
                                />
                                <Text
                                    style={{
                                        transform: [{ translateY: 1 }],
                                    }}
                                >
                                    23
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Ionicons
                                    name="rainy-outline"
                                    size={20}
                                    color="black"
                                />
                                <Text
                                    style={{
                                        marginLeft: 5,
                                    }}
                                >
                                    Mild
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Feather name="wind" size={20} color="black" />
                                <Text
                                    style={{
                                        marginLeft: 5,
                                    }}
                                >
                                    12 mph
                                </Text>
                            </View>
                        </View>
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
                    <CowHealthWidget
                        onPress={() => navigation.push('HealthCow')}
                    />
                    <CowAgeWidget onPress={() => navigation.push('AgeCow')} />
                    <CowHealthWidget />
                </View>
            </View>
        </ScrollView>
    );
};

export default Home;
