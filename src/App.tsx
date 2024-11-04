import { SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';
import AppStack from './navigation/AppStack';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <AppStack />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff',
  },
});



export default App;



