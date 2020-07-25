import React, { Component, Fragment } from 'react';
import { TezosNodeReader } from 'conseiljs';
import getThanos from './utils/getThanos';
import Navbar from './layout/Navbar';
import Home from './pages/Home';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const contract = 'KT1MB38imy3qmiMvLbBqAvB8SjRnBFQ6Nhsr';
const rpc = 'https://carthagenet.smartpy.io';

class App extends Component {
  state = {
    address: '',
    balance: '',
    limit: 0,
    remaining: 0,
    buyers: [],
    instance: null,
    prev: [],
    pageLoading: true,
    buttonLoading: false,
  };

  componentDidMount = async () => {
    try {
      this.setState({ pageLoading: true });

      const tezos = await getThanos();
      const accountPkh = await tezos.wallet.pkh();
      const accountBalance = await tezos.tz.getBalance(accountPkh);

      const instance = await tezos.wallet.at(contract);

      const data = await TezosNodeReader.getContractStorage(rpc, contract);

      console.log(data.args[1].args[0]);

      const buyers = data.args[1].args[1];
      const prev = data.args[1].args[0];
      const limit = data.args[0].args[1].int;
      const remaining = limit - data.args[0].args[0].int;

      this.setState({
        address: accountPkh,
        balance: accountBalance.toNumber() / 1000000,
        limit,
        remaining,
        buyers,
        prev,
        instance,
        pageLoading: false,
      });
    } catch (err) {
      console.log(err);
    }
  };

  buyTicket = async (amount) => {
    try {
      this.setState({ buttonLoading: true });

      const buyOperation = await this.state.instance.methods
        .main(amount)
        .send({ amount: amount });
      await buyOperation.confirmation();

      window.location.reload();
    } catch (err) {
      alert(err);
    }
    this.setState({ buttonLoading: false });
  };

  render() {
    return (
      <Fragment>
        <Navbar account={this.state.address} />
        <div className='container'>
          {this.state.pageLoading ? (
            <div className='text-center mt-5'>
              <span className='spinner-border' />
            </div>
          ) : (
            <Home
              balance={this.state.balance}
              remaining={this.state.remaining}
              buyTicket={this.buyTicket}
              buyers={this.state.buyers}
              limit={this.state.limit}
              prev={this.state.prev}
              buttonLoading={this.state.buttonLoading}
            />
          )}
        </div>
      </Fragment>
    );
  }
}

export default App;
