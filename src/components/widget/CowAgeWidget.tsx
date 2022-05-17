import { theme } from '@constants';
import React from 'react';
import BaseCowWidget from './BaseCowWidget';
import { FontAwesome } from '@expo/vector-icons';

interface CowAgeWidgetProps {
    onPress?: () => void;
}

const CowAgeWidget: React.FC<CowAgeWidgetProps> = ({ onPress }) => {
    return (
        <BaseCowWidget center onPress={() => onPress?.()}>
            <FontAwesome
                name="birthday-cake"
                size={100}
                color={theme.colors.primary}
            />
        </BaseCowWidget>
    );
};

export default CowAgeWidget;
