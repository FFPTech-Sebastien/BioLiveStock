import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../state';
import { WidgetContainer } from '../container';

interface BaseCowWidgetProps {
    onPress?: () => void;
}

const BaseCowWidget: React.FC<BaseCowWidgetProps> = ({ onPress, children }) => {
    const { status } = useSelector((state: RootState) => state.cow);
    let content = children;
    if (status === 'idle' || status === 'loading') {
        content = <ActivityIndicator size="small" />;
    }

    return (
        <WidgetContainer width="48%" onPress={onPress}>
            {content}
        </WidgetContainer>
    );
};

export default BaseCowWidget;
