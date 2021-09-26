import { createStore } from 'redux';
import reducer from '../redux/reducers/reducer';
  // tao ra store
  const store = createStore(reducer);
  export default store;