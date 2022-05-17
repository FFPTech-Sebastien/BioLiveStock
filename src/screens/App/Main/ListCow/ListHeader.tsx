import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

type Header = {
    label: string;
    sortable?: boolean;
    property?: string;
};

type RenderItemList = {
    item: Header;
    active?: boolean;
};

interface ListHeaderProps<T> {
    data: T[];
    setFiltered: React.Dispatch<React.SetStateAction<T[]>>;
    headers: Header[];
    renderItem: (
        { item, active }: RenderItemList,
        index?: number
    ) => React.ReactElement;
}

enum SortType {
    UNSORTED = 'unsorted',
    ASCENDING = 'sort-asc',
    DESCENDING = 'sort-desc',
}

const ListHeader = <T,>({
    data,
    headers,
    setFiltered,
    renderItem,
}: ListHeaderProps<T>) => {
    const [sortType, setSortType] = useState<SortType>(SortType.UNSORTED);
    const [sortProperty, setSortProperty] = useState<keyof T>();

    const changeSortType = (property: keyof T) => {
        if (sortProperty && property !== sortProperty) {
            setSortType(SortType.DESCENDING);
        } else {
            switch (sortType) {
                case SortType.UNSORTED:
                    setSortType(SortType.DESCENDING);
                    break;
                case SortType.DESCENDING:
                    setSortType(SortType.ASCENDING);
                    break;
                case SortType.ASCENDING:
                    setSortType(SortType.UNSORTED);
                    break;
                default:
                    setSortType(SortType.UNSORTED);
                    break;
            }
        }

        setSortProperty(property);
    };

    useEffect(() => {
        if (sortProperty) {
            if (sortType === SortType.UNSORTED) {
                setFiltered(data);
            } else {
                const sortedCows = [...data].sort((a, b) => {
                    if (a[sortProperty] < b[sortProperty]) {
                        return sortType === SortType.ASCENDING ? 1 : -1;
                    }
                    if (a[sortProperty] > b[sortProperty]) {
                        return sortType === SortType.ASCENDING ? -1 : 1;
                    }
                    return 0;
                });
                setFiltered(sortedCows);
            }
        }
    }, [data, setFiltered, sortProperty, sortType]);

    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: 'white',
            }}
        >
            {headers.map((header, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => {
                        data &&
                            changeSortType(
                                header.label.toLowerCase() as keyof T
                            );
                    }}
                    style={{
                        padding: 10,
                        width: `${100 / headers.length}%`,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
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
        </View>
    );
};

export default ListHeader;
