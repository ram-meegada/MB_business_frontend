import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import HomePage from "../pages/homePage";
import SecondPage from "../pages/SecondPage";
import ThirdPage from "../pages/ThirdPage";
import { HelloWave } from "@/components/HelloWave";
import FourthPage from "../pages/FourthPage";
import AddStock from "../pages/AddStock";
import AllLiveStocks from "../pages/AllLiveStocks";
import ManageLiveStock from "../pages/ManageLiveStock";
import ExpenditurePage from "../pages/ExpenditurePage";
import RecentExpenses from "../pages/RecentExpenses";
import ManageExpenditurePage from "../pages/ManageExpense";
import AnalyticsListScreen from "../pages/AnalyticsListScreen";
import ExpenditureAnalytics from "../pages/ExpenditureAnalytics";

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <Stack.Navigator initialRouteName="ThirdPage">
      <Stack.Screen
        name="Home"
        component={HomePage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SecondPage"
        component={SecondPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ThirdPage"
        component={ThirdPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddStock"
        component={AddStock}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AllLiveStocks"
        component={AllLiveStocks}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ManageLiveStock"
        component={ManageLiveStock}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ExpenditurePage"
        component={ExpenditurePage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ManageExpenditurePage"
        component={ManageExpenditurePage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AnalyticsListScreen"
        component={AnalyticsListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ExpenditureAnalytics"
        component={ExpenditureAnalytics}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default App;

// import React from 'react';
// import {
//   Alert,
//   Platform,
//   StyleSheet,
//   Text,
//   TouchableHighlight,
//   TouchableOpacity,
//   TouchableNativeFeedback,
//   TouchableWithoutFeedback,
//   View,
// } from 'react-native';

// const Touchables = () => {
//   const onPressButton = () => {
//     Alert.alert('You tapped the button!');
//   };

//   const onLongPressButton = () => {
//     Alert.alert('You long-pressed the button!');
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableHighlight onPress={onPressButton} underlayColor="white">
//         <View style={styles.button}>
//           <Text style={styles.buttonText}>TouchableHighlight</Text>
//         </View>
//       </TouchableHighlight>
//       <TouchableOpacity onPress={onPressButton}>
//         <View style={styles.button}>
//           <Text style={styles.buttonText}>TouchableOpacity</Text>
//         </View>
//       </TouchableOpacity>
//       <TouchableNativeFeedback
//         onPress={onPressButton}
//         background={
//           Platform.OS === 'android'
//             ? TouchableNativeFeedback.SelectableBackground()
//             : undefined
//         }>
//         <View style={styles.button}>
//           <Text style={styles.buttonText}>
//             TouchableNativeFeedback{' '}
//             {Platform.OS !== 'android' ? '(Android only)' : ''}
//           </Text>
//         </View>
//       </TouchableNativeFeedback>
//       <TouchableWithoutFeedback onPress={onPressButton}>
//         <View style={styles.button}>
//           <Text style={styles.buttonText}>TouchableWithoutFeedback</Text>
//         </View>
//       </TouchableWithoutFeedback>
//       <TouchableHighlight
//         onPress={onPressButton}
//         onLongPress={onLongPressButton}
//         underlayColor="white">
//         <View style={styles.button}>
//           <Text style={styles.buttonText}>Touchable with Long Press</Text>
//         </View>
//       </TouchableHighlight>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     paddingTop: 60,
//     alignItems: 'center',
//   },
//   button: {
//     marginBottom: 30,
//     width: 260,
//     alignItems: 'center',
//     backgroundColor: '#2196F3',
//   },
//   buttonText: {
//     textAlign: 'center',
//     padding: 20,
//     color: 'white',
//   },
// });

// export default Touchables;
