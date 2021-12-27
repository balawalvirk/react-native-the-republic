import moment from 'moment'
import React from 'react'
import { MainWrapper, MediumText, Spacer, TraningCard, Wrapper, ColoredWrapper, TinyTitle, TitleValue, RowWrapperBasic, ButtonColored, ButtonGradient } from '../../../components'
import { appImages, appStyles, HelpingMethods, routes, sizes } from '../../../services'
import TrainingDetailTiming from './trainingDetailTiming'
export default function TrainingInfo({ navigation, route }) {
    const { navigate } = navigation
    const { training } = route.params
    return (
        <MainWrapper>
            <Wrapper flex={1}>
                <Spacer height={sizes.baseMargin} />
                <TrainingDetailTiming
                    data={training}
                />
                <Spacer height={sizes.baseMargin} />
            </Wrapper>
            <Wrapper>
                <ButtonGradient
                    text={'Proceed to Payment'}
                    shadow
                    onPress={()=>navigate(routes.payment,{training})}
                />
                <Spacer height={sizes.doubleBaseMargin} />
            </Wrapper>
        </MainWrapper>
    )
}

