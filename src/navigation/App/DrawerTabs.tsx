import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Entypo } from '@expo/vector-icons';
import { Platform, TouchableOpacity, NativeModules } from 'react-native';
import { DrawerParamsList } from './DrawerParamsList';

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
            screenOptions={({ navigation }) => {
                return {
                    // headerStyle: {
                    //     backgroundColor: colors.primary,
                    // },
                    // drawerActiveTintColor: colors.primary,
                    // headerTitle: () => <HalisiImage width={40} height={40} />,
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{ marginLeft: 20 }}
                            onPress={() => {
                                navigation.openDrawer();
                            }}
                        >
                            <Entypo name="menu" size={30} color="#fff" />
                        </TouchableOpacity>
                    ),
                };
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
        </Drawer.Navigator>
    );
};

export default DrawerTabs;
