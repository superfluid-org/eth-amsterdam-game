// SPDX-License-Identifier: AGPLv3
pragma solidity 0.8.12;

import {
    ISuperToken,
    CustomSuperTokenBase
}
from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/CustomSuperTokenBase.sol";
import { INativeSuperTokenCustom } from "@superfluid-finance/ethereum-contracts/contracts/interfaces/tokens/INativeSuperToken.sol";
import { UUPSProxy } from "@superfluid-finance/ethereum-contracts/contracts/upgradability/UUPSProxy.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";


/**
 * @dev Native SuperToken custom super token implementation
 *
 * NOTE:
 * - This is a simple implementation where the supply is pre-minted.
 *
 * @author Superfluid
 */
contract NativeSuperTokenProxy is INativeSuperTokenCustom, CustomSuperTokenBase, UUPSProxy {
    function initialize(string calldata name, string calldata symbol, uint256 initialSupply)
        external override
    {
        ISuperToken(address(this)).initialize(
            IERC20(0x0000000000000000000000000000000000000000), // no underlying/wrapped token
            18, // shouldn't matter if there's no wrapped token
            name,
            symbol
        );
        ISuperToken(address(this)).selfMint(msg.sender, initialSupply, new bytes(0));
    }
}