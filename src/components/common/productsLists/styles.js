import { StyleSheet } from "react-native";
import { width } from "react-native-dimension";
import { sizes } from "../../../services";

export default StyleSheet.create({
    productContainerGrid: { flex: 1, marginBottom: sizes.marginVertical },
    productContainerList: { marginBottom: sizes.marginVertical },
    ProductHorizontalyPrimaryContainer: {
        marginBottom: sizes.marginVertical,
        width: width(41)
    }
})