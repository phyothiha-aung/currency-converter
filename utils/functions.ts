import Clipboard from '@react-native-clipboard/clipboard';
import {ToastAndroid} from 'react-native';

export const handleCopy = (text: string) => {
  Clipboard.setString(text);
  ToastAndroid.show('Copied to Clipboard', ToastAndroid.SHORT);
};

export const getDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleString();
};
