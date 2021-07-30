import React from 'react'
import { FlatList } from "react-native-gesture-handler";
import { HelpingMethods, sizes } from '../../../services';
import { ProductCardSecondary, ProductCardPrimary } from "../../cards";
import * as RootNavigation from '../../../services/navigation/rootNavigation'

export function OrdersPrimary({ data, ListHeaderComponent, ListFooterComponent, onPressItem }) {
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
                        newPrice={item.new_price}
                        oldPrice={item.old_price}
                        //location={item.location}
                        rating={item.rating}
                        reviewCount={item.review_count}
                        moreInfo={true}
                        userImage={user.image}
                        userName={user.name}
                        status={item.status}
                        distance={index + 1 * 3 + ' miles away'}
                    />
                )
            }}
        />
    )
}



