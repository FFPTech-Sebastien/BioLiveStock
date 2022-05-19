import { RootState } from '@state';
import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { PieChart } from 'react-native-chart-kit';

interface SpeciesCowProps {}

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

const SpeciesCow: React.FC<SpeciesCowProps> = () => {
    const { cows } = useSelector((state: RootState) => state.cow);
    return (
        <View
            style={{
                flex: 1,
                padding: 10,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <View
                style={{
                    flex: 1,
                }}
            >
                <View
                    style={{
                        backgroundColor: 'white',
                        width: WIDTH * 0.3,
                        height: WIDTH * 0.3,
                        borderRadius: 100,
                        position: 'absolute',
                        zIndex: 10,
                        top: HEIGHT / 2 - HEIGHT * 0.38,
                        left: WIDTH / 2 - WIDTH * 0.15,
                    }}
                />
                <PieChart
                    data={[
                        {
                            number: 2,
                            color: '#505e61',
                        },
                        {
                            number: 3,
                            color: '#deb670',
                        },
                        {
                            number: cows.filter(
                                (cow) => cow.species === 'Black Angus'
                            ).length,
                            color: '#a6632e',
                        },
                    ]}
                    width={WIDTH}
                    height={HEIGHT * 0.4}
                    accessor={'number'}
                    paddingLeft={`${WIDTH * 0.25}`}
                    hasLegend={false}
                    chartConfig={{
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        labelColor: (opacity = 1) =>
                            `rgba(0, 0, 0, ${opacity})`,
                    }}
                />
                <View
                    style={{
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'space-evenly',
                        flexWrap: 'wrap',
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: '#505e61',
                                width: 50,
                                height: 15,
                                marginRight: 10,
                            }}
                        />
                        <Text>?</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: '#deb670',
                                width: 50,
                                height: 15,
                                marginRight: 10,
                            }}
                        />
                        <Text>?</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: '#a6632e',
                                width: 50,
                                height: 15,
                                marginRight: 10,
                            }}
                        />
                        <Text>Black Angus</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default SpeciesCow;
