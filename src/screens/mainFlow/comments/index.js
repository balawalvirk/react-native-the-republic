import React, { Component, useEffect, useState } from 'react';
import { KeyboardAvoidingView, TextInput } from 'react-native';
import { View, Text } from 'react-native';
import { height } from 'react-native-dimension';
import { ButtonColored, ButtonGradient, ComponentWrapper, ImagesPrimary, KeyboardAvoidingScrollView, MainWrapper, MediumTitle, PickerPrimary, SmallTitle, Spacer, TextInputUnderlined, TinyTitle, TitlePrimary, Toasts } from '../../../components';
import { appStyles, Backend, HelpingMethods, sizes } from '../../../services';
import ImageCropPicker from 'react-native-image-crop-picker';

const features = [
    {
        label: 'Searching Product',
        value: 'Searching Product'
    },
    {
        label: 'Add Product',
        value: 'Add Product'
    },
    {
        label: 'Registration',
        value: 'Registration',
    },
    {
        label: 'Subscription',
        value: 'Subscription',
    }
]
function Comments(props) {
    const { goBack } = props.navigation
    const [selectedFeature, selectFeature] = useState('')
    const [featureError, setFeatureError] = useState('')
    const [comment, setComment] = useState('')
    const [commentError, setCommentError] = useState('')
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(false)


    const takePics = () => {
        ImageCropPicker.openPicker({
            quality: 5,
            compressImageMaxHeight: 500,
            compressImageMaxWidth: 500,
            cropping: false,
            multiple: true,
        }).then(response => {
            let tempArray = [];
            //this.setState({ ImageSource: response });
            let photos = []
            for (const item of response) {
                let pathParts = item.path.split('/');
                const tempObj = {
                    // ...item,
                    uri: item.path,
                    type: item.mime,
                    name: pathParts[pathParts.length - 1]
                }
                photos.push(tempObj);
            }
            setImages([...images, ...photos])
        });
    }


    const validations = () => {
        HelpingMethods.handleAnimation()
        !selectedFeature ? setFeatureError('Please Select Feature / Functionality') : setFeatureError('')
        !comment ? setCommentError('Please wirte your comment') : setCommentError('')
        if (selectedFeature && comment) {
            return true
        }
    }
    const handleSubmitFeedback = async () => {
        console.log('images-->',images)
        if (validations()) {
            setLoading(true)
            await Backend.submitAppFeedback({ feature: selectedFeature, comment, images }).
                then(res => {
                    setLoading(true)
                    if (res) {
                        goBack()
                        Toasts.success('Your comment submitted.')
                    }
                })
        }
    }
    return (
        <MainWrapper>
            <KeyboardAvoidingScrollView>
                <Spacer height={sizes.baseMargin} />
                <ComponentWrapper>
                    <SmallTitle style={[appStyles.textPrimaryColor]}>Your comments about the app functionality and features will help us improve it</SmallTitle>
                </ComponentWrapper>
                <Spacer height={sizes.baseMargin} />
                <PickerPrimary
                    title="Feature / Functionality"
                    value={selectedFeature}
                    data={features}
                    onChange={(value, index) => {
                        featureError && setFeatureError('')
                        selectFeature(value)
                    }}
                    error={featureError}
                />
                <Spacer height={sizes.baseMargin * 2} />
                <TextInputUnderlined
                    titleStatic="Your Comments"
                    //placeholder="Write here..."
                    placeholderTextColor={appStyles.textLightGray.color}
                    value={comment}
                    onChangeText={t => {
                        commentError && setCommentError('')
                        setComment(t)
                    }}
                    multiline
                    inputStyle={{ backgroundColor: 'transparent', height: height(12.5), marginTop: sizes.smallMargin, textAlignVertical: 'top' }}
                    error={commentError}
                    autoCapitalize="sentences"
                />
                <Spacer height={sizes.baseMargin * 2} />
                <ComponentWrapper>
                    <TinyTitle>Attach Screenshots</TinyTitle>
                </ComponentWrapper>
                <Spacer height={sizes.smallMargin} />
                <ImagesPrimary
                    images={images}
                    onPressAdd={takePics}
                    onPressCross={(item, index) => {
                        console.log('image index', index)
                        let newImages = []
                        newImages = images.filter(ite => ite != item)
                        //newImages.splice(index, 1)
                        setImages(newImages)
                    }}
                />
                <Spacer height={sizes.doubleBaseMargin} />
                <ButtonColored
                    text="Submit"
                    onPress={handleSubmitFeedback}
                    isLoading={loading}
                />
                <Spacer height={sizes.doubleBaseMargin} />
            </KeyboardAvoidingScrollView>
        </MainWrapper>
    );
}

export default Comments;
