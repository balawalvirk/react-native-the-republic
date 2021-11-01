import React from 'react'
import { FlatList } from "react-native-gesture-handler";
import { appImages, HelpingMethods, sizes } from '../../../services';
import { ProductCardPrimary } from "../../cards";
import { Wrapper } from '../../wrappers';
import styles from './styles'
import * as RootNavigation from '../../../services/navigation/rootNavigation'

export function Products({ data, viewType, ListHeaderComponent, ListFooterComponent, onPressProduct }) {
    const isGridView = viewType === 'grid'
    const isListView = viewType === 'list'
    const { navigate } = RootNavigation
    return (
        <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            key={viewType}
            numColumns={isGridView && 2}
            ListHeaderComponent={ListHeaderComponent}
            ListFooterComponent={ListFooterComponent}
            keyExtractor={(item, index) => viewType + (index + 1).toString()}
            renderItem={({ item, index }) => {
                const { user } = item
                return (
                    <ProductCardPrimary
                        onPress={() => onPressProduct(item, index)}
                        animation={index <= 5 && isGridView ? 'fadeInUp' : 'fadeInRight'}
                        duration={300 + (50 * (index + 1))}
                        containerstyle={
                            isGridView ? [styles.productContainerGrid, { marginRight: data.length===1?null:(index + 1) % 2 ? 0 : null, marginleft: !(index + 1) % 2 ? 0 : null }] :
                                isListView ? [styles.productContainerList] : null
                        }
                        isFavourite={HelpingMethods.checkIsProductFavourite(item.id)}
                        onPressHeart={() => { }}
                        viewType={viewType}
                        image={item.images ? JSON.parse(item.images)[0] : appImages.noImageAvailable}
                        description={item.title}
                        discountedPrice={item.discounted_price}
                        price={item.price}
                        location={item.address}
                        rating={item.average_rating}
                        reviewCount={item.reviews_count}
                        userImage={user.profile_image}
                        userName={user.first_name + ' ' + user.last_name}
                    />
                )
            }}
        />
    )
}


export function ProductsSecondary({ data, ListHeaderComponent, ListFooterComponent, onPressProduct }) {
    const { navigate } = RootNavigation
    return (
        <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            key={'key'}
            ListHeaderComponent={ListHeaderComponent}
            ListFooterComponent={ListFooterComponent}
            keyExtractor={(item, index) => (index + 1).toString()}
            renderItem={({ item, index }) => {
                const { user } = item
                return (
                    <ProductCardPrimary
                        onPress={() => onPressProduct(item, index)}
                        animation={'fadeInUp'}
                        duration={300 + (50 * (index + 1))}
                        containerstyle={
                            styles.productContainerGrid
                        }
                        isFavourite={HelpingMethods.checkIsProductFavourite(item.id)}
                        onPressHeart={() => { }}
                        image={item.image}
                        images={item.images}
                        description={item.description}
                        discountedPrice={item.new_price}
                        price={item.old_price}
                        location={item.location}
                        rating={item.rating}
                        reviewCount={item.review_count}
                        userImage={user.image}
                        userName={user.name}
                    />
                )
            }}
        />
    )
}

export function ProductsHorizontalyPrimary({ data, ListHeaderComponent, ListFooterComponent, onPressProduct }) {
    const { navigate } = RootNavigation
    return (
        <FlatList
            data={data}
            showsHorizontalScrollIndicator={false}
            key={'key'}
            horizontal
            ListHeaderComponent={ListHeaderComponent}
            ListFooterComponent={ListFooterComponent}
            keyExtractor={(item, index) => (index + 1).toString()}
            renderItem={({ item, index }) => {
                const { user } = item
                //index === 0 && console.log('product item-->', user.first_name)
                const productImages = JSON.parse(item.images)
                return (
                    <ProductCardPrimary
                        animation
                        containerstyle={
                            [
                                styles.ProductHorizontalyPrimaryContainer,
                                {
                                    marginLeft: index === 0 ? sizes.marginHorizontal : 0,
                                    marginRight: sizes.marginHorizontalSmall
                                }
                            ]
                        }
                        onPress={() => onPressProduct(item, index)}
                        animation={'fadeInUp'}
                        duration={300 + (50 * (index + 1))}
                        isFavourite={HelpingMethods.checkIsProductFavourite(item.id)}
                        onPressHeart={() => { }}
                        image={productImages ? productImages[0] : appImages.noImageAvailable}
                        //images={item.images}
                        description={item.title}
                        price={item.price}
                        discountedPrice={item.discounted_price}
                        location={item.location}
                        rating={item.average_rating}
                        reviewCount={item.reviews_count}
                        userName={user.first_name + ' ' + user.last_name}
                        userImage={user.profile_image}
                        isSponsered={item.isSponsered}
                    />
                )
            }}
        />
    )
}