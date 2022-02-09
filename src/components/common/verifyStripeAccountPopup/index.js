import React from 'react'
import { totalSize } from 'react-native-dimension'
import { PopupPrimary } from '../index'
import { colors, routes } from '../../../services'
import { navigate } from '../../../services/navigation/rootNavigation'

export default function VerifyStripeAccountPopup({ visible, toggle }) {
    return (
        <PopupPrimary
            visible={visible}
            toggle={toggle}
            onPressButton1={async () => {
                //setLoadingAccountLink(true)
                //await handleGetStripeAccountLink(seller_stripe_account_id)
                //setLoadingAccountLink(false)
                navigate(routes.seller.withdrawEarnings)
                toggle()
            }}
            // onPressButton2={toggle}
            // loadingButton1={loadingAccountLink}
            buttonText1={'Continue'}
            //buttonText2={'Cancel'}
            title={'Verify your express stripe account'}
            info={'You will not be able to get payment and withdraw your earnings without verifing your express stripe account'}
            iconName={'alert'}
            iconType={'material-community'}
            iconContainerColor={colors.error}
            iconContainerSize={totalSize(8)}
        />
    )
}