import React, { Component, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { height, width } from 'react-native-dimension';
import { useSelector } from 'react-redux';
import { ButtonGroupAnimated, Dealers, MainWrapper, Products, Spacer } from '../../../components';
import { appStyles, Backend, colors, DummyData, routes, sizes } from '../../../services';
const tabs = [
    {
        title: 'Products',

    },
    {
        title: 'Dealers'
    }
]
function Favourites(props) {
    const { navigation, route } = props
    const { navigate } = navigation

    //redux states
    const user = useSelector(state => state.user)
    const { userDetail } = user
    //const {favorite_products,favorite_dealers}=user.userDetail
    //local states
    const [selectedTabIndex, setSelectedTabIndex] = useState(0)
    const [favProducts, setFavProducts] = useState(null)
    const [favDealers, setFavDealers] = useState(null)



    useEffect(() => {
        getSetData()
    }, [])

    // useEffect(() => {
    //     handleGetFavProducts()
    // }, [userDetail.favorite_products])

    // useEffect(() => {
    //     handleGetFavDealers()
    // }, [userDetail.favorite_dealers])

    const getSetData = async () => {
        await handleGetFavProducts()
        await handleGetFavDealers()
    }

    const handleGetFavProducts = async () => {
        await Backend.getFavouriteProducts().
            then(res => {
                if (res) {
                    setFavProducts(res.data)
                }
            })
    }
    const handleGetFavDealers = async () => {
        await Backend.getFavouriteDealers().
            then(res => {
                if (res) {
                    setFavDealers(res.data.favorite_dealers)
                }
            })
    }
    return (
        <MainWrapper>
            <ButtonGroupAnimated
                data={tabs}
                initalIndex={selectedTabIndex}
                text='title'
                onPressButton={(item, index) => setSelectedTabIndex(index)}
                containerStyle={[{ backgroundColor: 'transparent', }]}
                inActiveButtonStyle={{ width: width(45), paddingVertical: height(1.75), backgroundColor: 'transparent', }}
                activeButtonForceStyle={{ position: 'absolute', height: 4, bottom: 0, backgroundColor: colors.appColor1, borderRadius: 5, width: width(35), left: width(5) }}
                // activeButtonContent={<Wrapper></Wrapper>}
                activeTextStyle={[appStyles.textMedium, appStyles.textPrimaryColor]}
                inActiveTextStyle={[appStyles.textMedium, appStyles.textLightGray]}

            />
            <Spacer height={sizes.smallMargin} />
            {
                selectedTabIndex === 0 ?
                    <Products
                        data={favProducts}
                        onPressProduct={(item, index) => navigate(routes.productDetail, { product: item })}
                        viewType={'grid'}
                        ListHeaderComponent={() => {
                            return <Spacer height={sizes.smallMargin} />
                        }}
                        ListFooterComponent={() => {
                            return <Spacer height={sizes.baseMargin} />
                        }}
                        isLoading={!favProducts}
                        onPressHeart={(item, index) => {
                            const tempData = favProducts.filter(obj => obj.id != item.id)
                            setFavProducts(tempData)
                        }}
                    />
                    : 
                    <Dealers
                        data={favDealers}
                        onPress={(item, index) => navigate(routes.userProfile, { item: item })}
                        viewType={'list'}
                        ListHeaderComponent={() => {
                            return <Spacer height={sizes.smallMargin} />
                        }}
                        ListFooterComponent={() => {
                            return <Spacer height={sizes.baseMargin} />
                        }}
                        isLoading={!favDealers}
                        onPressHeart={(item, index) => {
                            const tempData = favDealers.filter(obj => obj.id != item.id)
                            setFavDealers(tempData)
                        }}
                        
                    />
            }
        </MainWrapper>
    );
}

export default Favourites;
