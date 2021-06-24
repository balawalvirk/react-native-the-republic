import { StyleSheet } from "react-native";
import { colors, sizes } from "../../../services";

export default StyleSheet.create({
    commentContainer: {
        backgroundColor: colors.appBgColor3,
        borderRadius: sizes.cardRadius,
        marginHorizontal: sizes.marginHorizontalSmall,
        paddingHorizontal: sizes.marginHorizontalSmall,
        paddingVertical: sizes.smallMargin
    }
})