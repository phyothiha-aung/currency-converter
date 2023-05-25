import {StyleSheet, Text, View, TouchableOpacity, Modal} from 'react-native';
import React, {useState} from 'react';
import ModalSelector from './ModalSelector';

import {currencies, CurrencyType} from '../constants/data';

interface Props {
  selectedOption: CurrencyType;
  setOption: (option: CurrencyType) => void;
  title: string;
  resetResult: () => void;
}

const Selector = ({selectedOption, setOption, title, resetResult}: Props) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.text}>{selectedOption.code || '$$'}</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        animationType="none"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <ModalSelector
          closeModal={() => setModalVisible(false)}
          data={currencies}
          setOption={setOption}
          title={title}
          resetResult={resetResult}
        />
      </Modal>
    </View>
  );
};

export default Selector;

const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderRightWidth: 1,
    borderRightColor: 'black',
    paddingVertical: 10,
    width: 66,
    backgroundColor: 'white',
  },
  text: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
