import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';
import './config/ReactotronConfig';
import FlashMessage from 'react-native-flash-message';
import { store, persistor } from './store';
import App from './App';

const Index = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar barStyle="light-content" backgroundColor="#22202c" />
        <App />
        <FlashMessage position="top" duration={4000} />
      </PersistGate>
    </Provider>
  );
};

export default Index;
