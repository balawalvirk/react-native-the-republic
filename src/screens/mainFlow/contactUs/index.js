import React, { Component, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { height } from 'react-native-dimension';
import { ButtonGradient, KeyboardAvoidingScrollView, MainWrapper, Spacer, TextInputUnderlined, Toasts, Wrapper } from '../../../components';
import { appStyles, Backend, HelpingMethods, sizes } from '../../../services';

function ContactUs({ navigation }) {
    const { goBack } = navigation
    const [comment, setComment] = useState('')
    const [commentError, setCommentError] = useState('')
    const [loading, setLoading] = useState(false)

    const validation = () => {
        HelpingMethods.handleAnimation()
        !comment ? setCommentError('Please write message') : setCommentError('')
        if (comment) {
            return true
        }
    }
    const handleSendMessage = async () => {
        if (validation()) {
            setLoading(true)
            await Backend.contactUs(comment).
                then(res => {
                    setLoading(false)
                    if (res) {
                        goBack()
                        Toasts.success('Message has been sent.')
                    }
                })
        }
    }
    return (
        <MainWrapper>
            <Wrapper flex={1}>
                <KeyboardAvoidingScrollView>
                    <Spacer height={sizes.baseMargin * 2} />
                    <TextInputUnderlined
                        titleStatic="Write your message"
                        placeholderTextColor={appStyles.textLightGray.color}
                        value={comment}
                        onChangeText={t => {
                            commentError && setCommentError('');
                            setComment(t)
                        }}
                        multiline
                        inputStyle={{ backgroundColor: 'transparent', height: height(12.5), marginTop: sizes.smallMargin, textAlignVertical: 'top' }}
                        autoCapitalize='sentences'
                        error={commentError}
                    />
                </KeyboardAvoidingScrollView>
            </Wrapper>
            <Wrapper>
                <Spacer height={sizes.baseMargin} />
                <ButtonGradient
                    text="Send Message"
                    onPress={handleSendMessage}
                    loading={loading}
                />
                <Spacer height={sizes.doubleBaseMargin} />
            </Wrapper>
        </MainWrapper>
    );
}

export default ContactUs;
