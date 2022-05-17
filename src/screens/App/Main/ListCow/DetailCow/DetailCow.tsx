import React, { useRef, useState } from 'react';
import { HomeStackNavProps } from '@navigation';
import {
    Dimensions,
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { ZoomableImage } from '@components';
import { globalConfig } from '@config';

type DetailCowProps = HomeStackNavProps<'DetailCow'>;

const { BASE_URL, LOCAL_URL } = globalConfig;
const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

const IMAGE_NUMBER = 3;
const MARGIN_MULT = IMAGE_NUMBER - 1;
const MARGIN = 16;
const IMAGE_WIDTH = (WIDTH - MARGIN * MARGIN_MULT - 40) / IMAGE_NUMBER;
const IMAGE_WITH_PADDING = IMAGE_WIDTH + MARGIN;
const IMAGE_PREVIEW = HEIGHT * 0.4;

const DetailCow: React.FC<DetailCowProps> = ({ route }) => {
    const { cow } = route.params;
    const [selectedImage, setSelectedImage] = useState<string>(cow.images[0]);
    const [currentIndex, setCurrentIndex] = useState<{
        currentIndex: number;
        previousIndex: number;
    }>({
        previousIndex: 0,
        currentIndex: 0,
    });
    const ref = useRef<FlatList<string>>(null);

    const setCurrentCow = (item: string, index: number) => {
        setSelectedImage(item);
        setCurrentIndex((prev) => ({
            previousIndex: prev.currentIndex,
            currentIndex: index,
        }));
        if (ref.current) {
            if (index !== currentIndex.currentIndex) {
                ref.current.scrollToIndex({
                    animated: true,
                    index: index,
                    viewPosition: 0.5,
                    viewOffset: MARGIN / 2,
                    // viewPosition: index < currentIndex.previousIndex ? 1 : 0,
                    // viewOffset: index < currentIndex.previousIndex ? MARGIN : 0,
                });
            }
        }
    };

    return (
        <ScrollView
            style={{
                flex: 1,
                padding: 20,
            }}
            nestedScrollEnabled={true}
        >
            <View style={{ flex: 1 }}>
                <ZoomableImage
                    source={{
                        uri: `${LOCAL_URL}/${selectedImage}`,
                    }}
                    height={IMAGE_PREVIEW}
                />
                <FlatList
                    ref={ref}
                    horizontal
                    data={cow.images}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        marginTop: MARGIN,
                    }}
                    ItemSeparatorComponent={() => (
                        <View style={{ width: MARGIN }} />
                    )}
                    snapToInterval={IMAGE_WITH_PADDING}
                    pagingEnabled
                    decelerationRate="fast"
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => {
                                    setCurrentCow(item, index);
                                }}
                            >
                                <Image
                                    source={{ uri: `${LOCAL_URL}/${item}` }}
                                    style={{
                                        width: IMAGE_WIDTH,
                                        aspectRatio: 1,
                                        resizeMode: 'cover',
                                    }}
                                />
                                <View
                                    style={{
                                        ...StyleSheet.absoluteFillObject,
                                        backgroundColor:
                                            index === currentIndex.currentIndex
                                                ? 'transparent'
                                                : 'rgba(0,0,0,0.6)',
                                    }}
                                />
                            </TouchableOpacity>
                        );
                    }}
                    keyExtractor={(_, index) => index.toString()}
                />
            </View>
        </ScrollView>
    );
};

export default DetailCow;
