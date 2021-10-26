import { StyleSheet } from "react-native";
import { appStyles, colors, sizes } from "../../../services";

export default StyleSheet.create({
    grayWrapper: {
        marginHorizontal: sizes.marginHorizontal,
        paddingHorizontal: sizes.marginHorizontal / 1.25,
        paddingVertical: sizes.marginVertical / 1.5,
        backgroundColor: colors.appBgColor3,
        borderRadius: sizes.cardRadius,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    borderedWrapper: {
        marginHorizontal: sizes.marginHorizontal,
        paddingHorizontal: sizes.marginHorizontal / 1.25,
        paddingVertical: sizes.marginVertical / 1.5,
        borderWidth: 1,
        borderColor: colors.appBgColor3,
        borderRadius: sizes.cardRadius,
    }
})