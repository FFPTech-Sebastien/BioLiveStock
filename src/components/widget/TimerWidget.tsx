import React from 'react';
import { Text, View } from 'react-native';
import { WidgetContainer } from '../container';
import { Timer } from '../timer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

interface TimerWidgetProps {}

const TimerWidget: React.FC<TimerWidgetProps> = () => {
    return (
        <WidgetContainer>
            <View
                style={{
                    alignItems: 'center',
                }}
            >
                <Timer />
                <View
                    style={{
                        marginTop: 10,
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        width: '100%',
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <FontAwesome5
                            name="temperature-high"
                            size={18}
                            color="black"
                        />
                        <Text
                            style={{
                                transform: [{ translateY: 1 }],
                            }}
                        >
                            23
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Ionicons
                            name="rainy-outline"
                            size={20}
                            color="black"
                        />
                        <Text
                            style={{
                                marginLeft: 5,
                            }}
                        >
                            Mild
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Feather name="wind" size={20} color="black" />
                        <Text
                            style={{
                                marginLeft: 5,
                            }}
                        >
                            12 mph
                        </Text>
                    </View>
                </View>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            ></View>
        </WidgetContainer>
    );
};

export default TimerWidget;
