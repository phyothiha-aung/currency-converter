import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import ListItem from './ListItem';
import {CurrencyType} from '../constants/data';

interface Props {
  closeModal: () => void;
  data: CurrencyType[];
  setOption: (option: CurrencyType) => void;
  title: string;
  resetResult: () => void;
}

const ModalSelector = ({
  closeModal,
  data,
  setOption,
  title,
  resetResult,
}: Props) => {
  const handlePress = (item: CurrencyType) => {
    setOption(item);
    resetResult();
    closeModal();
  };
  return (
    <TouchableOpacity style={styles.container} onPress={closeModal}>
      <View style={styles.modal}>
        <FlatList
          data={data}
          keyExtractor={item => item.code}
          ListHeaderComponent={<Text style={styles.title}>{title}</Text>}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({item}) => (
            <ListItem item={item} onPress={handlePress} />
          )}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ModalSelector;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: Dimensions.get('screen').width - 20,
    height: Dimensions.get('screen').height * (2 / 3),
    backgroundColor: 'white',
    borderRadius: 10,
  },
  title: {
    fontWeight: '900',
    fontSize: 22,
    textAlign: 'center',
    margin: 10,
  },
  separator: {
    width: '100%',
    height: 1 / 2,
    backgroundColor: 'gray',
  },
});
