const hre = require("hardhat");
const { Framework } = require("@superfluid-finance/sdk-core");
const { ethers, providers } = require("ethers");
const { deploy } = require("@openzeppelin/hardhat-upgrades/dist/utils");
require("dotenv");
const TokenFaucet = require("../artifacts/contracts/ETHAmsterdamFaucet.sol/ETHAmsterdamFaucet.json");
const TokenFaucetABI = TokenFaucet.abi;
// const TokenFaucetABI = require("./tokenFaucetABI");

async function main() {

    // Ethers.js provider initialization
  const url = "https://eth-kovan.alchemyapi.io/v2/nl2PDNZm065-H3wMj2z1_mvGP81bLfqX";

  const customHttpProvider = new ethers.providers.JsonRpcProvider(url);

  const sf = await Framework.create({
    chainId: 42,
    provider: customHttpProvider,
    customSubgraphQueriesEndpoint: "",
    dataMode: "WEB3_ONLY"
  });
  const signer = sf.createSigner({
    privateKey:
      "0xd2ebfb1517ee73c4bd3d209530a7e1c25352542843077109ae77a2c0213375f1",
    provider: customHttpProvider
  });

  const DAIx = await sf.loadSuperToken("0xe3cb950cb164a31c66e32c320a800d477019dcff");
  
  console.log("running approval...");
  
  const approveOperation = DAIx.approve({
      receiver: "0xFf3e1498E770109933Ecc285A81d83Bc37cABd7b",
      amount: ethers.utils.parseUnits("100000").toString()
  });;

  const txn = await approveOperation.exec(signer);

  const receipt = await txn.wait();
  console.log(receipt);

  const allowance = await DAIx.allowance({owner: signer.address, spender: "0xFf3e1498E770109933Ecc285A81d83Bc37cABd7b", providerOrSigner: customHttpProvider});
  console.log("new allowance: ", allowance);
      

  const deployedContract = new ethers.Contract("0xFf3e1498E770109933Ecc285A81d83Bc37cABd7b", TokenFaucetABI, customHttpProvider);
  

  console.log("funding the contract...");

  await deployedContract.connect(signer).fundContract(ethers.utils.parseEther("10000")).then(console.log);
  
  const contractBalance = await DAIx.balanceOf({account: "0xFf3e1498E770109933Ecc285A81d83Bc37cABd7b", providerOrSigner: customHttpProvider});

  console.log("contract balance: ", contractBalance);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

