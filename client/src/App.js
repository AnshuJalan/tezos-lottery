import React, { Fragment } from 'react';
import Navbar from './layout/Navbar';
import Home from './pages/Home';

import LotteryState from './context/lottery/LotteryState';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  return (
    <LotteryState>
      <Fragment>
        <Navbar />
        <div className='container'>
          <Home />
        </div>
      </Fragment>
    </LotteryState>
  );
};

export default App;
