import React from 'react'
import { FlatList } from "react-native-gesture-handler";
import { HelpingMethods, sizes } from '../../../services';
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
                            isGridView ? [styles.productContainerGrid, { marginRight: (index + 1) % 2 ? 0 : null, marginleft: !(index + 1) % 2 ? 0 : null }] :
                                isListView ? [styles.productContainerList] : null
                        }
                        isFavourite={HelpingMethods.checkIsProductFavourite(item.id)}
                        onPressHeart={() => { }}
                        viewType={viewType}
                        image={item.image}
                        description={item.description}
                        newPrice={item.new_price}
                        oldPrice={item.old_price}
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
                        newPrice={item.new_price}
                        oldPrice={item.old_price}
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
                return (
                    <ProductCardPrimary
                        containerstyle={
                            [
                                styles.ProductHorizontalyPrimaryContainer,
                                {
                                    marginLeft: index === 0 ? sizes.marginHorizontal : 0,
                                    marginRight:sizes.marginHorizontalSmall
                                }
                            ]
                        }
                        onPress={() => onPressProduct(item, index)}
                        animation={'fadeInUp'}
                        duration={300 + (50 * (index + 1))}

                        isFavourite={HelpingMethods.checkIsProductFavourite(item.id)}
                        onPressHeart={() => { }}
                        image={item.image}
                        //images={item.images}
                        description={item.description}
                        newPrice={item.new_price}
                        oldPrice={item.old_price}
                        location={item.location}
                        rating={item.rating}
                        reviewCount={item.review_count}
                        userImage={user.image}
                        userName={user.name}
                        isSponsered={item.isSponsered}
                    />
                )
            }}
        />
    )
}