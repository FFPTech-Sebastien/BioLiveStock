import { RouteProp } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

export type DrawerParamsList = {
    MainStack: undefined;
};

export type DrawerStackNavProps<T extends keyof DrawerParamsList> = {
    navigation: DrawerNavigationProp<DrawerParamsList, T>;
    route: RouteProp<DrawerParamsList, T>;
};
