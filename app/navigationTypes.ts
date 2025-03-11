import { NativeStackNavigationProp } from "@react-navigation/native-stack";


type RootStackNavigationList = {
    Home: undefined,
    SecondPage: undefined,
    ThirdPage: undefined,
    AddStock: undefined
}

export type homePageProps = NativeStackNavigationProp<RootStackNavigationList, "Home">;
export type secondPageProps = NativeStackNavigationProp<RootStackNavigationList, "SecondPage">;
export type ThirdPageProps = NativeStackNavigationProp<RootStackNavigationList, "ThirdPage">;
export type AddStockProps = NativeStackNavigationProp<RootStackNavigationList, "AddStock">;
