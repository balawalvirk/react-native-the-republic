

import { Platform } from "react-native";
import { routes } from "../../services";




const config = {
    screens: {
        auth: {
            path: routes.auth,
            screens: {
                signin: {
                    path: `${routes.signin}`
                },
            },

        },
        app: {
            path: routes.app,
            screens: {
                withdrawEarnings: {
                    path: `${routes.seller.withdrawEarnings}`
                },
            },

        },
    },
};

const linking = {
    prefixes: ["republic://",],
    config,
};

export default linking;