import React, { Fragment, useState } from 'react';

const Home = ({
  balance,
  limit,
  remaining,
  buyTicket,
  buyers,
  prev,
  buttonLoading,
}) => {
  const [amount, setAmount] = useState('');

  const onChange = (e) => setAmount(e.target.value);

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

  return (
    <Fragment>
      <div className='grid'>
        <div className='row mb-2 text-center'>
          <div className='col-md-6'>
            <h2>Buy Tickets</h2>
            <p>Your Balance: {balance} XTZ </p>
            <p>Ticket Cost: 1 XTZ / ticket</p>

            <div class='input-group mb-3'>
              <input
                type='text'
                class='form-control'
                placeholder='Number of tickets...'
                value={amount}
                onChange={onChange}
              />
              <div class='input-group-append'>
                <button
                  onClick={() => buyTicket(parseInt(amount))}
                  class='btn btn-dark'
                  type='button'
                >
                  {buttonLoading ? (
                    <span>
                      <div class='spinner-border spinner-border-sm' /> Buying..
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
            <h2 className='text-center'>Current Lottery</h2>
            <p>Tickets Limit: {limit}</p>
            <p>Remaining: {remaining}</p>
            <h2 className='text-center'>Previous Winners</h2>
            <div>{getPreviousWinners()}</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
