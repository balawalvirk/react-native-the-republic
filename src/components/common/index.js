import React from 'react'
import { Platform, TouchableOpacity } from 'react-native'
import { height, totalSize, width } from 'react-native-dimension'
import { ModalSwipeablePrimary } from '..'
import { appIcons, appImages, appStyles, colors, HelpingMethods, sizes } from '../../services'
import { ButtonColored, ButtonColoredSmall, ButtonGradient } from '../buttons'
import { CustomIcon, IconButton, IconWithText } from '../icons'
import { Spacer } from '../spacers'
import { LargeTitle, MediumText, MediumTitle, RegularText, SmallTitle, TinyTitle } from '../text'
import { TextInputUnderlined } from '../textInput'
import { ComponentWrapper, RowWrapper, Wrapper, RowWrapperBasic } from '../wrappers'
import EditProfileComp from './editProfileCom'
import VerificationCodeSentPopup from './verificationCodeSentPopup'
import ImagePickerPopup from './imagePickerPopup'
import Posts from './posts'
import MenuPopup from './menuPopup'
import RenderComments from './renderComments'
import { Products, ProductsSecondary, ProductsHorizontalyPrimary } from './productsLists'
import ArmerInfo from './armerInfo'
import Reviews from './reviews'
import { LineHorizontal } from '..'
import { Dealers, Groups } from './usersLists'
import { ImageProfile, ImageRound } from '../images'
import { ImageBackground } from 'react-native'

export const PopupPrimary = ({ visible, toggle, title, info, iconName, iconType, customIcon, buttonText1, buttonText2, onPressButton1, onPressButton2, topMargin, children }) => {
    return (
        <ModalSwipeablePrimary
            visible={visible}
            toggle={toggle}
            hideHeader
            topMargin={topMargin ? Platform.OS === 'ios' ? topMargin : topMargin - height(5) : height(50)}
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
            //buttonColor={colors.appBgColor1}
            buttonStyle={{ width: totalSize(5), alignItems: value ? 'flex-end' : 'flex-start', height: null, borderRadius: 100, backgroundColor: value ? colors.appColor1 + '40' : colors.appBgColor4, paddingHorizontal: 2.5, paddingVertical: 0.25, }}
            //gradient={darkMode}
            iconColor={value ? colors.appColor1 : colors.appBgColor1}
            buttonRadius={100}
            onPress={() => {
                HelpingMethods.handleAnimation()
                onPress ? onPress() : null
            }}

        />
    )
}

export const LocationPickerButton = ({ text, onPress }) => {
    return (
        <TouchableOpacity disabled={!onPress} onPress={onPress} activeOpacity={1}>
            <RowWrapperBasic style={{ padding: sizes.smallMargin, backgroundColor: colors.appBgColor3, borderRadius: 100 }}>
                <IconWithText
                    customIcon={appIcons.map_pin_outline}
                    text={text.slice(0, 12) + '..'}
                    tintColor={colors.appTextColor1}
                    iconSize={totalSize(2)}
                    textStyle={[appStyles.textRegular]}
                />
                <Spacer width={sizes.marginHorizontalSmall} />
                <CustomIcon
                    icon={appIcons.drop_down}
                    size={totalSize(1)}
                />
            </RowWrapperBasic>
        </TouchableOpacity>
    )
}
export const MenuOption = ({ title, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Spacer height={sizes.marginVertical} />
            <ComponentWrapper>
                <MediumText>{title}</MediumText>
            </ComponentWrapper>
            <Spacer height={sizes.marginVertical} />
            <LineHorizontal
            />
        </TouchableOpacity>
    )
}

export const RenderTags = ({ tags }) => {
    return (
        <RowWrapperBasic>
            {
                tags.map((item, index) => {
                    return (
                        <ButtonColoredSmall
                            text={item}
                            buttonStyle={{ backgroundColor: colors.appBgColor3, paddingHorizontal: sizes.TinyMargin, marginRight: sizes.marginHorizontalSmall, paddingVertical: sizes.TinyMargin }}
                            textStyle={[appStyles.textSmall, appStyles.textDarkGray]}
                        />
                    )
                })
            }
        </RowWrapperBasic>
    )
}

export const RenderKeyPoints = ({ keyPoints }) => {
    return (
        <ComponentWrapper>
            {
                keyPoints.map((item, index) => {
                    return (
                        <>
                            <RegularText>
                                <RegularText style={[appStyles.fontBold]}>{item.title}</RegularText>
                                <RegularText>{item.description}</RegularText>
                            </RegularText>
                            <Spacer height={sizes.baseMargin} />
                        </>
                    )
                })
            }
        </ComponentWrapper>
    )
}

export const TitlePrimary = ({ title, onPressRight, rightText }) => {
    return (
        <RowWrapper>
            <SmallTitle style={{ ...appStyles.fontBold }}>{title}</SmallTitle>
            {
                onPressRight ?
                    <RegularText
                        style={[appStyles.textPrimaryColor, appStyles.fontBold]}
                        onPress={onPressRight}
                    >
                        {rightText ? rightText : 'View All'}
                    </RegularText>
                    :
                    null
            }
        </RowWrapper>
    )
}
export const FilterButton = ({ onPress }) => {
    return (
        <ComponentWrapper>
            <ButtonColoredSmall
                onPress={onPress}
                text="Sort & Filters"
                iconName="options"
                iconType="ionicon"
                textStyle={[appStyles.textRegular, appStyles.textWhite]}
                buttonStyle={{ borderRadius: 100, paddingHorizontal: sizes.marginHorizontalSmall }}
            />
        </ComponentWrapper>
    )
}
export const ViewAllListButton = ({ onPress }) => {
    return (
        <ComponentWrapper>
            <Spacer height={sizes.smallMargin} />
            <ButtonColoredSmall
                onPress={onPress}
                text="View All"
                textStyle={[appStyles.textRegular]}
                buttonStyle={[appStyles.center, { paddingVertical: sizes.marginVertical / 2, backgroundColor: colors.appBgColor3, borderRadius: 100 }]}
            />
            <Spacer height={sizes.smallMargin} />
        </ComponentWrapper>
    )
}
export const ProfileTop = ({ imageUri, title, subTitle, onPress, content }) => {
    return (
        <Wrapper>
            <ImageBackground
                source={appImages.bg_main}
                style={{ height: null, width: null }}
            >
                <Spacer height={sizes.baseMargin * 2} />
                <RowWrapper>
                    <Wrapper>
                        <ImageProfile
                            source={{ uri: imageUri }}
                            imageStyle={{ height: width(30), width: width(30), borderWidth: 5, borderColor: colors.appBgColor1 }}
                            shadow
                        />
                    </Wrapper>
                    <Spacer width={sizes.marginHorizontal} />
                    <Wrapper flex={1}>
                        <SmallTitle numberOfLines={1}>{title}</SmallTitle>
                        <Spacer height={sizes.baseMargin} />
                        <RegularText style={[appStyles.textGray]}>{subTitle}</RegularText>
                        {content}
                    </Wrapper>
                </RowWrapper>
                <Spacer height={sizes.baseMargin * 2} />
            </ImageBackground>
        </Wrapper>
    )
}

export const ShareSomethingButton = ({onPress, imageUri ,title}) => {
    const defaultVerticalSpacer=sizes.marginVertical/1.5
    return (
        <TouchableOpacity activeOpacity={1} onPress={onPress} style={{ marginHorizontal: sizes.marginHorizontalSmall, borderWidth: 1, borderColor: colors.appBgColor4, borderRadius: sizes.baseRadius, paddingVertical: defaultVerticalSpacer, paddingHorizontal: sizes.marginHorizontalSmall }}>
            <RowWrapperBasic>
                <ImageRound
                    source={{ uri: imageUri }}
                    size={totalSize(5)}
                />
                <Spacer width={sizes.marginHorizontal} />
                <Wrapper flex={1}>
                    <MediumText style={[appStyles.textGray]}>{title ? title : 'Share something with your friends'}</MediumText>
                </Wrapper>
            </RowWrapperBasic>
            <Spacer height={defaultVerticalSpacer} />
            <LineHorizontal color={colors.appBgColor4} height={1}/>
            <Spacer height={defaultVerticalSpacer} />
            <RowWrapperBasic style={[{ justifyContent: 'space-evenly', }]}>
                <IconWithText
                    text="Photos"
                    iconName="image"
                    iconType="feather"
                    //iconSize={totalSize(2.75)}
                    tintColor={colors.appTextColor4}
                    textStyle={[appStyles.textRegular, appStyles.textGray]}

                />
                <IconWithText
                    text="Videos"
                    iconName="video"
                    iconType="feather"
                    //iconSize={totalSize(2.75)}
                    tintColor={colors.appTextColor4}
                    textStyle={[appStyles.textRegular, appStyles.textGray]}
                />
            </RowWrapperBasic>
        </TouchableOpacity>
    )
}

export {
    EditProfileComp, VerificationCodeSentPopup, ImagePickerPopup,
    Posts, MenuPopup, RenderComments, Products, ArmerInfo,
    Reviews, ProductsSecondary, ProductsHorizontalyPrimary, Dealers, Groups
}