import React, { useContext } from 'react';
import LotteryContext from '../context/lottery/lotteryContext';

const Navbar = () => {
  const lotteryContext = useContext(LotteryContext);

  return (
    <div className='navbar navbar-dark bg-dark mb-3'>
      <h1 className='navbar-brand'>
        <i className='fa fa-ticket' /> Tez Lottery
      </h1>
      <ul className='navbar-nav'>
        <li className='text-white'>
          <i className='fa fa-user-circle-o' /> {lotteryContext.account}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
