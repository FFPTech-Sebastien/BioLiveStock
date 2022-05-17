import React, { useState, useEffect } from 'react';
import {
    Alert,
    Dimensions,
    Image,
    Keyboard,
    Linking,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
    DefaultButton,
    InputWithError,
    LinkText,
    MicrosoftButton,
} from '../../components';
import { AuthenticationStackNavProps } from '../../navigation/Authentication';
import * as WebBrowser from 'expo-web-browser';
import { ScannerMask } from '../../components/camera';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { getItem } from '../../services';
import { login, RootState, useAppDispatch } from '@state';
import { useSelector } from 'react-redux';
import { Status } from 'src/constants/models';
import { useMS } from '@hooks';

type RegisterProps = AuthenticationStackNavProps<'Register'>;

WebBrowser.maybeCompleteAuthSession();

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
const MARGIN = HEIGHT * 0.3;

const Register: React.FC<RegisterProps> = ({ navigation }) => {
    const dispatch = useAppDispatch();
    const { error, status } = useSelector((state: RootState) => state.user);
    const [state, setState] = useState({
        email: 'sebastien.vanvreckem@fitforpurpose.tech',
        password: 'fitforpurpose',
        // email: '',
        // password: '',
    });
    const { promptAsync } = useMS();
    const [active, setActive] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        switch (error.status) {
            case Status.EMAIL_NOT_VERIFIED:
                Alert.alert(
                    'Please verify your email',
                    'An email has been sent to your mail box. Please verify your email to continue.',
                    [
                        {
                            text: 'Cancel',
                        },
                        {
                            text: 'Open my mail box',
                            onPress: () => {
                                Linking.openURL('message:');
                            },
                        },
                    ]
                );
                break;

            case Status.USER_NOT_FOUND:
                Alert.alert(
                    'You must register',
                    'Your account has not been found! Please register to continue.',
                    [
                        {
                            text: 'Cancel',
                        },
                        {
                            text: 'Register',
                            onPress: () => {
                                WebBrowser.openBrowserAsync(
                                    'https://halisi-v2-demonstrator.azurewebsites.net/auth/signup'
                                );
                            },
                        },
                    ]
                );
                break;
        }
    }, [error.status, error.message]);

    useEffect(() => {
        (async () => {
            const [signature, email] = await Promise.all([
                getItem('signature'),
                getItem('email'),
            ]);
            setActive(signature && email ? true : false);
        })();
    }, []);

    const handleLogin = async () => {
        Keyboard.dismiss();
        dispatch(login(state));
    };

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flex: 1 }}
            bounces={false}
            keyboardShouldPersistTaps="handled"
        >
            <View style={{ flex: 1, backgroundColor: 'black' }}>
                <View
                    style={{
                        flex: 0.5,
                        marginTop: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Image
                        source={require('../../../assets/halisi-without-text.png')}
                        style={{
                            width: 130,
                            height: 130,
                        }}
                    />
                    <View
                        style={{
                            alignItems: 'center',
                            transform: [
                                {
                                    translateY: -20,
                                },
                            ],
                        }}
                    >
                        <Text
                            style={[
                                styles.text,
                                {
                                    fontSize: 30,
                                    color: 'white',
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                },
                            ]}
                        >
                            Welcome Back
                        </Text>
                        {active && (
                            <>
                                <Text
                                    style={[
                                        styles.text,
                                        {
                                            width: 200,
                                            color: 'white',
                                            textAlign: 'center',
                                        },
                                    ]}
                                >
                                    Your face is now your password. Sign in with
                                    Halisi to continue.
                                </Text>
                                <ScannerMask
                                    radius={10}
                                    onPress={() => navigation.push('Login')}
                                    size={100}
                                    borderWidth={4}
                                    duration={700}
                                    scale={0.8}
                                />
                                <Text
                                    style={[
                                        styles.text,
                                        {
                                            color: 'white',
                                            fontSize: 30,
                                            textAlign: 'center',
                                        },
                                    ]}
                                >
                                    OR
                                </Text>
                            </>
                        )}
                    </View>
                </View>
                <View
                    style={{
                        backgroundColor: 'white',
                        flex: active ? 0.5 : 1,
                        borderTopRightRadius: 30,
                        borderTopLeftRadius: 30,
                    }}
                >
                    <View
                        style={{
                            paddingHorizontal: '10%',
                            paddingVertical: 20,
                            flex: 1,
                        }}
                    >
                        <View
                            style={{
                                flex: 1,
                            }}
                        >
                            <InputWithError
                                value={state.email}
                                onChangeText={(text) => {
                                    setState({ ...state, email: text });
                                }}
                                keyboardType="email-address"
                                placeholder="Email"
                                autoCapitalize="none"
                                autoCorrect={false}

                                // label="Email"
                            />
                            <InputWithError
                                value={state.password}
                                onChangeText={(text) => {
                                    setState({ ...state, password: text });
                                }}
                                secureTextEntry={!showPassword}
                                placeholder="Password"
                                iconLeft={() => (
                                    <MaterialIcons
                                        name="lock"
                                        size={20}
                                        style={{
                                            alignSelf: 'center',
                                            marginRight: 10,
                                        }}
                                        color="grey"
                                    />
                                )}
                                iconRight={() => (
                                    <TouchableOpacity onPress={togglePassword}>
                                        <Ionicons
                                            name={
                                                showPassword ? 'eye-off' : 'eye'
                                            }
                                            size={20}
                                            color="grey"
                                        />
                                    </TouchableOpacity>
                                )}
                                // label="Password"
                            />
                            <LinkText
                                text="Forgot Password"
                                onPress={async () => {
                                    const result =
                                        await WebBrowser.openBrowserAsync(
                                            'https://halisi-v2-demonstrator.azurewebsites.net/auth/reset',
                                            {
                                                dismissButtonStyle: 'close',
                                            }
                                        );
                                }}
                                textStyle={[
                                    styles.text,
                                    {
                                        fontSize: 12,
                                        fontWeight: 'bold',
                                        textAlign: 'right',
                                        marginTop: 10,
                                    },
                                ]}
                            />

                            <DefaultButton
                                title="Sign in"
                                color="black"
                                textColor="#fff"
                                onPress={handleLogin}
                                loading={status === 'loading'}
                                disabled={status === 'loading'}
                                style={{
                                    marginVertical: 15,
                                    width: '100%',
                                    borderRadius: 10,
                                    alignItems: 'center',
                                }}
                                textStyle={{
                                    fontWeight: '500',
                                    fontSize: 17,
                                }}
                            />
                            <MicrosoftButton
                                color="#9095a8"
                                textColor="#fff"
                                onPress={() => {
                                    promptAsync();
                                }}
                                loading={status === 'loading'}
                                disabled={status === 'loading'}
                                style={{
                                    borderRadius: 10,
                                    width: '100%',
                                    alignItems: 'center',
                                    marginBottom: 15,
                                }}
                                textStyle={{
                                    fontWeight: '500',
                                    fontSize: 17,
                                }}
                            />
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                }}
                            >
                                <Text
                                    style={[
                                        styles.text,
                                        {
                                            color: 'black',
                                            fontSize: 12,
                                        },
                                    ]}
                                >
                                    Don't have an account?
                                </Text>

                                <LinkText
                                    space={1}
                                    text="Create a new account"
                                    onPress={async () => {
                                        const result =
                                            await WebBrowser.openBrowserAsync(
                                                'https://halisi-v2-demonstrator.azurewebsites.net/auth/signup'
                                            );
                                    }}
                                    textStyle={[
                                        styles.text,
                                        {
                                            fontSize: 12,
                                            fontWeight: 'bold',
                                        },
                                    ]}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
};

export default Register;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        fontSize: 16,
        color: '#9095a8',
    },
    muted: {
        color: '#8a8383',
    },
});
