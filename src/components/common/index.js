import React from 'react'
import { Platform } from 'react-native'
import { height, totalSize } from 'react-native-dimension'
import { ModalSwipeablePrimary } from '..'
import { appStyles, colors, HelpingMethods, sizes } from '../../services'
import { ButtonColored, ButtonGradient } from '../buttons'
import { IconButton, IconWithText } from '../icons'
import { Spacer } from '../spacers'
import { MediumText, SmallTitle } from '../text'
import { TextInputUnderlined } from '../textInput'
import { ComponentWrapper, RowWrapper, Wrapper } from '../wrappers'
import EditProfileComp from './editProfileCom'
import VerificationCodeSentPopup from './verificationCodeSentPopup'

export const PopupPrimary = ({ visible, toggle, title, info, iconName, iconType, customIcon, buttonText1, buttonText2, onPressButton1, onPressButton2, topMargin, children }) => {
    return (
        <ModalSwipeablePrimary
            visible={visible}
            toggle={toggle}
            hideHeader
            topMargin={topMargin ? Platform.OS==='ios' ? topMargin : topMargin - height(5) : height(50)}
        >
            <Wrapper flex={1}>
                <Spacer height={sizes.baseMargin * 1.5} />
                {
                    iconName || customIcon ?
                        <>
                            <IconButton
                                iconName={iconName}
                                iconType={iconType}
                                customIcon={customIcon}
                                iconColor={colors.appTextColor6}
                                buttonColor={colors.success}
                                buttonSize={totalSize(6)}
                                iconSize={totalSize(4)}
                                buttonStyle={{ borderRadius: 100, alignSelf: 'center', }}
                            />
                            <Spacer height={sizes.baseMargin * 1.5} />
                        </>
                        :
                        null
                }
                {
                    title ?
                        <>
                            <ComponentWrapper>
                                <SmallTitle style={[appStyles.textCenter]}>{title}</SmallTitle>
                            </ComponentWrapper>
                            <Spacer height={sizes.baseMargin} />
                        </>
                        :
                        null
                }
                {
                    info ?
                        <>
                            <ComponentWrapper>
                                <MediumText style={[appStyles.textCenter]}>{info}</MediumText>
                            </ComponentWrapper>
                            <Spacer height={sizes.baseMargin} />
                        </>
                        :
                        null
                }
                {children}
                <Spacer height={sizes.baseMargin} />
                <RowWrapper>
                    {
                        onPressButton2 ?
                            <Wrapper flex={1}>
                                <ButtonColored
                                    text={buttonText2}
                                    onPress={onPressButton2}
                                    buttonColor={colors.appBgColor3}
                                    tintColor={colors.appTextColor1}
                                />
                            </Wrapper>
                            :
                            null
                    }
                    {
                        onPressButton1 ?
                            <Wrapper flex={1}>
                                <ButtonGradient
                                    text={buttonText1}
                                    onPress={onPressButton1}
                                    shadow
                                />
                            </Wrapper>
                            :
                            null
                    }
                </RowWrapper>
                <Spacer height={sizes.doubleBaseMargin} />
            </Wrapper>
        </ModalSwipeablePrimary>
    )
}

export const IconTextPrimary = ({ name, text }) => {
    return (
        <IconWithText
            iconName={name}
            text={text}
            iconSize={totalSize(2.5)}
            textStyle={[appStyles.textMedium]}
        />
    )
}

export const SwitchPrimary = ({ value, onPress }) => {
    return (
        <IconButton
            iconName={"circle"}
            iconType="font-awesome"
            activeOpacity={1}
            iconSize={totalSize(2.5)}
            //buttonSize={totalSize(3.5)}
            buttonStyle={{ width: totalSize(5), alignItems: value ? 'flex-end' : 'flex-start', paddingHorizontal: 2.5, paddingVertical: 0.25, height: null, borderWidth: 1, borderRadius: 100, borderColor: value ? colors.appColor1 : colors.appBgColor4 }}
            //gradient={darkMode}
            iconColor={value ? colors.appColor1 : colors.appBgColor4}
            buttonRadius={100}
            onPress={() => {
                HelpingMethods.handleAnimation()
                onPress ? onPress() : null
            }}
            buttonColor={colors.appBgColor1}
        />
    )
}

export {EditProfileComp,VerificationCodeSentPopup}