import React from 'react';

const Navbar = ({ account }) => {
  return (
    <div className='navbar navbar-dark bg-dark mb-3'>
      <h1 className='navbar-brand'>
        <i class='fa fa-ticket' /> Tez Lottery
      </h1>
      <ul className='navbar-nav'>
        <li className='text-white'>
          <i class='fa fa-user-circle-o' /> {account}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
