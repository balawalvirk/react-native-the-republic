import { StyleSheet } from "react-native";
import { height } from "react-native-dimension";
import { sizes } from "../../../services";

export default StyleSheet.create({
    imageStyle: {
        borderRadius: sizes.cardRadius * 2,
        height: height(45),
        width: null,
    }
})