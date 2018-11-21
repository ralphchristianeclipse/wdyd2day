import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import RichTextEditor from './components/RichTextEditor';
import Posts from './components/Posts';
import { Grid } from '@material-ui/core';

const App = () => (
  <div>
    <Grid container spacing={16}>
      <Grid item xs={4} justify="center">
        <Posts />
      </Grid>
      <Grid item xs={8}>
        <RichTextEditor />
      </Grid>
    </Grid>
  </div>
);
export default App;
