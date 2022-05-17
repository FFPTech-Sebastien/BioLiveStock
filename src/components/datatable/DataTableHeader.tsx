import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DataTableHeaderCommonProps, SortType } from './DataTable';
import { FontAwesome } from '@expo/vector-icons';

export type Header = {
    label: string;
    sortable?: boolean;
    property?: string;
};

interface DataTableHeaderProps<T> extends DataTableHeaderCommonProps<T> {
    onHeaderPress: (property: keyof T) => void;
    sortProperty: keyof T | undefined;
    sortType: SortType;
}

const { width: WIDTH } = Dimensions.get('screen');

const DataTableHeader = <T,>({
    headers,
    onHeaderPress,
    sortProperty,
    sortType,
    itemWidth = WIDTH * 0.15,
}: DataTableHeaderProps<T>) => {
    return (
        <>
            {headers.map((header, index) => (
                <TouchableOpacity
                    key={index}
                    activeOpacity={header.sortable ? 0.5 : 1}
                    onPress={() =>
                        header.sortable &&
                        onHeaderPress(
                            (header.property
                                ? header.property
                                : header.label.toLowerCase()) as keyof T
                        )
                    }
                    style={{
                        width: itemWidth,
                        alignItems: 'center',
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Text
                            key={index}
                            adjustsFontSizeToFit
                            numberOfLines={1}
                            style={{
                                fontSize: 15,
                                fontWeight:
                                    sortProperty ===
                                        header.label.toLowerCase() &&
                                    sortType !== SortType.UNSORTED
                                        ? 'bold'
                                        : 'normal',
                                marginRight: 5,
                            }}
                        >
                            {header.label}
                        </Text>
                        {sortProperty === header.label.toLowerCase() && (
                            <FontAwesome
                                name={sortType}
                                size={15}
                                color="black"
                            />
                        )}
                    </View>
                </TouchableOpacity>
            ))}
        </>
    );
};

export default DataTableHeader;
