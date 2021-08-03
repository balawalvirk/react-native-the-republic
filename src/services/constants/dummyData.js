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
                location: 'Down town, NY',
                rating: 4.5,
                review_count: '23',
                user: {
                    id: 5642,
                    name: 'Alex Jhon',
                    image: appImages.user4
                },
                cooards: {
                    latitude: 51.5159,
                    longitude: 0.1136
                },
                info: {
                    make: 'Browning',
                    modal: 'Buck Mark Plus Vision Black/Gold Suppressor Ready',
                    "caliber/Gauge": '22 LR',
                    actionType: 'Semi Auto',
                    shootingType: '',
                    handedness: 'Right-Handed',
                    barrelLength: '5.679',
                    manufacturerNumber: '2342433s23',
                    firearmsClass: 'Non Restricted'
                }
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
            rating: 4.5,
            review_count: '23',
            user: {
                id: 5642,
                name: 'Alex Jhon',
                image: appImages.user4
            },
            cooards: {
                latitude: 51.5159,
                longitude: 0.1136
            },
            info: {
                make: 'Browning',
                modal: 'Buck Mark Plus Vision Black/Gold Suppressor Ready',
                "caliber/Gauge": '22 LR',
                actionType: 'Semi Auto',
                shootingType: '',
                handedness: 'Right-Handed',
                barrelLength: '5.679',
                manufacturerNumber: '2342433s23',
                firearmsClass: 'Non Restricted'
            }
        },
        {
            id: 743,
            image: appImages.product2,
            description: 'Stainless 357 Mag Sporter Superscroll 12GAx3″ 32″bbls',
            new_price: '529.99',
            old_price: '849.99',
            location: 'Block GH67, NY',
            rating: 4.4,
            review_count: '92',
            user: {
                id: 7734,
                name: 'Jasone White',
                image: appImages.user5
            },
            cooards: {
                latitude: 51.5359,
                longitude: 0.1336
            },
            info: {
                make: 'Browning',
                modal: 'Buck Mark Plus Vision Black/Gold Suppressor Ready',
                "caliber/Gauge": '22 LR',
                actionType: 'Semi Auto',
                shootingType: '',
                handedness: 'Right-Handed',
                barrelLength: '5.679',
                manufacturerNumber: '2342433s23',
                firearmsClass: 'Non Restricted'
            }
        },
        {
            id: 725553,
            image: appImages.product4,
            description: 'Dan Wesson Model 15-2 Stainless 357 Mag Sporter Superscroll 12GAx3″ 32″bbls',
            new_price: '743.99',
            old_price: '949.99',
            location: 'Down town, NY',
            rating: 4.8,
            review_count: '9',
            user: {
                id: 5642,
                name: 'Alex Jhon',
                image: appImages.user4
            },
            cooards: {
                latitude: 51.5559,
                longitude: 0.1536
            },
            info: {
                make: 'Browning',
                modal: 'Buck Mark Plus Vision Black/Gold Suppressor Ready',
                "caliber/Gauge": '22 LR',
                actionType: 'Semi Auto',
                shootingType: '',
                handedness: 'Right-Handed',
                barrelLength: '5.679',
                manufacturerNumber: '2342433s23',
                firearmsClass: 'Non Restricted'
            }
        },
        {
            id: 787252,
            image: appImages.product3,
            description: 'Stainless 357 Mag Sporter Superscroll 12GAx3″ 32″bbls',
            new_price: '529.99',
            old_price: '849.99',
            location: 'Block GH67, NY',
            rating: 4.9,
            review_count: '32',
            user: {
                id: 7734,
                name: 'Jasone White',
                image: appImages.user5
            },
            cooards: {
                latitude: 51.5259,
                longitude: 0.1236
            },
            info: {
                make: 'Browning',
                modal: 'Buck Mark Plus Vision Black/Gold Suppressor Ready',
                "caliber/Gauge": '22 LR',
                actionType: 'Semi Auto',
                shootingType: '',
                handedness: 'Right-Handed',
                barrelLength: '5.679',
                manufacturerNumber: '2342433s23',
                firearmsClass: 'Non Restricted'
            }
        },

    ],
    marketPlaceProducts: [

        {
            id: 743,
            images: [appImages.product2, appImages.product5, appImages.product4, appImages.product1],
            description: 'Stainless 357 Mag Sporter Superscroll 12GAx3″ 32″bbls',
            new_price: '529.99',
            old_price: '849.99',
            location: 'Block GH67, NY',
            rating: 4.4,
            review_count: '92',
            user: {
                id: 7734,
                name: 'Jasone White',
                image: appImages.user5
            },
            cooards: {
                latitude: 51.5359,
                longitude: 0.1336
            },
            info: {
                make: 'Browning',
                modal: 'Buck Mark Plus Vision Black/Gold Suppressor Ready',
                "caliber/Gauge": '22 LR',
                actionType: 'Semi Auto',
                shootingType: '',
                handedness: 'Right-Handed',
                barrelLength: '5.679',
                manufacturerNumber: '2342433s23',
                firearmsClass: 'Non Restricted'
            }
        },
        {
            id: 725553,
            images: [appImages.product5, appImages.product4, appImages.product1],
            description: 'Dan Wesson Model 15-2 Stainless 357 Mag Sporter Superscroll 12GAx3″ 32″bbls',
            new_price: '743.99',
            old_price: '949.99',
            location: 'Down town, NY',
            rating: 4.8,
            review_count: '9',
            user: {
                id: 5642,
                name: 'Alex Jhon',
                image: appImages.user4
            },
            cooards: {
                latitude: 51.5559,
                longitude: 0.1536
            },
            info: {
                make: 'Browning',
                modal: 'Buck Mark Plus Vision Black/Gold Suppressor Ready',
                "caliber/Gauge": '22 LR',
                actionType: 'Semi Auto',
                shootingType: '',
                handedness: 'Right-Handed',
                barrelLength: '5.679',
                manufacturerNumber: '2342433s23',
                firearmsClass: 'Non Restricted'
            }
        },
        {
            id: 787252,
            images: [appImages.product1],

            description: 'Stainless 357 Mag Sporter Superscroll 12GAx3″ 32″bbls',
            new_price: '529.99',
            old_price: '849.99',
            location: 'Block GH67, NY',
            rating: 4.9,
            review_count: '32',
            user: {
                id: 7734,
                name: 'Jasone White',
                image: appImages.user5
            },
            cooards: {
                latitude: 51.5259,
                longitude: 0.1236
            },
            info: {
                make: 'Browning',
                modal: 'Buck Mark Plus Vision Black/Gold Suppressor Ready',
                "caliber/Gauge": '22 LR',
                actionType: 'Semi Auto',
                shootingType: '',
                handedness: 'Right-Handed',
                barrelLength: '5.679',
                manufacturerNumber: '2342433s23',
                firearmsClass: 'Non Restricted'
            }
        },
        {
            id: 443,
            images: [appImages.product5, appImages.product1],
            description: 'Dan Wesson Model 15-2 Stainless 357 Mag Sporter Superscroll 12GAx3″ 32″bbls',
            new_price: '743.99',
            old_price: '949.99',
            location: 'Down town, NY',
            rating: 4.5,
            review_count: '23',
            user: {
                id: 5642,
                name: 'Alex Jhon',
                image: appImages.user4
            },
            cooards: {
                latitude: 51.5159,
                longitude: 0.1136
            },
            info: {
                make: 'Browning',
                modal: 'Buck Mark Plus Vision Black/Gold Suppressor Ready',
                "caliber/Gauge": '22 LR',
                actionType: 'Semi Auto',
                shootingType: '',
                handedness: 'Right-Handed',
                barrelLength: '5.679',
                manufacturerNumber: '2342433s23',
                firearmsClass: 'Non Restricted'
            }
        },
    ],
    userData: {
        id: 6673,
        name: 'Jackobe Black',
        image: appImages.user3,
        favourite_products: [443, 743, 787252],
        liked_posts: [122],
    },
    reviews: [
        {
            id: 123232,
            rating: 4.2,
            review_count: '34',
            comment: 'Really admieable peice of asd asd asdknalksfjgfd fkdskdD sdIOIIUINS A sd sdfsdfsdf sdf sdf sdfsdad sd',
            user: {
                id: 234,
                name: 'John Thomas',
                image: appImages.user4,
            },
            date: '3 monthes ago'
        },
        {
            id: 5342,
            rating: 3.9,
            review_count: '56',
            comment: 'Really admieable peice of asd asd asdknalksfjgfd fkdskdD sdIOIIUINS A sd sdfsdfsdf sdf sdf sdfsdad sd',
            user: {
                id: 744,
                name: 'William Alis',
                image: appImages.user5,
            },
            date: '1 monthes ago'
        },
        {
            id: 234554,
            rating: 4.5,
            review_count: '22',
            comment: 'Really admieable peice of asd asd asdknalksfjgfd fkdskdD sdIOIIUINS A sd sdfsdfsdf sdf sdf sdfsdad sd',
            user: {
                id: 22345,
                name: 'Jenny Wilson',
                image: appImages.user1,
            },
            date: '2 monthes ago'
        }
    ],

    categories: [
        {
            title: 'Handguns',
            image: 'https://cdn.britannica.com/33/125033-004-AA6D7B20/Smith-Wesson-handgun.jpg'
        },
        {
            title: 'Rifles',
            image: 'https://cdn.britannica.com/80/130780-004-510D7E4C/assault-rifles-top-M16A1-M4-M16A2-M16A4.jpg'
        },
        {
            title: 'Shotguns',
            image: 'https://i.ytimg.com/vi/iQzL2fYaW8c/maxresdefault.jpg'
        },
        {
            title: 'Ammo',
            image: 'https://www.19fortyfive.com/wp-content/uploads/2021/01/Ammo-Prices.jpg'
        }
    ],
    users: [
        {
            id: 22345,
            name: 'William Alis',
            image: appImages.user2,
        },
        {
            id: 8373,
            name: 'Jenny Wilson',
            image: appImages.user1,
        },
        {
            id: 8453,
            name: 'John Thomas',
            image: appImages.user3,
        },
        {
            id: 46216,
            name: 'Jackobe Black',
            image: appImages.user5,
        },
        {
            id: 23445,
            name: 'Nilson Meno',
            image: appImages.user4,
        },
    ],
    users: [
        {
            id: 8373,
            name: 'Jenny Wilson',
            image: appImages.user1,
        },
        {
            id: 22345,
            name: 'William Alis',
            image: appImages.user2,
        },
        {
            id: 46216,
            name: 'Jackobe Black',
            image: appImages.user5,
        },
        {
            id: 8453,
            name: 'John Thomas',
            image: appImages.user3,
        },
        {
            id: 23445,
            name: 'Nilson Meno',
            image: appImages.user4,
        },
    ],
    groups: [
        {
            id: 22345,
            name: 'New York Gun Buyers & Sellers',
            image: appImages.product1,
        },
        {
            id: 8373,
            name: 'Boston Gun Lovers',
            image: appImages.product5,
        },
        {
            id: 8453,
            name: 'Gun Buyers & Sellers',
            image: appImages.product3,
        },
        {
            id: 46216,
            name: 'Yellow Arms Buyers',
            image: appImages.product4,
        },
        {
            id: 23445,
            name: 'Armer Sales',
            image: appImages.product2,
        },
    ],
    orders: [
        {
            id: 743,
            image: appImages.product2,
            description: 'Stainless 357 Mag Sporter Superscroll 12GAx3″ 32″bbls',
            new_price: '529.99',
            old_price: '849.99',
            location: 'Block GH67, NY',
            rating: 4.4,
            review_count: '92',
            user: {
                id: 7734,
                name: 'Jasone White',
                image: appImages.user5
            },
            cooards: {
                latitude: 51.5359,
                longitude: 0.1336
            },
            info: {
                make: 'Browning',
                modal: 'Buck Mark Plus Vision Black/Gold Suppressor Ready',
                "caliber/Gauge": '22 LR',
                actionType: 'Semi Auto',
                shootingType: '',
                handedness: 'Right-Handed',
                barrelLength: '5.679',
                manufacturerNumber: '2342433s23',
                firearmsClass: 'Non Restricted'
            },
            status: 'active'
        },
        {
            id: 443,
            image: appImages.product1,
            description: 'Dan Wesson Model 15-2 Stainless 357 Mag Sporter Superscroll 12GAx3″ 32″bbls',
            new_price: '743.99',
            old_price: '949.99',
            location: 'Down town, NY',
            rating: 4.5,
            review_count: '23',
            user: {
                id: 5642,
                name: 'Alex Jhon',
                image: appImages.user4
            },
            cooards: {
                latitude: 51.5159,
                longitude: 0.1136
            },
            info: {
                make: 'Browning',
                modal: 'Buck Mark Plus Vision Black/Gold Suppressor Ready',
                "caliber/Gauge": '22 LR',
                actionType: 'Semi Auto',
                shootingType: '',
                handedness: 'Right-Handed',
                barrelLength: '5.679',
                manufacturerNumber: '2342433s23',
                firearmsClass: 'Non Restricted'
            },
            status: 'active'
        },

        {
            id: 725553,
            image: appImages.product4,
            description: 'Dan Wesson Model 15-2 Stainless 357 Mag Sporter Superscroll 12GAx3″ 32″bbls',
            new_price: '743.99',
            old_price: '949.99',
            location: 'Down town, NY',
            rating: 4.8,
            review_count: '9',
            user: {
                id: 5642,
                name: 'Alex Jhon',
                image: appImages.user4
            },
            cooards: {
                latitude: 51.5559,
                longitude: 0.1536
            },
            info: {
                make: 'Browning',
                modal: 'Buck Mark Plus Vision Black/Gold Suppressor Ready',
                "caliber/Gauge": '22 LR',
                actionType: 'Semi Auto',
                shootingType: '',
                handedness: 'Right-Handed',
                barrelLength: '5.679',
                manufacturerNumber: '2342433s23',
                firearmsClass: 'Non Restricted'
            },
            status: 'completed'
        },
        {
            id: 787252,
            image: appImages.product3,
            description: 'Stainless 357 Mag Sporter Superscroll 12GAx3″ 32″bbls',
            new_price: '529.99',
            old_price: '849.99',
            location: 'Block GH67, NY',
            rating: 4.9,
            review_count: '32',
            user: {
                id: 7734,
                name: 'Jasone White',
                image: appImages.user5
            },
            cooards: {
                latitude: 51.5259,
                longitude: 0.1236
            },
            info: {
                make: 'Browning',
                modal: 'Buck Mark Plus Vision Black/Gold Suppressor Ready',
                "caliber/Gauge": '22 LR',
                actionType: 'Semi Auto',
                shootingType: '',
                handedness: 'Right-Handed',
                barrelLength: '5.679',
                manufacturerNumber: '2342433s23',
                firearmsClass: 'Non Restricted'
            },
            status: 'active'
        },
        {
            id: 34245,
            image: appImages.product5,
            description: 'Dan Wesson Model 15-2 Stainless 357 Mag Sporter Superscroll 12GAx3″ 32″bbls',
            new_price: '743.99',
            old_price: '949.99',
            location: 'Down town, NY',
            rating: 4.8,
            review_count: '9',
            user: {
                id: 5642,
                name: 'Alex Jhon',
                image: appImages.user4
            },
            cooards: {
                latitude: 51.5559,
                longitude: 0.1536
            },
            info: {
                make: 'Browning',
                modal: 'Buck Mark Plus Vision Black/Gold Suppressor Ready',
                "caliber/Gauge": '22 LR',
                actionType: 'Semi Auto',
                shootingType: '',
                handedness: 'Right-Handed',
                barrelLength: '5.679',
                manufacturerNumber: '2342433s23',
                firearmsClass: 'Non Restricted'
            },
            status: 'completed'
        },
    ],
    creditCards: [
        {
            name: 'John Doe',
            number: '7781522933341946',
            expiry: '12/25',
            type: 'master'
        },
        {
            name: 'John Doe',
            number: '1153688253926386',
            expiry: '08/23',
            type: 'visa'
        }
    ],
    notificaitons: [
        {
            text: 'New products added in your area. You might like these.',
            type: 'app',
            image: null,
            time: '2h ago',
            isView: false
        },
        {
            text: 'Davin Grimes left a review on Browning Buck Mark Plus Vision Black/Gold Suppressor Ready 22 LR. Tap here to approve this review.',
            type: 'review',
            image: appImages.user2,
            time: '1d ago',
            isView: false
        },
        {
            text: 'Your order is on the way. Tap here to keep track of the delivery.',
            type: 'order',
            image: appImages.product4,
            time: '3d ago',
            isView: true
        },
        {
            text: 'Browning Buck Mark Plus Vision Black/Gold Suppressor Ready 22 LR is now available.',
            type: 'product',
            image: appImages.product5,
            time: '1w ago',
            isView: true
        },
        {
            text: 'Your notifications about your orders, new products and activity in the community will appear here.',
            type: 'app',
            image: null,
            time: '3w ago',
            isView: false
        },
    ],
    newsNotifications: [
        {
            text: 'General news and notifications sent by the Admin of the app will be shown in this section.',
            type: 'app',
            image: null,
            time: '3w ago',
            isView: false
        },
    ],
    conversations: [
        {
            message: 'Corrupti provident at explicabo quos quasi sit voluptatem.',
            time: '2h ago',
            user: {
                id: 7734,
                name: 'Jasone White',
                image: appImages.user5
            },
        },
        {
            message: 'Mollitia eum id tempore provident quasi consequatur numquam.',
            time: '2h ago',
            user: {
                id: 8373,
                name: 'Jenny Wilson',
                image: appImages.user1,
            },
        },
        {
            message: 'Architecto sequi et sint accusamus.',
            time: '2h ago',
            user: {
                id: 22345,
                name: 'William Alis',
                image: appImages.user2,
            },
        },
        {
            message: 'At laboriosam recusandae sed omnis sit earum omnis.',
            time: '2h ago',
            user: {
                id: 8453,
                name: 'John Thomas',
                image: appImages.user3,
            },
        },
    ],
    trainings: [
        {
            id: '44324552542',
            title: 'Improve Your Shooting Precision',
            description: 'Curabitur auctor leo et libero consetur gravida. Morbi gravida et sem dictum varius. Curabitur auctor leo et libero consetur gravida. Morbi gravida et sem dictum varius.',
            duration: '7 days',
            charges: '1500',
            location: 'Firearms Training Center, Atlantic County',
            user: {
                id: 8453,
                name: 'John Thomas',
                image: appImages.user3,
            },
        },
        {
            id: '657345345',
            title: 'Become Master of Handguns',
            description: 'Curabitur auctor leo et libero consetur gravida. Morbi gravida et sem dictum varius. Curabitur auctor leo et libero consetur gravida. Morbi gravida et sem dictum varius.',
            duration: '15 days',
            charges: '2000',
            location: 'Armor Training Center, Atlantic County',
            user: {
                id: 22345,
                name: 'William Alis',
                image: appImages.user2,
            },
        },
        {
            id: '67865322',
            title: 'Handle Your Rifle Like a Pro!!',
            description: 'Curabitur auctor leo et libero consetur gravida. Morbi gravida et sem dictum varius. Curabitur auctor leo et libero consetur gravida. Morbi gravida et sem dictum varius.',
            duration: '7 days',
            charges: '1500',
            location: 'Firearms Training Center, Atlantic County',
            user: {
                id: 7734,
                name: 'Jasone White',
                image: appImages.user5
            },
        }
    ],
    subscriptionPlans : [
        {
            title: 'Basic',
            price: '0',
            keyPoints: "• Free account • You'll able to post 2 pictures • Basic profile (picture, name, username etc.) • No ability to bump your ads unless paid for • You'll be able to see items posted within 30 miles radius from your location"
        },
    
        {
            title: 'Premium',
            price: '50',
            keyPoints: "• You will have the ability to post 5 sale post that remain active for a month • No more than 5 posts active at one time • You'll be able to add 5 photos per ad • Access to Community & Training network • Bump your ad once every 5 days • You'll have pics and video available on profile group sms not available on Basic"
        },
        {
            title: 'Dealer/Pro',
            price: '100',
            keyPoints: "• Unlimited listings • Access to post in training network • You'll also have the ability to advertise on your profile with picture & video • Can also list prices on their profile page • Ads can't be flagged • You'll be able to bump your ads every 5 days"
        },
    ]
}

export default dummyData