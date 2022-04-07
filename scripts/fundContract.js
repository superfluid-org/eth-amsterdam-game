const hre = require("hardhat");
const { Framework } = require("@superfluid-finance/sdk-core");
const { ethers, provider } = require("ethers");
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
      process.env.AMSTERDAM_PRIVATE_KEY,
    provider: customHttpProvider
  });

  //loading frens token on Kovan
  const frens = await sf.loadSuperToken("0x738ab61234dA221d6d63EBac5a82222839635727");
  
  console.log("running approval...");
  
  const approveOperation = frens.approve({
      receiver: "0xD157b900532aED20709eF0e313896d7683BbEED4",
      amount: ethers.utils.parseUnits("100000").toString()
  });;

  const txn = await approveOperation.exec(signer);

  const receipt = await txn.wait();
  console.log(receipt);

  const allowance = await frens.allowance({owner: signer.address, spender: "0xD157b900532aED20709eF0e313896d7683BbEED4", providerOrSigner: customHttpProvider});
  console.log("new allowance: ", allowance);
      

  const deployedContract = new ethers.Contract("0xD157b900532aED20709eF0e313896d7683BbEED4", TokenFaucetABI, customHttpProvider);

  console.log("funding the contract...");

  console.log(signer.address)
  await deployedContract.connect(signer).fundContract(ethers.utils.parseEther("10000"));
  
  const contractBalance = await frens.balanceOf({account: "0xD157b900532aED20709eF0e313896d7683BbEED4", providerOrSigner: customHttpProvider});

  console.log("contract balance: ", contractBalance);

  console.log(deployedContract.address);
  
  // Create a transaction object
  let tx = {
    to: deployedContract.address,
    // Convert currency unit from ether to wei
    value: ethers.utils.parseEther("0.5"),
    gasPrice: 100000000000
}       

  await signer.sendTransaction(tx)
  .then((txObj) => {
      console.log('txHash', txObj.hash)
      // A transaction result can be checked in a etherscan with a transaction hash which can be obtained here.
  });
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

