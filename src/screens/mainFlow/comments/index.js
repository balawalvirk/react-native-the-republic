import React, { Component, useEffect, useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { View, Text } from 'react-native';
import { height } from 'react-native-dimension';
import { ComponentWrapper, ImagesPrimary, KeyboardAvoidingScrollView, MainWrapper, MediumTitle, PickerPrimary, SmallTitle, Spacer, TextInputUnderlined, TinyTitle, TitlePrimary } from '../../../components';
import { appStyles, sizes } from '../../../services';
import ImageCropPicker from 'react-native-image-crop-picker';

const features = [
    {
        label: 'Searching Product',
        value: 212
    },
    {
        label: 'Add Product',
        value: 345
    },
    {
        label: 'Registration',
        value: 543
    }
]
function Comments() {
    const [selectedFeature, selectFeature] = useState('')
    const [comment, setComment] = useState('')
    const [images, setImages] = useState([])


    const takePics = () => {
        ImageCropPicker.openPicker({
            quality: 9,
            compressImageMaxHeight: 700,
            compressImageMaxWidth: 800,
            cropping: false,
            multiple: true,
        }).then(response => {
            let tempArray = [];
            //this.setState({ ImageSource: response });
            let photos = []
            for (const item of response) {
                const tempObj = {
                    ...item,
                    uri: item.path
                }
                photos.push(tempObj);
            }
            setImages([...images, ...photos])
        });
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
                    onChange={(value, index) => selectFeature(value)}
                />
                <Spacer height={sizes.baseMargin * 2} />
                <TextInputUnderlined
                    titleStatic="Your Comments"
                    //placeholder="Write here..."
                    placeholderTextColor={appStyles.textLightGray.color}
                    value={comment}
                    onChangeText={t => setComment(t)}
                    multiline
                    inputStyle={{ backgroundColor: 'transparent', height: height(12.5), marginTop: sizes.smallMargin, textAlignVertical: 'top' }}
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
            </KeyboardAvoidingScrollView>
        </MainWrapper>
    );
}

export default Comments;
