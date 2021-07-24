import React, { Component, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';
import { totalSize } from 'react-native-dimension';
import { Icon } from 'react-native-elements';
import { LineHorizontal, MediumText, RowWrapper, Spacer, Wrapper } from '../../../components';
import { appStyles, colors, routes, sizes } from '../../../services';
import { About, PrivacyPolicy, TermsCondition } from '../../docs';

const moreOptions = [
    'Favorites', 'Edit Profile',
    'Change Password', 'Purchase History',
    'Payment Methods', 'Terms & Conditions',
    'Privacy Policy', 'About Us', 'Logout'
]

function More({ navigation }) {
    const { navigate } = navigation

    //local states
    const [termsVisible, setTermsVisibility] = useState(false)
    const [policyVisible, setPolicyVisibility] = useState(false)
    const [aboutVisible, setAboutVisibility] = useState(false)

    //local methodes
    const toggleTerms = () => setTermsVisibility(!termsVisible)
    const togglePolicy = () => setPolicyVisibility(!policyVisible)
    const toggleAbout = () => setAboutVisibility(!aboutVisible)

    const handlePressOption = (item) => {
        if (item === 'Favorites') navigate(routes.favourites)
        else if (item === 'Edit Profile') navigate(routes.editProfile)
        else if (item === 'Change Password') navigate(routes.changePassword)
        else if (item === 'Payment Methods') navigate(routes.paymentMethods)
        else if (item === 'Purchase History') navigate(routes.purchaseHistory)
        else if (item === 'Terms & Conditions') toggleTerms()
        else if (item === 'Privacy Policy') togglePolicy()
        else if (item === 'About Us') toggleAbout()
    }
    return (
        <Wrapper flex={1}>
            <Wrapper style={{ marginHorizontal: sizes.marginHorizontal, borderRadius: sizes.cardRadius, borderWidth: 1, borderColor: colors.appBgColor4 }}>
                {
                    moreOptions.map((item, index) => {
                        return (
                            <TouchableOpacity activeOpacity={1} onPress={() => handlePressOption(item)}>
                                <RowWrapper style={{ marginVertical: sizes.baseMargin, marginRight: sizes.marginHorizontalSmall }}>
                                    <Wrapper flex={1}>
                                        <MediumText style={[{ color: colors.appTextColor3 }, item === 'Logout' && { color: colors.error }]}>{item}</MediumText>
                                    </Wrapper>
                                    <Wrapper style={{ backgroundColor: 'transparent', }}>
                                        <Icon
                                            name="chevron-right"
                                            type="feather"
                                            color={appStyles.textLightGray.color}
                                            size={totalSize(2.5)}
                                        />
                                    </Wrapper>
                                </RowWrapper>
                                {
                                    index != moreOptions.length - 1 ?
                                        <LineHorizontal height={1} />
                                        :
                                        null
                                }
                            </TouchableOpacity>
                        )
                    })
                }
            </Wrapper>
            <TermsCondition
                visible={termsVisible}
                toggle={toggleTerms}
            />
            <PrivacyPolicy
                visible={policyVisible}
                toggle={togglePolicy}
            />
            <About
                visible={aboutVisible}
                toggle={toggleAbout}
            />
        </Wrapper>
    );
}

export default More;
