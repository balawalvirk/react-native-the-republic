import moment from 'moment'
import React from 'react'
import { MainWrapper, MediumText, Spacer, TraningCard, Wrapper, ColoredWrapper, TinyTitle, TitleValue, RowWrapperBasic, ButtonColored, ButtonGradient } from '../../../components'
import { appImages, appStyles, HelpingMethods, routes, sizes } from '../../../services'

export default function TrainingDetailTiming({ data }) {
    const { first_name, last_name, profile_image, avg_rating, reviews } = data.trainer
    const fullName = first_name + ' ' + last_name
    const image = profile_image ? profile_image : appImages.noUser
    const rating = avg_rating ? avg_rating : 0
    const reviewsCount = reviews ? reviews : 0

    const TitleValuePrimary = ({ title, value }) => {
        return (
            <TitleValue
                title={title}
                value={value}
                containerStyle={{ flexDirection: 'column', marginHorizontal: 0, alignItems: 'flex-start', }}
                titleStyle={[appStyles.textRegular, appStyles.textDarkGray]}
                valueStyle={[appStyles.textMedium, { marginTop: sizes.smallMargin }]}
            />
        )
    }
    const formateDate = d => moment(d).format('ddd, DD MMM, YYYY')
    return (
        <Wrapper>
            <TraningCard
                containerStyle={{ marginBottom: sizes.marginVertical / 2 }}
                //onPress={() => navigate(routes.selectDateTime, { training: training })}
                // onPress={() => navigate(routes.trainingInfo, { training: training })}
                title={data.title}
                description={data.description}
                duration={data.duration}
                charges={'$ ' + data.charges}
                startDate={data.start_date}
                endDate={data.end_date}
                location={data.location}
                userName={fullName}
                userImage={image}
                userRating={rating}
                userReviewsCount={reviewsCount}
            />
            <Spacer height={sizes.TinyMargin} />
            <ColoredWrapper>
                <TinyTitle>Starting from {formateDate(data.start_date)}</TinyTitle>
                <Spacer height={sizes.baseMargin} />
                <RowWrapperBasic>
                    <Wrapper flex={1}>
                        <TitleValuePrimary
                            title={'End Date'}
                            value={formateDate(data.end_date)}
                        />
                    </Wrapper>
                    <Wrapper flex={1}>
                        <TitleValuePrimary
                            title={'Timing'}
                            value={data.start_time + ' - ' + data.end_time}
                        />
                    </Wrapper>
                </RowWrapperBasic>
            </ColoredWrapper>
        </Wrapper>
    )
}