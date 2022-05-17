import React, { isValidElement } from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';

interface DatatTableRowProps {
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
    itemWidth?: number;
}

const DatatTableRow: React.FC<DatatTableRowProps> = React.memo(
    ({ onPress, style, itemWidth, children }) => {
        return (
            <TouchableOpacity
                onPress={onPress}
                style={[
                    {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: 10,
                    },
                    style,
                ]}
            >
                {React.Children.map(children, (child) => {
                    if (isValidElement(child)) {
                        // pass the itemWidth property to each child
                        return React.cloneElement(child, { itemWidth });
                    }
                    return child;
                })}
            </TouchableOpacity>
        );
    }
);

export default DatatTableRow;
