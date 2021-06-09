import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { View, Text } from 'react-native';
import { MainWrapper, IconButton, Wrapper, Spacer, ImageProfile, RowWrapperBasic, RowWrapper, TextInputUnderlined, KeyboardAvoidingScrollView, ComponentWrapper, ButtonColored, PickerPrimary, IconWithText } from '../..';
import { height, totalSize, width } from 'react-native-dimension';
import { colors, appStyles, sizes, HelpingMethods, appIcons, routes } from '../../../services';
import ImagePicker from 'react-native-image-picker';
import CountryPicker from 'react-native-country-picker-modal'
import { Icon } from 'react-native-elements';
import moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { PopupPrimary } from '..';
import { MediumText } from '../../text';

const dummyGenders = [
    {
        label: 'Male',
        value: 'Male'
    },
    {
        label: 'Female',
        value: 'Female'
    },
    {
        label: 'Other',
        value: 'Other'
    }
]
const EditProfile = React.forwardRef((props, ref) => {

    useImperativeHandle(ref, () => ({
        getAllData,
        validate
    }));
    const BirthdayInputRef = useRef(null)

    const [imageUri, setImageUri] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [userName, setUsername] = useState('')
    const [birthday, setBirthday] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zipcode, setZipCode] = useState('')
    const [gender, setGender] = useState('')
    const [genders, setGenders] = useState(dummyGenders)
    const [imageFile, setImageFile] = useState(null)
    const [countryCode, setCountryCode] = useState('US')
    const [countryPhoneCode, setCountryPhoneCode] = useState('+1')
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    //Error messages
    const [firstNameError, setFirstNameError] = useState('')
    const [lastNameError, setLastNameError] = useState('')
    const [phoneNumberError, setPhoneNumberError] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [birthdayError, setBirthdayError] = useState('')
    const [genderError, setGenderError] = useState('')
    const [fileError, setFileError] = useState('')


    useEffect(() => {
        setAllData()
    }, [])
    const onSelect = (gender) => {
        setCountryCode(gender.cca2)
        setCountryPhoneCode(gender.callingCode)
    }
    const setAllData = () => {
        const { data } = props
        if (data) {
            setImageUri(data.image)
            setFirstName(data.firstName);
            setLastName(data.lastName)
            setPhoneNumber(data.phoneNumber.toString())
            setUsername(data.userName)
            setBirthday(data.birthday)
            setCity(data.city)
            setState(data.state)
            setZipCode(data.zipcode)
            setGender(data.gender)
        }
    }
    const launchImagePicker = () => {
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

        /**
         * The first arg is the options object for customization (it can also be null or omitted for default options),
         * The second arg is the callback which sends object: response (more info in the API Reference)
         */
        ImagePicker.showImagePicker(options, (response) => {
            //console.log('Response = ', response);

            if (response.didCancel) {
                //console.log('User cancelled image picker');
            } else if (response.error) {
                //console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                //console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                let path = response.uri;
                if (Platform.OS === "ios") {
                    path = "~" + path.substring(path.indexOf("/Documents"));
                }
                if (!response.fileName) response.fileName = path.split("/").pop();
                const tempFile = {
                    uri: response.uri,
                    name: response.fileName,
                    type: response.type
                }
                setImageFile(tempFile)
            }
        });
    }

    const validate = () => {
        HelpingMethods.handleAnimation()
        !firstName ? setFirstNameError('Enter your first name') : setFirstNameError('')
        !lastName ? setLastNameError('Enter your last name') : setLastNameError('')
        !userName ? setUsernameError('Enter your userName') : setUsernameError('')
        !gender ? setGenderError('Select your gender') : setGenderError('')
        !birthday ? setBirthdayError('Add your birthday') : setBirthdayError('')
        !phoneNumber ? setPhoneNumberError('Enter your Phone number') : setPhoneNumberError('')
        if (firstName && lastName && userName && birthday && phoneNumber && gender) return true
        else return false
    }
    const getAllData = () => {
        const params = {
            imageFile,
            firstName,
            lastName,
            userName,
            gender,
            birthday,
            phoneNumber,
            countryPhoneCode,
            countryCode
        }
        validate()
        return params
    }
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const handleConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        hideDatePicker();
        setBirthday(moment(date).format('DD/MM/YYYY'))
        // setTimeout(() => {
        //     BirthdayInputRef.current.blur()
        // }, 500);
    };
    return (
        <Wrapper flex={1}>
            <Wrapper flex={1}>
                <Spacer height={sizes.baseMargin} />
                <Wrapper style={[appStyles.center]}>
                    {
                        imageFile || imageUri ?
                            <ImageProfile
                                source={{ uri: imageFile ? imageFile.uri : imageUri }}
                                onPressCamera={launchImagePicker}
                            />
                            :
                            <IconButton
                                iconName="camera"
                                iconType="feather"
                                buttonSize={totalSize(20)}
                                iconSize={totalSize(4)}
                                buttonColor={colors.appBgColor2}
                                buttonStyle={{ borderRadius: 100 }}
                                iconColor={colors.appTextColor1}
                                onPress={launchImagePicker}
                            />
                    }
                </Wrapper>
                <Spacer height={sizes.baseMargin} />
                <RowWrapper style={{ alignItems: 'flex-start', }}>
                    <Wrapper flex={1}>
                        <TextInputUnderlined
                            title="First Name"
                            value={firstName}
                            onChangeText={(text) => setFirstName(text)}
                            error={firstNameError}
                            containerStyle={{ marginHorizontal: sizes.marginHorizontal / 2 }}
                        />
                    </Wrapper>
                    <Wrapper flex={1}>
                        <TextInputUnderlined
                            title="Last Name"
                            value={lastName}
                            onChangeText={(text) => setLastName(text)}
                            error={lastNameError}
                            containerStyle={{ marginHorizontal: sizes.marginHorizontal / 2 }}
                        />
                    </Wrapper>
                </RowWrapper>
                <Spacer height={sizes.baseMargin} />
                <TextInputUnderlined
                    title="Username"
                    value={userName}
                    onChangeText={(text) => setUsername(text)}
                    error={usernameError}
                    right={
                        userName.length >= 5 &&
                        <Icon
                            name="check-circle"
                            type="feather"
                            size={totalSize(2.5)}
                            color={colors.success}
                        />
                    }
                />
                <Spacer height={sizes.baseMargin} />

                <RowWrapper style={{ marginHorizontal: sizes.marginHorizontalLarge }}>
                    <Wrapper flex={1}>
                        <PickerPrimary
                            title="Gender"
                            data={genders}
                            value={gender}
                            onChange={(value, index) => setGender(value)}
                            error={genderError}
                            containerStyle={{ marginHorizontal: 0 }}
                        />
                    </Wrapper>
                    <Spacer width={sizes.marginHorizontal} />
                    <Wrapper flex={1}>
                        <TextInputUnderlined
                            // inputRef={BirthdayInputRef}
                            title="Birthday"
                            value={birthday}
                            // onChangeText={(text) => setBirthday(text)}
                            onPress={showDatePicker}
                            // onFocus={showDatePicker}
                            error={birthdayError}
                            right={
                                <Icon
                                    name="calendar"
                                    type="feather"
                                    size={totalSize(2.5)}
                                />
                            }
                            containerStyle={{ marginHorizontal: 0 }}
                        />
                    </Wrapper>
                </RowWrapper>
                <Wrapper style={{}}>
                    <Spacer height={sizes.baseMargin} />
                    <TextInputUnderlined
                        titleStatic={"Phone Number"}
                        keyboardType="number-pad"
                        value={phoneNumber}
                        onChangeText={(text) => setPhoneNumber(text)}
                        error={phoneNumberError}
                        inputStyle={{ backgroundColor: 'transparent', }}
                        left={
                            <Wrapper style={{ marginRight: sizes.marginHorizontal / 2, backgroundColor: 'transparent', }}>
                                <CountryPicker
                                    {...{
                                        countryCode,
                                        withFilter: true,
                                        withFlag: true,
                                        withCountryNameButton: false,
                                        withCallingCodeButton: true,
                                        withAlphaFilter: true,
                                        withCallingCode: true,
                                        withEmoji: true,
                                        onSelect,
                                    }}
                                // visible
                                />
                            </Wrapper>
                        }
                    />
                </Wrapper>
            </Wrapper>
            <DateTimePicker
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />

        </Wrapper>
    );
})

export default EditProfile;
