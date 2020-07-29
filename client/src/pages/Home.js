import React, { Fragment, useRef, useContext, useEffect } from 'react';
import LotteryContext from '../context/lottery/lotteryContext';
const Home = () => {
  const amount = useRef('');

  const lotteryContext = useContext(LotteryContext);
  const {
    buyers,
    prev,
    limit,
    remaining,
    balance,
    buttonLoading,
    buyTicket,
    pageLoading,
    getWallet,
    getData,
  } = lotteryContext;

  useEffect(() => {
    const setup = async () => {
      await getWallet();
      await getData();
    };
    setup();
    //eslint-disable-next-line
  }, []);

  const getTickerBuyers = () => {
    return buyers.map((buyer) => (
      <tr key={parseInt(buyer.args[0].int)}>
        <td>{parseInt(buyer.args[0].int) + 1}</td>
        <td>{buyer.args[1].string}</td>
      </tr>
    ));
  };

  const getPreviousWinners = () => {
    return prev.map((winner, index) => (
      <div className='card w-75 m-auto py-3' key={index}>
        {winner.string}
      </div>
    ));
  };

  if (pageLoading) {
    return (
      <div className='text-center mt-5'>
        <span className='spinner-border' />
      </div>
    );
  }

  return (
    <Fragment>
      <div className='grid'>
        <div className='row mb-2 text-center'>
          <div className='col-md-6'>
            <h2>Buy Tickets</h2>
            <div className='row text-left'>
              <div className='col-sm-6'>
                <p>
                  <strong>Tickets Limit:</strong> {limit}
                </p>
                <p>
                  <strong>Your Balance:</strong> {balance} XTZ{' '}
                </p>
              </div>
              <div className='col-sm-6'>
                <p>
                  <strong>Remaining</strong>: {remaining}
                </p>
                <p>
                  <strong>Ticket Cost:</strong> 1 XTZ / ticket
                </p>
              </div>
            </div>

            <div className='input-group mb-3'>
              <input
                type='number'
                className='form-control'
                placeholder='Number of tickets...'
                ref={amount}
              />
              <div className='input-group-append'>
                <button
                  onClick={() => buyTicket(parseInt(amount))}
                  className='btn btn-dark'
                  type='button'
                >
                  {buttonLoading ? (
                    <span>
                      <div className='spinner-border spinner-border-sm' />{' '}
                      Buying..
                    </span>
                  ) : (
                    <span>Buy</span>
                  )}
                </button>
              </div>
            </div>
            <strong>Other Participants</strong>
            <table className='table table-bordered mt-3 w-100'>
              <thead>
                <tr>
                  <th>Ticket Number</th>
                  <th>Buyer</th>
                </tr>
              </thead>
              <tbody>{getTickerBuyers()}</tbody>
            </table>
          </div>
          <div className='col-md-6'>
            <h2 className='text-center'>Previous Winners</h2>
            <div>{getPreviousWinners()}</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
