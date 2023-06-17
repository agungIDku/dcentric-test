import React from 'react';
import {TextInput, StyleSheet, TextInputProps} from 'react-native';

function TextField(props: TextInputProps) {
  return (
    <TextInput
      style={styles.textInput}
      placeholderTextColor="#6e6f71"
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    paddingVertical: 17,
    color: '#666666',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#F8F8F8',
    position: 'relative',
    width: 200,
  },
});

export default TextField;
