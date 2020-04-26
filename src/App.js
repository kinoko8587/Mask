import React from 'react';
import './App.css';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import Content from "./components/Content"

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <Content></Content>
    </Provider>
  );
}

export default App;

