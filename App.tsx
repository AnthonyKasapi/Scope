import React from 'react';
import MainScreen from './src/screens/MainScreen';

import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';

function App(): JSX.Element {

  return (
    <SafeAreaView style={styles.root}>
      <MainScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: '#F9FBFC'
    }
});

export default App;
