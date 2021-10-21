import React from 'react'
import { FlatList } from "react-native-gesture-handler";
import { appStyles, colors, HelpingMethods, sizes } from '../../../services';
import { ProductCardSecondary, ProductCardPrimary } from "../../cards";
import * as RootNavigation from '../../../services/navigation/rootNavigation'
import { ButtonColoredSmall } from '../../buttons';

export function Purchases({ data, ListHeaderComponent, ListFooterComponent, onPressItem }) {
   
    return (
        <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            key={'key'}
            //numColumns={isGridView && 2}
            ListHeaderComponent={ListHeaderComponent}
            ListFooterComponent={ListFooterComponent}
            keyExtractor={(item, index) => (index + 1).toString()}
            renderItem={({ item, index }) => {
                const { user } = item
                const isActive = item.status === 'active'
                const isCompleted = item.status === 'completed'
                const statusText = isActive ? "Order accepted" : isCompleted ? "Completed" : ''
                return (
                    <ProductCardSecondary
                        onPress={() => onPressItem(item, index)}
                        animation={index <= 5 ? 'fadeInUp' : null}
                        duration={300 + (50 * (index + 1))}
                        containerstyle={
                            { marginBottom: sizes.marginVertical }
                        }
                        isFavourite={HelpingMethods.checkIsProductFavourite(item.id)}
                        onPressHeart={() => { }}
                        image={item.image}
                        description={item.description}
                        discountedPrice={item.new_price}
                        price={item.old_price}
                        //location={item.location}
                        rating={item.rating}
                        reviewCount={item.review_count}
                        moreInfo={true}
                        moreInfoImage={user.image}
                        moreInfoTitle={user.name}
                        moreInfoSubTitle={index + 1 * 3 + ' miles away'}
                        moreInfoRight={
                            <ButtonColoredSmall
                                text={statusText}
                                buttonStyle={{ paddingHorizontal: sizes.marginHorizontalSmall / 2, borderRadius: 100, backgroundColor: isActive ? colors.appColor1 : isCompleted ? colors.success : colors.appColor1 }}
                                textStyle={[appStyles.textRegular, appStyles.textWhite]}
                            />
                        }
                    />
                )
            }}
        />
    )
}



