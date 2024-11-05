import { SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';
import AppStack from './navigation/AppStack';
import { TokenProvider } from './hooks/useToken';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TokenProvider>
        <AppStack />
      </TokenProvider>
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



