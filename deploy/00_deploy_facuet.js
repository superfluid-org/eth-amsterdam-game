
const host = '0xF0d7d1D47109bA426B9D8A3Cde1941327af1eea3';
const fDAIx = '0xe3cb950cb164a31c66e32c320a800d477019dcff';
require("@nomiclabs/hardhat-ethers");

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy } = deployments;
  
    const { deployer } = await getNamedAccounts();
    console.log(deployer);
  
    await deploy("ETHAmsterdamFaucet", {
      from: deployer,
      args: [fDAIx, host],
      log: true,
    })
}

module.exports.tags = ["ETHAmsterdamFaucet"];