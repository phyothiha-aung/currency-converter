import React, {useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

import Selector from './components/Selector';
import {CurrencyType} from './constants/data';
import useExchange from './hooks/useExchange';
import {handleCopy, getDate} from './utils/functions';
interface ResultType {
  amount: number;
  rate: number;
}

const App = () => {
  const [fromCurrency, setFromCurrency] = useState<CurrencyType>(
    {} as CurrencyType,
  );
  const [toCurrency, setToCurrency] = useState<CurrencyType>(
    {} as CurrencyType,
  );
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState<ResultType>({} as ResultType);

  const {exchange, isLoading, error} = useExchange();

  const resetResult = () => {
    setResult({} as ResultType);
  };

  const handleInputChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setInputValue(numericValue);
  };

  const getResult = (first: string, last: string) => {
    if (first == last) {
      setResult({rate: 1, amount: Number(inputValue)});
      return;
    }
    let rate = 0;
    if (first == 'USD' || last == 'USD') {
      rate = exchange?.quotes[first + last];
    } else {
      rate = exchange?.quotes[first + 'USD'] / exchange?.quotes[last + 'USD'];
    }
    const amount = Number(inputValue) * rate;
    setResult({amount, rate});
  };

  if (error)
    return (
      <View style={styles.fail}>
        <Text style={{color: 'red', fontSize: 25}}>{error}</Text>
      </View>
    );

  return (
    <SafeAreaView style={styles.safearea}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {isLoading && (
            <View style={styles.fail}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )}

          <Text style={styles.header}>Currency Converter</Text>

          <View style={styles.converterContainer}>
            <View style={styles.selectorContainer}>
              <Selector
                selectedOption={fromCurrency}
                setOption={setFromCurrency}
                title="From"
                resetResult={resetResult}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter Amount..."
                value={inputValue}
                keyboardType="numeric"
                onChangeText={handleInputChange}
              />
            </View>
            <View style={styles.selectorContainer}>
              <Selector
                selectedOption={toCurrency}
                setOption={setToCurrency}
                title="To"
                resetResult={resetResult}
              />
              <TouchableOpacity
                disabled={!result.amount}
                onPress={() => handleCopy(result.amount.toFixed(8))}>
                <Text
                  style={[
                    styles.input,
                    {backgroundColor: '#E1D9D1', paddingVertical: 10},
                  ]}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {result.amount ? result.amount.toFixed(8) : ''}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.convertButton}
              disabled={!fromCurrency.code || !toCurrency.code || !inputValue}
              onPress={() => getResult(fromCurrency.code, toCurrency.code)}>
              <Text
                style={[
                  styles.btnText,
                  {
                    color:
                      !fromCurrency.code || !toCurrency.code || !inputValue
                        ? 'gray'
                        : 'black',
                  },
                ]}>
                Convert
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.rate}>
              {result.rate &&
                `1 ${fromCurrency.code} = ${result.rate.toFixed(8)} ${
                  toCurrency.code
                }`}
            </Text>
            <Text style={styles.rate}>
              {!!result.rate && `at ${getDate(exchange.timestamp)}`}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fail: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00ff0050',
    zIndex: 1,
  },
  safearea: {flex: 1},
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  header: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 33,
    marginBottom: 35,
    textAlign: 'center',
  },
  rate: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  converterContainer: {
    flex: 0,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    minHeight: 200,
  },
  selectorContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    overflow: 'hidden',
  },

  input: {
    backgroundColor: 'white',
    width: 200,
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  convertButton: {
    backgroundColor: 'skyblue',
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  btnText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default App;
