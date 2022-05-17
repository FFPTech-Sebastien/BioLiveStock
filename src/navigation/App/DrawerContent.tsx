import React from 'react';
import {
    DrawerContentComponentProps,
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList,
} from '@react-navigation/drawer';
import { Alert, Linking, StyleSheet, Text, View } from 'react-native';
import {
    MaterialIcons,
    Entypo,
    MaterialCommunityIcons,
} from '@expo/vector-icons';
import { LogoutIcon } from '../../components';
import { useSelector } from 'react-redux';
import { RootState } from '@state';
import { theme } from '@constants';

type DrawerContentProps = DrawerContentComponentProps;

const DrawerContent: React.FC<DrawerContentProps> = (props) => {
    const { user } = useSelector((state: RootState) => state.user);
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView
                {...props}
                style={{ paddingHorizontal: 15 }}
            >
                <View style={styles.container}>
                    <Text style={[styles.title]}>HALISI</Text>
                    <View
                        style={{
                            flexDirection: 'row',
                        }}
                    >
                        <View style={{}}>
                            <Text
                                style={[
                                    styles.line,
                                    { color: theme.colors.grey.light },
                                ]}
                            >
                                You are signed in as
                            </Text>
                            <Text
                                style={[
                                    styles.line,
                                    { color: theme.colors.grey.medium },
                                ]}
                            >
                                {user?.first_name} {user?.last_name}
                            </Text>
                        </View>
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'flex-end',
                            }}
                        >
                            <LogoutIcon />
                        </View>
                    </View>
                    <View style={styles.divider} />
                </View>
                <DrawerItemList {...props} />
                <DrawerItem
                    label="Help"
                    onPress={async () => {
                        Linking.openURL('https://fitforpurpose.tech/');
                    }}
                    icon={({ color, size }) => (
                        <Entypo
                            name="help-with-circle"
                            size={size}
                            color={color}
                        />
                    )}
                />
                <DrawerItem
                    label="Privacy Policy"
                    onPress={() => {
                        Linking.openURL('https://fitforpurpose.tech/');
                    }}
                    style={{
                        transform: [{ translateX: -2 }],
                    }}
                    icon={({ color }) => (
                        <MaterialCommunityIcons
                            name="information"
                            size={28}
                            color={color}
                        />
                    )}
                />
                <DrawerItem
                    label="Email us"
                    onPress={() => {
                        Linking.openURL(
                            'mailto:support@fitforpurpose.tech'
                        ).catch(() => {
                            Alert.alert(
                                'No Email-Client',
                                'It seems you have no email client installed on your device.'
                            );
                        });
                    }}
                    icon={({ color, size }) => (
                        <MaterialIcons name="email" size={size} color={color} />
                    )}
                />
            </DrawerContentScrollView>
        </View>
    );
};

export default DrawerContent;

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    title: {
        fontSize: 45,
    },
    line: {
        marginVertical: 5,
    },
    divider: {
        height: 1,
        backgroundColor: 'grey',
        marginTop: 5,
    },
});
