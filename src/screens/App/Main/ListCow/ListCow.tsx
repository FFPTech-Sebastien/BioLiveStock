import { HomeStackNavProps } from '@navigation';
import { RootState } from '@state';
import React, { useRef } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    Text,
    TextInput,
    View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { DataTable, DataTableItem } from 'src/components/datatable';
import DatatTableRow from 'src/components/datatable/DatatTableRow';
import globalConfig from 'src/config/global.config';

const { width: WIDTH } = Dimensions.get('screen');

type ListCowProps = HomeStackNavProps<'ListCow'>;

const ITEM_WIDTH = WIDTH * 0.12;

const { BASE_URL } = globalConfig;

const ListCow: React.FC<ListCowProps> = ({ navigation }) => {
    const { cows } = useSelector((state: RootState) => state.cow);
    const scrollY = useRef(new Animated.Value(0)).current;

    return (
        <View
            style={{
                flex: 1,
                padding: 10,
            }}
        >
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
                />
            </View>
            <DataTable
                data={cows}
                itemWidth={ITEM_WIDTH}
                headers={[
                    {
                        label: 'Image',
                        sortable: false,
                    },
                    {
                        label: 'ID',
                        sortable: true,
                    },
                    {
                        label: 'RFID',
                        sortable: true,
                    },
                    {
                        label: 'Age',
                        sortable: true,
                    },
                    {
                        label: 'Weight',
                        sortable: true,
                    },
                    {
                        label: 'Status',
                        sortable: true,
                    },
                ]}
                renderItem={({ item, index }) => (
                    <DatatTableRow
                        onPress={() =>
                            navigation.push('DetailCow', { cow: item })
                        }
                        style={{
                            backgroundColor:
                                index % 2 === 0 ? '#f6f6f6' : '#fff',
                        }}
                        itemWidth={ITEM_WIDTH}
                    >
                        <DataTableItem
                            renderItem={() => (
                                <Image
                                    source={{
                                        uri: `${BASE_URL}/${item.images[0]}`,
                                    }}
                                    style={{
                                        width: 40,
                                        aspectRatio: 1,
                                        resizeMode: 'cover',
                                    }}
                                />
                            )}
                        />
                        <DataTableItem
                            renderItem={() => <Text>{item.id}</Text>}
                        />
                        <DataTableItem
                            renderItem={() => <Text>{item.rfid}</Text>}
                        />
                        <DataTableItem
                            renderItem={() => <Text>{item.age}</Text>}
                        />
                        <DataTableItem
                            renderItem={() => <Text>{item.weight}</Text>}
                        />
                        <DataTableItem
                            renderItem={() => (
                                <Text
                                    style={{
                                        textAlign: 'center',
                                    }}
                                >
                                    {item.status}
                                </Text>
                            )}
                        />
                    </DatatTableRow>
                )}
            />
            {/* <ListHeader
                data={cows}
                headers={[
                    {
                        label: 'Image',
                        sortable: false,
                    },
                    {
                        label: 'ID',
                        sortable: true,
                    },
                    {
                        label: 'RFID',
                        sortable: true,
                    },
                    {
                        label: 'Age',
                        sortable: true,
                    },
                    {
                        label: 'Weight',
                        sortable: true,
                    },
                    {
                        label: 'Status',
                        sortable: true,
                    },
                ]}
                setFiltered={setFilteredCows}
                renderItem={({ item, active }, index) => (
                    <Text
                        key={index}
                        adjustsFontSizeToFit
                        numberOfLines={1}
                        style={{
                            fontSize: 12,
                            fontWeight: active ? 'bold' : 'normal',
                            marginRight: 5,
                        }}
                    >
                        {item.label}
                    </Text>
                )}
            />
            <Animated.FlatList<Cow>
                horizontal={false}
                onScroll={Animated.event(
                    [
                        {
                            nativeEvent: {
                                contentOffset: { y: scrollY },
                            },
                        },
                    ],
                    { useNativeDriver: true }
                )}
                data={filteredCows}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    flexGrow: 1,
                }}
                renderItem={({ item, index }) => (
                    <AnimatedTouchableOpacity
                        onPress={() =>
                            navigation.push('DetailCow', {
                                cow: item,
                            })
                        }
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: 10,
                            backgroundColor:
                                index % 2 === 0 ? '#f6f6f6' : '#fff',
                        }}
                    >
                        <Image
                            source={{
                                uri: `${BASE_URL}/${item.images[0]}`,
                            }}
                            style={{
                                width: 40,
                                aspectRatio: 1,
                                resizeMode: 'cover',
                            }}
                        />
                        <Text
                            style={{
                                width: `${100 / filteredCows.length}%`,
                            }}
                        >
                            {item.id}
                        </Text>
                        <Text
                            style={{
                                width: `${100 / filteredCows.length}%`,
                            }}
                        >
                            {item.rfid}
                        </Text>
                        <Text
                            style={{
                                width: `${100 / filteredCows.length}%`,
                            }}
                        >
                            {item.age}
                        </Text>
                        <Text
                            style={{
                                width: `${100 / filteredCows.length}%`,
                            }}
                        >
                            {item.weight}
                        </Text>
                        <Text
                            adjustsFontSizeToFit
                            numberOfLines={1}
                            style={{
                                textAlign: 'center',
                                width: `${100 / filteredCows.length}%`,
                            }}
                        >
                            {item.status}
                        </Text>
                    </AnimatedTouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
            /> */}
        </View>
    );
};

export default ListCow;
