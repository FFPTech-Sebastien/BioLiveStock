import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type MainParamsList = {
    Home: undefined;
    SearchCow: undefined;
};

export type HomeStackNavProps<T extends keyof MainParamsList> = {
    navigation: StackNavigationProp<MainParamsList, T>;
    route: RouteProp<MainParamsList, T>;
};
