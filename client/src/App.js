import React, { Component } from 'react';
import { TezosNodeReader } from 'conseiljs';
import getThanos from './utils/getThanos';

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
  };

  componentDidMount = async () => {
    try {
      const tezos = await getThanos();
      const accountPkh = await tezos.wallet.pkh();
      const accountBalance = await tezos.tz.getBalance(accountPkh);

      const instance = await tezos.wallet.at(contract);
      console.log(instance);

      const data = await TezosNodeReader.getContractStorage(rpc, contract);

      console.log(data.args[1].args[1]);

      const buyers = data.args[1].args[1];
      const limit = data.args[0].args[1].int;
      const remaining = limit - data.args[0].args[0].int;

      this.setState({
        address: accountPkh,
        balance: accountBalance.toNumber() / 1000000,
        limit,
        remaining,
        buyers,
        instance,
      });
    } catch (err) {
      console.log(err);
    }
  };

  getTickerBuyers = () => {
    return this.state.buyers.map((buyer) => (
      <tr key={parseInt(buyer.args[0].int)}>
        <td>{parseInt(buyer.args[0].int) + 1}</td>
        <td>{buyer.args[1].string}</td>
      </tr>
    ));
  };

  buyTicket = async () => {
    //Add try catch
    const buyOperation = await this.state.instance.methods
      .main(3)
      .send({ amount: 3 });
    await buyOperation.confirmation();
  };

  render() {
    return (
      <div className='App'>
        <h1>Address: {this.state.address}</h1>
        <h1>Balance: {this.state.balance}</h1>
        <h1>Tickets Limit: {this.state.limit}</h1>
        <h1>Remaining: {this.state.remaining}</h1>

        <button onClick={this.buyTicket}>Buy Ticket</button>

        <table>
          <thead>
            <tr>
              <th>Ticket Number</th>
              <th>Buyer</th>
            </tr>
          </thead>
          <tbody>{this.getTickerBuyers()}</tbody>
        </table>
      </div>
    );
  }
}

export default App;
