import React, { Component, useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Rating } from 'react-native-elements';
import { ComponentWrapper, MainWrapper, NoDataViewPrimary, newCardPrimary, RegularText, UserSkeletons, Wrapper, NotificationCardPrimary } from '../../../components';
import { appStyles, Backend, colors, DummyData, HelpingMethods } from '../../../services';
import { Swipeable } from 'react-native-gesture-handler'
import { MaterialIndicator } from 'react-native-indicators';
import { totalSize } from 'react-native-dimension';



function TheRepublicNews(props) {
    const { navigation } = props

    const [news, setnews] = useState(null)
    const [loading, setLoading] = useState(false)

    //configure Header
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                news ?
                    news.length ?
                        <TouchableOpacity activeOpacity={1} onPress={handleDeleteAllnews}>
                            <ComponentWrapper>
                                {
                                    !loading ?
                                        <RegularText style={[appStyles.fontBold, appStyles.textPrimaryColor]}>Clear All</RegularText>
                                        :
                                        <MaterialIndicator
                                            size={totalSize(2)}
                                            color={colors.appColor1}
                                        />
                                }
                            </ComponentWrapper>
                        </TouchableOpacity>
                        :
                        null
                    : null
            )
        });
    }, [navigation, news, loading]);

    useEffect(() => {
        getSetnew()
    }, [])

    const getSetnew = async () => {
        await Backend.getAllNews().
            then(res => {
                if (res) {
                    setnews(res.data)
                }
            })

    }
    const handleDeleteAllnews = async () => {
        setLoading(true)
        await Backend.clearAllNews().
            then(res => {
                if (res) {
                    setnews([])
                }
            })
        setLoading(false)

        //  setTimeout(() => {
        //      setLoading(false)
        //      setnews([])
        //  }, 2000);
    }
    const handleDeleteSinglenews = async (item, index) => {
        const tempNotif = news.filter(NotifObj => NotifObj.id != item.id)
        setnews(tempNotif)
        await Backend.clearSingleNews(item.id)
    }
    if (!news) {
        return (
            <MainWrapper>
                <UserSkeletons NumOfItems={10} />
            </MainWrapper>
        )
    }
    else if (!news.length) {
        return (
            <MainWrapper>
                <NoDataViewPrimary
                    title="News"
                    showIcon
                    iconName="bell-remove"
                />
            </MainWrapper>
        )
    }
    return (
        <MainWrapper>
            <FlatList
                data={news}
                key={'key'}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                    let refsArray = []
                    return (
                        <Swipeable
                            ref={ref => {
                                refsArray[index] = ref; //or this.refsArray[item.id] 
                            }}
                            renderRightActions={() =>
                                <Wrapper flex={1} style={{ backgroundColor: colors.error, alignItems: 'flex-end', justifyContent: 'center', }}>
                                    <ComponentWrapper>
                                        <RegularText style={[appStyles.textWhite, appStyles.fontBold]}>Delete</RegularText>
                                    </ComponentWrapper>
                                </Wrapper>}
                            onSwipeableRightOpen={() => {
                                refsArray[index] ? refsArray[index].close() : null
                                handleDeleteSinglenews(item, index)
                            }}
                        >
                            <NotificationCardPrimary
                                // containerStyle={{ backgroundColor: !item.isView ? index === news.length - 1 ? colors.appColor2 + '20' : colors.rating + '20' : 'transparent' }}
                                containerStyle={{ backgroundColor: colors.appBgColor1 }}
                                text={item.news}
                                image={null}
                                type={'app'}
                                time={HelpingMethods.formateDateFromNow(item.created_at)}
                            />
                        </Swipeable>
                    )
                }}
            />
        </MainWrapper>
    );
}

export default TheRepublicNews;
