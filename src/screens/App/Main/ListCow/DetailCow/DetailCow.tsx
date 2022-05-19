import React, { useRef, useState } from 'react';
import { HomeStackNavProps } from '@navigation';
import {
    Dimensions,
    FlatList,
    Image,
    ImageURISource,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { ZoomableImage } from '@components';
import { globalConfig } from '@config';
import { BarChart } from 'react-native-chart-kit';

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
    const [selectedImage, setSelectedImage] = useState<ImageURISource>(
        cow.images[0]
    );
    const [currentIndex, setCurrentIndex] = useState<{
        currentIndex: number;
        previousIndex: number;
    }>({
        previousIndex: 0,
        currentIndex: 0,
    });
    const ref = useRef<FlatList<string>>(null);

    const setCurrentCow = (item: ImageURISource, index: number) => {
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
                {/* <ZoomableImage
                    source={{
                        uri: `${LOCAL_URL}/${selectedImage}`,
                    }}
                    height={IMAGE_PREVIEW}
                /> */}
                {/* <ZoomableImage source={selectedImage} height={IMAGE_PREVIEW} /> */}
                <Image
                    source={selectedImage}
                    style={{
                        height: IMAGE_PREVIEW,
                        width: WIDTH - 40,
                        resizeMode: 'cover',
                    }}
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
                                    setCurrentCow(
                                        item as ImageURISource,
                                        index
                                    );
                                }}
                            >
                                {/* <Image
                                    source={{ uri: `${LOCAL_URL}/${item}` }}
                                    style={{
                                        width: IMAGE_WIDTH,
                                        aspectRatio: 1,
                                        resizeMode: 'cover',
                                    }}
                                /> */}
                                <Image
                                    source={item as ImageURISource}
                                    style={{
                                        width: IMAGE_WIDTH,
                                        height: IMAGE_WIDTH,
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
            <View style={{ marginTop: 20 }}>
                <BarChart
                    data={{
                        labels: ['Standing', 'Walking', 'Lying', 'Eating'],
                        datasets: [
                            {
                                data: [8.5, 6.5, 5.5, 3.5],
                                colors: [
                                    (opacity = 1) => '#505e61',
                                    (opacity = 1) => '#e6b55a',
                                    (opacity = 1) => '#deb670',
                                    (opacity = 1) => '#a6632e',
                                ],
                            },
                        ],
                    }}
                    showBarTops={false}
                    fromZero
                    height={HEIGHT * 0.5}
                    width={WIDTH * 0.9}
                    withCustomBarColorFromData={true}
                    flatColor={true}
                    showValuesOnTopOfBars
                    chartConfig={{
                        decimalPlaces: 1,
                        backgroundGradientFromOpacity: 0,
                        backgroundGradientFrom: '#fff',
                        backgroundGradientTo: '#fff',
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        labelColor: (opacity = 1) =>
                            `rgba(0, 0, 0, ${opacity})`,
                    }}
                />
            </View>
        </ScrollView>
    );
};

export default DetailCow;
