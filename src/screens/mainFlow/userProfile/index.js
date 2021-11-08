import React, { Component, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { View, Text } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';
import { useSelector } from 'react-redux';
import {
    BackIconAbsolute, ComponentWrapper, MainWrapper,
    Wrapper, Posts, ImageProfile, Spacer, IconHeart, SmallTitle,
    RegularText, ButtonColoredSmall, RowWrapperBasic,
    IconButton, LineHorizontal, ButtonGroupAnimated, Products, SkeletonProductDetails
} from '../../../components';
import { appImages, appStyles, Backend, colors, DummyData, HelpingMethods, routes, sizes } from '../../../services';

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
    const { user, userId } = params
    const user_id = userId ? userId : user ? user.id : ''
    console.log('params user', user)
    console.log('params userId', userId)


    //local states
    const [selectedTabIndex, setSelectedTabIndex] = useState(0)
    const [userDetail, setUserDetail] = useState(null)
    const [userProducts, setUserProducts] = useState([])
    const [userPosts, setUserPosts] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [loadingFollow, setLoadingFollow] = useState(false)

    const dummyUserPosts = DummyData.posts
    const dummyUserProducts = DummyData.products.slice().reverse()


    useEffect(() => {
        getSetData()
    }, [])


    const getSetData = async () => {
        if (userId) {

        } else if (user) {
            setUserDetail(user)
        }
        await handleGetUserProducts()
        setLoading(false)
    }


    const handleGetUserProducts = async () => {
        await Backend.get_user_products(user_id).
            then(res => {
                if (res) {
                    setUserProducts(res.data.data)
                }
            })
    }
    if (isLoading) {
        return (
            <SkeletonProductDetails />
        )
    }
    return (
        <MainWrapper>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <Spacer height={sizes.statusBarHeight + sizes.baseMargin} />
                <Wrapper>
                    <Wrapper style={[appStyles.center]}>
                        <ImageProfile
                            source={{ uri: userDetail.profile_image ? userDetail.profile_image : appImages.noUser }}
                            shadow
                        />
                        <Spacer height={sizes.baseMargin} />
                        <SmallTitle>{userDetail.first_name + ' ' + userDetail.last_name}</SmallTitle>
                        <Spacer height={sizes.smallMargin} />
                        {
                            userDetail.address ?
                                <>
                                    <RegularText style={[appStyles.textLightGray]}>{userDetail.address}</RegularText>
                                    <Spacer height={sizes.smallMargin} />
                                </>
                                :
                                null
                        }

                        <ButtonColoredSmall
                            text={HelpingMethods.checkIfFollowRequestSent(user_id) ? "Request Sent" : HelpingMethods.checkIfFollowingUser(user_id) ? "Following" : "Follow"}
                            textStyle={[appStyles.h6, appStyles.textWhite, (HelpingMethods.checkIfFollowRequestSent(user_id) || HelpingMethods.checkIfFollowingUser(user_id)) && appStyles.textGray]}
                            buttonStyle={[{ paddingHorizontal: sizes.marginHorizontalXLarge },
                            HelpingMethods.checkIfFollowRequestSent(user_id) ? { backgroundColor: colors.appBgColor3, paddingHorizontal: sizes.marginHorizontal } :
                                HelpingMethods.checkIfFollowingUser(user_id) && { backgroundColor: colors.transparent, borderWidth: 1, borderColor: colors.appBgColor4, paddingHorizontal: sizes.marginHorizontalLarge },
                            ]}
                            tintColor={HelpingMethods.checkIfFollowRequestSent(user_id) ? colors.appTextColor1 : HelpingMethods.checkIfFollowingUser(user_id) ? colors.appTextColor4 : colors.appTextColor6}
                            onPress={async () => {
                                setLoadingFollow(true)
                                await Backend.handleFollowUnfollowFollowing(user_id)
                                setLoadingFollow(true)
                            }}
                            isLoading={loadingFollow}

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
                    initalIndex={selectedTabIndex}
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
                            data={dummyUserPosts}
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
