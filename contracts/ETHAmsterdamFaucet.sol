// SPDX-License-Identifier: AGPLv3
pragma solidity ^0.8.0;

import {
    ISuperfluid, 
    ISuperToken
} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";

import {IConstantFlowAgreementV1} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol";
import {CFAv1Library} from "@superfluid-finance/ethereum-contracts/contracts/apps/CFAv1Library.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

import "hardhat/console.sol";

contract ETHAmsterdamFaucet is Ownable {
    using CFAv1Library for CFAv1Library.InitData;
    //initialize cfaV1 variable
    CFAv1Library.InitData public cfaV1;

    ISuperToken public fDAIx;

    IConstantFlowAgreementV1 public cfa;

    constructor(ISuperToken _fDAIx, ISuperfluid host) {
      fDAIx = _fDAIx;

        //initialize InitData struct, and set equal to cfaV1
        cfaV1 = CFAv1Library.InitData(
            host,
            IConstantFlowAgreementV1(
                address(
                    host.getAgreementClass(
                        keccak256(
                            "org.superfluid-finance.agreements.ConstantFlowAgreement.v1"
                        )
                    )
                )
            )
        );

        cfa = IConstantFlowAgreementV1(
                address(
                    host.getAgreementClass(
                        keccak256(
                            "org.superfluid-finance.agreements.ConstantFlowAgreement.v1"
                        )
                    )
                )
            );
    }

    mapping (bytes32 => bool) public usedCodes;
    mapping (address => bool) public usedAddresses;


   //NOTE: should fund contract with $1M fDAIx
   function fundContract(uint amount) external onlyOwner {
       fDAIx.transferFrom(msg.sender, address(this), amount);
   }

    //allows owner to withdraw funds from contract
    function withdrawFunds(uint amount) external onlyOwner {
        fDAIx.transfer(msg.sender, amount);
    }

    //hash string w code
    function createDAIxFlow(bytes32 _code, address receiver) public {
        
        require(usedCodes[_code] == false, "code has already been used");
        require(usedAddresses[receiver] == false, "address has already been used");

        usedCodes[_code] = true;
        //~1000 fDAIx per day
        cfaV1.createFlow(receiver, fDAIx, 11574074074074074);
    }

    //allows the contract owner to create a flow at any time
    function createFlowFromOwner(address receiver) public {
        //~1000 fDAIx per day
        cfaV1.createFlow(receiver, fDAIx, 11574074074074074);
    }

    //allows a contract owner to update any flow at any time
    function updateDAIxFlow(address receiver, int96 amount) external onlyOwner {
        //5 bgtx per week
        cfaV1.updateFlow(receiver, fDAIx, amount);
    }

    //allows owner to delete flows at any time
    function deleteDAIxFlow(address receiver) external onlyOwner {
        //5 bgtx per week
        cfaV1.deleteFlow(address(this), receiver, fDAIx);
    }

}