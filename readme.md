# Transaction hash: 
0x82fa36e2e384324a0480dac0f975b6f92cde47c9045a1d30a4e65375d76fac1a
# contract hash: 
# contract address:
0xAF6da871a7481f8301F68955a39c30a78E30d3f0
# RINKEBY URL:
 https://rinkeby.etherscan.io/tx/0x82fa36e2e384324a0480dac0f975b6f92cde47c9045a1d30a4e65375d76fac1a


# Supply chain & data auditing

This repository containts an Ethereum DApp that demonstrates a Supply Chain flow between a Photographer and Customer. A Photographer can add photos to photograph system stored in the blockchain. A Customer can purchase such items from the system. Additionally a Photographer can mark a photo as Sent, and similarly a Customer can mark a photo as Received.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Please make sure you've already installed ganache-cli, Truffle and enabled MetaMask extension in your browser.

```
Give examples (to be clarified)
```

### Installing

A step by step series of examples that tell you have to get a development env running

Clone this repository
```

Change directory to ```project-6``` folder and install all requisite npm packages (as listed in ```package.json```):

```
cd project-6
npm install
```

Launch Ganache:

```
ganache-cli -m "spirit supply whale amount human item harsh scare congress discover talent hamster"
```

In a separate terminal window, Compile smart contracts:

```
truffle compile
```

This will create the smart contract artifacts in folder ```build\contracts```.

Migrate smart contracts to the locally running blockchain, ganache-cli:

```
truffle migrate
```


Test smart contracts:

```
truffle test
```

All 10 tests should pass.


In a separate terminal window, launch the DApp:

```
npm run dev
```

## Built With

* [Ethereum](https://www.ethereum.org/) - Ethereum is a decentralized platform that runs smart contracts
* [Truffle Framework](http://truffleframework.com/) - Truffle is the most popular development framework for Ethereum with a mission to make your life a whole lot easier.


## Acknowledgments

* Solidity
* Ganache-cli
* Truffle






