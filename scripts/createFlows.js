const hre = require("hardhat");
const Web3 = require("web3")
const { Framework, flowedAmountSinceUpdatedAt } = require("@superfluid-finance/sdk-core");
const { ethers } = require("ethers");
const { deploy } = require("@openzeppelin/hardhat-upgrades/dist/utils");
require("dotenv");
const TokenFaucet = require("../artifacts/contracts/ETHAmsterdamFaucet.sol/ETHAmsterdamFaucet.json");
const TokenFaucetABI = TokenFaucet.abi;

async function main() {
  // const web3 = new Web3(new Web3.providers.HttpProvider(process.env.GOERLI_URL));

  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

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

    const deployedContract = new ethers.Contract("0x40CC9A25704C9050ea21eB5a34726FC56CFAF9BA", TokenFaucetABI, customHttpProvider);
  
    const hashedCode = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("Sp43Xk" + "mister mister"));
            
    console.log("hashed code: ", hashedCode);

    console.log("creating a stream from contract...");
  
    await deployedContract.connect(signer).createFlow(hashedCode, "0x9421FE8eCcAfad76C3A9Ec8f9779fAfA05A836B3").then(console.log);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

