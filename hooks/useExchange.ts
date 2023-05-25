import {useEffect, useState} from 'react';
import apiClient from '../services/api-client';
import {ExchangeType} from '../utils/types';
import cache from '../utils/cache';

const allExchangeRate = (data: {[key: string]: number}) => {
  const newData = {...data};

  for (const [key, value] of Object.entries(data)) {
    const swappedKey = key.slice(3) + key.slice(0, 3);
    const swappedValue = 1 / value;
    newData[swappedKey] = swappedValue;
  }
  return newData;
};

const useExchange = () => {
  const [exchange, setExchange] = useState<ExchangeType>({} as ExchangeType);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await apiClient.get<ExchangeType>('/live');
        if (res.data) {
          cache.store('@exchange', {
            timestamp: res.data.timestamp,
            quotes: allExchangeRate(res.data.quotes),
          });
          setExchange({
            timestamp: res.data.timestamp,
            quotes: allExchangeRate(res.data.quotes),
          });
          setLoading(false);
        }
      } catch (err) {
        try {
          const res = await cache.get('@exchange');
          if (res) {
            setExchange(res);
            setLoading(false);
          } else {
            setError(
              'No exchange rate detected check your internet and reload the app.',
            );
            setLoading(false);
          }
        } catch (err) {
          setError(
            'No exchange rate detected check your internet and reload the app.',
          );
          setLoading(false);
        }
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 30 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  return {exchange, isLoading, error};
};

export default useExchange;
