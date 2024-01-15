//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import Colors from '../Colors';

// create a component
function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} color={Colors.skyBlue} />
    </View>
  );
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

export default Loading;
