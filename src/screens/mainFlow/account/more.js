import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';
import { totalSize } from 'react-native-dimension';
import { Icon } from 'react-native-elements';
import { LineHorizontal, MediumText, RowWrapper, Spacer, Wrapper } from '../../../components';
import { appStyles, colors, routes, sizes } from '../../../services';

const moreOptions = [
    'Favorites', 'Edit Profile',
    'Change Password', 'Purchase History',
    'Payment Methods', 'Terms & Conditions',
    'Privacy Policy', 'About Us', 'Logout'
]

function More({ navigation }) {
    const { navigate } = navigation

    const handlePressOption = (item) => {
        if (item === 'Favorites') navigate(routes.favourites)
        else if (item === 'Edit Profile') navigate(routes.editProfile)
        else if (item === 'Change Password') navigate(routes.changePassword)
    }
    return (
        <Wrapper flex={1}>
            <Wrapper style={{ marginHorizontal: sizes.marginHorizontal, borderRadius: sizes.cardRadius, borderWidth: 1, borderColor: colors.appBgColor4 }}>
                {
                    moreOptions.map((item, index) => {
                        return (
                            <TouchableOpacity activeOpacity={1} onPress={()=>handlePressOption(item)}>
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
        </Wrapper>
    );
}

export default More;
