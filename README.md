# Tez Lottery

### Home Page

![Home-Page](https://i.ibb.co/HdyvQzp/home.png)

### Thanos Wallet Integrated

![Wallet](https://i.ibb.co/4TpdYFz/buy.png)

# Description :

- This is a simple lottery dapp built on Tezos blockchain.

- There are maximum of 5 lottery tickets to be bought in each round.

- Each ticket costs 1 XTZ.

- When all tickets are sold, a winner is chosen at random and 5 XTZ is transferred to the winner. 

- The lottery is reset, and a new round starts. 

- A person can buy more than one ticket. If a person tries to buy more tickets than what is available, the extra XTZ sent to the
contract is refunded back.

# Tools Used:

- Bundle React
- Thanos Wallet
- Taquito (for ConseilJS implementation, refer to [master](https://github.com/AnshuJalan/tezos-lottery/tree/master) branch)

## Setup & Run Steps :

1. The dapp requires Thanos Wallet

2. `npm install` it will install all your dependencies

3. `npm run client-install` it will install all the client dependencies i.e in React

4. `npm run dapp` it will launch the dapp, on localhost:3000
