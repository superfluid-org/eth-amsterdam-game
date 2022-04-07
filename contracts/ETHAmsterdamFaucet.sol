// SPDX-License-Identifier: AGPLv3
pragma solidity 0.8.12;

import {
    ISuperfluid, 
    ISuperToken
} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";

import {IConstantFlowAgreementV1} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol";
import {CFAv1Library} from "@superfluid-finance/ethereum-contracts/contracts/apps/CFAv1Library.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

contract ETHAmsterdamFaucet is Ownable {
    using CFAv1Library for CFAv1Library.InitData;
    //initialize cfaV1 variable
    CFAv1Library.InitData public cfaV1;

    ISuperToken public frens; 

    constructor(ISuperToken _frens, ISuperfluid host) {
      frens = _frens;

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
    }

    mapping (bytes32 => bool) public usedCodes;
    mapping (address => bool) public usedAddresses;


   //NOTE: should fund contract with 1M frens
   function fundContract(uint amount) external onlyOwner {
       frens.transferFrom(msg.sender, address(this), amount);
   }

    //allows owner to withdraw funds from contract
    function withdrawFunds(uint amount) external onlyOwner {
        frens.transfer(msg.sender, amount);
    }

    function withdrawETH(uint amount) external onlyOwner {
        //can only be called successfully by owner who is msg.sender
        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "Failed to send Ether");
    }

    event Received(address, uint);
    receive() external payable {
        emit Received(msg.sender, msg.value);
    }

    //hash string w code
    function createFlow(bytes32 _code, address payable receiver) external onlyOwner {
        
        require(usedCodes[_code] == false, "code has already been used");
        require(usedAddresses[receiver] == false, "address has already been used");

        usedCodes[_code] = true;
        //~1000 frens per day
        cfaV1.createFlow(receiver, frens, 11574074074074074);
        (bool sent, ) = receiver.call{value: 10000000000000000}("");
        require(sent, "Failed to send Ether");
    }

    //allows the contract owner to create a flow at any time
    function createFlowFromOwner(address receiver) external onlyOwner {
        //~1000 frens per day
        cfaV1.createFlow(receiver, frens, 11574074074074074);
    }

    //allows a contract owner to update any flow at any time
    function updateFlow(address receiver, int96 amount) external onlyOwner {
        cfaV1.updateFlow(receiver, frens, amount);
    }

    //allows owner to delete flows at any time
    function deleteFlow(address receiver) external onlyOwner {
        cfaV1.deleteFlow(address(this), receiver, frens);
    }

}