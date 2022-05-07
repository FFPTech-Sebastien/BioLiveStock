import { RootState } from '@state';
import React from 'react';
import { BarChart } from 'react-native-chart-kit';
import { useSelector } from 'react-redux';
import { BaseCowWidget } from '@components';

interface CowHealthWidgetProps {}

const CowHealthWidget: React.FC<CowHealthWidgetProps> = () => {
    const { cows } = useSelector((state: RootState) => state.cow);
    return (
        <BaseCowWidget>
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
            />
        </BaseCowWidget>
    );
};

export default CowHealthWidget;
