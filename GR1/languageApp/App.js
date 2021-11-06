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
import NewPassword from './src/screens/user/NewPassword';
import FlatListitem from './src/screens/Flatlistitem';
const sagaMiddleware = createSagaMiddleware();
import HomeScreenDetail from './src/screens/tab/home/HomeScreenDetail';
import HomeScreen from './src/screens/tab/home/HomeScreen';
import ExplainScreen from './src/screens/tab/home/ExplainScreen';
import ListGrammer from './src/screens/tab/home/ListGrammer';
import Grammer from './src/screens/tab/home/Grammer';
import GrammarScreenDetail from './src/screens/tab/home/GrammarScreenDetail';
import GrammerScreen from './src/screens/tab/home/GrammerScreen';


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
      // <HomeScreenDetail />
      // <GrammarScreenDetail />
      // <GrammerScreen />
      // <ExplainScreen />
      // <ListGrammer />
      // <Grammer />
      // <HomeScreen />
  );
};
sagaMiddleware.run(rootSaga);
export default App;