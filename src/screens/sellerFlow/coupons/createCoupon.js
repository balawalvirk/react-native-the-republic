import React, { Component, useEffect, useLayoutEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { height } from 'react-native-dimension';
import { BorderedWrapper, ButtonColored, IconButton, KeyboardAvoidingScrollView, LineHorizontal, MainWrapper, MediumText, PopupPrimary, RowWrapper, RowWrapperBasic, Spacer, SwitchPrimary, TextInputUnderlined } from '../../../components';
import { Backend, colors, HelpingMethods, routes, sizes } from '../../../services';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

function CreateCoupon(props) {
  const { navigation, route } = props
  const { navigate, goBack } = navigation
  const { params } = route
  const couponDetail = params ? params.couponDetail ? params.couponDetail : null : null

  useEffect(() => {
    getSetCouponData()
  }, [])


  useLayoutEffect(() => {
    navigation.setOptions({
      title: couponDetail ? "Edit Coupon" : "Create Coupon"
    });
  }, [navigation]);

  //local states
  const [code, setCode] = useState('')
  const [discountType, setDiscountType] = useState('fixed')
  const [discount, setDiscount] = useState('')
  const [expiry, setExpiry] = useState('')
  const [minOrderValue, setMinOrderValue] = useState('')
  const [isLoading, setLoading] = useState(false)

  const [codeError, setCodeError] = useState('')
  const [discountError, setDiscountError] = useState('')
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
    //setExpiry(date)
    setExpiry(moment(date).format('YYYY-MM-DD'))
    toggleExpiryDatePicker()
  }

  const getSetCouponData = () => {
    if (couponDetail) {
      const { code, discount_amount, expiry_date, discount_type, minimum_order } = couponDetail
      setCode(code)
      setDiscount(discount_amount)
      setDiscountType(discount_type)
      setExpiry(expiry_date)
      setMinOrderValue(minimum_order)
    }
  }

  const fixedDiscount = discountType === 'fixed'
  const percentageDiscount = discountType === 'percentage'

  const isCouponDataValid = () => {
    HelpingMethods.handleAnimation()
    !code ? setCodeError('Enter coupon code') : setCodeError('')
    !discount ? setDiscountError('Enter discount') : setDiscountError('')
    !minOrderValue ? setMinOrderValueError('Enter minimum order value') : setMinOrderValueError('')
    !expiry ? setExpiryError('Select expiry date') : setExpiryError('')
    if (code && discount && minOrderValue && expiry) {
      return true
    }
  }
  const handleCreateCoupon = async () => {
    setLoading(true)
    if (isCouponDataValid()) {
      const couponDetails = {
        code,
        discount_type: discountType,
        discount_amount: discount,
        minimum_order: minOrderValue,
        expiry_date: expiry
      }
      console.log('couponDetails --> ', couponDetails)
      await Backend.create_coupon(couponDetails).then(res => {
        if (res) {
          toggleCouponCreatedPopup()
        }
      })
    }
    setLoading(false)
  }
  const handleEditCoupon = async () => {
    setLoading(true)
    if (isCouponDataValid()) {
      const couponDetails = {
        coupon_id:couponDetail.id,
        code,
        discount_type: discountType,
        discount_amount: discount,
        minimum_order: minOrderValue,
        expiry_date: expiry
      }
      console.log('couponDetails --> ', couponDetails)
      await Backend.edit_coupon(couponDetails).then(res => {
        if (res) {
          toggleCouponUpdatedPopup()
        }
      })
    }
    setLoading(false)
  }
  return (
    <MainWrapper>
      <KeyboardAvoidingScrollView>
        <Spacer height={sizes.baseMargin} />
        <TextInputUnderlined
          title="Coupon Code"
          value={code}
          onChangeText={t => setCode(t)}
          iconNameRight={code && "check-circle"}
          iconTypeRight="feather"
          iconColorRight={colors.success}
          error={codeError}
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
          {
            fixedDiscount ?
              <>
                <Spacer height={sizes.smallMargin} />
                <TextInputUnderlined
                  title="Enter discount amount"
                  editable={fixedDiscount}
                  value={fixedDiscount && `${(discount.length ? '-$' : '') + discount}`}
                  onChangeText={(text) => setDiscount(text.replace('-$', ''))}
                  keyboardType="number-pad"
                  containerStyle={{ marginHorizontal: sizes.marginHorizontalSmall }}
                  error={discountError}
                />
              </>
              :
              null
          }
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
          {
            percentageDiscount ?
              <>
                <Spacer height={sizes.smallMargin} />
                <TextInputUnderlined
                  title="Enter discount %age"
                  editable={percentageDiscount}
                  keyboardType="number-pad"
                  value={percentageDiscount && `${(discount.length ? '%' : '') + discount}`}
                  onChangeText={(text) => setDiscount(text.replace('%', ''))}
                  containerStyle={{ marginHorizontal: sizes.marginHorizontalSmall }}
                  error={discountError}
                />
              </>
              :
              null
          }
        </BorderedWrapper>

        <Spacer height={sizes.baseMargin} />
        <TextInputUnderlined
          title="Minimum Order Value"
          value={`${(minOrderValue.length ? '$' : '') + minOrderValue}`}
          onChangeText={(text) => setMinOrderValue(text.replace('$', ''))}
          keyboardType="number-pad"
          error={minOrderValueError}
        />
        <Spacer height={sizes.baseMargin} />
        <TextInputUnderlined
          title="Expiry Date"
          value={expiry ? HelpingMethods.formateDateToDate1(expiry) : ''}
          onChangeText={t => setExpiry(t)}
          iconNameRight="calendar"
          iconTypeRight="feather"
          editable={false}
          onPress={toggleExpiryDatePicker}
          iconColorRight={colors.appTextColor1}
          error={expiryError}
        />
        <Spacer height={sizes.doubleBaseMargin} />
        <ButtonColored
          text={couponDetail ? "Update Coupon" : "Create Coupon"}
          onPress={() => {
            couponDetail ? [
              handleEditCoupon()
            ] :
              handleCreateCoupon()
          }}
          isLoading={isLoading}
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
        disableSwipe
        disableBackDropPress
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
        disableSwipe
        disableBackDropPress
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
