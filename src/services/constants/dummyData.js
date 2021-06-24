import { appImages } from "../utilities";

const dummyData = {
    posts: [
        {
            id: 122,
            description: 'Selling my Dan Wesson Model 15-2 Stainless 357 Mag Sporter Superscroll 12GAx3″ 32″bbls',
            images: [],
            created_at: '23 minutes ago',
            like_counts: 23,
            comment_counts: 8,
            share_count: 63,
            user: {
                name: 'Jackobe Black',
                image: appImages.user3
            },
            group: {
                id: 4442,
                name: 'NY Gun Buyers'
            },
            product: {
                id: 443,
                image: appImages.product1,
                description: 'Dan Wesson Model 15-2 Stainless 357 Mag Sporter Superscroll 12GAx3″ 32″bbls',
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
            ],

        },
        {
            id: 4453,
            description: 'Dan Wesson Model 15-2 Stainless 357 Mag Sporter Superscroll 12GAx3″ 32″bbls',
            images: [appImages.product5, appImages.product2],
            created_at: '2 days ago',
            like_counts: 12,
            comment_counts: 2,
            share_count: 9,
            user: {
                name: 'Willi Jin',
                image: appImages.user2
            },
            group: null,
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

        },
        {
            id: 123,
            description: 'Selling my Dan Wesson Model 15-2 Stainless 357 Mag Sporter Superscroll 12GAx3″ 32″bbls',
            images: [appImages.product3, appImages.product1],
            created_at: '2 days ago',
            like_counts: 43,
            comment_counts: 5,
            share_count: 56,
            user: {
                name: 'Jollie Win',
                image: appImages.user2
            },
            group: {
                id: 553,
                name: 'Armor Lovers'
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
    ],
    products: [
        {
            id: 443,
            image: appImages.product1,
            description: 'Dan Wesson Model 15-2 Stainless 357 Mag Sporter Superscroll 12GAx3″ 32″bbls',
            new_price: '743.99',
            old_price: '949.99',
            location: 'Down town, NY',
            rating:4.5,
            review_count:'23',
            user: {
                id:5642,
                name: 'Alex Jhon',
                image: appImages.user4
            }
        },
        {
            id: 743,
            image: appImages.product2,
            description: 'Stainless 357 Mag Sporter Superscroll 12GAx3″ 32″bbls',
            new_price: '529.99',
            old_price: '849.99',
            location: 'Block GH67, NY',
            rating:4.4,
            review_count:'92',
            user: {
                id:7734,
                name: 'Jasone White',
                image: appImages.user5
            }
        },
        {
            id: 725553,
            image: appImages.product4,
            description: 'Dan Wesson Model 15-2 Stainless 357 Mag Sporter Superscroll 12GAx3″ 32″bbls',
            new_price: '743.99',
            old_price: '949.99',
            location: 'Down town, NY',
            rating:4.8,
            review_count:'9',
            user: {
                id:5642,
                name: 'Alex Jhon',
                image: appImages.user4
            }
        },
        {
            id: 787252,
            image: appImages.product3,
            description: 'Stainless 357 Mag Sporter Superscroll 12GAx3″ 32″bbls',
            new_price: '529.99',
            old_price: '849.99',
            location: 'Block GH67, NY',
            rating:4.9,
            review_count:'32',
            user: {
                id:7734,
                name: 'Jasone White',
                image: appImages.user5
            }
        },
        
    ],
    userData: {
        id: 6673,
        name: 'Jackobe Black',
        image: appImages.user3,
        favourite_products: [443, 743,787252],
        liked_posts: [122],
    }
}

export default dummyData