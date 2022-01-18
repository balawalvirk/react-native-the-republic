import { useFocusEffect } from '@react-navigation/native';
import React, { Component, useState, useEffect, useCallback } from 'react';
import { KeyboardAvoidingView, Linking, AppState } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Platform } from 'react-native';
import { Keyboard } from 'react-native';
import { View, Text, FlatList } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';
import { Icon } from 'react-native-elements';
import { MaterialIndicator } from 'react-native-indicators';
import { useSelector } from 'react-redux';
import { BorderedWrapper, ButtonBordered, ButtonColoredSmall, ButtonGradient, CardWrapper, ColoredWrapper, ComponentWrapper, IconWithText, LargeText, LargeTitle, LoaderAbsolute, MainWrapper, MediumText, MediumTitle, PickerPrimary, PickerSearchable, PopupPrimary, RegularText, RowWrapper, RowWrapperBasic, SkeletonListVerticalSecondary, SkeletonPrimary, SmallTitle, Spacer, TextInputUnderlined, TinyTitle, Toasts, Wrapper, XLTitle, XXLTitle } from '../../../components';
import { appDeeplinks, appStyles, Backend, colors, HelpingMethods, routes, sizes } from '../../../services';
import AddBankAccountPopup from './addBankAccountPopup';
import { RenderBankAccounts } from './renderBankAccounts';


export default function WithdrawEarnings({ navigation, route }) {

    const { navigate, goback } = navigation
    const refresh = route.params?.refresh


    //local states
    const [bankAccounts, setBankAccounts] = useState(null)
    const [banks, setBanks] = useState(null)
    const [availableForWithdrawlAmount, setAvailableForWithdrawlAmount] = useState(null)
    //const [stripeAccountDetail, setStripeAccountDetail] = useState(null)
    const [loadingAddBankAccount, setLoadingAddBankAccount] = useState(false)
    const [isAddBankAccountPopupVisible, setAddBankAccountPopupVisibility] = useState(false)
    const [isVerifyAccountPopupVisible, setVerifyAccountPopupVisibility] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loadingAccountLink, setLoadingAccountLink] = useState(false)

    //redux states
    const user = useSelector(state => state.user)
    const { reports, userDetail,stripeAccountDetail } = user
    //console.log('userDetail-->', userDetail)
    const { seller_stripe_account_id, email, first_name, last_name } = userDetail
    //console.log('seller_stripe_account_id-->', seller_stripe_account_id)



    const toggleAddBankAccountPopup = () => setAddBankAccountPopupVisibility(!isAddBankAccountPopupVisible)
    const toggleVerifyAccountPopup = () => setVerifyAccountPopupVisibility(!isVerifyAccountPopupVisible)

    useFocusEffect(
        useCallback(() => {
            getSetStripeAccountData()
            console.log('refresh: ', refresh)
        }, [userDetail, refresh])
    )

    // useEffect(() => {
    //     getSetStripeAccountData()
    //     console.log('refresh: ', refresh)

    // }, [userDetail, refresh])

    useEffect(() => {
        AppState.addEventListener('change', handleAppStates);
        return () => {
            // unsubscribe event
            AppState.removeEventListener('change', handleAppStates);
        };
    }, [])

    useEffect(() => {
        Backend.getSellerReports()
    }, [])

    const handleAppStates = state => {
        console.log('App State=======================>', state)
        if (state === 'active') {
            getSetStripeAccountData()
        } else if ((state === 'inactive' || state === 'background')) {
            // Backend.switchUserStatus('0')
        } else if (state === 'inactive') {
            // Backend.switchUserStatus()
        }
    }
    const getSetStripeAccountData = async () => {

        if (userDetail.seller_stripe_account_id) {
            await getAvailableWithdrawalAmount(userDetail.seller_stripe_account_id)
            await getStripeAccountExternalAccounts(userDetail.seller_stripe_account_id)
        }

    }
    const getStripeAccountExternalAccounts = async (stripe_account_id) => {
        await Backend.getStripeAccountDetail({ stripe_account_id }).
            then(res => {
                if (res) {
                    //setStripeAccountDetail(res)
                    if (res.external_accounts?.data) {
                        setBankAccounts(res.external_accounts.data)
                    } else {
                        setBankAccounts([])
                    }
                } else {
                    setBankAccounts([])
                }
            })
    }
    const getAvailableWithdrawalAmount = async (stripe_account_id) => {
        await Backend.getStripeAccontBalance({ stripe_account_id }).
            then(async res => {
                if (res) {
                    if (res.available) {
                        if (res.available[0]) {
                            console.log('available for withdrawal: ', res.available[0].amount)
                            setAvailableForWithdrawlAmount(res.available[0].amount)
                        } else {
                            setAvailableForWithdrawlAmount(0)
                        }
                    } else {
                        setAvailableForWithdrawlAmount(0)
                    }
                } else {
                    setAvailableForWithdrawlAmount(0)
                }
            })
    }
    const getSetAllBanks = async () => {
        await Backend.getBanks().
            then(res => {
                if (res?.success) {
                    if (res?.data?.length) {
                        let tempData = []
                        for (const item of res.data) {
                            const tempObj = {
                                ...item,
                                label: item.name,
                                value: item.name,

                            }
                            tempData.push(tempObj)
                        }
                        setBanks(tempData)
                    } else {
                        setBanks(res.data)
                    }
                }
            })
    }

    const addBankAccount = async (bankData) => {
        console.log('bank_data-->', bankData)
        if (bankData) {
            const { accountHolderName, accountNumber, routingNumber } = bankData
            setLoadingAddBankAccount(true)
            // add bank account to database
            // await Backend.addBankAccount({ bank_name: bank.label, account_no: accountNumber }).
            //     then(async res => {
            //         if (res) {
            //             await getSetStripeAccountData()
            //             toggleAddBankAccountPopup()
            //             setLoadingAddBankAccount(false)
            //             Toasts.success('Bank account added')
            //         } else {
            //             toggleAddBankAccountPopup()
            //             setLoadingAddBankAccount(false)
            //         }
            //     })

            await Backend.addBankAccountToStripeAccount({
                stripe_account_id: seller_stripe_account_id,
                account_number: accountNumber,
                account_holder_name: accountHolderName,
                routing_number: routingNumber
            }).
                then(async res => {
                    if (res) {
                        getSetStripeAccountData()
                    }
                })
            setLoadingAddBankAccount(false)
        }

    }

    const handleCreateStripeAccount = async (bankData) => {
        console.log('bank_data-->', bankData)
        if (bankData) {
            const { accountHolderName, accountNumber, routingNumber } = bankData
            toggleAddBankAccountPopup()
            setLoading(true)
            await Backend.createStripeAccount({
                email,
                account_holder_name: accountHolderName,
                account_number: accountNumber,
                routing_number: routingNumber
            }).
                then(async res => {
                    if (res) {
                        const new_stripe_account_id = res.id

                        console.log("stripe account id: ", new_stripe_account_id)
                        await Backend.update_profile({ seller_stripe_account_id: new_stripe_account_id })
                        handleGetStripeAccountLink(new_stripe_account_id)
                    }
                })
            setLoading(false)
        }
    }

    const handleGetStripeAccountLink = async (stripe_account_id) => {
        await Backend.getStripeAccountLink({
            stripe_account_id,
            refresh_url: `https://${appDeeplinks.withdrawEarnings}/1`,
            return_url: `https://${appDeeplinks.withdrawEarnings}/1`,
        }).then(res => {
            if (res) {
                const { url } = res
                if (url) {
                    Linking.canOpenURL(url).then(supported => {
                        if (supported) {
                            Linking.openURL(url);
                        } else {
                            console.log("Don't know how to open URI: " + url)
                        }
                    })
                }
            }
        })
    }
    return (
        <MainWrapper>

            <Wrapper flex={1}>
                <Spacer height={sizes.baseMargin * 1.5} />
                <ComponentWrapper style={[appStyles.center]}>
                    <MediumText> Available for Withdrawal </MediumText>
                    <Spacer height={sizes.baseMargin} />
                    {
                        !reports && availableForWithdrawlAmount === null ?
                            <SkeletonPrimary itemStyle={{ width: width(40), height: height(4) }} />
                            :
                            <XXLTitle style={appStyles.textPrimaryColor}>${(availableForWithdrawlAmount != null) ? availableForWithdrawlAmount : reports?.available_withdraw}</XXLTitle>
                    }
                </ComponentWrapper>
                <Spacer height={sizes.doubleBaseMargin} />
                {
                    !seller_stripe_account_id ?
                        <ColoredWrapper
                            // onPress={handleCreateStripeAccount}
                            onPress={toggleAddBankAccountPopup}
                            style={{ paddingVertical: sizes.marginVertical }}>
                            <IconWithText
                                iconName={'cc-stripe'}
                                iconSize={totalSize(5)}
                                tintColor={colors.appColor1}
                                iconType={'font-awesome-5'}
                                title={'Tap to create stripe express account'}
                                text={'You have to create stripe express account in order to transfer your earnings to your bank account.'}
                                direction={'column'}
                                textStyle={[appStyles.textSmall, appStyles.textGray, appStyles.textCenter]}
                                titleStyle={[appStyles.textCenter]}
                            />
                        </ColoredWrapper>
                        // <ButtonBordered
                        //     text="Add bank account"
                        //     buttonStyle={[{ height: height(10), borderStyle: 'dashed', marginVertical: sizes.marginVertical / 2 }]}
                        //     textStyle={[appStyles.h6, appStyles.fontBold]}
                        //     onPress={toggleAddBankAccountPopup}
                        // />
                        :
                        <Wrapper>
                            <RenderBankAccounts
                                data={bankAccounts}
                                // onPressItem={(item, index) => { Backend.transferToStripeAccount(seller_stripe_account_id, 50) }}
                                onPressItem={(item, index) => {
                                    stripeAccountDetail?.payouts_enabled ?
                                        availableForWithdrawlAmount > 0 ?
                                            navigate(routes.seller.withdraw, {
                                                bank: item,
                                                availableForWithdrawlAmount: availableForWithdrawlAmount,
                                                stripe_account_id: seller_stripe_account_id
                                            })
                                            :
                                            Toasts.error('You dont have any earnings to withdraw')
                                        :
                                        Toasts.error('Stripe account is not verified')
                                       // toggleVerifyAccountPopup()
                                }
                                }
                                onPressAdd={toggleAddBankAccountPopup}
                            />
                        </Wrapper>
                }
                {
                    stripeAccountDetail ?
                        !stripeAccountDetail.payouts_enabled ?
                            <Wrapper style={[appStyles.center, { paddingVertical: sizes.marginVertical }]}>
                                <IconWithText
                                    icon={
                                        loadingAccountLink ?
                                            <Wrapper>
                                                <MaterialIndicator
                                                    color={colors.error}
                                                    size={totalSize(2)}
                                                />
                                            </Wrapper>
                                            :
                                            null
                                    }
                                    iconName={'alert-circle'}
                                    tintColor={colors.error}
                                    text={'Verify your stripe account'}
                                    onPress={async () => {
                                        setLoadingAccountLink(true)
                                        await handleGetStripeAccountLink(seller_stripe_account_id)
                                        setLoadingAccountLink(false)
                                    }}
                                />
                            </Wrapper>
                            :
                            null
                        :
                        null
                }
            </Wrapper>
            {
                stripeAccountDetail?.payouts_enabled && reports?.available_withdraw ?
                    <Wrapper style={[appStyles.center]}>
                        <ButtonColoredSmall
                            text={`Transfer ${reports.available_withdraw} to seller stripe express account`}
                            onPress={async () => {
                                await Backend.transferToStripeAccount(seller_stripe_account_id, reports.available_withdraw).
                                    then(res => {
                                        if (res) {
                                            getSetStripeAccountData()
                                        }
                                    })
                            }}
                            buttonStyle={{ backgroundColor: colors.appBgColor4 }}
                        />
                        <Spacer height={sizes.baseMargin} />
                    </Wrapper>
                    :
                    null
            }
            <AddBankAccountPopup
                visible={isAddBankAccountPopupVisible}
                toggle={toggleAddBankAccountPopup}
                onPressDone={handleCreateStripeAccount}
                //onPressDone={addBankAccount}
                //onPressDone={()=>Toasts.error('asad')}
                isLoading={loadingAddBankAccount}
                banks={banks}
            />
            {/* <PopupPrimary
                visible={isVerifyAccountPopupVisible}
                toggle={toggleVerifyAccountPopup}
                onPressButton1={async () => {
                    setLoadingAccountLink(true)
                    await handleGetStripeAccountLink(seller_stripe_account_id)
                    setLoadingAccountLink(false)
                    toggleVerifyAccountPopup()
                }}
                onPressButton2={toggleVerifyAccountPopup}
                loadingButton1={loadingAccountLink}
                buttonText1={'Verify Now'}
                buttonText2={'Cancel'}
                title={'Verify your express stripe account'}
                info={'You will not be able to get payment and withdraw your earnings without verifing your express stripe account'}
                iconName={'alert'}
                iconType={'material-community'}
                iconContainerColor={colors.error}
                iconContainerSize={totalSize(8)}
            /> */}
            <LoaderAbsolute
                isVisible={loading}
                title={'Creating Stripe Account'}
                info={'Please wait...'}
            />
        </MainWrapper >
    );
}






