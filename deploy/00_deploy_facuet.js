
const host = '0xF0d7d1D47109bA426B9D8A3Cde1941327af1eea3';
//NOTE - this is the address of the most recent deployment of FRENS. You can find this recording in the README.md file.
const frens = '0x738ab61234dA221d6d63EBac5a82222839635727';
require("@nomiclabs/hardhat-ethers");

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy } = deployments;
  
    const { deployer } = await getNamedAccounts();
    console.log(deployer);
  
    await deploy("ETHAmsterdamFaucet", {
      from: deployer,
      args: [frens, host],
      log: true,
    })
}

module.exports.tags = ["ETHAmsterdamFaucet"];