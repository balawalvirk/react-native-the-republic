import React, { Component, useState } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { height } from 'react-native-dimension';
import { ButtonGradient, ComponentWrapper, KeyboardAvoidingScrollView, MainWrapper, MediumText, Spacer, TextInputBordered, TextInputColored, TextInputUnderlined, Toasts, Wrapper } from '../../../components';
import { appStyles, Backend, HelpingMethods, sizes } from '../../../services';

export default function ReportContent({ navigation, route }) {
    const { navigate, goBack } = navigation
    const { post, comment } = route.params
    console.log('post -> ', post)
    console.log('comment -> ', comment)

    //local states
    const [description, setDescription] = useState('')
    const [descriptionError, setDescriptionError] = useState('')
    const [isLoading, setLoading] = useState(false)

    const validations = () => {
        HelpingMethods.handleAnimation()
        !description ? setDescriptionError('Please write description') : setDescriptionError('')
        if (description) return true
    }
    const handleSubmitReport = async () => {
        if (validations()) {
            setLoading(true)
            if (post) {
                await Backend.reportPost({ post_id: post.id, comment: description })
            } else if (comment) {
                await Backend.reportCommentOfPost({ comment_id: comment.id, comment: description })
            }
            goBack()
            setLoading(false)
            Toasts.success((post ? 'Post' : 'Comment') + ' has been reported')
        }
    }
    return (
        <MainWrapper>

            <KeyboardAvoidingScrollView>
                <Spacer height={sizes.doubleBaseMargin} />
                <ComponentWrapper>
                    <MediumText style={[appStyles.textCenter]}>Describe below, why you are reporting this
                        {'\n'}
                        <MediumText style={[appStyles.fontBold]}>{post ? 'Post' : 'Comment'}</MediumText>
                    </MediumText>
                </ComponentWrapper>
                <Spacer height={sizes.doubleBaseMargin} />

                <TextInputUnderlined
                    value={description}
                    onChangeText={t => {
                        descriptionError&&setDescriptionError('')
                        setDescription(t)
                    }}
                    titleStatic="Description"
                    placeholder="Write here..."
                    multiline
                    inputStyle={{ height: height(15), textAlignVertical: 'top', marginVertical: sizes.smallMargin }}
                    error={descriptionError}
                />
                <Wrapper>
                    <Spacer height={height(25)} />
                    <ButtonGradient
                        text="Submit"
                        onPress={handleSubmitReport}
                        loading={isLoading}
                    />
                    <Spacer height={sizes.baseMargin} />
                </Wrapper>
            </KeyboardAvoidingScrollView>

        </MainWrapper>
    );
}

