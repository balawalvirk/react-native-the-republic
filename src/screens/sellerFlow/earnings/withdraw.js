import React, { useState } from 'react'
import { height, totalSize } from 'react-native-dimension'
import { BorderedWrapper, ButtonColored, ColoredWrapper, ComponentWrapper, KeyboardAvoidingScrollView, MainWrapper, PopupPrimary, RegularText, SmallTitle, Spacer, TextInputUnderlined, TinyTitle, Wrapper, XXLTitle } from '../../../components'
import { appIcons, appStyles, Backend, colors, HelpingMethods, sizes } from '../../../services'
import { BankAccountCard } from './renderBankAccounts'

const payoutMethods = {
    standard: 'standard',
    instant: 'instant'
}
export default function Withdraw({ navigation, route }) {
    const { goBack } = navigation
    const { bank, availableForWithdrawlAmount, stripe_account_id } = route.params
    const { available_payout_methods } = bank
    //local states
    const [withdrawalAmount, setWithdrawalAmount] = useState('')
    const [withdrawalAmountError, setWithdrawalAmountError] = useState('')
    const [loadingWithdraw, setLoadingWithdraw] = useState(false)
    const [isWithdrawalCompletedPopupVisible, setWithdrawalCompletedPopupVisibility] = useState(false)

    const toggleWithdrawalCompletedPopup = () => setWithdrawalCompletedPopupVisibility(!isWithdrawalCompletedPopupVisible)

    const checkInstantPayoutMethod = () => {
        let response = false
        const instantMethod = available_payout_methods.find(item => item === payoutMethods.instant)
        if (instantMethod) {
            response = true
        }
        return response
    }

    const hasInstantPayoutMethod = checkInstantPayoutMethod()

    const withdrawValidations = () => {
        // if(!withdrawalAmount){
        //     setWithdrawalAmountError('Please enter withdrawal amount')
        // }else if(Number(withdrawalAmount) > Number(availableForWithdrawlAmount){
        //     setWithdrawalAmountError(`Amount exeeding the available withdrawal amount $${availableForWithdrawlAmount}`) 
        // }else{
        //     setWithdrawalAmountError('')
        // }
        HelpingMethods.handleAnimation()
        !withdrawalAmount ?
            setWithdrawalAmountError('Please enter withdrawal amount') :
            (Number(withdrawalAmount) > Number(availableForWithdrawlAmount)) ?
                setWithdrawalAmountError(`Amount exeeding the available withdrawal amount $${availableForWithdrawlAmount}`) :
                setWithdrawalAmountError('')
        if (withdrawalAmount && !(Number(withdrawalAmount) > Number(availableForWithdrawlAmount))) {
            return true
        } else {
            return false
        }
    }
    const handleWithdraw = async () => {
        if (withdrawValidations()) {
            setLoadingWithdraw(true)
            await Backend.stripePayout({
                stripe_account_id,
                amount: withdrawalAmount,
                method: hasInstantPayoutMethod ? payoutMethods.instant : payoutMethods.standard
            }).then(async res => {
                if (res) {
                    await Backend.withdrawAmount({ amount: withdrawalAmount, transfer_type: 'bank_account' }).
                        then(async res => {
                            if (res) {
                                await Backend.getSellerReports()
                            }
                        })

                    toggleWithdrawalCompletedPopup()
                }
            })
            setLoadingWithdraw(false)
        }

    }
    return (
        <MainWrapper>
            <KeyboardAvoidingScrollView>
                <Wrapper flex={1}>
                    <Spacer height={sizes.baseMargin} />
                    {/* <ComponentWrapper>
                <TinyTitle>Selected Bank Account</TinyTitle>
            </ComponentWrapper> */}
                    <BankAccountCard
                        bankName={bank.bank_name}
                        bankAccountLastDigits={bank.last4}
                        //onPress={() => onPressItem(item, index)}
                        right={<></>}
                    />
                    {/* <Spacer height={sizes.doubleBaseMargin} />
                <ComponentWrapper style={[appStyles.center]}>
                    <XXLTitle style={[{ fontSize: totalSize(7) }, appStyles.textPrimaryColor]}>${availableForWithdrawlAmount}</XXLTitle>
                    <Spacer height={sizes.smallMargin} />
                    <RegularText style={[appStyles.textCenter, appStyles.fontBold]}>Total Withdrawal Amount</RegularText>
                </ComponentWrapper> */}
                    <Spacer height={sizes.doubleBaseMargin} />
                    {/* <TextInputUnderlined
                    title={'Withdrawal amount'}
                    value={`$${withdrawalAmount}`}
                    onChangeText={text => {
                        if (Number(text))
                            setWithdrawalAmount(text.replace('$', ''))
                    }}
                    keyboardType={'number-pad'}
                /> */}
                    <TextInputUnderlined
                        value={withdrawalAmount ? `$${withdrawalAmount}` : ''}
                        onChangeText={text => {
                            const temp_amount = text.replace('$', '')
                            // console.log('availableForWithdrawlAmount: ', availableForWithdrawlAmount)
                            // console.log('withdrawal amount: ', temp_amount)
                            if (Number(temp_amount) > Number(availableForWithdrawlAmount)) {
                                HelpingMethods.handleAnimation()
                                setWithdrawalAmountError(`Amount exeeding the available withdrawal amount $${availableForWithdrawlAmount}`)
                            } else {
                                withdrawalAmountError&&
                                [HelpingMethods.handleAnimation(),setWithdrawalAmountError('')]
                            }
                            setWithdrawalAmount(temp_amount)
                        }}
                        placeholder="Withdrawal Amount"
                        inputStyle={[{ textAlign: 'center' }, appStyles.h3, appStyles.textPrimaryColor]}
                        error={withdrawalAmountError}
                        keyboardType={'number-pad'}
                    />
                </Wrapper>
                <Spacer height={height(30)} />
                <Wrapper>
                    {
                        !hasInstantPayoutMethod ?
                            <>
                                <Spacer height={sizes.baseMargin} />
                                <BorderedWrapper style={{}}>
                                    <RegularText style={[appStyles.textGray, { lineHeight: totalSize(2) }]}>
                                        <RegularText style={[appStyles.textGray, appStyles.fontBold,]}>NOTE:</RegularText>
                                        {' '}
                                        Your bank account does not has instant payout method, so after withdraw it will take 2-3 business days to be transfered into your bank account
                                    </RegularText>
                                </BorderedWrapper>
                            </>
                            :
                            null
                    }
                    <Spacer height={sizes.baseMargin} />
                    <ButtonColored
                        text={`Withdraw ${withdrawalAmount ? `$${withdrawalAmount}` : ''}`}
                        onPress={handleWithdraw}
                        isLoading={loadingWithdraw}
                    />
                    <Spacer height={sizes.baseMargin} />
                    <Spacer height={sizes.baseMargin} />
                </Wrapper>
            </KeyboardAvoidingScrollView>

            <PopupPrimary
                visible={isWithdrawalCompletedPopupVisible}
                toggle={toggleWithdrawalCompletedPopup}
                onPressButton1={async () => {
                    toggleWithdrawalCompletedPopup()
                    goBack()
                }}
                buttonText1={'Done'}
                title={'Withdrawal has been completed'}
                info={`Your withdrawal amount will be transfered into your bank acount within ${!hasInstantPayoutMethod ? '2-3 business days' : '30-60 minutes'} `}
                iconName="check"
                iconType="feather"
                iconContainerColor={colors.success}
                disableBackDropPress
                disableSwipe
            //iconContainerSize={totalSize(10)}
            />
        </MainWrapper>
    )
}