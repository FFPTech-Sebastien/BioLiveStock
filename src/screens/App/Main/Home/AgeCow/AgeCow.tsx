import { RootState } from '@state';
import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useSelector } from 'react-redux';

interface AgeCowProps {}

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

const AgeCow: React.FC<AgeCowProps> = () => {
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
            <View>
                <PieChart
                    data={[
                        {
                            number: cows.filter(
                                (cow) => cow.age >= 0 && cow.age < 0.5
                            ).length,
                            color: '#505e61',
                        },
                        {
                            number: cows.filter(
                                (cow) => cow.age >= 0.5 && cow.age < 1
                            ).length,
                            color: '#deb670',
                        },
                        {
                            number: cows.filter((cow) => cow.age >= 1).length,
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
            </View>
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
                    <Text>0 - 5 months</Text>
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
                    <Text>5 -12 months</Text>
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
                    <Text>1+ years</Text>
                </View>
            </View>
        </View>
    );
};

export default AgeCow;
