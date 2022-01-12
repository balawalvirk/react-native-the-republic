import { useFocusEffect } from '@react-navigation/native';
import React, { Component, useState, useEffect, useCallback } from 'react';
import { KeyboardAvoidingView, Linking } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Platform } from 'react-native';
import { Keyboard } from 'react-native';
import { View, Text, FlatList } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';
import { Icon } from 'react-native-elements';
import { MaterialIndicator } from 'react-native-indicators';
import { useSelector } from 'react-redux';
import { BorderedWrapper, ButtonBordered, ButtonGradient, CardWrapper, ColoredWrapper, ComponentWrapper, IconWithText, LargeText, LargeTitle, LoaderAbsolute, MainWrapper, MediumText, MediumTitle, PickerPrimary, PickerSearchable, PopupPrimary, RegularText, RowWrapper, RowWrapperBasic, SkeletonListVerticalSecondary, SkeletonPrimary, SmallTitle, Spacer, TextInputUnderlined, TinyTitle, Toasts, Wrapper, XLTitle, XXLTitle } from '../../../components';
import { appDeeplinks, appStyles, Backend, colors, HelpingMethods, sizes } from '../../../services';
import AddBankAccountPopup from './addBankAccountPopup';
import { RenderBankAccounts } from './renderBankAccounts';


export default function WithdrawEarnings(props) {

    //local states
    const [bankAccounts, setBackAccounts] = useState(null)
    const [banks, setBanks] = useState(null)
    const [stripeAccountDetail, setStripeAccountDetail] = useState(null)
    const [loadingAddBankAccount, setLoadingAddBankAccount] = useState(false)
    const [isAddBankAccountPopupVisible, setAddBankAccountPopupVisibility] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loadingAccountLink, setLoadingAccountLink] = useState(false)

    //redux states
    const user = useSelector(state => state.user)
    const { reports, userDetail } = user
    //console.log('userDetail-->', userDetail)
    const { seller_stripe_account_id, email, first_name, last_name } = userDetail
    //console.log('seller_stripe_account_id-->', seller_stripe_account_id)



    const toggleAddBankAccountPopup = () => setAddBankAccountPopupVisibility(!isAddBankAccountPopupVisible)

    useFocusEffect(
        useCallback(() => {
            getSetStripeAccount()
        }, [userDetail])
    )

    useEffect(() => {
        Backend.getSellerReports()
    }, [])


    const getSetStripeAccount = async () => {
        // await Backend.getBankAccounts().
        //     then(res => {
        //         if (res) {
        //             setBackAccounts(res.data)
        //         }
        //     })
        if (seller_stripe_account_id) {
            await Backend.getStripeAccountDetail({ stripe_account_id: seller_stripe_account_id }).
                then(res => {
                    if (res) {
                        setStripeAccountDetail(res)
                        if (res.external_accounts?.data) {
                            setBackAccounts(res.external_accounts.data)
                        } else {
                            setBackAccounts([])
                        }
                    } else {
                        setBackAccounts([])
                    }
                })
        }

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
            //             await getSetStripeAccount()
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
                        getSetStripeAccount()
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
            refresh_url: appDeeplinks.app,
            return_url: appDeeplinks.app
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

            <Spacer height={sizes.baseMargin * 1.5} />
            <ComponentWrapper style={[appStyles.center]}>
                <MediumText> Available for Withdrawal </MediumText>
                <Spacer height={sizes.baseMargin} />
                {
                    !reports ?
                        <SkeletonPrimary itemStyle={{ width: width(40), height: height(4) }} />
                        :
                        <XXLTitle style={appStyles.textPrimaryColor}>${reports.available_withdraw}</XXLTitle>
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
                            onPressItem={(item, index) => { }}
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
            <AddBankAccountPopup
                visible={isAddBankAccountPopupVisible}
                toggle={toggleAddBankAccountPopup}
                onPressDone={handleCreateStripeAccount}
                //onPressDone={addBankAccount}
                //onPressDone={()=>Toasts.error('asad')}
                isLoading={loadingAddBankAccount}
                banks={banks}
            />
            <LoaderAbsolute
                isVisible={loading}
                title={'Creating Stripe Account'}
                info={'Please wait...'}
            />
        </MainWrapper >
    );
}






