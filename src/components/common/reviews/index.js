import React from 'react'
import { FlatList } from "react-native";
import { sizes } from "../../../services";
import { ReviewCardPrimary } from "../../cards";



export default function Reviews({ data }) {
    return (
        <FlatList
            data={data}
            key={'key'}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
                const {user}=item
                return (
                    <ReviewCardPrimary
                        containerStyle={{ marginBottom: sizes.smallMargin }}
                        name={user.name}
                        imageUrl={user.image}
                        date={item.date}
                        rating={item.rating}
                        reviewCount={item.review_count}
                        comment={item.comment}
                    />
                )
            }}
        />
    )
}