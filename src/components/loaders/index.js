import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Icon } from 'react-native-elements';
import { height, totalSize, width } from 'react-native-dimension';
import { colors, appStyles, sizes } from '../../services';
import { AbsoluteWrapper, Wrapper, MainWrapper,ComponentWrapper } from '../wrappers';
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
} from 'react-native-indicators';
import { RegularText ,TinyTitle} from '../text';
import { Spacer } from '../spacers';


export const LoaderPrimary = ({}) => {
    return (
       <MainWrapper>
            <Wrapper flex={1} style={[{ justifyContent: 'center', backgroundColor: 'transparent' }]}>
            <Wrapper style={[appStyles.center, { backgroundColor: 'transparent' }]}>
                <WaveIndicator color={colors.appColor1} size={sizes.icons.xxl} />
                <Spacer height={sizes.baseMargin} />
                <RegularText style={[appStyles.textLightGray]}>Loading</RegularText>
            </Wrapper>
        </Wrapper>
       </MainWrapper>
    );
}


export const LoaderAbsolute = ({ isVisible, title, info }) => {
    return (
        <>
            {
                isVisible ?
                    <AbsoluteWrapper animation="fadeIn" style={[{ justifyContent: 'center', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: colors.appBgColor1 + 'E6' }]}>
                        <Wrapper style={[appStyles.center, { backgroundColor: 'transparent' }]}>
                            <BallIndicator color={colors.appColor1} size={totalSize(7)} />
                            <Spacer height={sizes.doubleBaseMargin * 1.5} />
                            <TinyTitle >{title ? title : 'Loading'}</TinyTitle>
                            {
                                info ?
                                    <ComponentWrapper>
                                        <Spacer height={sizes.baseMargin} />
                                        <RegularText style={[appStyles.textCenter]}>{info}</RegularText>
                                    </ComponentWrapper>
                                    :
                                    null
                            }
                        </Wrapper>
                    </AbsoluteWrapper>
                    :
                    null
            }
        </>
    );
}