import { StyleSheet } from "react-native";
import { colors, sizes } from "../../../services";

export default StyleSheet.create({
    smallMarginHorizontal: {
        marginHorizontal: sizes.marginHorizontalSmall
    },
    productContainer: {
        borderWidth: 1,
        borderColor: colors.appBgColor3,
        borderRadius: sizes.cardRadius,
        marginHorizontal: sizes.marginHorizontalSmall
    },
    commentContainer: {
        backgroundColor: colors.appBgColor3,
        borderRadius: sizes.cardRadius,
        marginHorizontal: sizes.marginHorizontalSmall,
        paddingHorizontal: sizes.marginHorizontalSmall,
        paddingVertical: sizes.smallMargin
    }
})