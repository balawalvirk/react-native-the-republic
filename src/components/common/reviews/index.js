import React from 'react'
import { FlatList } from "react-native";
import { appImages, sizes } from "../../../services";
import { ReviewCardPrimary } from "../../cards";



export default function Reviews({ data, ListHeaderComponent, ListFooterComponent }) {
    return (
        <>
            {
                data.length ?
                    <FlatList
                        data={data}
                        key={'key'}
                        ListHeaderComponent={ListHeaderComponent}
                        ListFooterComponent={ListFooterComponent}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            const { user } = item
                            return (
                                <ReviewCardPrimary
                                    containerStyle={{ marginBottom: sizes.smallMargin }}
                                    name={user ? (user.first_name + ' ' + user.last_name) : 'Anonynouse'}
                                    imageUrl={user ? user.profile_image : appImages.noUser}
                                    date={item.created_at}
                                    rating={item.rating}
                                    //reviewCount={item.review_count}
                                    comment={item.comment}
                                />
                            )
                        }}
                    />
                    :
                    null
            }
        </>
    )
}