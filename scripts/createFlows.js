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
        "0xd2ebfb1517ee73c4bd3d209530a7e1c25352542843077109ae77a2c0213375f1",
      provider: customHttpProvider
    });

    const deployedContract = new ethers.Contract("0xFf3e1498E770109933Ecc285A81d83Bc37cABd7b", TokenFaucetABI, customHttpProvider);
  
    const hashedCode = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("Sp43Xk" + "mister mister"));
            
    console.log("hashed code: ", hashedCode);

    console.log("creating a stream from contract...");
  
    await deployedContract.connect(signer).createDAIxFlow(hashedCode, "0x9421FE8eCcAfad76C3A9Ec8f9779fAfA05A836B3").then(console.log);

  //helper script for getting exit rate for pic
  // const deployedContract = new ethers.Contract("0xA7bCdEEFA966720549C6129D5B864930355012A4", TokenFaucetABI, customHttpProvider);

  // console.log(deployedContract);
  

  // await deployedContract.connect(signer).createFlow("0x7f84f44127F4337a16820321658903c01F06D622").then(console.log);

  // We get the contract to deploy
//   const Greeter = await hre.ethers.getContractFactory("Greeter");
//   const greeter = await Greeter.deploy("Hello, Hardhat!");

//   await greeter.deployed();

//   console.log("Greeter deployed to:", greeter.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

