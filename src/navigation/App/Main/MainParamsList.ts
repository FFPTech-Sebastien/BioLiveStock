import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Cow } from '@state';

export type MainParamsList = {
    Home: undefined;
    HealthCow: undefined;
    AgeCow: undefined;
    SpeciesCow: undefined;
    SearchCow: undefined;
    EnrollCow: undefined;
    ListCow: undefined;
    DetailCow: {
        cow: Cow;
    };
};

export type HomeStackNavProps<T extends keyof MainParamsList> = {
    navigation: StackNavigationProp<MainParamsList, T>;
    route: RouteProp<MainParamsList, T>;
};
