const { ethers } = require("hardhat");
const provider = new ethers.providers.JsonRpcProvider("https://eth-kovan.alchemyapi.io/v2/nl2PDNZm065-H3wMj2z1_mvGP81bLfqX");

const NativeSuperTokenProxy = require("../artifacts/@superfluid-finance/ethereum-contracts/contracts/interfaces/tokens/INativeSuperToken.sol/INativeSuperToken.json");

const NativeSuperTokenProxyABI = NativeSuperTokenProxy.abi;

//note: need to replace the address here with your token
const nativeSuperToken = new ethers.Contract("0x1f24362C1Ab3a4A1B13eDc736347015Bf6d40126", NativeSuperTokenProxyABI, provider);

async function main() {

const name = await nativeSuperToken.name();
const symbol = await nativeSuperToken.symbol();
const initialSupply = await nativeSuperToken.totalSupply();

console.log(name);
console.log(symbol);
// console.log(initialSupply);


}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });