import React from 'react'
import { totalSize } from "react-native-dimension"
import { Icon } from "react-native-elements"
import { Wrapper } from "../../wrappers"
import { colors, routes, sizes } from "../../../services"
import { navigate } from "../../../services/navigation/rootNavigation"
import { PopupPrimary } from '..'

export default function createStripeAccountPopup({ visible, toggle }) {
    return (
        <PopupPrimary
            visible={visible}
            toggle={toggle}
            title={'Create Stripe Account'}
            info={'To get the payment of your products/trainings and withdraw to your bank account, you have to create stripe express account'}
            onPressButton1={() => {
                toggle()
                navigate(routes.seller.withdrawEarnings)
            }}
            buttonText1={'Continue'}
            icon={
                <Wrapper
                    style={{ marginBottom: sizes.baseMargin }}
                >
                    <Icon
                        name={'cc-stripe'}
                        type={'font-awesome'}
                        color={colors.appColor1}
                        size={totalSize(7.5)}
                    />
                </Wrapper>
            }
        />
    )
}