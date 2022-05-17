import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Entypo } from '@expo/vector-icons';
import { Platform, TouchableOpacity, NativeModules, View } from 'react-native';
import { DrawerParamsList } from './DrawerParamsList';
import MainStack from './Main/MainStack';
import { theme } from '../../constants';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import DrawerContent from './DrawerContent';

const { StatusBarManager } = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
export const STATUSBAR_HEIGHT_TOTAL = STATUSBAR_HEIGHT + 50;

interface DrawerTabsProps {}

const Drawer = createDrawerNavigator<DrawerParamsList>();

const sideMenuDisabledScreens = ['ListCow', 'SearchCow', 'DetailCow'];
const hideHeaderScreens = ['SearchCow', 'EnrollCow'];

const DrawerTabs: React.FC<DrawerTabsProps> = () => {
    return (
        <Drawer.Navigator
            defaultStatus="closed"
            drawerContent={(props) => {
                return <DrawerContent {...props} />;
            }}
            screenOptions={({ navigation, route }) => {
                return {
                    // headerShown: false,
                    headerStyle: {
                        backgroundColor: theme.colors.primary,
                    },
                    headerTintColor: 'white',
                    headerTitle: '',
                    drawerActiveTintColor: theme.colors.primary,
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
                                onPress={() => navigation.navigate('SearchCow')}
                            >
                                <AntDesign
                                    name="search1"
                                    size={20}
                                    color="white"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('EnrollCow')}
                            >
                                <Ionicons
                                    name="ios-add-sharp"
                                    size={30}
                                    color="white"
                                />
                            </TouchableOpacity>
                        </View>
                    ),
                };
            }}
        >
            <Drawer.Group
                screenOptions={({ navigation, route }) => {
                    const routeName =
                        getFocusedRouteNameFromRoute(route) ?? 'Home';
                    if (hideHeaderScreens.includes(routeName)) {
                        return {
                            headerShown: false,
                            swipeEnabled: false,
                        };
                    }
                    if (sideMenuDisabledScreens.includes(routeName)) {
                        return {
                            swipeEnabled: false,
                            headerLeft: () => (
                                <TouchableOpacity
                                    style={{
                                        marginLeft: 10,
                                    }}
                                    onPress={() => navigation.goBack()}
                                >
                                    <Ionicons
                                        name="arrow-back"
                                        size={24}
                                        color="white"
                                    />
                                </TouchableOpacity>
                            ),
                        };
                    }
                    return {};
                }}
            >
                <Drawer.Screen
                    name="MainStack"
                    component={MainStack}
                    options={{
                        drawerLabel: 'Home',
                        drawerIcon: ({ color, size }) => (
                            <Entypo name="home" size={size} color={color} />
                        ),
                    }}
                />
            </Drawer.Group>
        </Drawer.Navigator>
    );
};

export default DrawerTabs;

// drawerLabel: 'Home',
// drawerIcon: ({ color, size }) => (
//     <Entypo name="home" size={size} color={color} />
// ),
