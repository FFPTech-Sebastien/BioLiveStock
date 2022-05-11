import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MainParamsList } from '@navigation';
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
            <>
                <Text style={{ fontSize: 25, color: theme.colors.primary }}>
                    {cows.length} cows
                </Text>
                <MaterialCommunityIcons
                    name="cow"
                    size={80}
                    color={theme.colors.primary}
                />
            </>
        </BaseCowWidget>
    );
};

export default CowNumberWidget;
