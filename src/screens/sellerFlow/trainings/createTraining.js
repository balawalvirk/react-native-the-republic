import React, { Component, useEffect, useLayoutEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { height } from 'react-native-dimension';
import { ButtonColored, IconButton, KeyboardAvoidingScrollView, MainWrapper, PopupPrimary, RowWrapperBasic, Spacer, TextInputUnderlined } from '../../../components';
import { routes, sizes } from '../../../services';

function CreateTraining(props) {
    const { navigation, route } = props
    const { navigate, goBack } = navigation
    const { params } = route
    const trainingData = params ? params.training ? params.training : null : null

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
    const [charges, setCharges] = useState('')
    const [spots, setSpots] = useState(1)

    const [titleError, setTitleError] = useState('')
    const [descriptionError, setDescriptionError] = useState('')
    const [durationError, setDurationError] = useState('')
    const [locationError, setLocationError] = useState('')
    const [chargesError, setChargesError] = useState('')
    const [spotsError, setSpotsError] = useState('')

    const [isTrainingCreatedPopupVisible, setTrainingCreatedPopupVisible] = useState(false)

    const toggleTrainingCreatedPopup = () => setTrainingCreatedPopupVisible(!isTrainingCreatedPopupVisible)

    const getSetTrainingData = () => {
        if (trainingData) {
            const { title, description, duration, location, charges, spots } = trainingData
            setTitle(title)
            setDescription(description)
            setDuration(duration)
            setLocation(location)
            setCharges(charges)
            setSpots(4)
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
                    error={descriptionError}
                    multiline
                    inputStyle={{
                        height: height(12),
                        marginTop: sizes.smallMargin,
                        textAlignVertical: 'top'
                    }}
                />
                <Spacer height={sizes.baseMargin} />
                <TextInputUnderlined
                    title="Training Duration"
                    value={duration}
                    onChangeText={t => setDuration(t)}
                    error={durationError}
                />
                <Spacer height={sizes.baseMargin} />
                <TextInputUnderlined
                    title="Training Location"
                    value={location}
                    onChangeText={t => setLocation(t)}
                    error={locationError}
                />
                <Spacer height={sizes.baseMargin} />
                <TextInputUnderlined
                    title="Training Charges"
                    value={charges}
                    onChangeText={t => setCharges(t)}
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
                    text={trainingData ? "Update Training" : "Continue"}
                    onPress={() => {
                        trainingData ? [
                            toggleTrainingCreatedPopup()
                        ] :
                            navigate(routes.seller.selectDateTime, { training: {} })
                    }}
                />
                <Spacer height={sizes.doubleBaseMargin} />
            </KeyboardAvoidingScrollView>
            <PopupPrimary
                visible={isTrainingCreatedPopupVisible}
                toggle={toggleTrainingCreatedPopup}
                iconName="check"
                iconType="feather"
                title="Training Updated"
                info={"Customers in your area can now see your training ad and contact you"}
                buttonText1="Continue"
                onPressButton1={() => { toggleTrainingCreatedPopup(); navigate(routes.seller.trainings) }}
                topMargin={height(60)}
            />
        </MainWrapper>
    );
}

export default CreateTraining;
