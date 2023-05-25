import AsyncStorage from '@react-native-async-storage/async-storage';
import {ExchangeType} from './types';

const store = async (key: string, value: ExchangeType) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(e);
  }
};

const get = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
  }
};

export default {
  store,
  get,
};
