import React from 'react'
import { FlatList } from "react-native-gesture-handler";
import { HelpingMethods } from '../../../services';
import { ProductCardPrimary } from "../../cards";
import { Wrapper } from '../../wrappers';
import styles from './styles'
export default function Products({ data, viewType,ListHeaderComponent,ListFooterComponent }) {
    const isGridView = viewType === 'grid'
    const isListView = viewType === 'list'
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
                        animation={index <= 5 && isGridView ? 'fadeInUp' : 'fadeInRight'}
                        duration={300 + (50*(index + 1))}
                        containerstyle={
                            isGridView ? [styles.productContainerGrid, { marginRight: (index + 1) % 2 ? 0 : null, marginleft: !(index + 1) % 2 ? 0 : null }] :
                                isListView ? [styles.productContainerList] : null
                        }
                        isFavourite={HelpingMethods.checkIsProductFavourite(item.id)}
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