import React from 'react';
import { View } from 'react-native';

interface DataTableItemProps {
    itemWidth?: number;
    renderItem: () => React.ReactNode;
}

const DataTableItem: React.FC<DataTableItemProps> = ({
    itemWidth,
    renderItem,
}) => {
    return (
        <View
            style={{
                width: itemWidth,
                alignItems: 'center',
            }}
        >
            {renderItem()}
        </View>
    );
};

export default DataTableItem;
