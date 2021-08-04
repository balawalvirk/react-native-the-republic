import React from 'react'
import { TouchableOpacity } from "react-native"
import { totalSize } from 'react-native-dimension'
import { Icon } from 'react-native-elements'
import { appStyles, colors, sizes } from "../../../services"
import { LineHorizontal } from '../../lines'
import { MediumText } from '../../text'
import { RowWrapper, Wrapper } from "../../wrappers"

export const OptionsListPrimary=({options,onPressOption,titleStyle,containerStyle})=>{
    return(
        <Wrapper style={[{ marginHorizontal: sizes.marginHorizontal, borderRadius: sizes.cardRadius, borderWidth: 1, borderColor: colors.appBgColor3 },containerStyle]}>
                {
                    options.map((item, index) => {
                        return (
                            <TouchableOpacity activeOpacity={1} onPress={() => onPressOption(item,index)}>
                                <RowWrapper style={{ marginVertical: sizes.baseMargin, marginRight: sizes.marginHorizontalSmall }}>
                                    <Wrapper flex={1}>
                                        <MediumText style={[{ color: colors.appTextColor3 }, item === 'Logout' && { color: colors.error },titleStyle]}>{item}</MediumText>
                                    </Wrapper>
                                    <Wrapper style={{ backgroundColor: 'transparent', }}>
                                        <Icon
                                            name="chevron-right"
                                            type="feather"
                                            color={appStyles.textLightGray.color}
                                            size={totalSize(2.5)}
                                        />
                                    </Wrapper>
                                </RowWrapper>
                                {
                                    index != options.length - 1 ?
                                        <LineHorizontal/>
                                        :
                                        null
                                }
                            </TouchableOpacity>
                        )
                    })
                }
            </Wrapper>
    )
}