import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { Icon } from 'react-native-elements';
import { ComponentWrapper, MainWrapper, Spacer, TimeSlotCard, TinyTitle, TitleInfoPrimary, TitlePrimary, TitleValue, Wrapper } from '../../../components';
import { appStyles, colors, fontFamily, fontSize, routes, sizes } from '../../../services';

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

    return (
        <MainWrapper>
            <Spacer height={sizes.baseMargin} />
            <ComponentWrapper>
                <TinyTitle>Selected Date</TinyTitle>
            </ComponentWrapper>
            <Spacer height={sizes.smallMargin} />
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
                    //   onDayPress={day => {
                    //     console.log(day.dateString);
                    //     let date = new Date();
                    //     GlobalConst.SelectedDate = moment(
                    //       day.dateString,
                    //       'YYYY-MM-DD',
                    //     ).format('DD MMMM, YYYY');
                    //     navigate(routes.provider.scheduleByDate, {
                    //       LeaveDates: LeaveDates,
                    //     });
                    //   }}
                    onDayPress={(day) => {
                        console.log('day press', day)
                        //date(day), toggleModal();
                    }}
                    theme={primaryTheme}
                    renderArrow={(direction) =>
                        direction === "left" ? (
                            <Icon name='triangle-left' type='octicon' />
                        ) : (
                            <Icon name='triangle-right' type='octicon' />
                        )
                    }
                // renderHeader={(date) => {
                //   <RowWrapper style={[{ backgroundColor: 'red' }]}>
                //     <Icon name="email" />
                //     <RegularText>{date}</RegularText>
                //     <Icon name="email" />
                //   </RowWrapper>
                // }}
                //renderArrow={(direction) => (direction === 'left' ? <IconLeft> : < IconRight/>)}
                />
            </Wrapper>
            <Spacer height={sizes.baseMargin} />
            <ComponentWrapper>
                <TinyTitle>Available Time Slots</TinyTitle>
            </ComponentWrapper>
            <Spacer height={sizes.smallMargin} />
            <FlatList
                data={timeSlots}
                renderItem={({ item, index }) => {
                    return (
                        <TimeSlotCard
                            containerStyle={{ marginBottom: sizes.marginVertical / 2 }}
                            onPress={() => {
                                navigate(routes.payment, { training, timeSlot: item })
                            }}
                            date={item.date}
                            startTime={item.startTime}
                            endTime={item.endTime}
                        />
                    )
                }}
            />
        </MainWrapper>
    );
}

export default SelectDateTime;
