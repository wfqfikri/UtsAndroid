import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import HomeScreen from '../app/home';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <HomeScreen />
    </SafeAreaView>
  );
};

export default App;
