# Airbloc Meta-Database Proxy
A proxy for BigchainDB in Airbloc Network Backend 🗄


###### What This Proxy Gonna Do?

 - [x] Relays Pre-fulfilled Transactions from [airbloc-go](https://github.com/airbloc/airbloc-go)
 - [ ] Quality-of-Service (QoS) for BigchainDB Traffics
     - [ ] Account check using Ed25519 Public
     - [ ] Filter the clients that are not signed up to Airbloc Account Registry
     - [ ] QoS using Token Balance
  

## Requirements

* [Node.js](https://nodejs.org) (>= 10.0)
* [Yarn](https://yarnpkg.com/) Package Manager

## Installation

```
$ yarn
$ cp config.example.json config.json
$ vi config.json  # Modify the config for your environment
```

## Running the Proxy

```
$ yarn start
```

## LICENSE: MIT
