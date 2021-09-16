import React, { Component, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';
import { totalSize } from 'react-native-dimension';
import { Icon } from 'react-native-elements';
import { LineHorizontal, MediumText, OptionsListPrimary, RowWrapper, Spacer, Wrapper } from '../../../components';
import { appStyles, colors, HelpingMethods, routes, sizes } from '../../../services';
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
        else if (item === 'Logout') HelpingMethods.logout()
    }
    return (
        <Wrapper flex={1}>
            <OptionsListPrimary
                options={moreOptions}
                onPressOption={(item, index) => handlePressOption(item, index)}
            />
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
