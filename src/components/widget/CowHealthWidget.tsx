import React from 'react';
import BaseCowWidget from '../widget/BaseCowWidget';
import { Entypo } from '@expo/vector-icons';
import { theme } from '@constants';

interface CowHealthWidgetProps {
    onPress?: () => void;
}

const CowHealthWidget: React.FC<CowHealthWidgetProps> = ({ onPress }) => {
    return (
        <BaseCowWidget center onPress={() => onPress?.()}>
            <Entypo
                name="heart-outlined"
                size={100}
                color={theme.colors.primary}
            />
        </BaseCowWidget>
    );
};

export default CowHealthWidget;
