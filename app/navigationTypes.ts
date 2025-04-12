import { NativeStackNavigationProp } from "@react-navigation/native-stack";


export type RootStackNavigationList = {
    Home: undefined,
    SecondPage: undefined,
    ThirdPage: undefined,
    AddStock: undefined,
    ManageLiveStock: {id:number},
    AllLiveStocks: undefined,
    RecentExpenses: undefined,
    ExpenditurePage: undefined,
    ManageExpenditurePage: {id: number},
    AnalyticsListScreen: undefined,
    ExpenditureAnalytics: undefined
}

export type homePageProps = NativeStackNavigationProp<RootStackNavigationList, "Home">;
export type secondPageProps = NativeStackNavigationProp<RootStackNavigationList, "SecondPage">;
export type ThirdPageProps = NativeStackNavigationProp<RootStackNavigationList, "ThirdPage">;
export type AddStockProps = NativeStackNavigationProp<RootStackNavigationList, "AddStock">;
export type ManageLiveStockProps = NativeStackNavigationProp<RootStackNavigationList, "ManageLiveStock">;
export type AllLiveStocksProps = NativeStackNavigationProp<RootStackNavigationList, "AllLiveStocks">;
export type RecentExpensesProps = NativeStackNavigationProp<RootStackNavigationList, "RecentExpenses">;
export type ExpenditurePageProps = NativeStackNavigationProp<RootStackNavigationList, "ExpenditurePage">;
export type ManageExpenditurePageProps = NativeStackNavigationProp<RootStackNavigationList, "ManageExpenditurePage">;
export type AnalyticsListScreenProps = NativeStackNavigationProp<RootStackNavigationList, "AnalyticsListScreen">;
