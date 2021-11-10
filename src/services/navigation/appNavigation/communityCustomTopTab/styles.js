import { colors, appStyles, fontFamily } from "../../../../services";
import { height, width } from "react-native-dimension";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    // filters
    filterContainerStyle: {
        height: height(6),
        backgroundColor: colors.appBgColor4,
        borderWidth: 0,
        borderRadius: 2.5,
    },
    filterActive: {
        backgroundColor: 'transparent',
    },

    filterStyleBtn: {
        borderRadius: 2.5,
        margin: 5,
        backgroundColor: colors.appColor1,
      //  ...appStyles.shadow
    },
    filterActiveTxt: {
        color: colors.appTextColor6,
        fontFamily:fontFamily.appTextBold
    },
    filterInactiveTxt: {
        color: colors.appTextColor3,
        fontFamily:fontFamily.appTextBold
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        //  height: 50,
        // width: '100%',
        paddingHorizontal: width(5),
        paddingVertical: height(2),

        justifyContent: 'space-between'
    },
    tabBarItem: {
        // flex: 1,
        alignItems: 'center',
        backgroundColor: 'transparent',
        padding: 10,

    },
    animatedTab: {
        position: "absolute",
        // top: 0,
        backgroundColor: '#FFFFFF40',
        borderRadius: 100,
    }
});

export default styles