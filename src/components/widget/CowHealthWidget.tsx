import React from 'react';
import { RootState } from '@state';
import { BarChart } from 'react-native-chart-kit';
import { useSelector } from 'react-redux';
import BaseCowWidget from '../widget/BaseCowWidget';
import { Entypo } from '@expo/vector-icons';
import { theme } from '@constants';

interface CowHealthWidgetProps {}

const CowHealthWidget: React.FC<CowHealthWidgetProps> = () => {
    const { cows } = useSelector((state: RootState) => state.cow);
    return (
        <BaseCowWidget center>
            <Entypo
                name="heart-outlined"
                size={100}
                color={theme.colors.primary}
            />
            {/* <BarChart
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
                        },
                    ],
                }}
                height={300}
                width={250}
                yAxisInterval={1}
                chartConfig={{
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) =>
                        `rgba(255, 255, 255, ${opacity})`,
                }}
            /> */}
        </BaseCowWidget>
    );
};

export default CowHealthWidget;
