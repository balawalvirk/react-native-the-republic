import React, { Component, useState } from 'react';
import { View, Text } from 'react-native';
import { height, width } from 'react-native-dimension';
import { ButtonGroupAnimated, Dealers, MainWrapper, Products, Spacer } from '../../../components';
import { appStyles, colors, DummyData, routes, sizes } from '../../../services';
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
    //local states
    const [selectedTabIndex, setSelectedTabIndex] = useState(0)

    const products = [...DummyData.products, ...DummyData.products]
    const dealers = [...DummyData.users, ...DummyData.users]
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
                        data={products}
                        onPressProduct={(item, index) => navigate(routes.productDetail, { product: item })}
                        viewType={'grid'}
                        ListHeaderComponent={() => {
                            return <Spacer height={sizes.smallMargin} />
                        }}
                        ListFooterComponent={() => {
                            return <Spacer height={sizes.baseMargin} />
                        }}
                    />
                    :
                    <Dealers
                        data={dealers}
                        onPress={(item, index) => navigate(routes.userProfile, { item: item })}
                        viewType={'list'}
                        ListHeaderComponent={() => {
                            return <Spacer height={sizes.smallMargin} />
                        }}
                        ListFooterComponent={() => {
                            return <Spacer height={sizes.baseMargin} />
                        }}
                    />
            }
        </MainWrapper>
    );
}

export default Favourites;
