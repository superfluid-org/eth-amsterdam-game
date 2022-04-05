## ETH Amsterdam Game

1) Builders at the hackathon will receive a flyer with a QR code and an alphanumeric code.
2) They will scan a QR code which will take them to a link.
3) At this link, they will be able to type in their code and their address to receive an fDAIx stream on Kovan of $1000 fDAI per day

## Logic
- Codes may only be used once
- Codes have been randomly generated up front
- Addresses may only receive one stream
- The winner of this game will be the user who sends the highest number of streams to other participants at ETH Amsterdam

## Repo Overview

#### 1) Contract
- The broader repo is a hardhat project. 
- The ETHAmsterdamFaucet.sol contract is what users will call to receive funds
- You can find some unit tests in the `test` folder, and run them by commenting out the `default network` and `kovan` settings in the `hardhat.config` file
- The contract may be deployed on Kovan by running `npx hardhat deploy` (make sure that the `default network` and `kovan` settings are NOT commented out in `hardhat.config`)
- The deployer of the contract has admin rights. They are able to fund the contract, withdraw funds from the contract, and manage all streams from the contract

#### 2) Ui-Server
- This folder contacts the logic which will be placed in our AWS Lambda function. You can find it in `index.js`. This is an express server now, but everything that exists inside of the `createStream()` function will need to go in the lambda function.
- The Front End will call this when the user passes in a code and address
- Once called, the `createStream()` function will take a code, make sure that it matches one of the 900 randomly generated codes present in the `codes` array in the function, hash the code with the string `mister mister`, and pass it to the function on the contract along with the address of the caller.
-  The contract will check to make sure that the code and address have not yet been used, and create a stream if checks pass.

#### 3) Front-End
- This folder contains a react app that holds our front end code
- The primary component is the `CreateFlow.js` component which holds the code for the page users will see upon arrival
- When a user fills out the form and clicks the green button to create a stream, the front end will make an http request to the lambda function to run `createStream()` as described in the section on UI-Seriver

## Other Notes
1) A QR code will be generated which is connected to the front end. We will need our front end to remain at a persistent domain in case changes are made
2) It may be necessary to make last second cosmetic changes that involve both the front end and lambda function. Ideally we can make these changes without breaking the link between the domain and QR code. 
