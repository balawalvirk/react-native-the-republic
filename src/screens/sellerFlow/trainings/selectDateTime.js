import React, { Component, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { View, Text, FlatList } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { height, totalSize } from 'react-native-dimension';
import { Icon } from 'react-native-elements';
import { ButtonGradient, ComponentWrapper, MainWrapper, PopupPrimary, RowWrapper, Spacer, TextInputUnderlined, TimeSlotCard, TinyTitle, TitleInfoPrimary, TitlePrimary, TitleValue, Wrapper } from '../../../components';
import { appStyles, colors, fontFamily, fontSize, HelpingMethods, routes, sizes } from '../../../services';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
const timeSlots = [
    {
        id: '12332323',
        date: 'Monday, 16 August, 2021',
        startTime: '09:00 AM',
        endTime: '10:00 AM'
    },
    {
        id: '88326739',
        date: 'Monday, 16 August, 2021',
        startTime: '12:00 PM',
        endTime: '01:00 PM'
    }
]

function SelectDateTime(props) {
    const { navigate } = props.navigation
    const { training } = props.route.params


    
    //Local states
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [isTrainingCreatedPopupVisible, setTrainingCreatedPopupVisible] = useState(false)
    const [isSelectTimePopupVisible, setSelectTimePopupVisible] = useState(false)
    const [isStartTimePickerVisible, setStartTimePickerVisible] = useState(false)
    const [isEndTimePickerVisible, setEndTimePickerVisible] = useState(false)

    const toggleTrainingCreatedPopup = () => setTrainingCreatedPopupVisible(!isTrainingCreatedPopupVisible)
    const toggleSelectTimePopup = () => setSelectTimePopupVisible(!isSelectTimePopupVisible)
    const toggleStartTimePicker = () => setStartTimePickerVisible(!isStartTimePickerVisible)
    const toggleEndTimePickerPopup = () => setEndTimePickerVisible(!isEndTimePickerVisible)

    const primaryTheme = {
        //Colors
        backgroundColor: "transparent",
        calendarBackground: "transparent",
        textSectionTitleColor: colors.appTextColor1,
        selectedDayBackgroundColor: colors.appColor1,
        selectedDayTextColor: colors.appTextColor6,
        todayTextColor: colors.appColor1,
        dayTextColor: colors.appTextColor3,
        textDisabledColor: colors.appTextColor5,
        dotColor: colors.appColor1,
        selectedDotColor: colors.appColor1,
        arrowColor: colors.appTextColor1,
        disabledArrowColor: "red",
        monthTextColor: colors.appColor1,
        indicatorColor: colors.appTextColor1,
        //fonts
        textDayFontFamily: fontFamily.appTextMedium,
        textMonthFontFamily: fontFamily.appTextBold,
        textDayHeaderFontFamily: fontFamily.appTextMedium,
        //sizes
        textDayFontSize: fontSize.regular,
        textDayHeaderFontSize: fontSize.regular,
        textMonthFontSize: fontSize.h6,
        //weight
        textDayFontWeight: "500",
        textMonthFontWeight: "bold",
        textDayHeaderFontWeight: "bold",
    };


    const handleConfirmStartDatePicker = (date) => {
        console.warn("Start date has been picked: ", date);
        toggleStartTimePicker();
        //setEstimatedCompletionDate(moment(date).format('DD/MM/YYYY'))
        setStartDate(date)
        setTimeout(() => {
            toggleSelectTimePopup()
        }, 500);
    };
    const handleConfirmEndDate = (date) => {
        console.warn("End date has been picked: ", date);
        toggleEndTimePickerPopup()
        // setEstimatedArrivalTime(moment(date).format('DD/MM/YYYY hh:mm A'))
        setEndDate(date)
        setTimeout(() => {
            toggleSelectTimePopup()
        }, 500);
    }
    return (
        <MainWrapper>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Spacer height={sizes.baseMargin} />
                <Wrapper style={[appStyles.grayWrapper, { paddingHorizontal: 0, paddingVertical: 0, }]}>
                    <Calendar
                        //  minDate={new Date()}
                        // markingType={'multi-dot'}
                        // current={this.state.date}
                        // minDate={minDate}
                        markedDates={{
                            "2021-08-16": { selected: true, selectedColor: colors.appColor1 },
                        }}
                        // markedDates={availableDates}
                        // Specify style for calendar container element. Default = {}
                        style={
                            {
                                // borderWidth: 1,
                                // borderColor: 'gray',
                                //alignSelf: 'center',
                                //height: height(40),
                                // width: width(80)
                            }
                        }

                        onDayPress={(day) => {
                            console.log('day press', day)
                            //date(day), toggleModal();
                            toggleSelectTimePopup()
                        }}
                        theme={primaryTheme}
                        renderArrow={(direction) =>
                            direction === "left" ? (
                                <Icon name='triangle-left' type='octicon' />
                            ) : (
                                <Icon name='triangle-right' type='octicon' />
                            )
                        }
                    />
                </Wrapper>
                <Spacer height={sizes.baseMargin} />
                <FlatList
                    data={timeSlots}
                    scrollEnabled={false}
                    renderItem={({ item, index }) => {
                        return (
                            <TimeSlotCard
                                containerStyle={{ marginBottom: sizes.marginVertical / 2 }}
                                onPress={() => {
                                    // navigate(routes.payment, { training, timeSlot: item })
                                }}
                                date={item.date}
                                startTime={item.startTime}
                                endTime={item.endTime}
                                onPressDelete={() => { }}
                            />
                        )
                    }}
                />
            </ScrollView>
            <Spacer height={sizes.baseMargin} />
            <ButtonGradient
                text="Create Training"
                onPress={toggleTrainingCreatedPopup}
            />
            <Spacer height={sizes.doubleBaseMargin} />
            <PopupPrimary
                visible={isTrainingCreatedPopupVisible}
                toggle={toggleTrainingCreatedPopup}
                iconName="check"
                iconType="feather"
                title="Training Created"
                info={"Customers in your area can now see your training ad and contact you"}
                buttonText1="Continue"
                onPressButton1={() => { toggleTrainingCreatedPopup(); navigate(routes.seller.trainings) }}
                topMargin={height(60)}
            />
            <PopupPrimary
                visible={isSelectTimePopupVisible}
                toggle={toggleSelectTimePopup}
                title="Select Time"
                buttonText1="Done"
                onPressButton1={() => { toggleSelectTimePopup() }}
                topMargin={height(60)}
            >
                <Wrapper>
                    <Spacer height={sizes.baseMargin} />
                    <RowWrapper>
                        <Wrapper flex={1}>
                            <TextInputUnderlined
                                title="Start Time"
                                value={startDate ? HelpingMethods.formateTime1(startDate) : ''}
                                containerStyle={{ marginHorizontal: 0 }}
                                onPress={() => {
                                    toggleSelectTimePopup()
                                    setTimeout(() => {
                                        toggleStartTimePicker()
                                    }, 500);
                                }}
                                iconNameRight="clock"
                                iconTypeRight="feather"
                                iconColorRight={colors.appTextColor1}
                                iconSizeRight={totalSize(2.5)}
                            />

                        </Wrapper>
                        <Spacer width={sizes.marginHorizontalSmall} />
                        <Wrapper flex={1}>
                            <TextInputUnderlined
                                title="End Time"
                                value={endDate ? HelpingMethods.formateTime1(endDate) : ''}
                                containerStyle={{ marginHorizontal: 0 }}
                                onPress={() => {
                                    toggleSelectTimePopup()
                                    setTimeout(() => {
                                        toggleEndTimePickerPopup()
                                    }, 500);
                                }}
                                iconNameRight="clock"
                                iconTypeRight="feather"
                                iconColorRight={colors.appTextColor1}
                                iconSizeRight={totalSize(2.5)}
                            />
                        </Wrapper>
                    </RowWrapper>
                    <Spacer height={sizes.baseMargin} />
                </Wrapper>
            </PopupPrimary>
            <DateTimePicker
                isVisible={isStartTimePickerVisible}
                mode="time"
                onConfirm={handleConfirmStartDatePicker}
                onCancel={() => {
                    toggleStartTimePicker()
                    setTimeout(() => {
                        toggleSelectTimePopup()
                    }, 500);
                }}
            />
            <DateTimePicker
                isVisible={isEndTimePickerVisible}
                mode="time"
                onConfirm={handleConfirmEndDate}
                onCancel={() => {
                    toggleEndTimePickerPopup()
                    setTimeout(() => {
                        toggleSelectTimePopup()
                    }, 500);
                }}
            />
        </MainWrapper>
    );
}

export default SelectDateTime;
