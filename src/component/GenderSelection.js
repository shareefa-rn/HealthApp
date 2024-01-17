// GenderSelection.js
import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Controller} from 'react-hook-form';
import styles from '../styles';

const GenderSelection = ({control}) => {
  return (
    <View style={styles.genderContainer}>
      <Controller
        control={control}
        render={({field}) => (
          <TouchableOpacity
            onPress={() => field.onChange('male')}
            style={
              field.value === 'male'
                ? styles.genderSelectedCell
                : styles.genderCell
            }>
            <Text style={styles.text}>Doctor</Text>
          </TouchableOpacity>
        )}
        name="gender"
        rules={{required: 'Gender is required'}}
        defaultValue=""
      />
      <Controller
        control={control}
        render={({field}) => (
          <TouchableOpacity
            onPress={() => field.onChange('female')}
            style={
              field.value === 'female'
                ? styles.genderSelectedCell
                : styles.genderCell
            }>
            <Text style={styles.text}>Patient</Text>
          </TouchableOpacity>
        )}
        name="gender"
        rules={{required: 'Gender is required'}}
        defaultValue=""
      />
    </View>
  );
};

export default GenderSelection;
