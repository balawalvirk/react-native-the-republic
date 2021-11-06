import axios from "axios";
import { baseURL, endPoints } from "..";

export const getFeatures = async () => {
    let response = null
    const uri = `${baseURL + endPoints.feature.show_features}`
    console.log('getFeatures \nuri', uri);
    await axios
        .get(uri)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('getFeatures Response', tempResponseData);
            if (tempResponseData.success) {
                response = tempResponseData
            } else {
                Toasts.error(tempResponseData.message)
            }
        })
        .catch(error => {
            Toasts.error(error.response.data.message)
            console.error(error);
        });
    return response
};