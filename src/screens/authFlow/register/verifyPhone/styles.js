import { StyleSheet } from "react-native";
import { width } from "react-native-dimension";
import { colors, fontSize, sizes } from "../../../../services";

export default StyleSheet.create({
    borderStyleBase: {
        width: 30,
        height: 45
    },

    borderStyleHighLighted: {
        borderColor: colors.appColor1,
    },

    underlineStyleBase: {
        width: width(12.5),
        height: width(12.5),
        borderWidth: 0.5,
        borderColor: colors.appBgColor3,
        borderRadius: sizes.inputRadius,
        color: colors.appTextColor1,
        fontSize: fontSize.medium
        //borderBottomWidth: 1,
    },

    underlineStyleHighLighted: {
        borderColor: "#03DAC6",
    },
});