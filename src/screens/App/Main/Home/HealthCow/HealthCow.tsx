import React from 'react';
import { Dimensions, View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { useSelector } from 'react-redux';
import { RootState } from '@state';

interface HealthCowProps {}

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

const HealthCow: React.FC<HealthCowProps> = () => {
    const { cows } = useSelector((state: RootState) => state.cow);
    return (
        <View
            style={{
                flex: 1,
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <BarChart
                data={{
                    labels: ['Healthy', 'Sick', 'Dead'],
                    datasets: [
                        {
                            data: [
                                cows.filter((cow) => cow.status === 'healthy')
                                    .length,
                                cows.filter((cow) => cow.status === 'sick')
                                    .length,
                                cows.filter((cow) => cow.status === 'dead')
                                    .length,
                            ],
                            colors: [
                                (opacity = 1) => '#505e61',
                                (opacity = 1) => '#deb670',
                                (opacity = 1) => '#a6632e',
                            ],
                        },
                    ],
                }}
                showBarTops={false}
                fromZero
                height={HEIGHT * 0.8}
                width={WIDTH}
                withCustomBarColorFromData={true}
                flatColor={true}
                showValuesOnTopOfBars
                chartConfig={{
                    backgroundGradientFromOpacity: 0,
                    backgroundGradientFrom: '#fff',
                    backgroundGradientTo: '#fff',
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
            />
        </View>
    );
};

export default HealthCow;
