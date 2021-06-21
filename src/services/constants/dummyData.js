import { appImages } from "../utilities";

const dummyData = {
    posts: [
        {
            id: 122,
            title: 'Selling my Dan Wesson Model 15-2 Stainless 357 Mag Sporter Superscroll 12GAx3″ 32″bbls',
            images: [],
            created_at: '23 minutes ago',
            like_counts: 23,
            comment_counts: 8,
            user: {
                name: 'Jackobe Black',
                image: appImages.user3
            },
            product: {
                id: 443,
                image: appImages.product1,
                title: 'Dan Wesson Model 15-2 Stainless 357 Mag Sporter Superscroll 12GAx3″ 32″bbls',
                new_price: '743.99',
                old_price: '949.99',
                location: 'Down town, NY'
            },
            comments: [
                {
                    id: 1221,
                    comment: 'Can you share more details???',
                    user: {
                        name: 'Anista jacklin',
                        image: appImages.user4,
                    },
                    created_at: '10 minutes ago',
                }
            ]

        },
        {
            id: 123,
            title: 'Selling my Dan Wesson Model 15-2 Stainless 357 Mag Sporter Superscroll 12GAx3″ 32″bbls',
            images: [appImages.product3, appImages.product1],
            created_at: '2 days ago',
            like_counts: 43,
            comment_counts: 5,
            user: {
                name: 'Jollie Win',
                image: appImages.user2
            },
            product: null,
            comments: [
                {
                    id: 4435,
                    comment: 'How much for this???',
                    user: {
                        name: 'Jackobe Black',
                        image: appImages.user3,
                    },
                    created_at: '10 minutes ago',
                }
            ]

        }
    ]
}

export default dummyData