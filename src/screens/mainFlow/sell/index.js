import React, { Component, useState } from 'react';
import { View, Text, Platform, TouchableOpacity, Image, Animated } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';
import { Icon } from 'react-native-elements';
import { AbsoluteWrapper, ArmerInfo, BackIcon, ButtonGradient, ComponentWrapper, IconWithText, ImagePickerPopup, KeyboardAvoidingScrollView, MainWrapper, MediumText, PickerPrimary, ProductCardPrimary, RegularText, RenderTags, RowWrapper, Spacer, SwitchPrimary, TextInputUnderlined, Toasts, Wrapper } from '../../../components';
import { appStyles, colors, DummyData, HelpingMethods, sizes } from '../../../services';
import styles from './styles'
import * as ImagePicker from 'react-native-image-picker';
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import { TextInput } from 'react-native';
const options = [
    {
        label: 'Option 1',
        value: 'Option 1'
    },
    {
        label: 'Option 2',
        value: 'Option 2'
    },
    {
        label: 'Option 3',
        value: 'Option 3'
    }
]

function Sell(props) {
    const { navigation, route } = props
    const { goBack, navigate } = navigation
    const [step, setStep] = useState(1)
    const headerTitle = step === 1 ? "Post an Item" : step === 2 ? "Add Product Details" : step === 3 ? "Add Location Details" : step === 4 ? "Price" : step === 5 ? "Finish" : ""
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
                goBack(),
                Toasts.success('Item Posted')
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

    const singleStepIndicatorWith = width(100) / 5
    const [stepIndicatorWidth, setStepIndicatorWidth] = useState(new Animated.Value(singleStepIndicatorWith))
    const [title, setTitle] = useState('')
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

    const [price, setPrice] = useState('')
    const [isDiscountedPriceVisible, setDiscountedPriceVisibility] = useState('')
    const [discountedPrice, setDiscountedPrice] = useState('')

    const [selectedProduct, setProduct] = useState(DummyData.products[0])
    const tags = ['Handguns', 'Semi Automatic', 'Suppressor']
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
    const checkCameraPermission = () => {
        check(Platform.OS === 'android' ? PERMISSIONS.ANDROID.CAMERA : PERMISSIONS.IOS.CAMERA)
            .then((result) => {
                switch (result) {
                    case RESULTS.UNAVAILABLE:
                        console.log('This feature is not available (on this device / in this context)');
                        break;
                    case RESULTS.DENIED:
                        //console.log('The permission has not been requested / is denied but requestable');
                        requestCameraPermission()
                        break;
                    case RESULTS.LIMITED:
                        console.log('The permission is limited: some actions are possible');
                        break;
                    case RESULTS.GRANTED:
                        //console.log('The permission is granted');
                        launchCamera()
                        break;
                    case RESULTS.BLOCKED:
                        console.log('The permission is denied and not requestable anymore');
                        break;
                }
            })
            .catch((error) => {
                // …
            });
    }
    const getArmerInfo = () => {
        let obj = {
            "manufacturer": 'Browning',
            "model": 'Buck Mark Plus Vision Black/Gold Suppressor Ready',
            "caliber/Gauge": '22 LR',
            "actionType": 'Semi Auto',
            "condition": "Used"
        }
        return obj
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
                                style={{ backgroundColor: colors.appBgColor4, ...styles.imageStyle, }}>
                                {
                                    imageFile ?
                                        <AbsoluteWrapper style={[{ top: 0, right: 0, left: 0, bottom: 0 }]}>
                                            <Image
                                                source={{ uri: imageFile.uri }}
                                                style={{ height: '100%', width: '100%', borderRadius: sizes.cardRadius * 2 }}
                                            />
                                        </AbsoluteWrapper>
                                        :
                                        null
                                }
                                <AbsoluteWrapper style={[{ top: 0, right: 0, left: 0, bottom: 0 }, appStyles.center]}>
                                    <IconWithText
                                        iconName="camera"
                                        iconType="feather"
                                        text={imageFile ? "Retake photo" : "Add your product photo"}
                                        direction="column"
                                        iconSize={totalSize(5)}
                                        textStyle={[appStyles.textMedium, imageFile && appStyles.textWhite]}
                                        onPress={toggleImagePickerPopup}
                                        tintColor={imageFile ? colors.appTextColor6 : colors.appTextColor1}
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
                                    data={options}
                                    value={item}
                                    onChange={(value, index) => setitem(value)}
                                />
                                <Spacer height={sizes.baseMargin} />
                                <PickerPrimary
                                    title="Type"
                                    // placeholder="No Selected"
                                    data={options}
                                    value={type}
                                    onChange={(value, index) => settype(value)}
                                />
                                <Spacer height={sizes.baseMargin} />
                                <PickerPrimary
                                    title="Manufacturer"
                                    // placeholder="No Selected"
                                    data={options}
                                    value={manufacturer}
                                    onChange={(value, index) => setmanufacturer(value)}
                                />
                                <Spacer height={sizes.baseMargin} />
                                <PickerPrimary
                                    title="Caliber"
                                    // placeholder="No Selected"
                                    data={options}
                                    value={caliber}
                                    onChange={(value, index) => setCalibre(value)}
                                />
                                <Spacer height={sizes.baseMargin} />
                                <PickerPrimary
                                    title="Action"
                                    // placeholder="No Selected"
                                    data={options}
                                    value={action}
                                    onChange={(value, index) => setaction(value)}
                                />
                                <Spacer height={sizes.baseMargin} />
                                <PickerPrimary
                                    title="Condition"
                                    // placeholder="No Selected"
                                    data={options}
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
                                                image={selectedProduct.image}
                                                description={selectedProduct.description}
                                                newPrice={selectedProduct.new_price}
                                                oldPrice={selectedProduct.old_price}
                                                location={selectedProduct.location}
                                                rating={selectedProduct.rating}
                                                reviewCount={selectedProduct.review_count}
                                                userImage={selectedProduct.user.image}
                                                userName={selectedProduct.user.name}
                                            // onPress={(item, index) => {
                                            //     sheetRef.current.snapTo(0);
                                            //     navigate(routes.productDetail, { product: selectedProduct })
                                            // }}
                                            />
                                            <Spacer height={sizes.smallMargin} />
                                            <ComponentWrapper>
                                                <RenderTags tags={tags} />
                                            </ComponentWrapper>
                                            <Spacer height={sizes.smallMargin} />
                                            <ArmerInfo
                                                info={getArmerInfo()}
                                            />
                                            <Spacer height={sizes.smallMargin} />
                                            <ComponentWrapper>
                                                <RegularText>Curabitur auctor leo et libero consetur gravida. Morbi gravida et sem dictum varius. Curabitur auctor leo et libero consetur gravida. Morbi gravida et sem dictum varius.</RegularText>
                                            </ComponentWrapper>
                                        </Wrapper>
                                        :
                                        null
                }
            </KeyboardAvoidingScrollView>
            <Wrapper>
                <Spacer height={sizes.baseMargin} />
                <ButtonGradient
                    text={step < 5 ? "Next" : "Post"}
                    onPress={handleOnNextStep}
                />
                <Spacer height={sizes.baseMargin * 1.5} />
            </Wrapper>
            <ImagePickerPopup
                visible={isImagePickerPopupVisible}
                toggle={toggleImagePickerPopup}
                onPressTakePhoto={checkCameraPermission}
                onPressSelectFromGalary={launchImagePicker}
            />
        </MainWrapper >
    );
}

export default Sell;
