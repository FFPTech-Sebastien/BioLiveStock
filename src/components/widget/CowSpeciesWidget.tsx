import React from 'react';
import { theme } from '@constants';
import BaseCowWidget from './BaseCowWidget';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface CowSpeciesWidgetProps {
    onPress?: () => void;
}

const CowSpeciesWidget: React.FC<CowSpeciesWidgetProps> = ({ onPress }) => {
    return (
        <BaseCowWidget center onPress={() => onPress?.()}>
            <MaterialCommunityIcons
                name="cow"
                size={100}
                color={theme.colors.primary}
            />
        </BaseCowWidget>
    );
};

export default CowSpeciesWidget;
