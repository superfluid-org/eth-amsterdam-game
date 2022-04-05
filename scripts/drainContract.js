const hre = require("hardhat");
const { Framework } = require("@superfluid-finance/sdk-core");
const { ethers, providers } = require("ethers");
const { deploy } = require("@openzeppelin/hardhat-upgrades/dist/utils");
require("dotenv");

const faucetABI = require("./faucetABI");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

    // Ethers.js provider initialization
  const url = "https://arb-rinkeby.g.alchemy.com/v2/2anEqFdl0dmJLqZyiiHUusg17b895lba";
  const customHttpProvider = new ethers.providers.JsonRpcProvider(url);

  const sf = await Framework.create({
    chainId: 421611,
    provider: customHttpProvider,
    customSubgraphQueriesEndpoint: "",
    dataMode: "WEB3_ONLY"
  });
  const signer = sf.createSigner({
    privateKey:
      process.env.PRIVATE_KEY,
    provider: customHttpProvider
  });

  
  const deployedContract = new ethers.Contract("0xA54C60857Ec602Ea9659c23D5Dc554b6daDe1edf", faucetABI, customHttpProvider);

  console.log(deployedContract);
  

  await deployedContract.connect(signer).withdrawFunds(ethers.utils.parseEther("87")).then(console.log);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

