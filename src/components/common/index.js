import React, { useState,useEffect } from 'react'
import { Platform, TouchableOpacity, ImageBackground, Keyboard } from 'react-native'
import { height, totalSize, width } from 'react-native-dimension'
import { ModalSwipeablePrimary, SkeletonPrimary } from '..'
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
import { Posts, PostCard } from './postslists'
import MenuPopup from './menuPopup'
import RenderComments from './renderComments'
import { Products, ProductsSecondary, ProductsHorizontalyPrimary } from './productsLists'
import ArmerInfo from './armerInfo'
import Reviews from './reviews'
import { LineHorizontal } from '..'
import { Dealers, Groups, FollowRequestsList } from './usersLists'
import AddPaymentMethodModal from './addPaymentMethodModal'
import { ImageProfile, ImageRound } from '../images'
import { KeyboardAvoidingScrollView } from '../scrollViews'
import { ScrollView } from 'react-native'
import { StyleSheet } from 'react-native'
import { LineVertical } from '../lines'
import GoogleAutoComplete from './googleAutoComplete'
import { useSelector } from 'react-redux'

export const PopupPrimary = ({ visible, toggle, title, info, iconName, iconColor, iconContainerColor, iconContainerSize, iconSize, disableSwipe, disableBackDropPress, iconType, customIcon, buttonText1, buttonText2, onPressButton1, onPressButton2, loadingButton1, loadinButton2, topMargin, children, scrollEnabled, button1Style, keyboardShouldPersistTaps }) => {


    // manage keyboard
    const [keyboardVisible, setKeyboardVisible] = useState(false)
    let keyboardDidShowListener
    let keyboardDidHideListener
    
    useEffect(() => {
        keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => { HelpingMethods.handleAnimation(); setKeyboardVisible(true) });
        keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => { HelpingMethods.handleAnimation(); setKeyboardVisible(false) });
    })

    const defaultTopMargin = Platform.OS === 'ios' ? height(55) : height(45)
    const customTopMargin = keyboardVisible ? height(10) : topMargin ? Platform.OS === 'ios' ? topMargin : topMargin - height(10) : defaultTopMargin


    return (
        <ModalSwipeablePrimary
            visible={visible}
            toggle={toggle}
            hideHeader
            topMargin={customTopMargin}
            disableSwipe={disableSwipe}
            disableBackDropPress={disableBackDropPress}

        >
            <Wrapper flex={1}>
                <KeyboardAvoidingScrollView
                   // keyboardShouldPersistTaps={keyboardShouldPersistTaps}
                    //showsVerticalScrollIndicator={false}
                    scrollEnabled={scrollEnabled}
                    >
                    <Spacer height={sizes.baseMargin * 1.5} />
                    {
                        iconName || customIcon ?
                            <>
                                <IconButton
                                    iconName={iconName}
                                    iconType={iconType}
                                    customIcon={customIcon}
                                    iconColor={iconColor ? iconColor : colors.appTextColor6}
                                    buttonColor={iconContainerColor ? iconContainerColor : colors.success}
                                    buttonSize={iconContainerSize ? iconContainerSize : totalSize(6)}
                                    iconSize={iconSize ? iconSize : totalSize(4)}
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
                                <ComponentWrapper style={{ marginHorizontal: sizes.marginHorizontalXLarge }}>
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
                                        buttonStyle={{ marginHorizontal: 0 }}
                                        isLoading={loadinButton2}
                                    />
                                </Wrapper>
                                :
                                null
                        }
                        {
                            onPressButton2 && onPressButton1 ?
                                <Spacer width={sizes.marginHorizontal} />
                                : null
                        }
                        {
                            onPressButton1 ?
                                button1Style ?
                                    <Wrapper flex={1}>
                                        <ButtonColored
                                            text={buttonText1}
                                            onPress={onPressButton1}
                                            shadow
                                            buttonStyle={[{ marginHorizontal: 0 }, button1Style]}
                                            isLoading={loadingButton1}
                                        />
                                    </Wrapper>
                                    :
                                    <Wrapper flex={1}>
                                        <ButtonGradient
                                            text={buttonText1}
                                            onPress={onPressButton1}
                                            shadow
                                            buttonStyle={[{ marginHorizontal: 0 }]}
                                            loading={loadingButton1}
                                        />
                                    </Wrapper>
                                :
                                null
                        }
                    </RowWrapper>
                    <Spacer height={sizes.doubleBaseMargin} />
                </KeyboardAvoidingScrollView>
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
            buttonStyle={{ width: totalSize(5), alignItems: value ? 'flex-end' : 'flex-start', height: null, borderRadius: 100, backgroundColor: value ? colors.appColor1 + '40' : colors.appBgColor3, paddingHorizontal: 2.5, paddingVertical: 0.25, }}
            //gradient={darkMode}
            iconColor={value ? colors.appColor1 : colors.appBgColor4}
            buttonRadius={100}
            onPress={() => {
                HelpingMethods.handleAnimation()
                onPress ? onPress() : null
            }}

        />
    )
}

export const LocationPickerButton = ({ text, onPress }) => {
    const user = useSelector(state => state.user)
    const { userDetail } = user
    const userAddress = text ? text : userDetail.address ? userDetail.address : 'Current Location'
    return (
        <TouchableOpacity disabled={!onPress} onPress={onPress} activeOpacity={1}>
            <RowWrapperBasic style={{ padding: sizes.smallMargin, backgroundColor: colors.appBgColor3, borderRadius: 100 }}>
                <IconWithText
                    customIcon={appIcons.map_pin_outline}
                    text={userAddress.slice(0, 12) + '..'}
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

export const RenderTags = ({ tags, value, ContainerStyle, tagStyle, TextStyle, onPress, onPressCross }) => {
    return (
        <RowWrapperBasic style={[ContainerStyle]}>
            {
                tags.map((item, index) => {
                    return (
                        <ButtonColoredSmall
                            onPress={() => {
                                onPress && onPress(item, index)
                                onPressCross && onPressCross(item, index)
                            }}
                            disabled={!onPress && !onPressCross}
                            text={value ? item[value] : item}
                            buttonStyle={[{ backgroundColor: colors.appBgColor3, paddingHorizontal: sizes.TinyMargin, marginRight: sizes.marginHorizontalSmall, paddingVertical: sizes.TinyMargin }, tagStyle]}
                            textStyle={[appStyles.textSmall, appStyles.textDarkGray, TextStyle]}
                            iconName={onPressCross && 'close-circle'}
                            iconSize={totalSize(2.5)}
                            iconColor={colors.error}
                            direction={'row-reverse'}
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
export const FilterButton = ({ onPress, buttonStyle }) => {
    return (
        <ButtonColoredSmall
            onPress={onPress}
            text="Sort & Filters"
            iconName="options"
            iconType="ionicon"
            customIcon={appIcons.filter}
            textStyle={[appStyles.textRegular, appStyles.textWhite]}
            buttonStyle={[{ borderRadius: 100, paddingHorizontal: sizes.marginHorizontalSmall, marginHorizontal: sizes.marginHorizontal }, buttonStyle]}
        />
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
                        {
                            subTitle ?
                                <>
                                    <Spacer height={sizes.smallMargin} />
                                    <RegularText style={[appStyles.textGray]}>{subTitle}</RegularText>
                                </> : null
                        }

                        {content}
                    </Wrapper>
                </RowWrapper>
                <Spacer height={sizes.baseMargin * 2} />
            </ImageBackground>
        </Wrapper>
    )
}

export const ShareSomethingButton = ({ onPress, imageUri, title }) => {
    const defaultVerticalSpacer = sizes.marginVertical / 1.5
    return (
        <TouchableOpacity activeOpacity={1} onPress={onPress} style={{ marginHorizontal: sizes.marginHorizontalSmall, borderWidth: 1, borderColor: colors.appBgColor3, borderRadius: sizes.baseRadius, paddingVertical: defaultVerticalSpacer, paddingHorizontal: sizes.marginHorizontalSmall }}>
            <RowWrapperBasic>
                <ImageRound
                    source={{ uri: imageUri ? imageUri : appImages.noUser }}
                    size={totalSize(5)}
                />
                <Spacer width={sizes.marginHorizontal} />
                <Wrapper flex={1}>
                    <MediumText style={[appStyles.textGray]}>{title ? title : 'Share something with your friends'}</MediumText>
                </Wrapper>
            </RowWrapperBasic>
            <Spacer height={defaultVerticalSpacer} />
            <LineHorizontal color={colors.appBgColor3} height={1} />
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

export const TitleValue = ({ title, value, titleStyle, valueStyle, containerStyle, direction }) => {
    return (
        <RowWrapper style={[{}, containerStyle]}>
            <MediumText style={titleStyle}>{title}</MediumText>
            <MediumText style={[appStyles.textPrimaryColor, appStyles.fontBold, valueStyle]}>{value}</MediumText>
        </RowWrapper>
    )
}
export const DashboardSeller = ({
    title1, title2, title3, title4,
    value1, value2, value3, value4,
    isLoading
}) => {
    const TitleValue = ({ title, value, containerStyle }) => {
        return (
            <Wrapper flex={1} style={[{ alignItems: 'center', justifyContent: 'space-evenly' }, containerStyle]}>
                <MediumTitle style={[appStyles.textWhite]}>{value}</MediumTitle>
                <RegularText style={[appStyles.textWhite]}>{title}</RegularText>
            </Wrapper>
        )
    }

    return (
        <>
            {
                isLoading ?
                    <SkeletonPrimary itemStyle={{ height: height(22.5) }} />
                    :
                    <Wrapper style={{ ...appStyles.grayWrapper, paddingVertical: 0, paddingHorizontal: 0, height: height(22.5), backgroundColor: colors.appColor1 }}>
                        <Wrapper flex={1} >
                            <Wrapper flex={1} style={{ flexDirection: 'row', }}>
                                <TitleValue
                                    title={title1}
                                    value={value1}
                                />
                                <LineVertical
                                    width={4}
                                    color={colors.appBgColor1}
                                />
                                <TitleValue
                                    title={title2}
                                    value={value2}
                                />
                            </Wrapper>
                        </Wrapper>
                        <LineHorizontal
                            height={4}
                            color={colors.appBgColor1}
                        />
                        <Wrapper flex={1} >
                            <Wrapper flex={1} style={{ flexDirection: 'row', }}>
                                <TitleValue
                                    title={title3}
                                    value={value3}
                                />
                                <LineVertical
                                    width={4}
                                    color={colors.appBgColor1}
                                />
                                <TitleValue
                                    title={title4}
                                    value={value4}
                                />
                            </Wrapper>
                        </Wrapper>
                    </Wrapper>

            }
        </>
    )
}
export const OrderStatusWizard = ({ activeStep, steps }) => {
    // const steps = ['Order\nrecieved', 'Order\naccepted', 'Delivery\non the way', 'Delivered\nto customer']


    return (
        <Wrapper>
            <RowWrapperBasic style={{ justifyContent: 'center', }}>
                {
                    steps.map((item, index) => {
                        const wizardStep = index + 1
                        return (
                            <RowWrapperBasic style={{ alignItems: 'flex-start', }}>
                                {
                                    index != 0 ?
                                        <LineHorizontal
                                            height={2}
                                            width={width(12)}
                                            color={wizardStep <= activeStep ? colors.success : colors.appBgColor4}
                                            style={{ marginTop: totalSize(1.5), marginHorizontal: sizes.marginHorizontalSmall }}
                                        />
                                        :
                                        null
                                }
                                <IconWithText
                                    iconName="check-circle"
                                    iconType="feather"
                                    iconSize={totalSize(3)}
                                    tintColor={wizardStep <= activeStep ? colors.success : colors.appBgColor4}
                                    text={item}
                                    direction="column"
                                    textStyle={[appStyles.textRegular, appStyles.textCenter]}
                                    textContainerStyle={{ position: 'absolute', width: width(20), top: totalSize(3) }}
                                />

                            </RowWrapperBasic>
                        )
                    })
                }
            </RowWrapperBasic>
            <Spacer height={sizes.doubleBaseMargin} />
        </Wrapper>
    )
}

export const OptionsPopup = ({ options, visible, toggle, onPressStatus, titleStyle }) => {

    return (
        <PopupPrimary
            visible={visible}
            toggle={toggle}
            topMargin={height(70)}
        >
            <Wrapper>
                <LineHorizontal />
                {
                    options.map((item, index) => {
                        return (
                            <TouchableOpacity activeOpacity={1} onPress={() => onPressStatus(item, index)}>
                                <Spacer height={sizes.marginVertical} />
                                <ComponentWrapper>
                                    <MediumText style={[{ color: item === 'Cancel Order' ? colors.error : item === 'Completed' ? colors.success : colors.appTextColor2 }, titleStyle]}>{item}</MediumText>
                                    {/* <MediumText style={[{}, () => titleStyle(item, index)]}>{item}</MediumText> */}
                                </ComponentWrapper>
                                <Spacer height={sizes.marginVertical} />
                                <LineHorizontal />
                            </TouchableOpacity>
                        )
                    })
                }
            </Wrapper>
        </PopupPrimary>
    )
}
export const NoDataViewPrimary = ({ title, showIcon, iconName, iconType, }) => {
    return (
        <Wrapper flex={1} style={[appStyles.center]}>
            {
                showIcon ?
                    <>
                        <IconButton
                            iconName={iconName ? iconName : 'playlist-remove'}
                            iconType={iconType ? iconType : "material-community"}
                            iconSize={totalSize(12.5)}
                            buttonSize={totalSize(20)}
                            iconColor={colors.appTextColor4}
                            buttonColor={colors.appBgColor3}
                        />
                        <Spacer height={sizes.baseMargin} />
                    </>
                    :
                    null

            }
            <MediumText style={[appStyles.textGray]}>No {title ? title : 'Data'} Found</MediumText>
        </Wrapper >
    )
}
export const AddDataViewPrimary = ({ title, iconName, iconType, onPress }) => {
    return (
        <Wrapper flex={1} style={[appStyles.center]}>

            <TouchableOpacity activeOpacity={1} onPress={onPress} style={[appStyles.center]}>
                <IconButton
                    iconName={iconName ? iconName : 'add'}
                    iconType={iconType ? iconType : "material"}
                    iconSize={totalSize(12.5)}
                    buttonSize={totalSize(20)}
                    iconColor={colors.appTextColor1}
                    buttonColor={colors.appBgColor3}
                />
                <Spacer height={sizes.baseMargin} />
                <MediumText>{'Add ' + title}</MediumText>
            </TouchableOpacity>
        </Wrapper>
    )
}

export {
    EditProfileComp, VerificationCodeSentPopup, ImagePickerPopup,
    Posts, PostCard, MenuPopup, RenderComments, Products, ArmerInfo,
    Reviews, ProductsSecondary, ProductsHorizontalyPrimary, Dealers, Groups,
    AddPaymentMethodModal, FollowRequestsList, GoogleAutoComplete,

}

export * from './imagesList'
export * from './optionsLists'