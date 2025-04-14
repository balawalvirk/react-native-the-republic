import React from 'react'
import { FlatList } from "react-native";
import { appImages, HelpingMethods, sizes } from "../../../services";
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
                            const fullname = user ? (user.first_name + ' ' + user.last_name) : 'Anonynouse'
                            return (
                                <ReviewCardPrimary
                                    containerStyle={{ marginBottom: sizes.smallMargin }}
                                    title={fullname}
                                    imageUrl={user ? user.profile_photo_path : appImages.noUser}
                                    date={HelpingMethods.formateDateFromNow(item.created_at)}
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