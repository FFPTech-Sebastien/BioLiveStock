import React, { useEffect, useRef, useState } from 'react';
import {
    Dimensions,
    FlatList,
    ListRenderItem,
    ScrollView,
    View,
} from 'react-native';
import DataTableHeader, { Header } from './DataTableHeader';

const { width: WIDTH } = Dimensions.get('screen');

export enum SortType {
    UNSORTED = 'unsorted',
    ASCENDING = 'sort-asc',
    DESCENDING = 'sort-desc',
}

export interface DataTableHeaderCommonProps<T> {
    headers: Header[];
    itemWidth?: number;
}

interface DataTableProps<T> extends DataTableHeaderCommonProps<T> {
    data: T[];
    renderItem: ListRenderItem<T> | null | undefined;
}

const DataTable = <T,>({
    data,
    renderItem,
    headers,
    itemWidth = WIDTH * 0.15,
}: DataTableProps<T>) => {
    const firstRef = useRef<ScrollView>(null);
    const secondRef = useRef<ScrollView>(null);
    const [filteredData, setFilteredData] = useState<T[]>(data);
    const [sortType, setSortType] = useState<SortType>(SortType.UNSORTED);
    const [sortProperty, setSortProperty] = useState<keyof T | undefined>(
        undefined
    );

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
                setFilteredData(data);
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
                setFilteredData(sortedCows);
            }
        }
    }, [data, setFilteredData, sortProperty, sortType]);

    return (
        <View>
            <ScrollView
                ref={firstRef}
                scrollEventThrottle={16}
                horizontal
                bounces={false}
                onScroll={(e) => {
                    if (secondRef) {
                        secondRef.current?.scrollTo({
                            x: e.nativeEvent.contentOffset.x,
                            animated: false,
                        });
                    }
                }}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    width: itemWidth * 10,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: 'white',
                    padding: 10,
                }}
                style={{
                    borderBottomWidth: 1,
                    borderBottomColor: 'lightgrey',
                }}
            >
                <DataTableHeader
                    headers={headers}
                    onHeaderPress={changeSortType}
                    sortType={sortType}
                    sortProperty={sortProperty}
                    itemWidth={itemWidth}
                />
            </ScrollView>
            <ScrollView
                bounces={false}
                nestedScrollEnabled
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    width: itemWidth * 10,
                }}
                horizontal
                ref={secondRef}
                onScroll={(e) => {
                    if (firstRef) {
                        firstRef.current?.scrollTo({
                            x: e.nativeEvent.contentOffset.x,
                            animated: false,
                        });
                    }
                }}
                scrollEventThrottle={16}
            >
                <FlatList<T>
                    data={filteredData}
                    renderItem={renderItem}
                    keyExtractor={(_, index) => index.toString()}
                    contentContainerStyle={{
                        paddingBottom: 50,
                    }}
                    style={{
                        height: '95%',
                    }}
                />
            </ScrollView>
        </View>
    );
};

export default DataTable;
