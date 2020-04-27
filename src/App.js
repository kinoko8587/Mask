import React from 'react';
import './App.css';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import Bar from "./components/Bar"
import LMap from "./components/LMap"
import { Grid } from 'semantic-ui-react'

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <Grid container>
        <Grid.Row>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}>
            <Bar></Bar>
          </Grid.Column>
          <Grid.Column width={8}>
            <LMap></LMap>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Provider>
  );
}

export default App;

