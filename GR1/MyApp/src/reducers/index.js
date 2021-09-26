import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const defaultState = { value: 0, hightlight: false };

const reducer = (state = defaultState, action) => {
  if (action.type === 'UP') return { value: state.value + 1, hightlight: state.hightlight };
  if (action.type === 'DOWN') return { value: state.value - 1, hightlight: state.hightlight};
  if (action.type === 'CHANGE_COLOR') return {value: state.value, hightlight: !state.hightlight};
  return state;
};

const store = createStore(reducer);
export default store;
