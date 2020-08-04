import React, { useReducer } from 'react';
import { Tezos } from '@taquito/taquito';
import getThanos from '../../utils/getThanos';
import LotteryReducer from './lotteryReducer';
import LotteryContext from './lotteryContext';
import chainConfig from '../../config/chainConfig.json';

import {
  GET_WALLET,
  GET_DATA,
  BUTTON_LOADING,
  BUY_TERMINATE,
  BUY_SUCCESS,
} from '../types';

//Provider for Tezos
Tezos.setProvider({ rpc: chainConfig.RPC });

const LotteryState = (props) => {
  const initialState = {
    account: '',
    balance: '',
    limit: 0,
    remaining: 0,
    buyers: [],
    instance: null,
    prev: [],
    pageLoading: true,
    buttonLoading: false,
  };

  const [state, dispatch] = useReducer(LotteryReducer, initialState);

  //GET WALLET
  const getWallet = async () => {
    try {
      const tezos = await getThanos();
      const accountPkh = await tezos.wallet.pkh();
      const accountBalance = await tezos.tz.getBalance(accountPkh);
      const instance = await tezos.wallet.at(chainConfig.CONTRACT);

      const payload = {
        account: accountPkh,
        balance: accountBalance.toNumber() / 1000000,
        instance: instance,
      };

      dispatch({ type: GET_WALLET, payload: payload });
    } catch (err) {
      alert(err);
    }
  };

  //GET DATA TAQUITO
  const getData = async () => {
    try {
      const contract = await Tezos.contract.at(chainConfig.CONTRACT);

      const storage = await contract.storage();

      const payload = {
        remaining: storage.limit.toNumber() - storage.id.toNumber(),
        limit: storage.limit.toNumber(),
        prev: storage.previousWinners,
        buyers: Array.from(storage.ticketToAddress.valueMap),
      };

      dispatch({ type: GET_DATA, payload: payload });
    } catch (err) {
      alert(err.message);
    }
  };

  //GET DATA CONSEILJS
  /*const getData = async () => {
    try {
      const data = await TezosNodeReader.getContractStorage(
        chainConfig.RPC,
        chainConfig.CONTRACT
      );

      const payload = {
        buyers: data.args[1].args[1],
        prev: data.args[1].args[0],
        limit: data.args[0].args[1].int,
        remaining: data.args[0].args[1].int - data.args[0].args[0].int,
      };

      dispatch({ type: GET_DATA, payload: payload });
    } catch (err) {
      alert(err.message);
    }
  };*/

  //BUY TICKET
  const buyTicket = async (amount) => {
    try {
      dispatch({ type: BUTTON_LOADING });

      const buyOperation = await state.instance.methods
        .main(amount)
        .send({ amount: amount });
      await buyOperation.confirmation();

      dispatch({ type: BUY_SUCCESS });

      window.location.reload();
    } catch (err) {
      console.log(err);
      alert(err.message);
    }

    dispatch({ type: BUY_TERMINATE });
  };

  return (
    <LotteryContext.Provider
      value={{
        account: state.account,
        balance: state.balance,
        limit: state.limit,
        remaining: state.remaining,
        buyers: state.buyers,
        prev: state.prev,
        pageLoading: state.pageLoading,
        buttonLoading: state.buttonLoading,
        getWallet,
        getData,
        buyTicket,
      }}
    >
      {props.children}
    </LotteryContext.Provider>
  );
};

export default LotteryState;
