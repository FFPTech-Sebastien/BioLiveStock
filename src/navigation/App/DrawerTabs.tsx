import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Entypo } from '@expo/vector-icons';
import { Platform, TouchableOpacity, NativeModules, View } from 'react-native';
import { DrawerParamsList } from './DrawerParamsList';
import MainStack from './Main/MainStack';
import { theme } from '../../constants';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const { StatusBarManager } = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
export const STATUSBAR_HEIGHT_TOTAL = STATUSBAR_HEIGHT + 50;

interface DrawerTabsProps {}

const Drawer = createDrawerNavigator<DrawerParamsList>();

const DrawerTabs: React.FC<DrawerTabsProps> = () => {
    return (
        <Drawer.Navigator
            defaultStatus="closed"
            // drawerContent={(props) => {
            //     return <DrawerContent {...props} />;
            // }}
            screenOptions={({ navigation, route }) => {
                return {
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
                                onPress={() => {
                                    navigation.navigate('SearchCow');
                                }}
                            >
                                <AntDesign
                                    name="search1"
                                    size={20}
                                    color="white"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Ionicons
                                    name="ios-add-sharp"
                                    size={30}
                                    color="white"
                                />
                            </TouchableOpacity>
                        </View>
                    ),
                    // drawerActiveTintColor: colors.primary,
                    // headerTitle: () => <HalisiImage width={40} height={40} />,
                    // headerLeft: () => (
                    //     <TouchableOpacity
                    //         style={{ marginLeft: 20 }}
                    //         onPress={() => {
                    //             navigation.openDrawer();
                    //         }}
                    //     >
                    //         <Entypo name="menu" size={30} color="#fff" />
                    //     </TouchableOpacity>
                    // ),
                };
            }}
        >
            <Drawer.Screen
                name="MainStack"
                component={MainStack}
                options={({ navigation, route }) => {
                    return {
                        drawerLabel: 'Home',
                        drawerIcon: ({ color, size }) => (
                            <Entypo name="home" size={size} color={color} />
                        ),
                        // headerRight: () => (
                        //     <View
                        //         style={{
                        //             width: '30%',
                        //             flexDirection: 'row',
                        //             alignItems: 'center',
                        //             justifyContent: 'space-between',
                        //             marginRight: 20,
                        //         }}
                        //     >
                        //         <TouchableOpacity
                        //             onPress={() => {
                        //                 navigation.navigate('SearchCow');
                        //             }}
                        //         >
                        //             <AntDesign
                        //                 name="search1"
                        //                 size={20}
                        //                 color="white"
                        //             />
                        //         </TouchableOpacity>
                        //         <TouchableOpacity>
                        //             <Ionicons
                        //                 name="ios-add-sharp"
                        //                 size={30}
                        //                 color="white"
                        //             />
                        //         </TouchableOpacity>
                        //     </View>
                        // ),
                    };
                }}
            />
        </Drawer.Navigator>
    );
};

export default DrawerTabs;
