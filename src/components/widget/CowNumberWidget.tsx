import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { BaseCowWidget } from '@components';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MainParamsList } from '@navigation';
import { RootState } from '@state';
import { theme } from '@constants';

interface CowNumberWidgetProps {
    navigation: StackNavigationProp<MainParamsList, 'Home', undefined>;
}

const CowNumberWidget: React.FC<CowNumberWidgetProps> = ({ navigation }) => {
    const { cows } = useSelector((state: RootState) => state.cow);

    return (
        <BaseCowWidget onPress={() => navigation.push('SearchCow')}>
            <View
                style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text style={{ fontSize: 25, color: theme.colors.primary }}>
                    {cows.length} cows
                </Text>
                <MaterialCommunityIcons
                    name="cow"
                    size={100}
                    color={theme.colors.primary}
                />
            </View>
        </BaseCowWidget>
    );
};

export default CowNumberWidget;
