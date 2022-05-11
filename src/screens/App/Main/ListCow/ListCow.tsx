import { HomeStackNavProps } from '@navigation';
import { RootState, Cow } from '@state';
import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Dimensions,
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSelector } from 'react-redux';
import globalConfig from 'src/config/global.config';

const AnimatedTouchableOpacity =
    Animated.createAnimatedComponent(TouchableOpacity);

const { height } = Dimensions.get('screen');

type ListCowProps = HomeStackNavProps<'ListCow'>;

const { BASE_URL } = globalConfig;

const ListCow: React.FC<ListCowProps> = ({ navigation }) => {
    const { cows } = useSelector((state: RootState) => state.cow);
    const scrollY = useRef(new Animated.Value(0)).current;

    return (
        <View
            style={{
                flex: 1,
            }}
        >
            <Animated.FlatList<Cow>
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                data={cows}
                renderItem={({ item, index }) => (
                    <AnimatedTouchableOpacity
                        onPress={() =>
                            navigation.push('DetailCow', {
                                cow: item,
                            })
                        }
                        style={{
                            height: height * 0.1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: 10,
                            backgroundColor:
                                index % 2 === 0 ? '#fff' : 'lightgray',
                        }}
                    >
                        <Image
                            source={{ uri: `${BASE_URL}/${item.images[0]}` }}
                            style={{
                                width: 55,
                                aspectRatio: 1,
                                resizeMode: 'cover',
                            }}
                        />
                        <Text>{item.id}</Text>
                        <Text>{item.rfid}</Text>
                        <Text>{item.age}</Text>
                        <Text>{item.weight}</Text>
                    </AnimatedTouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

export default ListCow;
