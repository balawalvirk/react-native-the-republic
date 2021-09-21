import { useFocusEffect } from '@react-navigation/core';
import React, { Component, useState, useLayoutEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { height } from 'react-native-dimension';
import { ComponentWrapper, MainWrapper, TraningSellerCard, PopupPrimary, SmallTitle, Spacer, TraningRequestCard, Wrapper, ButtonColoredSmall, CouponCard, SkeletonListVerticalPrimary, NoDataViewPrimary, Toasts } from '../../../components';
import { appStyles, Backend, colors, DummyData, HelpingMethods, routes, sizes } from '../../../services';

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


  //local states
  const [coupons, setCoupons] = useState(null)
  const [selectedCoupon, setSelectedCoupon] = useState(null)
  const [isLoadingDelete, setLoadingDelete] = useState(false)
  const [isDeleteCouponPopupVisible, setDeleteCouponPopupVisibility] = useState(false)
  const toggleDeleteCouponPopup = () => setDeleteCouponPopupVisibility(!isDeleteCouponPopupVisible)

  //const coupons = DummyData.coupons
  useFocusEffect(
    React.useCallback(() => {
      getCoupons()
    }, [])
  );
  const getCoupons = () => {
    Backend.get_user_coupons().
      then(res => {
        if (res) {
          setCoupons(res.coupons)
        }
      })
  }
  const handleDeleteCoupon = async () => {
    setLoadingDelete(true)
    await Backend.delete_coupon({ coupon_id: selectedCoupon.id }).
      then(res => {
        if (res) {
          setSelectedCoupon(null)
          getCoupons()
          toggleDeleteCouponPopup()
        }
      })
    setLoadingDelete(false)
  }
  if (coupons === null) {
    return (<SkeletonListVerticalPrimary />)
  }
  return (
    <MainWrapper>
      {
        coupons.length ?
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
                  discountType={item.discount_type}
                  discount={item.discount_amount}
                  expiry={HelpingMethods.formateDateToDate1(item.expiry_date)}
                  onPressEdit={() => { navigate(routes.seller.createCoupon, { couponDetail: item }) }}
                  onPressDelete={() => {
                    setSelectedCoupon(item)
                    toggleDeleteCouponPopup()
                  }}
                />
              )
            }}
          />
          :
          <NoDataViewPrimary
            title="Coupons"
          />
      }
      <PopupPrimary
        visible={isDeleteCouponPopupVisible}
        toggle={toggleDeleteCouponPopup}
        onPressButton1={handleDeleteCoupon}
        onPressButton2={toggleDeleteCouponPopup}
        buttonText1={'Yes'}
        buttonText2={'No'}
        topMargin={height(65)}
        button1Style={{ backgroundColor: colors.error }}
        loadingButton1={isLoadingDelete}
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
