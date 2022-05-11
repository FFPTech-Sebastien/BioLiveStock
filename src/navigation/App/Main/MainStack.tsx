import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MainParamsList } from './MainParamsList';
import { DetailCow, Home, ListCow, SearchCow } from '../../../screens';
import { TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

interface MainStackProps {}

const Stack = createStackNavigator<MainParamsList>();

const MainStack: React.FC<MainStackProps> = () => {
    return (
        <Stack.Navigator
            screenOptions={({ navigation, route }) => {
                return {
                    headerShown: false,
                    //     headerStyle: {
                    //         backgroundColor: theme.colors.primary,
                    //     },
                    //     headerTintColor: 'white',
                    //     headerTitle: '',
                    // 	headerBackTitleVisible: false,
                    headerRight: () => (
                        <View
                            style={{
                                width: '30%',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginRight: 20,
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.openDrawer();
                                    // navigation.navigate('SearchCow');
                                }}
                            >
                                <AntDesign
                                    name="search1"
                                    size={20}
                                    color="green"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Ionicons
                                    name="ios-add-sharp"
                                    size={30}
                                    color="green"
                                />
                            </TouchableOpacity>
                        </View>
                    ),
                };
            }}
        >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Group screenOptions={{}}>
                <Stack.Screen name="SearchCow" component={SearchCow} />
                <Stack.Screen name="ListCow" component={ListCow} />
                <Stack.Screen name="DetailCow" component={DetailCow} />
            </Stack.Group>
        </Stack.Navigator>
    );
};

export default MainStack;
