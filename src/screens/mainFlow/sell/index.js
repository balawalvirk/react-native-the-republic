import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import {height, totalSize, width} from 'react-native-dimension';
import {Icon} from 'react-native-elements';
import {
  AbsoluteWrapper,
  ArmerInfo,
  BackIcon,
  ButtonGradient,
  ComponentWrapper,
  CreateStripeAccountPopup,
  ErrorText,
  GoogleAutoComplete,
  IconButton,
  IconWithText,
  ImagePickerPopup,
  InputTitle,
  KeyboardAvoidingScrollView,
  LargeText,
  LoaderAbsolute,
  MainWrapper,
  MediumText,
  MediumTitle,
  PickerPrimary,
  PickerSearchable,
  PopupPrimary,
  ProductCardPrimary,
  RegularText,
  RenderTags,
  RowWrapper,
  Spacer,
  SwitchPrimary,
  TextInputUnderlined,
  Toasts,
  VerifyStripeAccountPopup,
  Wrapper,
} from '../../../components';
import {
  appStyles,
  Backend,
  colors,
  DummyData,
  HelpingMethods,
  routes,
  sizes,
  useImagePicker,
} from '../../../services';
import styles from './styles';
import * as ImagePicker from 'react-native-image-picker';
import {useSelector} from 'react-redux';
import {MaterialIndicator} from 'react-native-indicators';
const options = {
  title: 'Select Photo',
  quality: 1,
  maxWidth: 500,
  maxHeight: 500,
  // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
const addresses = [
  {
    label: 'Awami road',
    value: 'Awami road',
  },
  {
    label: 'Nisbat road',
    value: 'Nisbat road',
  },
];
function Sell(props) {
  const {navigation, route} = props;
  const {goBack, navigate} = navigation;
  const {params} = route;
  const productDetail = params
    ? params.productDetail
      ? params.productDetail
      : null
    : null;

  //redux states
  const product = useSelector(state => state.product);
  const user = useSelector(state => state.user);
  const {categories, items, actions, manufacturers, conditions, calibers} =
    product;
  console.log('product categories: ', categories);
  const {userDetail, stripeAccountDetail} = user;
  const {seller_stripe_account_id} = userDetail;

  const {openCamera, openLibrary} = useImagePicker();
  //local states
  const [step, setStep] = useState(1);
  const [
    isCreateStripeAccountPopupVisible,
    setCreateStripeAccountPopupVisibility,
  ] = useState(false);
  const toggleCreateStripeAccountPopup = () =>
    setCreateStripeAccountPopupVisibility(!isCreateStripeAccountPopupVisible);
  const [
    isVerifyStripeAccountPopupVisible,
    setVerifyStripeAccountPopupVisibility,
  ] = useState(false);
  const toggleVerifyStripeAccountPopup = () =>
    setVerifyStripeAccountPopupVisibility(!isVerifyStripeAccountPopupVisible);
  const headerTitle =
    step === 1
      ? productDetail
        ? 'Update Item'
        : 'Post an Item'
      : step === 2
      ? 'Add Product Details'
      : step === 3
      ? 'Add Location Details'
      : step === 4
      ? 'Price'
      : step === 5
      ? 'Finish'
      : '';
  const handleBackPress = () => {
    step === 1
      ? goBack()
      : [
          setStep(step - 1),
          handleChangeStep(singleStepIndicatorWdith * (step - 1)),
        ];
  };
  const goToNext = () => {
    setStep(step + 1);
    handleChangeStep(singleStepIndicatorWdith * (step + 1));
  };
  const handleOnNextStep = () => {
    if (step < 5) {
      HelpingMethods.handleAnimation();
      if (step === 1) {
        !imageFile && !imageUri
          ? setImageError('Please add image')
          : setImageError('');
        !title ? setTitleError('Please add title') : setTitleError('');
        if ((imageFile || imageUri) && title) {
          goToNext();
        }
      } else if (step === 2) {
        !item ? setitemError('Please select item') : setitemError('');
        !type ? settypeError('Please select type') : settypeError('');
        !manufacturer
          ? setmanufacturerError('Please select manufacturer')
          : setmanufacturerError('');
        !caliber
          ? setCalibreError('Please select caliber')
          : setCalibreError('');
        !action ? setactionError('Please select action') : setactionError('');
        !condition
          ? setConditionError('Please select condition')
          : setConditionError('');
        !description
          ? setDescriptionError('Please enter description')
          : setDescriptionError('');
        if (
          item &&
          type &&
          manufacturer &&
          caliber &&
          action &&
          condition &&
          description
        ) {
          goToNext();
        }
      } else if (step === 3) {
        !address ? setAddressError('Please add address') : setAddressError('');
        !city ? setCityError('Please add city') : setCityError('');
        !state ? setStateError('Please add state') : setStateError('');
        !zipcode ? setZipcodeError('Please add zipcode') : setZipcodeError('');
        if (address && city && state && zipcode) {
          goToNext();
        }
      } else if (step === 4) {
        !price ? setPriceError('Please enter price') : setPriceError('');
        isDiscountedPriceVisible && !discountedPrice
          ? setDiscountedPriceError('Please enter discounted price')
          : setDiscountedPriceError('');
        if (price) {
          if (!isDiscountedPriceVisible) {
            goToNext();
          } else {
            if (discountedPrice) {
              goToNext();
            }
          }
        }
      }
    } else {
      // seller_stripe_account_id
      //   ? stripeAccountDetail?.payouts_enabled
      //     ? productDetail
      //       ? handleEditProduct()
      //       : handleAddNewProduct()
      //     : toggleVerifyStripeAccountPopup()
      //   : toggleCreateStripeAccountPopup();
      productDetail ? handleEditProduct() : handleAddNewProduct();
    }
  };
  //configure Header
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: headerTitle,
      headerTitleAlign: 'center',
      headerRight: () => (
        <>
          {step === 1 ? (
            <ComponentWrapper>
              <Icon
                name="close"
                type="ionicon"
                size={totalSize(3)}
                onPress={() => goBack()}
              />
            </ComponentWrapper>
          ) : null}
        </>
      ),
      headerLeft: () => (
        <ComponentWrapper
          style={{
            marginLeft:
              Platform.OS === 'ios'
                ? sizes.marginHorizontal
                : sizes.marginHorizontal / 2,
          }}>
          <BackIcon onPress={handleBackPress} />
        </ComponentWrapper>
      ),
    });
  }, [navigation, step]);

  useEffect(() => {
    getSetProductDetail();
  }, []);
  const getSetProductDetail = () => {
    if (productDetail) {
      const {
        title,
        item,
        type,
        manufacturer,
        caliber,
        action,
        condition,
        description,
        city,
        state,
        zip_code,
        price,
        discounted_price,
        images,
        latitude,
        longitude,
      } = productDetail;
      setTitle(title);
      setitem(item);
      settype(type);
      setmanufacturer(manufacturer);
      setCalibre(caliber);
      setaction(action);
      setCondition(condition);
      setDescription(description);
      setCity(city);
      setState(state);
      setZipcode(zip_code);
      setPrice(price);
      discounted_price && [
        setDiscountedPrice(discounted_price),
        setDiscountedPriceVisibility(true),
      ];
      setLatitude(latitude);
      setLongitude(longitude);
      if (images) {
        const parsedImages = JSON.parse(images);
        if (parsedImages.length) {
          setImageUri(parsedImages[0]);
        }
      }
    }
  };

  const singleStepIndicatorWdith = width(100) / 5;
  const [stepIndicatorWidth, setStepIndicatorWidth] = useState(
    new Animated.Value(singleStepIndicatorWdith),
  );
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageError, setImageError] = useState('');
  const [isImagePickerPopupVisible, setImagePickerPopupVisibility] =
    useState(false);
  const toggleImagePickerPopup = () =>
    setImagePickerPopupVisibility(!isImagePickerPopupVisible);

  const [item, setitem] = useState('');
  const [itemError, setitemError] = useState('');
  const [type, settype] = useState('');
  const [typeError, settypeError] = useState('');
  const [manufacturer, setmanufacturer] = useState('');
  const [manufacturerError, setmanufacturerError] = useState('');
  const [caliber, setCalibre] = useState('');
  const [caliberError, setCalibreError] = useState('');
  const [action, setaction] = useState('');
  const [actionError, setactionError] = useState('');
  const [condition, setCondition] = useState('');
  const [conditionError, setConditionError] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState('');
  const [city, setCity] = useState('');
  const [cityError, setCityError] = useState('');
  const [state, setState] = useState('');
  const [stateError, setStateError] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [zipcodeError, setZipcodeError] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [loadingAddressComp, setLoadingAddressComp] = useState(false);

  const [price, setPrice] = useState('');
  const [priceError, setPriceError] = useState('');
  const [isDiscountedPriceVisible, setDiscountedPriceVisibility] = useState('');
  const [discountedPrice, setDiscountedPrice] = useState('');
  const [discountedPriceError, setDiscountedPriceError] = useState('');

  const [selectedProduct, setProduct] = useState(DummyData.products[0]);
  const tags = ['Handguns', 'Semi Automatic', 'Suppressor'];
  const [isLoading, setLoading] = useState(false);

  const handleChangeStep = value => {
    Animated.timing(stepIndicatorWidth, {
      toValue: value,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const launchImagePicker = async () => {
    const tempFile = await openLibrary();
    if (tempFile) {
      setImageFile(tempFile);
      imageError && setImageError('');
    }
    // ImagePicker.launchImageLibrary(options, (response) => {
    //     if (response.didCancel) {
    //         //console.log('User cancelled image picker');
    //     } else if (response.error) {
    //         //console.log('ImagePicker Error: ', response.error);
    //     } else if (response.customButton) {
    //         //console.log('User tapped custom button: ', response.customButton);
    //     } else {
    //         if (!response.fileName) response.fileName = 'profile_image';
    //         const tempFile = {
    //             uri: response.uri,
    //             name: response.fileName,
    //             type: response.type
    //         }
    //         imageError && setImageError('')
    //         console.log('')
    //         setImageFile(tempFile)
    //     }
    // });
  };
  const launchCamera = async () => {
    const tempFile = await openCamera();
    if (tempFile) {
      setImageFile(tempFile);
      imageError && setImageError('');
    }
    // ImagePicker.launchCamera(options, response => {
    //   if (response.didCancel) {
    //     console.log('User cancelled image picker');
    //   } else if (response.error) {
    //     console.log('ImagePicker Error: ', response.error);
    //   } else if (response.customButton) {
    //     console.log('User tapped custom button: ', response.customButton);
    //   } else {
    //     if (!response.fileName) response.fileName = 'profile_image';
    //     const tempFile = {
    //       uri: response.uri,
    //       name: response.fileName,
    //       type: response.type,
    //     };
    //     setImageFile(tempFile);
    //   }
    // });
  };

  const getArmerInfo = () => {
    let obj = {
      manufacturer: manufacturer,
      model: title,
      'caliber/Gauge': caliber,
      actionType: action,
      condition: condition,
    };
    return obj;
  };

  const handleAddNewProduct = async () => {
    setLoading(true);
    await Backend.add_Product({
      title,
      item,
      type,
      manufacturer,
      caliber,
      action,
      condition,
      description,
      city,
      statee: state,
      zip_code: zipcode,
      price,
      discounted_price:
        isDiscountedPriceVisible && discountedPrice ? discountedPrice : null,
      image: imageFile,
      address,
      latitude,
      longitude,
    }).then(res => {
      if (res) {
        goBack();
        Toasts.success('Product has been added');
      }
    });
    setLoading(false);
  };
  const handleEditProduct = async () => {
    setLoading(true);
    await Backend.edit_Product({
      product_id: productDetail.id,
      title,
      item,
      type,
      manufacturer,
      caliber,
      action,
      condition,
      description,
      city,
      statee: state,
      zip_code: zipcode,
      price,
      discounted_price: discountedPrice,
      image: imageFile,
      address,
      latitude,
      longitude,
    }).then(res => {
      if (res) {
        goBack();
        Toasts.success('Product has been updated');
      }
    });
    setLoading(false);
  };
  const handleSetAddress = async (details, location) => {
    console.log('details', details);
    //console.log('main_text_matched_substrings', details.main_text_matched_substrings)
    console.log('location', location);
    const {structured_formatting} = details;
    //setAddress(details.description)
    addressError && setAddressError('');
    setAddress(structured_formatting.main_text);
    setLatitude(location.lat);
    setLongitude(location.lng);
    setLoadingAddressComp(true);
    await Backend.getLocationDetailsFromLatLong({
      latitude: location.lat,
      longitude: location.lng,
    }).then(res => {
      console.log('getLocationDetailsFromLatLong details ', res);
      cityError && setCityError('');
      stateError && setStateError('');
      zipcodeError && setZipcodeError('');
      res.address && setAddress(res.address);
      setZipcode(res.zipcode);
      setCity(res.city);
      setState(res.state);
    });

    setLoadingAddressComp(false);
  };
  const AddressLoaders = () => {
    return (
      <>
        {loadingAddressComp ? (
          <MaterialIndicator size={totalSize(2)} color={colors.appTextColor4} />
        ) : null}
      </>
    );
  };
  return (
    <MainWrapper>
      <Animated.View
        style={{
          height: 3,
          backgroundColor: colors.appColor1,
          width: stepIndicatorWidth,
          borderRadius: 5,
        }}
      />
      <KeyboardAvoidingScrollView>
        <Spacer height={sizes.baseMargin} />
        {step === 1 ? (
          <Wrapper flex={1}>
            <TouchableOpacity
              onPress={toggleImagePickerPopup}
              style={{
                backgroundColor: colors.appBgColor3,
                ...styles.imageStyle,
              }}>
              {imageFile || imageUri ? (
                <AbsoluteWrapper
                  style={[{top: 0, right: 0, left: 0, bottom: 0}]}>
                  <Image
                    source={{uri: imageFile ? imageFile.uri : imageUri}}
                    style={{
                      height: '100%',
                      width: '100%',
                      borderRadius: sizes.cardRadius * 2,
                    }}
                    resizeMode="contain"
                  />
                </AbsoluteWrapper>
              ) : null}
              <AbsoluteWrapper
                style={[
                  {top: 0, right: 0, left: 0, bottom: 0},
                  appStyles.center,
                ]}>
                <IconWithText
                  iconName="camera"
                  iconType="feather"
                  text={
                    imageFile || imageUri
                      ? 'Retake photo'
                      : 'Add your product photo'
                  }
                  direction="column"
                  iconSize={totalSize(5)}
                  textStyle={[
                    appStyles.textMedium,
                    (imageFile || imageUri) && appStyles.textWhite,
                  ]}
                  onPress={toggleImagePickerPopup}
                  tintColor={
                    imageFile || imageUri
                      ? colors.appTextColor6
                      : colors.appTextColor1
                  }
                />
              </AbsoluteWrapper>
            </TouchableOpacity>
            <ComponentWrapper style={[appStyles.center]}>
              <ErrorText text={imageError} />
            </ComponentWrapper>
            <Spacer height={sizes.baseMargin} />
            <TextInputUnderlined
              title="Add a Title"
              value={title}
              onChangeText={text => {
                titleError && setTitleError('');
                setTitle(text);
              }}
              error={titleError}
            />
            <Spacer height={sizes.baseMargin} />
          </Wrapper>
        ) : step === 2 ? (
          <Wrapper flex={1}>
            <PickerSearchable
              title="Item"
              // placeholder="No Selected"
              data={items}
              value={item}
              onPressItem={(item, index) => {
                setitem(item?.value);
                itemError && setitemError('');
              }}
              onChangeText={() => {
                item && setitem('');
              }}
              error={itemError}
              onPressAdd={()=>{
                console.log('new value added')
              }}
            />
            {/* <PickerPrimary
              title="Item"
              // placeholder="No Selected"
              data={items}
              value={item}
              onChange={(value, index) => {
                itemError && setitemError('');
                setitem(value);
              }}
              error={itemError}
            /> */}
            <Spacer height={sizes.baseMargin} />
            <PickerPrimary
              title="Type"
              // placeholder="No Selected"
              data={categories}
              value={type}
              onChange={(value, index) => {
                typeError && settypeError('');
                settype(value);
              }}
              error={typeError}
            />
            <Spacer height={sizes.baseMargin} />
            <PickerPrimary
              title="Manufacturer"
              // placeholder="No Selected"
              data={manufacturers}
              value={manufacturer}
              onChange={(value, index) => {
                manufacturerError && setmanufacturerError('');
                setmanufacturer(value);
              }}
              error={manufacturerError}
            />
            <Spacer height={sizes.baseMargin} />
            <PickerPrimary
              title="Caliber"
              // placeholder="No Selected"
              data={calibers}
              value={caliber}
              onChange={(value, index) => {
                caliberError && setCalibreError('');
                setCalibre(value);
              }}
              error={caliberError}
            />
            <Spacer height={sizes.baseMargin} />
            <PickerPrimary
              title="Action"
              // placeholder="No Selected"
              data={actions}
              value={action}
              onChange={(value, index) => {
                actionError && setactionError('');
                setaction(value);
              }}
              error={actionError}
            />
            <Spacer height={sizes.baseMargin} />
            <PickerPrimary
              title="Condition"
              // placeholder="No Selected"
              data={conditions}
              value={condition}
              onChange={(value, index) => {
                conditionError && setConditionError('');
                setCondition(value);
              }}
              error={conditionError}
            />
            <Spacer height={sizes.baseMargin} />
            <TextInputUnderlined
              titleStatic="Description"
              value={description}
              onChangeText={text => {
                descriptionError && setDescriptionError('');
                setDescription(text);
              }}
              multiline
              inputStyle={{height: height(15), textAlignVertical: 'top'}}
              error={descriptionError}
            />
            <Spacer height={sizes.baseMargin} />
          </Wrapper>
        ) : step === 3 ? (
          <Wrapper flex={1}>
            <ComponentWrapper
              style={{marginHorizontal: sizes.marginHorizontalLarge}}>
              <InputTitle>Address</InputTitle>
              <GoogleAutoComplete
                onPressItem={handleSetAddress}
                value={address}
                leftIcon={null}
                textInputContainer={{
                  borderWidth: 0,
                  borderRadius: 0,
                  borderBottomWidth: 1,
                  borderColor: colors.appBgColor4,
                  marginHorizontal: 0,
                  paddingHorizontal: 0,
                }}
                placeholder="Type here..."
              />
              <ErrorText text={addressError} />
            </ComponentWrapper>
            <Spacer height={sizes.baseMargin} />

            <TextInputUnderlined
              title="City"
              value={city}
              onChangeText={text => setCity(text)}
              right={<AddressLoaders />}
              error={cityError}
            />
            <Spacer height={sizes.baseMargin} />
            <TextInputUnderlined
              title="State"
              value={state}
              onChangeText={text => setState(text)}
              right={<AddressLoaders />}
              error={stateError}
            />
            <Spacer height={sizes.baseMargin} />
            <TextInputUnderlined
              title="Zipcode"
              value={zipcode}
              onChangeText={text => setZipcode(text)}
              right={<AddressLoaders />}
              error={zipcodeError}
            />
            <Spacer height={sizes.baseMargin} />
          </Wrapper>
        ) : step === 4 ? (
          <Wrapper flex={1}>
            <TextInputUnderlined
              value={`${(price.length ? '$' : '') + price}`}
              onChangeText={text => {
                priceError && setPriceError('');
                setPrice(text.replace('$', ''));
              }}
              placeholder="Price"
              inputStyle={[
                {textAlign: 'center'},
                appStyles.h3,
                appStyles.textPrimaryColor,
              ]}
              error={priceError}
            />
            <Spacer height={sizes.baseMargin * 2} />
            <RowWrapper>
              <MediumText>Enable Discounted Price?</MediumText>
              <SwitchPrimary
                value={isDiscountedPriceVisible}
                onPress={() =>
                  setDiscountedPriceVisibility(!isDiscountedPriceVisible)
                }
              />
            </RowWrapper>
            {isDiscountedPriceVisible ? (
              <>
                <Spacer height={sizes.baseMargin * 1.5} />
                <TextInputUnderlined
                  value={`${
                    (discountedPrice.length ? '$' : '') + discountedPrice
                  }`}
                  onChangeText={text => {
                    discountedPriceError && setDiscountedPriceError('');
                    setDiscountedPrice(text.replace('$', ''));
                  }}
                  placeholder="Discounted Price"
                  inputStyle={[
                    {textAlign: 'center'},
                    appStyles.h3,
                    appStyles.textPrimaryColor,
                  ]}
                  error={discountedPriceError}
                />
              </>
            ) : null}
          </Wrapper>
        ) : step === 5 ? (
          <Wrapper flex={1}>
            <ProductCardPrimary
              //isFavourite={HelpingMethods.checkIsProductFavourite(selectedProduct.id)}
              viewType={'list'}
              image={imageFile ? imageFile.uri : imageUri}
              description={description}
              discountedPrice={
                isDiscountedPriceVisible && discountedPrice
                  ? discountedPrice
                  : ''
              }
              price={price}
              location={city}
              rating={userDetail.avg_rating}
              reviewCount={userDetail.reviews_count}
              userImage={userDetail.profile_photo_path}
              userName={userDetail.first_name + ' ' + userDetail.last_name}
              // onPress={(item, index) => {
              //     sheetRef.current.snapTo(0);
              //     navigate(routes.productDetail, { product: selectedProduct })
              // }}
            />
            <Spacer height={sizes.smallMargin} />
            <ComponentWrapper>
              <RenderTags tags={[type, item]} />
            </ComponentWrapper>
            <Spacer height={sizes.smallMargin} />
            <ArmerInfo info={getArmerInfo()} />
            <Spacer height={sizes.smallMargin} />
            <ComponentWrapper>
              <RegularText>{description}</RegularText>
            </ComponentWrapper>
          </Wrapper>
        ) : null}
      </KeyboardAvoidingScrollView>
      <Wrapper>
        <Spacer height={sizes.baseMargin} />
        <ButtonGradient
          text={step < 5 ? 'Next' : productDetail ? 'Update' : 'Post'}
          onPress={handleOnNextStep}
        />
        <Spacer height={sizes.baseMargin * 1.5} />
      </Wrapper>
      <ImagePickerPopup
        visible={isImagePickerPopupVisible}
        toggle={toggleImagePickerPopup}
        onPressTakePhoto={launchCamera}
        onPressSelectFromGalary={launchImagePicker}
      />
      <CreateStripeAccountPopup
        visible={isCreateStripeAccountPopupVisible}
        toggle={toggleCreateStripeAccountPopup}
      />
      <VerifyStripeAccountPopup
        visible={isVerifyStripeAccountPopupVisible}
        toggle={toggleVerifyStripeAccountPopup}
      />
      <LoaderAbsolute
        isVisible={isLoading}
        title={(productDetail ? 'Updating' : 'Adding') + ' Your Product'}
        info="Please wait..."
      />
    </MainWrapper>
  );
}

export default Sell;
