import React, { Component, useEffect, useLayoutEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { height } from 'react-native-dimension';
import { BorderedWrapper, ButtonColored, IconButton, KeyboardAvoidingScrollView, LineHorizontal, MainWrapper, MediumText, PopupPrimary, RowWrapper, RowWrapperBasic, Spacer, SwitchPrimary, TextInputUnderlined } from '../../../components';
import { colors, HelpingMethods, routes, sizes } from '../../../services';
import DateTimePicker from 'react-native-modal-datetime-picker';

function CreateCoupon(props) {
  const { navigation, route } = props
  const { navigate, goBack } = navigation
  const { params } = route
  const couponData = params ? params.coupon ? params.coupon : null : null

  useEffect(() => {
    getSetCouponData()
  }, [])


  useLayoutEffect(() => {
    navigation.setOptions({
      title: couponData ? "Edit Coupon" : "Create Coupon"
    });
  }, [navigation]);

  //local states
  const [code, setCode] = useState('')
  const [discountType, setDiscountType] = useState('fixed')
  const [discount, setDiscount] = useState('')
  const [expiry, setExpiry] = useState('')
  const [minOrderValue, setMinOrderValue] = useState('')

  const [codeError, setCodeError] = useState('')
  const [discountError, setDescriptionError] = useState('')
  const [expiryError, setExpiryError] = useState('')
  const [minOrderValueError, setMinOrderValueError] = useState('')


  const [isCouponCreatedPopupVisible, setCouponCreatedPopupVisible] = useState(false)
  const [isCouponUpdatedPopupVisible, setCouponUpdatedPopupVisible] = useState(false)
  const [isExpiryDatePickerVisible, setExpiryDatePickerVisible] = useState(false)

  const toggleCouponUpdatedPopup = () => setCouponUpdatedPopupVisible(!isCouponUpdatedPopupVisible)
  const toggleCouponCreatedPopup = () => setCouponCreatedPopupVisible(!isCouponCreatedPopupVisible)
  const toggleExpiryDatePicker = () => setExpiryDatePickerVisible(!isExpiryDatePickerVisible)


  const handleConfirmExpiryDate = (date) => {
    console.warn("Expiry date has been picked: ", date);
    setExpiry(date)
    toggleExpiryDatePicker()
    // setEstimatedArrivalTime(moment(date).format('DD/MM/YYYY hh:mm A'))
  }

  const getSetCouponData = () => {
    if (couponData) {
      const { code, discount, expiry, discountType } = couponData
      setCode(code)
      setDiscount(discount)
      setDiscountType(discountType)
      setExpiry(new Date())
      setMinOrderValue('89')
    }
  }

  const fixedDiscount = discountType === 'fixed'
  const percentageDiscount = discountType === 'percentage'
  return (
    <MainWrapper>
      <KeyboardAvoidingScrollView>
        <Spacer height={sizes.baseMargin} />
        <TextInputUnderlined
          title="Coupon Code"
          value={code}
          onChangeText={t => setCode(t)}
          error={codeError}
          iconNameRight={code && "check-circle"}
          iconTypeRight="feather"
          iconColorRight={colors.success}
        />
        <Spacer height={sizes.baseMargin} />
        <BorderedWrapper style={{ paddingHorizontal: 0, }}>
          <RowWrapper style={{ marginHorizontal: sizes.marginHorizontalSmall }}>
            <MediumText>Fixed Discount</MediumText>
            <SwitchPrimary
              value={fixedDiscount}
              onPress={() => setDiscountType('fixed')}
            />
          </RowWrapper>
          <Spacer height={sizes.smallMargin} />
          <TextInputUnderlined
            title="Enter discount amount"
            editable={fixedDiscount}
            value={fixedDiscount && `${(discount.length ? '-$' : '') + discount}`}
            onChangeText={(text) => setDiscount(text.replace('-$', ''))}
            error={discountError}
            keyboardType="number-pad"
            containerStyle={{ marginHorizontal: sizes.marginHorizontalSmall }}
          />
          <Spacer height={sizes.baseMargin} />
          <LineHorizontal />
          <Spacer height={sizes.baseMargin} />
          <RowWrapper style={{ marginHorizontal: sizes.marginHorizontalSmall }}>
            <MediumText>%age Discount</MediumText>
            <SwitchPrimary
              value={percentageDiscount}
              onPress={() => setDiscountType('percentage')}
            />
          </RowWrapper>
          <Spacer height={sizes.smallMargin} />
          <TextInputUnderlined
            title="Enter discount %age"
            editable={percentageDiscount}
            keyboardType="number-pad"
            value={percentageDiscount && `${(discount.length ? '%' : '') + discount}`}
            onChangeText={(text) => setDiscount(text.replace('%', ''))}
            error={discountError}
            containerStyle={{ marginHorizontal: sizes.marginHorizontalSmall }}
          />
        </BorderedWrapper>

        <Spacer height={sizes.baseMargin} />
        <TextInputUnderlined
          title="Minimum Order Value"
          value={`${(minOrderValue.length ? '$' : '') + minOrderValue}`}
          onChangeText={(text) => setMinOrderValue(text.replace('$', ''))}
          error={minOrderValueError}
          keyboardType="number-pad"
        />
        <Spacer height={sizes.baseMargin} />
        <TextInputUnderlined
          title="Expiry Date"
          value={expiry ? HelpingMethods.formateDate1(expiry) : ''}
          onChangeText={t => setExpiry(t)}
          error={expiryError}
          iconNameRight="calendar"
          iconTypeRight="feather"
          editable={false}
          onPress={toggleExpiryDatePicker}
          iconColorRight={colors.appTextColor1}
        />
        <Spacer height={sizes.doubleBaseMargin} />
        <ButtonColored
          text={couponData ? "Update Coupon" : "Create Coupon"}
          onPress={() => {
            couponData ? [
              toggleCouponUpdatedPopup()
            ] :
              toggleCouponCreatedPopup()
          }}
        />
        <Spacer height={sizes.doubleBaseMargin} />
      </KeyboardAvoidingScrollView>
      <PopupPrimary
        visible={isCouponUpdatedPopupVisible}
        toggle={toggleCouponUpdatedPopup}
        iconName="check"
        iconType="feather"
        title="Coupon Updated"
        info={"Customers can use this coupon code on your products to avail discounts"}
        buttonText1="Continue"
        onPressButton1={() => { toggleCouponUpdatedPopup(); goBack() }}
        //topMargin={height(60)}
      />
       <PopupPrimary
        visible={isCouponCreatedPopupVisible}
        toggle={toggleCouponCreatedPopup}
        iconName="check"
        iconType="feather"
        title="Coupon Created"
        info={"Customers can use this coupon code on your products to avail discounts"}
        buttonText1="Continue"
        onPressButton1={() => { toggleCouponCreatedPopup(); goBack() }}
        //topMargin={height(60)}
      />
      <DateTimePicker
        isVisible={isExpiryDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmExpiryDate}
        onCancel={() => {
          toggleExpiryDatePicker()
        }}
      />
    </MainWrapper>
  );
}

export default CreateCoupon;
