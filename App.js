import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { store } from './store.js';
import { connect, Provider } from 'react-redux';
import MainPage from './components/MainPage.js'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainPage />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
