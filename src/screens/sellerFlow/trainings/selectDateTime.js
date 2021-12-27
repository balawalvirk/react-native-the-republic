import React, { Component, useEffect, useLayoutEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { View, Text, FlatList } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { height, totalSize } from 'react-native-dimension';
import { Icon } from 'react-native-elements';
import { ButtonGradient, ComponentWrapper, MainWrapper, MediumText, PopupPrimary, RowWrapper, Spacer, TextInputUnderlined, TimeSlotCard, TinyTitle, TitleInfoPrimary, TitlePrimary, TitleValue, Wrapper } from '../../../components';
import { appStyles, Backend, colors, fontFamily, fontSize, HelpingMethods, routes, sizes } from '../../../services';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
const dummyTimeSlots = [
    // {
    //     id: '12332323',
    //     date: '2021-08-16',
    //     start_time: '09:00 AM',
    //     end_time: '10:00 AM'
    // },

]

function SelectDateTime({ navigation, route }) {
    const { navigate } = navigation
    const { trainingData, edit } = route.params
    console.log('training data ->', trainingData)

    // useLayoutEffect(() => {
    //     navigation.setOptions({
    //         title: 'Select Start and End Date'
    //     });
    // }, [navigation]);

    //Local states
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [markedDates, setMarkedDates] = useState({})
    const [selectedDate, setSelectedDate] = useState('')
    const [timeSlots, setTimeSlots] = useState([...dummyTimeSlots])
    const [startTime, setStartTime] = useState('')
    const [startTimeError, setStartTimeError] = useState('')
    const [endTimeError, setEndTimeError] = useState('')
    const [endTime, setEndTime] = useState('')
    const [isLoading, setLoading] = useState(false)
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

    useEffect(() => {
        handleGetSetEditTrainingData()
    }, [])

    const handleGetSetEditTrainingData = () => {
        if (edit) {
            const { start_date, start_time, end_time } = trainingData
           console.log('initial date  ->  ', moment(start_date).format('YYYY-MM-DD'))
            onDayPress(start_date)
            setStartTime(start_time)
            setEndTime(end_time)
        }
    }

    const onDayPress = (day) => {
        let markedDates = {}
        const range = Number(trainingData.duration)
        setStartDate(day)
        setEndDate((moment(day)).add(range, 'day'))
        const startDate = moment(day);
        // let endDate = startDate
        //let endDate = moment(day).add(range, 'day')
        console.log('startDate: ', day)
        console.log('range: ', range)
        console.log('endDate: ', endDate)
        for (let i = 1; i <= range; i++) {
            let tempDate = startDate
            markedDates[moment(tempDate).format('YYYY-MM-DD')] = { startingDay: i === 1 ? true : false, endingDay: i === range ? true : false, color: colors.appColor1, textColor: '#FFFFFF' };
            tempDate = startDate.add(1, 'day');
        }
        setMarkedDates(markedDates)
        // setStartDate(day)
        // setEndDate(endDate)
    }

    const handleConfirmStartTime = (date) => {
        console.warn("Start date has been picked: ", date);
        toggleStartTimePicker();
        //setEstimatedCompletionDate(moment(date).format('DD/MM/YYYY'))
        setStartTime(HelpingMethods.formateTime1(date))
        setStartTimeError('')
        // setTimeout(() => {
        //     toggleSelectTimePopup()
        // }, 500);
    };
    const handleConfirmEndTime = (date) => {
        console.warn("End date has been picked: ", date);
        toggleEndTimePickerPopup()
        // setEstimatedArrivalTime(moment(date).format('DD/MM/YYYY hh:mm A'))
        setEndTime(HelpingMethods.formateTime1(date))
        setEndTimeError('')
        // setTimeout(() => {
        //     toggleSelectTimePopup()
        // }, 500);
    }
    // const isTimeSlotDataValid = () => {
    //     !startTime ? setStartTimeError('Select start time') : setStartTimeError('')
    //     !endTime ? setEndTimeError('Select end time') : setEndTimeError('')
    //     if (startTime && endTime) {
    //         return true
    //     }
    // }
    // const handleAddTimeSlot = () => {
    //     if (isTimeSlotDataValid()) {
    //         const tempTimeSlotObj = {
    //             date: selectedDate,
    //             start_time: startTime,
    //             end_time: endTime
    //         }
    //         setTimeSlots([...timeSlots, tempTimeSlotObj])
    //         setStartTime('')
    //         setEndTime('')
    //         setSelectedDate('')
    //         toggleSelectTimePopup()
    //     }
    // }
    // const handleRemoveTimeSlot = (item) => {
    //     let tempTimeSlots = []
    //     tempTimeSlots = timeSlots.filter(ite => ite != item)
    //     setTimeSlots(tempTimeSlots)
    // }

    const handleAddTraining = async () => {
        setLoading(true)
        const { title, description, duration, location, latitude, longitude, charges, spots } = trainingData
        await Backend.add_traning({
            title,
            description,
            duration,
            location,
            charges,
            spots,
            latitude,
            longitude,
            start_date: startDate,
            end_date: endDate,
            start_time: startTime,
            end_time: endTime,
            status: 'active'
        }).
            then(async res => {
                if (res) {
                    // if (res.data.id) {
                    //     const training_id = res.data.id
                    //     for (const timeSlotItem of timeSlots) {
                    //         const { date, start_time, end_time } = timeSlotItem
                    //         await Backend.add_traning_timeSlots({ training_id, date, start_time, end_time })
                    //     }
                    // }
                    toggleTrainingCreatedPopup()
                }
            })
        setLoading(false)
    }
    const handleEditTraining = async () => {
        setLoading(true)
        const { title, description, duration, location, latitude, longitude, charges, spots } = trainingData
        await Backend.edit_traning({
            training_id: trainingData.id,
            title,
            description,
            duration,
            location,
            latitude,
            longitude,
            charges,
            spots,
            start_date: startDate,
            end_date: endDate,
            start_time: startTime,
            end_time: endTime,
            status: 'active'
        }).
            then(res => {
                if (res) {
                    toggleTrainingCreatedPopup()
                }
            })
        setLoading(true)
    }
    return (
        <MainWrapper>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Spacer height={sizes.baseMargin} />
                <Wrapper style={[appStyles.grayWrapper, { paddingHorizontal: 0, paddingVertical: 0, }]}>
                    <Calendar
                        current={trainingData.start_date && moment(trainingData.start_date).format('YYYY-MM-DD')}
                        //current={'2022-01-01'}
                        //  minDate={new Date()}
                        // markingType={'multi-dot'}
                        // current={startDate ? moment(startDate) : new Date()}
                        // minDate={minDate}
                        // markedDates={{
                        //     "2021-08-16": { selected: true, selectedColor: colors.appColor1 },
                        // }}
                        // markedDates={{
                        //     "2021-12-27": { startingDay: true, color: "green", textColor: '#FFFFFF' },
                        //     "2021-12-28": { color: "green", textColor: '#FFFFFF' },
                        //     "2021-12-29": { color: "green", textColor: '#FFFFFF' },
                        //     "2021-12-30": { endingDay: true, color: "green", textColor: '#FFFFFF' }
                        // }}
                        markedDates={markedDates}
                        markingType={"period"}
                        // markingType={'multi-dot'}
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
                            const date = moment(day.dateString)
                            //const date = moment(day.dateString, "YYYY-MM-DD").toDate()
                            console.log('date moment', date)
                            onDayPress(date)
                            //date(day), toggleModal();
                            //setSelectedDate(day.dateString)
                            //toggleSelectTimePopup()
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
                <Spacer height={sizes.doubleBaseMargin} />
                <ComponentWrapper>
                    <TinyTitle style={[appStyles.textCenter]}>Select Start and End Time</TinyTitle>
                </ComponentWrapper>
                <Spacer height={sizes.baseMargin} />
                <RowWrapper style={{ alignItems: 'flex-start', marginHorizontal: sizes.marginHorizontalLarge }}>
                    <Wrapper flex={1}>
                        <TextInputUnderlined
                            title="Start Time"
                            value={startTime ? startTime : ''}
                            containerStyle={{ marginHorizontal: 0 }}
                            onPress={() => {
                                toggleStartTimePicker()
                            }}
                            iconNameRight="clock"
                            iconTypeRight="feather"
                            iconColorRight={colors.appTextColor1}
                            iconSizeRight={totalSize(2.25)}
                            error={startTimeError}
                        />

                    </Wrapper>
                    <Spacer width={sizes.marginHorizontal} />
                    <Wrapper flex={1}>
                        <TextInputUnderlined
                            title="End Time"
                            value={endTime ? endTime : ''}
                            containerStyle={{ marginHorizontal: 0 }}
                            onPress={() => {
                                toggleEndTimePickerPopup()
                            }}
                            iconNameRight="clock"
                            iconTypeRight="feather"
                            iconColorRight={colors.appTextColor1}
                            iconSizeRight={totalSize(2.25)}
                            error={endTimeError}
                        />
                    </Wrapper>
                </RowWrapper>
                {/* {
                    timeSlots.length ?
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
                                        date={moment(item.date, 'YYYY-MM-DD').format('dddd, DD MMMM, YYYY')}
                                        startTime={item.start_time}
                                        endTime={item.end_time}
                                        onPressDelete={() => handleRemoveTimeSlot(item)}
                                    />
                                )
                            }}
                        />
                        :
                        <Wrapper style={[appStyles.center]}>
                            <Spacer height={sizes.doubleBaseMargin} />
                            <MediumText style={[appStyles.textGray]}>No Time Slots Selected</MediumText>
                        </Wrapper>
                } */}

            </ScrollView>
            <Spacer height={sizes.baseMargin} />
            {/* {
                timeSlots.length ?
                    <ButtonGradient
                        text="Create Training"
                        onPress={handleAddTraining}
                        loading={isLoading}
                    />
                    : null
            } */}
            {
                startDate && endDate && startTime && endTime ?
                    <ButtonGradient
                        text={!edit ? "Create Training" : "Update Training"}
                        onPress={!edit ? handleAddTraining : handleEditTraining}
                        loading={isLoading}
                        shadow
                    />
                    :
                    null
            }

            <Spacer height={sizes.doubleBaseMargin} />
            <PopupPrimary
                visible={isTrainingCreatedPopupVisible}
                toggle={toggleTrainingCreatedPopup}
                iconName="check"
                iconType="feather"
                title={!edit ? "Training Created" : "Training Updated"}
                info={"Customers in your area can now see your training ad and contact you"}
                buttonText1="Continue"
                onPressButton1={() => { toggleTrainingCreatedPopup(); navigate(routes.seller.trainings) }}
                topMargin={height(60)}
                disableBackDropPress
                disableSwipe
            />
            {/* <PopupPrimary
                visible={isSelectTimePopupVisible}
                toggle={toggleSelectTimePopup}
                title="Select Time"
                buttonText1="Done"
                onPressButton1={handleAddTimeSlot}
                topMargin={height(60)}
            >
                <Wrapper>
                    <Spacer height={sizes.baseMargin} />
                    <RowWrapper style={{ alignItems: 'flex-start', }}>
                        <Wrapper flex={1}>
                            <TextInputUnderlined
                                title="Start Time"
                                value={startTime ? startTime : ''}
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
                                error={startTimeError}
                            />

                        </Wrapper>
                        <Spacer width={sizes.marginHorizontalSmall} />
                        <Wrapper flex={1}>
                            <TextInputUnderlined
                                title="End Time"
                                value={endTime ? endTime : ''}
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
                                error={endTimeError}
                            />
                        </Wrapper>
                    </RowWrapper>
                    <Spacer height={sizes.baseMargin} />
                </Wrapper>
            </PopupPrimary> */}
            <DateTimePicker
                isVisible={isStartTimePickerVisible}
                mode="time"
                onConfirm={handleConfirmStartTime}
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
                onConfirm={handleConfirmEndTime}
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
