import {useState, useCallback} from 'react';
import * as ImagePicker from 'react-native-image-picker';
import {imagePickerOptions} from '../constants';
import {handleCameraPermissions} from '../helpingMethods';

const useImagePicker = props => {
  const {imageOptions = {}} = props || {};
  const _options = {...imagePickerOptions, ...imageOptions};
  const [image, setImage] = useState(null);
  const [isImagePickerPopupVisible, setImagePickerPopupVisibility] =
    useState(false);

  const toggleImagePickerPopup = () => setImagePickerPopupVisibility(pv => !pv);

  // Function to open the image picker for the camera
  const openCamera = useCallback(async () => {
    let res = null;
    if (await handleCameraPermissions()) {
      await ImagePicker.launchCamera(_options, response => {
        if (response.didCancel) {
          // User cancelled image picker
        } else if (response.error) {
          // Error with image picker
        } else {
          // Image selected successfully
          console.log('ImagePicker.launchCamera response: ', response);
          const assetObj = response?.assets[0];

          let imageObj = {
            uri: assetObj.uri,
            type: assetObj.type,
            name: assetObj.fileName,
          };
          res = imageObj;
          setImage(imageObj);
        }
      });
    }
    return res;
  }, []);

  // Function to open the image picker for the library
  const openLibrary = useCallback(async () => {
    let res = null;
    await ImagePicker.launchImageLibrary(_options, response => {
      if (response.didCancel) {
        // User cancelled image picker
      } else if (response.error) {
        // Error with image picker
      } else {
        // Image selected successfully
        console.log('ImagePicker.launchImageLibrary response: ', response);
        const assetObj = response?.assets[0];
        let imageObj = {
          uri: assetObj.uri,
          type: assetObj.type,
          name: assetObj.fileName,
        };
        res = imageObj;
        setImage(imageObj);
      }
    });
    return res;
  }, []);

  return {
    image,
    setImage,
    openCamera,
    openLibrary,
    isImagePickerPopupVisible,
    setImagePickerPopupVisibility,
    toggleImagePickerPopup,
  };
};

export default useImagePicker;
