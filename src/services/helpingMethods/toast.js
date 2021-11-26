import {DeviceEventEmitter} from 'react-native';
import {SHOW_TOAST_MESSAGE} from '../constants';

const toast = {
  warn: options => {
    DeviceEventEmitter.emit(SHOW_TOAST_MESSAGE, {...options, type: 'warn'});
  },
  success: options => {
    DeviceEventEmitter.emit(SHOW_TOAST_MESSAGE, {...options, type: 'success'});
  },
  error: options => {
    DeviceEventEmitter.emit(SHOW_TOAST_MESSAGE, {...options, type: 'error'});
  },
};

export default toast;