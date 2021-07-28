import React, { Component, useState } from 'react';
import { View, Text } from 'react-native';
import { height } from 'react-native-dimension';
import { ButtonGradient, KeyboardAvoidingScrollView, MainWrapper, Spacer, TextInputUnderlined, Wrapper } from '../../../components';
import { appStyles, sizes } from '../../../services';

function ContactUs() {
    const [comment, setComment] = useState('')
    return (
        <MainWrapper>
            <Wrapper flex={1}>
                <KeyboardAvoidingScrollView>
                    <Spacer height={sizes.baseMargin * 2} />
                    <TextInputUnderlined
                        titleStatic="Write your message"
                        //placeholder="Write here..."
                        placeholderTextColor={appStyles.textLightGray.color}
                        value={comment}
                        onChangeText={t => setComment(t)}
                        multiline
                        inputStyle={{ backgroundColor: 'transparent', height: height(12.5), marginTop: sizes.smallMargin, textAlignVertical: 'top' }}
                    />
                </KeyboardAvoidingScrollView>
            </Wrapper>
            <Wrapper>
                <Spacer height={sizes.baseMargin} />
                <ButtonGradient
                    text="Send Message"
                />
                <Spacer height={sizes.doubleBaseMargin} />
            </Wrapper>
        </MainWrapper>
    );
}

export default ContactUs;
