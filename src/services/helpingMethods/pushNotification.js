import {DeviceEventEmitter} from 'react-native';
import {SHOW_PUSH_NOTIFICATION} from '../constants';

const pushNotification = {
  show: options => {
    DeviceEventEmitter.emit(SHOW_PUSH_NOTIFICATION, {...options, type: 'show'});
  },
};

export default pushNotification;