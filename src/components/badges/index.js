import React from 'react'
import { totalSize } from 'react-native-dimension'
import { Wrapper } from '../wrappers'
import { appStyles, colors, sizes } from '../../services'
import { SmallText } from '../text'

export const BadgePrimary = ({ badgeStyle,value, textStyle, containerStyle }) => {
    //const value = 8998
    return (
        <Wrapper style={[{}, containerStyle]}>
            <Wrapper style={[{ borderRadius: 10, backgroundColor: colors.error, paddingHorizontal: totalSize(0.5), paddingVertical: totalSize(0.25) }, badgeStyle]}>
                <SmallText style={[value > 999 && appStyles.textTiny, appStyles.textWhite, textStyle]}>{value > 999 ? '999+' : value}</SmallText>
            </Wrapper>
        </Wrapper>
    )
}