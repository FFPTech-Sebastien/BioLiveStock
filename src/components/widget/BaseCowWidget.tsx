import { RootState } from '@state';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import WidgetContainer, {
    WidgetContainerProps,
} from '../container/WidgetContainer';

interface BaseCowWidgetProps extends WidgetContainerProps {}

const BaseCowWidget: React.FC<BaseCowWidgetProps> = ({
    width = '48%',
    children,
    ...props
}) => {
    const { status } = useSelector((state: RootState) => state.cow);
    let content = children;
    if (status === 'idle' || status === 'loading') {
        content = <ActivityIndicator size="small" />;
    }

    return (
        <WidgetContainer width={width} {...props}>
            {content}
        </WidgetContainer>
    );
};

export default BaseCowWidget;
