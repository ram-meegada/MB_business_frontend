import { StyleSheet, StatusBar } from "react-native";


export const secondaryColor = '#b0e0e6'
export const thirdColor = '#05d5ff'
export const sideHeadingColor = '#333232'
export const textColor = "black"
export const placeHolderColor = "grey"


export const globalStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d8dded',
    },
    subContainer: {
              flex: 1,
              marginTop: StatusBar.currentHeight ? StatusBar.currentHeight + 5 : 25,
              marginHorizontal: 20,
              marginBottom: 20,
            },
    pageHeadingStyle: { fontSize: 24, alignSelf: "center", marginBottom: 20 },
    textInputStyle: {
        height: 50,
        marginBottom: 10,
        borderRadius: 30,
        backgroundColor: secondaryColor,
        paddingLeft: 10,
        color: "black",
      }
})
