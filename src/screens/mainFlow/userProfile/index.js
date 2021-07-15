import React, { Component, useState } from 'react';
import { ScrollView } from 'react-native';
import { View, Text } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';
import {
    BackIconAbsolute, ComponentWrapper, MainWrapper,
    Wrapper, Posts, ImageProfile, Spacer, IconHeart, SmallTitle,
    RegularText, ButtonColoredSmall, RowWrapperBasic,
    IconButton, LineHorizontal, ButtonGroupAnimated, Products
} from '../../../components';
import { appImages, appStyles, colors, DummyData, routes, sizes } from '../../../services';

const tabs = [
    {
        title: 'Posts',

    },
    {
        title: 'Products'
    }
]

const IconButtonPrimary = ({ iconName, iconType, onPress }) => {
    return (
        <IconButton
            iconName={iconName}
            iconType={iconType}
            onPress={onPress}
            buttonColor={colors.appColor1}
            iconColor={colors.appTextColor6}
            buttonStyle={{ borderRadius: sizes.buttonRadius }}
            buttonSize={totalSize(5)}
            iconSize={totalSize(2.5)}
        />
    )
}
function UserProfile(props) {
    //navigation params
    const { navigation, route } = props
    const { navigate, goBack } = navigation
    const { params } = route
    const user = params.item
    console.log('params user', user)

    //local states
    const [selectedTabIndex, setSelectedTabIndex] = useState(0)

    const userPosts = DummyData.posts
    const userProducts = DummyData.products.slice().reverse()
    return (
        <MainWrapper>
            <ScrollView
            showsVerticalScrollIndicator={false}
            >
                <Spacer height={sizes.statusBarHeight + sizes.baseMargin} />
                <Wrapper>
                    <Wrapper style={[appStyles.center]}>
                        <ImageProfile
                            source={{ uri: user.image }}
                            shadow
                        />
                        <Spacer height={sizes.baseMargin} />
                        <SmallTitle>{user.name}</SmallTitle>
                        <Spacer height={sizes.smallMargin} />
                        <RegularText style={[appStyles.textLightGray]}>New York City, NY</RegularText>
                        <Spacer height={sizes.smallMargin} />
                        <ButtonColoredSmall
                            text="Follow"
                            textStyle={[appStyles.h6, appStyles.textWhite]}
                            buttonStyle={{ paddingHorizontal: sizes.marginHorizontalXLarge }}
                        />
                        <Spacer height={sizes.baseMargin} />
                        <RowWrapperBasic>
                            <IconButtonPrimary
                                iconName="message-circle"
                                iconType="feather"
                                onPress={() => { }}
                            />
                            <Spacer width={sizes.smallMargin} />
                            <IconButtonPrimary
                                iconName="phone"
                                iconType="feather"
                                onPress={() => { }}
                            />
                            <Spacer width={sizes.smallMargin} />
                            <IconButtonPrimary
                                iconName="video"
                                iconType="feather"
                                onPress={() => { }}
                            />
                        </RowWrapperBasic>
                        <Spacer height={sizes.smallMargin} />
                    </Wrapper>
                    <ComponentWrapper>
                        <LineHorizontal height={1} />
                    </ComponentWrapper>
                    <IconHeart
                        value={false}
                        containerStyle={{ position: 'absolute', right: sizes.marginHorizontal, top: 0 }}
                    />
                </Wrapper>
                <ButtonGroupAnimated
                    data={tabs}
                    text='title'
                    onPressButton={(item, index) => setSelectedTabIndex(index)}
                    containerStyle={[{ backgroundColor: 'transparent', marginHorizontal: sizes.marginHorizontal }]}
                    inActiveButtonStyle={{ width: width(40), paddingVertical: height(2.5), backgroundColor: 'transparent', }}
                    activeButtonForceStyle={{ position: 'absolute', height: 4, bottom: 0, backgroundColor: colors.appColor1, borderRadius: 5, }}
                    activeButtonContent={<Wrapper></Wrapper>}
                    activeTextStyle={[appStyles.textMedium, appStyles.textPrimaryColor]}
                    inActiveTextStyle={[appStyles.textMedium, appStyles.textLightGray]}
               
               />
                <Spacer height={sizes.baseMargin} />
                {
                    selectedTabIndex === 0 ?
                        <Posts
                            data={userPosts}
                            scrollEnabled={false}
                            ListFooterComponent={() => {
                                return <Spacer height={sizes.doubleBaseMargin * 2} />
                            }}
                        />
                        :
                        <Products
                            data={userProducts}
                            onPressProduct={(item, index) => navigate(routes.productDetail, { product: item })}
                            viewType={'grid'}
                            ListFooterComponent={() => {
                                return <Spacer height={sizes.doubleBaseMargin * 2} />
                            }}
                        />
                }
            </ScrollView>
            <BackIconAbsolute
                onPress={goBack}
            />
        </MainWrapper>
    );
}

export default UserProfile;
