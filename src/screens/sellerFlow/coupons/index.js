import React, { Component, useState, useLayoutEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { height } from 'react-native-dimension';
import { ComponentWrapper, MainWrapper, TraningSellerCard, PopupPrimary, SmallTitle, Spacer, TraningRequestCard, Wrapper, ButtonColoredSmall, CouponCard } from '../../../components';
import { appStyles, colors, DummyData, routes, sizes } from '../../../services';

function Coupons(props) {
  const { navigation } = props
  const { navigate } = navigation


  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <ComponentWrapper>
          <ButtonColoredSmall
            text="Create Coupon"
            iconName="plus"
            buttonStyle={{ paddingHorizontal: sizes.marginHorizontalSmall, borderRadius: 100, backgroundColor: colors.appColor2 }}
            onPress={() => navigate(routes.seller.createCoupon)}
          />
        </ComponentWrapper>
      )
    });
  }, [navigation]);

  const [isDeleteCouponPopupVisible, setDeleteCouponPopupVisibility] = useState(false)

  const toggleDeleteCouponPopup = () => setDeleteCouponPopupVisibility(!isDeleteCouponPopupVisible)

  const coupons = DummyData.coupons

  return (
    <MainWrapper>
      <FlatList
        data={coupons}
        ListHeaderComponent={() => <Spacer height={sizes.baseMargin} />}
        ListFooterComponent={() => <Spacer height={sizes.baseMargin} />}
        renderItem={({ item, index }) => {
          return (
            <CouponCard
              onPress={() => { }}
              containerStyle={{ marginBottom: sizes.marginVertical / 2 }}
              title={item.code}
              discountType={item.discountType}
              discount={item.discount}
              expiry={item.expiry}
              onPressEdit={() => { navigate(routes.seller.createCoupon, { coupon: item }) }}
              onPressDelete={toggleDeleteCouponPopup}
            />
          )
        }}
      />
      <PopupPrimary
        visible={isDeleteCouponPopupVisible}
        toggle={toggleDeleteCouponPopup}
        onPressButton1={toggleDeleteCouponPopup}
        onPressButton2={toggleDeleteCouponPopup}
        buttonText1={'Yes'}
        buttonText2={'No'}
        topMargin={height(65)}
        button1Style={{ backgroundColor: colors.error }}
      //title="Are you sure you want to delete this training?"

      // button1Style={{ backgroundColor: colors.error }}
      >
        <Wrapper>
          <Spacer height={sizes.baseMargin * 2} />
          <ComponentWrapper style={{ marginHorizontal: sizes.marginHorizontalXLarge }}>
            <SmallTitle style={[appStyles.textCenter]}>Are you sure you want to delete this coupon?</SmallTitle>
          </ComponentWrapper>
          <Spacer height={sizes.baseMargin * 2} />
        </Wrapper>
      </PopupPrimary>
    </MainWrapper>
  );
}

export default Coupons;
