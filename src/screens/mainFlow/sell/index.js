import React, { Component, useEffect, useState } from 'react';
import { View, Text, Platform, TouchableOpacity, Image, Animated } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';
import { Icon } from 'react-native-elements';
import { AbsoluteWrapper, ArmerInfo, BackIcon, ButtonGradient, ComponentWrapper, IconWithText, ImagePickerPopup, KeyboardAvoidingScrollView, LoaderAbsolute, MainWrapper, MediumText, PickerPrimary, ProductCardPrimary, RegularText, RenderTags, RowWrapper, Spacer, SwitchPrimary, TextInputUnderlined, Toasts, Wrapper } from '../../../components';
import { appStyles, Backend, colors, DummyData, HelpingMethods, sizes } from '../../../services';
import styles from './styles'
import * as ImagePicker from 'react-native-image-picker';
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import { TextInput } from 'react-native';
import { useSelector } from 'react-redux';
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

function Sell(props) {
    const { navigation, route } = props
    const { goBack, navigate } = navigation
    const { params } = route
    const productDetail =params? params.productDetail ? params.productDetail : null:null

    //redux states
    const product = useSelector(state => state.product)
    const user = useSelector(state => state.user)
    const { categories, items, actions, manufacturers, conditions, calibers } = product
    const { userDetail } = user
    //local states
    const [step, setStep] = useState(1)
    const headerTitle = step === 1 ? productDetail ? "Update Item" : "Post an Item" : step === 2 ? "Add Product Details" : step === 3 ? "Add Location Details" : step === 4 ? "Price" : step === 5 ? "Finish" : ""
    const handleBackPress = () => {
        step === 1 ?
            goBack() :
            [
                setStep(step - 1),
                handleChangeStep(singleStepIndicatorWith * (step - 1))
            ]
    }
    const handleOnNextStep = () => {
        step < 5 ? [
            setStep(step + 1),
            handleChangeStep(singleStepIndicatorWith * (step + 1))
        ] :
            [
                productDetail ? handleEditProduct() : handleAddNewProduct()
            ]
    }
    //configure Header
    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: headerTitle,
            headerTitleAlign: 'center',
            headerRight: () => (
                <>
                    {
                        step === 1 ?
                            <ComponentWrapper>
                                <Icon
                                    name="close"
                                    type="ionicon"
                                    size={totalSize(3)}
                                    onPress={() => goBack()}
                                />
                            </ComponentWrapper>
                            :
                            null
                    }
                </>
            ),
            headerLeft: () =>
                <ComponentWrapper
                    style={{ marginLeft: Platform.OS === 'ios' ? sizes.marginHorizontal : sizes.marginHorizontal / 2 }}>
                    <BackIcon
                        onPress={handleBackPress}
                    />
                </ComponentWrapper>,
        });
    }, [navigation, step]);

    useEffect(() => {
        getSetProductDetail()
    }, [])
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
                longitude
            } = productDetail
            setTitle(title)
            setitem(item)
            settype(type)
            setmanufacturer(manufacturer)
            setCalibre(caliber)
            setaction(action)
            setCondition(condition)
            setDescription(description)
            setCity(city)
            setState(state)
            setZipcode(zip_code)
            setPrice(price)
            discounted_price && [setDiscountedPrice(discounted_price), setDiscountedPriceVisibility(true)]
            setLatitude(latitude)
            setLongitude(longitude)
            if (images) {
                const parsedImages = JSON.parse(images)
                if (parsedImages.length) {
                    setImageUri(parsedImages[0])
                }
            }
        }
    }


    const singleStepIndicatorWith = width(100) / 5
    const [stepIndicatorWidth, setStepIndicatorWidth] = useState(new Animated.Value(singleStepIndicatorWith))
    const [title, setTitle] = useState('')
    const [imageUri, setImageUri] = useState(null)
    const [imageFile, setImageFile] = useState(null)
    const [isImagePickerPopupVisible, setImagePickerPopupVisibility] = useState(false);
    const toggleImagePickerPopup = () => setImagePickerPopupVisibility(!isImagePickerPopupVisible)

    const [item, setitem] = useState('')
    const [type, settype] = useState('')
    const [manufacturer, setmanufacturer] = useState('')
    const [caliber, setCalibre] = useState('')
    const [action, setaction] = useState('')
    const [condition, setCondition] = useState('')
    const [description, setDescription] = useState('')

    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zipcode, setZipcode] = useState('')
    const [latitude, setLatitude] = useState('78.090909')
    const [longitude, setLongitude] = useState('-102.09876')

    const [price, setPrice] = useState('')
    const [isDiscountedPriceVisible, setDiscountedPriceVisibility] = useState('')
    const [discountedPrice, setDiscountedPrice] = useState('')

    const [selectedProduct, setProduct] = useState(DummyData.products[0])
    const tags = ['Handguns', 'Semi Automatic', 'Suppressor']
    const [isLoading, setLoading] = useState(false)


    const handleChangeStep = (value) => {
        Animated.timing(stepIndicatorWidth, {
            toValue: value,
            duration: 500,
            useNativeDriver: false,
        }).start();
    };

    const launchImagePicker = () => {
        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                //console.log('User cancelled image picker');
            } else if (response.error) {
                //console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                //console.log('User tapped custom button: ', response.customButton);
            } else {
                if (!response.fileName) response.fileName = 'profile_image';
                const tempFile = {
                    uri: response.uri,
                    name: response.fileName,
                    type: response.type
                }
                setImageFile(tempFile)
            }
        });
    }
    const launchCamera = () => {
        ImagePicker.launchCamera(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                if (!response.fileName) response.fileName = 'profile_image';
                const tempFile = {
                    uri: response.uri,
                    name: response.fileName,
                    type: response.type
                }
                setImageFile(tempFile)
            }
        });
    }

    const getArmerInfo = () => {
        let obj = {
            "manufacturer": manufacturer,
            "model": title,
            "caliber/Gauge": caliber,
            "actionType": action,
            "condition": condition
        }
        return obj
    }

    const handleAddNewProduct = async () => {
        setLoading(true)
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
            discounted_price: discountedPrice,
            image: imageFile,
            latitude,
            longitude
        }).then(res => {
            if (res) {
                goBack()
                Toasts.success('Product has been added')
            }
        })
        setLoading(false)
    }
    const handleEditProduct = async () => {
        setLoading(true)
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
            latitude,
            longitude
        }).then(res => {
            if (res) {
                goBack()
                Toasts.success('Product has been updated')
            }
        })
        setLoading(false)
    }
    return (
        <MainWrapper>
            <Animated.View
                style={{ height: 3, backgroundColor: colors.appColor1, width: stepIndicatorWidth, borderRadius: 5 }}
            />
            <KeyboardAvoidingScrollView>
                <Spacer height={sizes.baseMargin} />
                {
                    step === 1 ?
                        <Wrapper flex={1}>

                            <TouchableOpacity
                                onPress={toggleImagePickerPopup}
                                style={{ backgroundColor: colors.appBgColor3, ...styles.imageStyle, }}>
                                {
                                    imageFile || imageUri ?
                                        <AbsoluteWrapper style={[{ top: 0, right: 0, left: 0, bottom: 0 }]}>
                                            <Image
                                                source={{ uri: imageFile ? imageFile.uri : imageUri }}
                                                style={{ height: '100%', width: '100%', borderRadius: sizes.cardRadius * 2 }}
                                                resizeMode="contain"
                                            />
                                        </AbsoluteWrapper>
                                        :
                                        null
                                }
                                <AbsoluteWrapper style={[{ top: 0, right: 0, left: 0, bottom: 0 }, appStyles.center]}>
                                    <IconWithText
                                        iconName="camera"
                                        iconType="feather"
                                        text={imageFile || imageUri ? "Retake photo" : "Add your product photo"}
                                        direction="column"
                                        iconSize={totalSize(5)}
                                        textStyle={[appStyles.textMedium, (imageFile || imageUri) && appStyles.textWhite]}
                                        onPress={toggleImagePickerPopup}
                                        tintColor={imageFile || imageUri ? colors.appTextColor6 : colors.appTextColor1}
                                    />
                                </AbsoluteWrapper>
                            </TouchableOpacity>

                            <Spacer height={sizes.baseMargin} />
                            <TextInputUnderlined
                                title="Add a Title"
                                value={title}
                                onChangeText={text => setTitle(text)}
                            />
                            <Spacer height={sizes.baseMargin} />
                        </Wrapper>
                        :
                        step === 2 ?
                            <Wrapper flex={1}>
                                <PickerPrimary
                                    title="Item"
                                    // placeholder="No Selected"
                                    data={items}
                                    value={item}
                                    onChange={(value, index) => setitem(value)}
                                />
                                <Spacer height={sizes.baseMargin} />
                                <PickerPrimary
                                    title="Type"
                                    // placeholder="No Selected"
                                    data={categories}
                                    value={type}
                                    onChange={(value, index) => settype(value)}
                                />
                                <Spacer height={sizes.baseMargin} />
                                <PickerPrimary
                                    title="Manufacturer"
                                    // placeholder="No Selected"
                                    data={manufacturers}
                                    value={manufacturer}
                                    onChange={(value, index) => setmanufacturer(value)}
                                />
                                <Spacer height={sizes.baseMargin} />
                                <PickerPrimary
                                    title="Caliber"
                                    // placeholder="No Selected"
                                    data={calibers}
                                    value={caliber}
                                    onChange={(value, index) => setCalibre(value)}
                                />
                                <Spacer height={sizes.baseMargin} />
                                <PickerPrimary
                                    title="Action"
                                    // placeholder="No Selected"
                                    data={actions}
                                    value={action}
                                    onChange={(value, index) => setaction(value)}
                                />
                                <Spacer height={sizes.baseMargin} />
                                <PickerPrimary
                                    title="Condition"
                                    // placeholder="No Selected"
                                    data={conditions}
                                    value={condition}
                                    onChange={(value, index) => setCondition(value)}
                                />
                                <Spacer height={sizes.baseMargin} />
                                <TextInputUnderlined
                                    titleStatic="Description"
                                    value={description}
                                    onChangeText={text => setDescription(text)}
                                    multiline
                                    inputStyle={{ height: height(15), textAlignVertical: 'top' }}
                                />
                                <Spacer height={sizes.baseMargin} />
                            </Wrapper>
                            :
                            step === 3 ?
                                <Wrapper flex={1}>
                                    <TextInputUnderlined
                                        title="City"
                                        value={city}
                                        onChangeText={text => setCity(text)}
                                    />
                                    <Spacer height={sizes.baseMargin} />
                                    <TextInputUnderlined
                                        title="State"
                                        value={state}
                                        onChangeText={text => setState(text)}
                                    />
                                    <Spacer height={sizes.baseMargin} />
                                    <TextInputUnderlined
                                        title="Zipcode"
                                        value={zipcode}
                                        onChangeText={text => setZipcode(text)}
                                    />
                                    <Spacer height={sizes.baseMargin} />
                                </Wrapper>
                                :
                                step === 4 ?
                                    <Wrapper flex={1}>
                                        <TextInputUnderlined
                                            value={`${(price.length ? '$' : '') + price}`}
                                            onChangeText={(text) => setPrice(text.replace('$', ''))}
                                            placeholder="Price"
                                            inputStyle={[{ textAlign: 'center' }, appStyles.h3, appStyles.textPrimaryColor]}
                                        />
                                        <Spacer height={sizes.baseMargin * 2} />
                                        <RowWrapper>
                                            <MediumText>Enable Discounted Price?</MediumText>
                                            <SwitchPrimary
                                                value={isDiscountedPriceVisible}
                                                onPress={() => setDiscountedPriceVisibility(!isDiscountedPriceVisible)}
                                            />
                                        </RowWrapper>
                                        {
                                            isDiscountedPriceVisible ?
                                                <>
                                                    <Spacer height={sizes.baseMargin * 1.5} />
                                                    <TextInputUnderlined
                                                        value={`${(discountedPrice.length ? '$' : '') + discountedPrice}`}
                                                        onChangeText={(text) => setDiscountedPrice(text.replace('$', ''))}
                                                        placeholder="Discounted Price"
                                                        inputStyle={[{ textAlign: 'center' }, appStyles.h3, appStyles.textPrimaryColor]}
                                                    />
                                                </>
                                                :
                                                null
                                        }

                                    </Wrapper>
                                    :
                                    step === 5 ?
                                        <Wrapper flex={1}>
                                            <ProductCardPrimary
                                                //isFavourite={HelpingMethods.checkIsProductFavourite(selectedProduct.id)}
                                                viewType={'list'}
                                                image={imageFile ? imageFile.uri : imageUri}
                                                description={description}
                                                newPrice={discountedPrice}
                                                oldPrice={price}
                                                location={city}
                                                rating={selectedProduct.rating}
                                                reviewCount={selectedProduct.review_count}
                                                userImage={userDetail.profile_image}
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
                                            <ArmerInfo
                                                info={getArmerInfo()}
                                            />
                                            <Spacer height={sizes.smallMargin} />
                                            <ComponentWrapper>
                                                <RegularText>{description}</RegularText>
                                            </ComponentWrapper>
                                        </Wrapper>
                                        :
                                        null
                }
            </KeyboardAvoidingScrollView>
            <Wrapper>
                <Spacer height={sizes.baseMargin} />
                <ButtonGradient
                    text={step < 5 ? "Next" : productDetail ? "Update" : "Post"}
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
            <LoaderAbsolute
                isVisible={isLoading}
                title={(productDetail ? "Updating" : "Adding") + " Your Product"}
                info="Please wait..."
            />
        </MainWrapper >
    );
}

export default Sell;
