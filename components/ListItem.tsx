import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

import {CurrencyType} from '../constants/data';

interface ListItemProps {
  item: CurrencyType;
  onPress: (item: CurrencyType) => void;
}

const ListItem = ({item, onPress}: ListItemProps) => {
  return (
    <TouchableOpacity onPress={() => onPress(item)}>
      <Text style={styles.text}>
        {item.code} - {item.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    fontSize: 18,
    margin: 10,
  },
});

export default React.memo(ListItem);
