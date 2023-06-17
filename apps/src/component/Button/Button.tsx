import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';

interface ButtonInterface {
  type?: 'primary' | 'success';
  label: string;
  onPress?: () => void;
}

function Button({type = 'primary', label, ...otherProps}: ButtonInterface) {
  return (
    <TouchableOpacity {...otherProps} style={[styles.main, styles[type]]}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
  main: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 6,
    minWidth: 100,
  },
  primary: {
    backgroundColor: '#0079FF',
  },
  success: {
    backgroundColor: '#22A699',
  },
});

export default Button;
