/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Provider } from 'react-redux';
import Main from './src/Components/Main';
import store from './src/redux/store';
const App = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};

export default App;



// tich hop vaof ung dung - Provider-> 1 component - 1 props ->store


