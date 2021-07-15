import React, { Component, useState } from 'react';
import { View, Text, Platform, TouchableOpacity } from 'react-native';
import { height, totalSize } from 'react-native-dimension';
import { Icon } from 'react-native-elements';
import { BackIcon, ButtonGradient, ComponentWrapper, IconWithText, KeyboardAvoidingScrollView, MainWrapper, PickerPrimary, Spacer, TextInputUnderlined, Wrapper } from '../../../components';
import { appStyles, colors, sizes } from '../../../services';
import styles from './styles'

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
            setStep(step - 1)
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

    const [title, setTitle] = useState('')
    const [imageUrl, setImageUrl] = useState(null)

    const [item, setitem] = useState('')
    const [type, settype] = useState('')
    const [manufacturer, setmanufacturer] = useState('')
    const [calibre, setCalibre] = useState('')
    const [action, setaction] = useState('')
    const [condition, setCondition] = useState('')
    const [description, setDescription] = useState('')

    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zipcode, setZipcode] = useState('')

    const [price, setPrice] = useState('')
    const [isDiscountedPriceVisible, setDiscountedPriceVisibility] = useState('')
    const [discountedPrice, setDiscountedPrice] = useState('')
    return (
        <MainWrapper>
            <KeyboardAvoidingScrollView>
                <Spacer height={sizes.baseMargin} />
                {
                    step === 1 ?
                        <Wrapper flex={1}>
                            <TouchableOpacity style={{ marginHorizontal: sizes.marginHorizontal, backgroundColor: colors.appBgColor4, ...styles.imageStyle, ...appStyles.center }}>
                                <IconWithText
                                    iconName="camera"
                                    iconType="feather"
                                    text="Add your product photo"
                                    direction="column"
                                    iconSize={totalSize(5)}
                                    textStyle={[appStyles.textMedium]}
                                />
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
                                    title="Calibre"
                                    // placeholder="No Selected"
                                    data={options}
                                    value={calibre}
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

                                    </Wrapper>
                                    :
                                    step === 5 ?
                                        <Wrapper flex={1}>

                                        </Wrapper>
                                        :
                                        null
                }
            </KeyboardAvoidingScrollView>
            <Wrapper>
                <Spacer height={sizes.baseMargin} />
                <ButtonGradient
                    text={step < 5 ? "Next" : "Post"}
                    onPress={() => {
                        step < 5 ? setStep(step + 1) :
                            null
                    }}
                />
                <Spacer height={sizes.baseMargin * 1.5} />
            </Wrapper>
        </MainWrapper>
    );
}

export default Sell;
