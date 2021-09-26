import React from 'react';
import { View, Text } from 'react-native';
import Home from './src/navigations/Home';
import { createStore, applyMiddleware, compose  } from 'redux';
import { Provider } from 'react-redux';
import appReducers from './src/redux/reducers';
import createSagaMiddleware from 'redux-saga';
import { AppRegistry } from 'react-native';
import rootSaga from './src/sagas/rootSaga';
import Fetchdata from './src/screens/Fetchdata';
import Toast from '@phamhuuan/react-native-toast-message';
import GlobalLoading from './src/GlobalLoading';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  appReducers,
  applyMiddleware(sagaMiddleware)
);

const App = () => {
  return (
      <Provider store={store}>
        <Home />
        <Toast ref={(ref) => Toast.setRef(ref)} />
        <GlobalLoading />
        {/* <Fetchdata /> */}
      </Provider>
  );
};
sagaMiddleware.run(rootSaga);
export default App;