import React from 'react'
import { Wrapper, RowWrapper, ComponentWrapper, AbsoluteWrapper } from '../wrappers'
import { appStyles, sizes } from '../../services'
import { BackIcon } from '../icons'
import { TinyTitle, MediumText } from '../text'



export const HeaderPrimary = ({ onBackPress, title, right, left }) => {
    return (
        <Wrapper style={[appStyles.headerSecondaryStyle, { justifyContent: 'center', paddingTop: sizes.statusBarHeight }]}>
            <RowWrapper >
                <AbsoluteWrapper style={[appStyles.center, { right: 0, left: 0 }]}>
                    <MediumText style={[appStyles.headerTitleStyle]}>{title}</MediumText>
                </AbsoluteWrapper>
                {
                    left ? left :
                        onBackPress ?
                            <BackIcon
                                onPress={onBackPress}
                            />
                            :
                            null
                }
                {right?right:null}
            </RowWrapper>
        </Wrapper>
    )
}