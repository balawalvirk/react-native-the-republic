import React, { Component, useEffect, useLayoutEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { height } from 'react-native-dimension';
import { useSelector } from 'react-redux';
import { ButtonColored, IconButton, KeyboardAvoidingScrollView, MainWrapper, PopupPrimary, RowWrapperBasic, Spacer, TextInputUnderlined, GoogleAutoComplete, ComponentWrapper, ErrorText, InputTitle, MediumText, CreateStripeAccountPopup, VerifyStripeAccountPopup } from '../../../components';
import { appStyles, Backend, colors, HelpingMethods, routes, sizes } from '../../../services';

function CreateTraining(props) {
    const { navigation, route } = props
    const { navigate, goBack } = navigation
    const { params } = route
    const trainingData = params ? params.training ? params.training : null : null

    //redux states
    const user = useSelector(state => state.user)
    const { userDetail, stripeAccountDetail } = user
    const { seller_stripe_account_id } = userDetail

    //local states
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getSetTrainingData()
    }, [])


    useLayoutEffect(() => {
        navigation.setOptions({
            title: trainingData ? "Edit Training" : "Create Training"
        });
    }, [navigation]);

    //local states
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [duration, setDuration] = useState('')
    const [location, setLocation] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [charges, setCharges] = useState('')
    const [spots, setSpots] = useState(1)

    const [titleError, setTitleError] = useState('')
    const [descriptionError, setDescriptionError] = useState('')
    const [durationError, setDurationError] = useState('')
    const [locationError, setLocationError] = useState('')
    const [chargesError, setChargesError] = useState('')
    const [spotsError, setSpotsError] = useState('')

    const [isCreateStripeAccountPopupVisible, setCreateStripeAccountPopupVisibility] = useState(false)
    const toggleCreateStripeAccountPopup = () => setCreateStripeAccountPopupVisibility(!isCreateStripeAccountPopupVisible)

    const [isVerifyStripeAccountPopupVisible, setVerifyStripeAccountPopupVisibility] = useState(false)
    const toggleVerifyStripeAccountPopup = () => setVerifyStripeAccountPopupVisibility(!isVerifyStripeAccountPopupVisible)

    const [isTrainingCreatedPopupVisible, setTrainingCreatedPopupVisible] = useState(false)

    const toggleTrainingCreatedPopup = () => setTrainingCreatedPopupVisible(!isTrainingCreatedPopupVisible)

    const getSetTrainingData = () => {
        if (trainingData) {
            console.log('trainingData --> ', trainingData)
            const { title, description, duration, location, lat, long, charges, spots } = trainingData
            setTitle(title)
            setDescription(description)
            setDuration(duration)
            setLocation(location)
            setLatitude(lat)
            setLongitude(long)
            setCharges(charges)
            setSpots(spots)
        }
    }

    const isDetailsValid = () => {
        HelpingMethods.handleAnimation()
        !title ? setTitleError('Please add title') : setTitleError('')
        !description ? setDescriptionError('Please add description') : setDescriptionError('')
        !duration ? setDurationError('Please add duration') : setDurationError('')
        !location ? setLocationError('Please add location') : setLocationError('')
        !charges ? setChargesError('Please add charges') : setChargesError('')
        if (title, description, duration, location, charges) {
            return true
        } else {
            return false
        }
    }
    const handleContinueEditTraining = async () => {
        // setLoading(true)
        // await Backend.edit_traning({
        //     training_id: trainingData.id,
        //     title,
        //     description,
        //     duration,
        //     location,
        //     latitude,
        //     longitude,
        //     charges,
        //     spots,
        //     status: 'active'
        // }).
        //     then(res => {
        //         if (res) {
        //             toggleTrainingCreatedPopup()
        //         }
        //     })
        // setLoading(true)
        navigate(routes.seller.selectDateTime, {
            edit: true,
            trainingData: {
                ...trainingData,
                title,
                description,
                duration,
                location,
                latitude,
                longitude,
                charges,
                spots,
            }
        })
    }
    const handleContinue = () => {
        if (isDetailsValid()) {
            seller_stripe_account_id ?
                stripeAccountDetail?.payouts_enabled ?
                    navigate(routes.seller.selectDateTime, {
                        trainingData: {
                            title,
                            description,
                            duration,
                            location,
                            latitude,
                            longitude,
                            charges,
                            spots,
                        }
                    })
                    :
                    toggleVerifyStripeAccountPopup()
                :
                toggleCreateStripeAccountPopup()
        } else {

        }
    }
    return (
        <MainWrapper>
            <KeyboardAvoidingScrollView>
                <Spacer height={sizes.baseMargin} />
                <TextInputUnderlined
                    title="Training Title"
                    value={title}
                    onChangeText={t => setTitle(t)}
                    error={titleError}
                />
                <Spacer height={sizes.baseMargin} />
                <TextInputUnderlined
                    titleStatic="Description"
                    value={description}
                    onChangeText={t => setDescription(t)}
                    multiline
                    inputStyle={{
                        height: height(12),
                        marginTop: sizes.smallMargin,
                        textAlignVertical: 'top'
                    }}
                    error={descriptionError}
                />
                <Spacer height={sizes.baseMargin} />
                <TextInputUnderlined
                    title="Training Duration"
                    //value={duration ? (duration + ' days') : ''}
                    value={duration}
                    onChangeText={t => {
                        //const days = t.replace(' days', '')
                        setDuration(t)
                    }}
                    keyboardType={'number-pad'}
                    error={durationError}
                    right={duration ? <MediumText style={[appStyles.fontBold]}>days</MediumText> : null}
                />
                <Spacer height={sizes.baseMargin} />
                {/* <TextInputUnderlined
                    title="Training Location"
                    value={location}
                    onChangeText={t => setLocation(t)}
                    error={locationError}
                /> */}
                <ComponentWrapper style={{ marginHorizontal: sizes.marginHorizontalLarge }}>
                    <InputTitle>Location</InputTitle>
                </ComponentWrapper>
                <ComponentWrapper style={{ marginHorizontal: sizes.marginHorizontalSmall }}>
                    <GoogleAutoComplete
                        onPressItem={(details, location) => {
                            console.log('details', details)
                            console.log('location', location)
                            setLocation(details.description)
                            setLatitude(location.lat)
                            setLongitude(location.lng)
                        }}
                        value={location}
                        leftIcon={null}
                        textInputContainer={{
                            borderWidth: 0,
                            borderRadius: 0,
                            borderBottomWidth: 1,
                            borderColor: colors.appBgColor4
                        }}
                        placeholder="Type here..."
                    />
                </ComponentWrapper>
                <ComponentWrapper style={{ marginHorizontal: sizes.marginHorizontalLarge }}>
                    <ErrorText
                        text={locationError}
                    />
                </ComponentWrapper>
                <Spacer height={sizes.baseMargin} />
                <TextInputUnderlined
                    title="Training Charges"
                    value={`${charges ? '$' + charges : ''}`}
                    onChangeText={t => setCharges(t.replace('$', ''))}
                    error={chargesError}
                />
                <Spacer height={sizes.baseMargin} />
                <TextInputUnderlined
                    title="Available Spots"
                    value={spots.toString()}
                    onChangeText={t => setSpots(t)}
                    keyboardType="number-pad"
                    editable={false}
                    error={spotsError}
                    right={
                        <RowWrapperBasic>
                            <IconButton
                                iconName="minus"
                                iconType="entypo"
                                onPress={() => spots > 1 && setSpots(spots - 1)}
                            />
                            <Spacer width={sizes.smallMargin} />
                            <IconButton
                                iconName="plus"
                                iconType="entypo"
                                onPress={() => setSpots(spots + 1)}
                            />
                        </RowWrapperBasic>
                    }
                />
                <Spacer height={sizes.doubleBaseMargin} />
                <ButtonColored
                    // text={trainingData ? "Update Training" : "Continue"}
                    text={"Continue"}
                    onPress={() => {
                        trainingData ? [
                            handleContinueEditTraining()
                        ] :
                            handleContinue()
                    }}
                    isLoading={loading}
                />
                <Spacer height={sizes.doubleBaseMargin} />
            </KeyboardAvoidingScrollView>
            {/* <PopupPrimary
                visible={isTrainingCreatedPopupVisible}
                toggle={toggleTrainingCreatedPopup}
                iconName="check"
                iconType="feather"
                title="Training Updated"
                info={"Customers in your area can now see your training ad and contact you"}
                buttonText1="Continue"
                onPressButton1={() => { toggleTrainingCreatedPopup(); navigate(routes.seller.trainings) }}
                topMargin={height(60)}
                disableBackDropPress
                disableSwipe
            /> */}
            <CreateStripeAccountPopup
                visible={isCreateStripeAccountPopupVisible}
                toggle={toggleCreateStripeAccountPopup}
            />
            <VerifyStripeAccountPopup
                visible={isVerifyStripeAccountPopupVisible}
                toggle={toggleVerifyStripeAccountPopup}
            />
        </MainWrapper>
    );
}

export default CreateTraining;
