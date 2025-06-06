import React, { Component, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { View, Text } from 'react-native';
import { height } from 'react-native-dimension';
import { MainWrapper, NoDataViewPrimary, SkeletonListVerticalPrimary, Spacer, TraningCard } from '../../../components';
import { appImages, Backend, DummyData, routes, sizes } from '../../../services';
import { useSelector } from 'react-redux'
function Trainings(props) {
    const { navigate } = props.navigation

    //redux state
    const user = useSelector(state => state.user)
    const { currentLocation, userDetail } = user
    //const trainings = DummyData.trainings
    const [allTrainings, setAllTrainings] = useState(null)


    useEffect(() => {
        getSetAllTrainings()
    }, [userDetail])
    const getSetAllTrainings = () => {
        Backend.getAllTranings().
            then(res => {
                if (res) {
                    setAllTrainings(res.data)
                }
            })
    }
    if (!allTrainings) {
        return (
            <SkeletonListVerticalPrimary
                itemHeight={height(40)}

            />
        )
    }
    return (
        <MainWrapper>
            {
                allTrainings.length?
                <FlatList
                data={allTrainings}
                key={'key'}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={() => <Spacer height={sizes.baseMargin} />}
                renderItem={({ item, index }) => {
                    const { trainer } = item
                    const { first_name, last_name, profile_image, avg_rating, reviews } = item.trainer
                    const fullName = first_name + ' ' + last_name
                    const image = profile_image ? profile_image : appImages.noUser
                    const rating = avg_rating ? avg_rating : 0
                    const reviewsCount = reviews ? reviews : 0
                    return (
                        <TraningCard
                            containerStyle={{ marginBottom: sizes.marginVertical / 2 }}
                            //onPress={() => navigate(routes.selectDateTime, { training: item })}
                            onPress={() => navigate(routes.trainingInfo, { training: item })}
                            title={item.title}
                            description={item.description}
                            duration={item.duration}
                            charges={'$ ' + item.charges}
                            startDate={item.start_date}
                            endDate={item.end_date}
                            location={item.location}
                            userName={fullName}
                            userImage={image}
                            userRating={rating}
                            userReviewsCount={reviewsCount}
                        />
                    )
                }}
            />
            :
            <NoDataViewPrimary
            title='Trainings'
            />
            }
        </MainWrapper>
    );
}

export default Trainings;
