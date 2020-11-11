#!/usr/bin/env bash

# Deploy contracts
truffle migrate --reset --network rinkeby

# Verify Contracts on Etherscan
truffle run verify CobaltToken --network rinkeby --license SPDX-License-Identifier
truffle run verify MasterChief --network rinkeby --license SPDX-License-Identifier

# Flatten Contracts
./node_modules/.bin/truffle-flattener contracts/CobaltToken.sol > flats/CobaltToken_flat.sol
./node_modules/.bin/truffle-flattener contracts/MasterChief.sol > flats/MasterChief_flat.sol
