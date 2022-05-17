import React from 'react';
import { Image, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@state';
import { theme } from '@constants';
import BaseCowWidget from '../widget/BaseCowWidget';
interface CowNumberWidgetProps {
    onPress?: () => void;
}

const CowNumberWidget: React.FC<CowNumberWidgetProps> = ({ onPress }) => {
    const { cows } = useSelector((state: RootState) => state.cow);

    return (
        <BaseCowWidget onPress={() => onPress?.()} center>
            <Text style={{ fontSize: 25, color: theme.colors.primary }}>
                {cows.length} cows
            </Text>
            <Image
                source={require('../../../assets/biolivestock-green.png')}
                style={{
                    width: 80,
                    height: 80,
                }}
            />
        </BaseCowWidget>
    );
};

export default CowNumberWidget;
