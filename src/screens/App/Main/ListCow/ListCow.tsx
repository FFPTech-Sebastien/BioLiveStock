import { HomeStackNavProps } from '@navigation';
import { Cow, RootState } from '@state';
import React, { useRef } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    Keyboard,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { DataTable, DataTableItem } from 'src/components/datatable';
import DatatTableRow from 'src/components/datatable/DatatTableRow';
import globalConfig from 'src/config/global.config';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width: WIDTH } = Dimensions.get('screen');

type ListCowProps = HomeStackNavProps<'ListCow'>;

const ITEM_WIDTH = WIDTH * 0.18;

const { LOCAL_URL } = globalConfig;

const ListCow: React.FC<ListCowProps> = ({ navigation }) => {
    const { cows } = useSelector((state: RootState) => state.cow);
    const scrollY = useRef(new Animated.Value(0)).current;

    return (
        <TouchableWithoutFeedback
            onPress={() => Keyboard.dismiss()}
            style={{
                flex: 1,
            }}
        >
            <View
                style={{
                    flex: 1,
                    padding: 10,
                }}
            >
                <DataTable<Cow>
                    data={cows}
                    itemWidth={ITEM_WIDTH}
                    searchFields={['rfid', 'id']}
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
                                            uri: `${LOCAL_URL}/${item.images[0]}`,
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
                                renderItem={() => (
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderWidth: 1,
                                            borderRadius: 3,
                                            paddingHorizontal: 15,
                                            paddingVertical: 5,
                                        }}
                                    >
                                        <MaterialCommunityIcons
                                            name="cow"
                                            size={17}
                                            color="black"
                                        />
                                        <Text
                                            style={{
                                                marginLeft: 5,
                                                color: '#c6baa4',
                                            }}
                                        >
                                            {item.id}
                                        </Text>
                                    </View>
                                )}
                            />
                            <DataTableItem
                                renderItem={() => <Text>{item.rfid}</Text>}
                            />
                            <DataTableItem
                                renderItem={() => <Text>{item.age}</Text>}
                            />
                            <DataTableItem
                                renderItem={() => (
                                    <Text
                                        style={{
                                            borderWidth: 1,
                                            borderRadius: 3,
                                            marginLeft: 5,
                                            color: '#c8b2b0',
                                            borderColor: '#c8b2b0',
                                            paddingVertical: 5,
                                            paddingHorizontal: 15,
                                        }}
                                    >
                                        {item.weight}
                                    </Text>
                                )}
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
            </View>
        </TouchableWithoutFeedback>
    );
};

export default ListCow;
