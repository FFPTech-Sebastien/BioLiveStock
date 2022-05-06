import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export type AuthenticationParamsList = {
    Register: undefined;
    Login: undefined;
};

export type AuthenticationStackNavProps<
    T extends keyof AuthenticationParamsList
> = {
    navigation: StackNavigationProp<AuthenticationParamsList, T>;
    route: RouteProp<AuthenticationParamsList, T>;
};
