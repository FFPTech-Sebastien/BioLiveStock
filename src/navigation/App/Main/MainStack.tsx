import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MainParamsList } from './MainParamsList';
import {
    AgeCow,
    DetailCow,
    EnrollCow,
    HealthCow,
    Home,
    ListCow,
    SearchCow,
    SpeciesCow,
} from '@screens';
import { TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@constants';

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
            <Stack.Group
                screenOptions={({ navigation, route }) => {
                    return {
                        presentation: 'modal',
                        cardStyle: {
                            backgroundColor: 'white',
                        },
                        headerShown: true,
                        headerTitle: '',
                        headerShadowVisible: false,
                        headerLeftLabelVisible: false,
                        headerLeft: () => null,
                        headerRight: () => (
                            <TouchableOpacity
                                style={{
                                    marginRight: 20,
                                }}
                                onPress={() => navigation.goBack()}
                            >
                                <AntDesign
                                    name="close"
                                    size={24}
                                    color={theme.colors.primary}
                                />
                            </TouchableOpacity>
                        ),
                    };
                }}
            >
                <Stack.Screen name="HealthCow" component={HealthCow} />
                <Stack.Screen name="AgeCow" component={AgeCow} />
                <Stack.Screen name="SpeciesCow" component={SpeciesCow} />
            </Stack.Group>
            <Stack.Screen name="SearchCow" component={SearchCow} />
            <Stack.Screen name="EnrollCow" component={EnrollCow} />
            <Stack.Screen name="ListCow" component={ListCow} />
            <Stack.Screen name="DetailCow" component={DetailCow} />
        </Stack.Navigator>
    );
};

export default MainStack;
