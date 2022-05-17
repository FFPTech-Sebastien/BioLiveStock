import React, { useEffect, useRef, useState } from 'react';
import {
    Dimensions,
    FlatList,
    ListRenderItem,
    ScrollView,
    Text,
    TextInput,
    View,
} from 'react-native';
import DataTableHeader, {
    DataTableHeaderCommonProps,
    SortType,
} from './DataTableHeader';

const { width: WIDTH } = Dimensions.get('screen');

interface DataTableProps<T> extends DataTableHeaderCommonProps {
    /**
     * Data that will be displayed in the table.
     */
    data: T[];
    /**
     * Function that will be called to render each item in the table.
     */
    renderItem: ListRenderItem<T> | null | undefined;
    /**
     * Searchable fields.
     */
    searchFields?: (keyof T)[];
}

const DataTable = <T,>({
    data,
    renderItem,
    headers,
    itemWidth = WIDTH * 0.15,
    searchFields,
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
                // sort data depending on the sort type
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

    const handleSearch = (text: string) => {
        if (searchFields) {
            // filter data depending on the input text
            const filteredCows = data.filter((item) => {
                return searchFields.some((field) => {
                    return (item[field] as string).includes(text.toLowerCase());
                });
            });
            setFilteredData(filteredCows);
        }
    };

    return (
        <View>
            <View
                style={{
                    marginBottom: 10,

                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Text>Cattle</Text>
                <TextInput
                    placeholder="Search"
                    style={{
                        padding: 5,
                        width: '60%',
                        borderBottomColor: 'grey',
                        borderBottomWidth: 1,
                    }}
                    onChangeText={handleSearch}
                />
            </View>
            <ScrollView
                ref={firstRef}
                scrollEventThrottle={16}
                horizontal
                bounces={false}
                onScroll={(e) => {
                    if (secondRef) {
                        // syncing scroll position
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
                        // syncing scroll position
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
