const { Framework } = require("@superfluid-finance/sdk-core");
const { assert } = require("chai");
const { expectRevert } = require("@openzeppelin/test-helpers");
const { ethers, web3 } = require("hardhat");
let fDAIABI  = require("./abis/fDAIABI");

const deployFramework = require("@superfluid-finance/ethereum-contracts/scripts/deploy-framework");
const deployTestToken = require("@superfluid-finance/ethereum-contracts/scripts/deploy-test-token");
const deploySuperToken = require("@superfluid-finance/ethereum-contracts/scripts/deploy-super-token");

const provider = web3;
let accounts;

let sf;
let fDAI;
let fDAIx;
let faucet;

const errorHandler = (err) => {
    if (err) throw err;
};

before(async function () {

    accounts = await ethers.getSigners();

    await deployFramework(errorHandler, {
        web3,
        from: accounts[0].address,
    });

    let fDAIAdress = await deployTestToken(errorHandler, [":", "fDAI"], {
        web3,
        from: accounts[0].address,
    });
    let fDAIxAddress = await deploySuperToken(errorHandler, [":", "fDAI"], {
        web3,
        from: accounts[0].address,
    });

    sf = await Framework.create({
        networkName: "custom",
        provider,
        dataMode: "WEB3_ONLY",
        resolverAddress: process.env.RESOLVER_ADDRESS,
        protocolReleaseVersion: "test",
    });
    
    fDAIx = await sf.loadSuperToken("fDAIx");
    
    let fDAIAddress = fDAIx.underlyingToken.address;
    fDAI = new ethers.Contract(fDAIAddress, fDAIABI, accounts[0]);

});

beforeEach(async function () {
    
    await fDAI.connect(accounts[0]).mint(
        accounts[0].address, ethers.utils.parseEther("10000000")
    );

    await fDAI.connect(accounts[0]).approve(fDAIx.address, ethers.utils.parseEther("10000000"));

    const fDAIxUpgradeOperation = fDAIx.upgrade({
        amount: ethers.utils.parseEther("10000000")
    });

    await fDAIxUpgradeOperation.exec(accounts[0]);

    await fDAIx.transfer({
        recipient: accounts[2], 
        amount: ethers.utils.parseEther("500")
    });

    let App = await ethers.getContractFactory("ETHAmsterdamFaucet");    
    
    faucet = await App.deploy(
        fDAIx.address,
        sf.settings.config.hostAddress,
    );
    
});

describe("sending flows", async function () {    
    
    it("Case #1 - Alice funds the contract", async function() {
        
        const fDAIxApproveOperation = fDAIx.approve({receiver: faucet.address, amount: ethers.utils.parseEther("1000000")});
        
        console.log("approving send of funds into contract...");
        
        await fDAIxApproveOperation.exec(accounts[0]);
        
        await faucet.connect(accounts[0]).fundContract(ethers.utils.parseEther("1000000"));
        
        console.log("creating a flow to: ", accounts[1].address);
        
        const hash1 = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("Sp43Xk" + "mister mister"));

        await faucet.connect(accounts[1]).createDAIxFlow(hash1, accounts[1].address);

        const appFlowRate = await sf.cfaV1.getNetFlow({
            superToken: fDAIx.address,
            account: faucet.address,
            providerOrSigner: accounts[0]
          });

        const ownerFlowRate = await sf.cfaV1.getNetFlow({
            superToken: fDAIx.address,
            account: accounts[1].address,
            providerOrSigner: accounts[0]
        });

        const account1CodeStatus = await faucet.usedCodes(hash1);
        const hash2 = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("lXAF32" + "mister mister"));
        const checkCodeStatus = await faucet.usedCodes(hash2);
        const usedAddresses = await faucet.usedAddresses(accounts[1].address);
        console.log("account 1 code status: ", account1CodeStatus);
        console.log("check code status (should be false), ", checkCodeStatus);
        console.log("used addresses: ", usedAddresses);

        assert.equal(
            ownerFlowRate, "11574074074074074", "owner not receiving correct flowRate of ~$1000 per day"
        );

        assert.equal(
            appFlowRate,
            "-11574074074074074",
            "App flowRate not sending correct flowRate of ~$1000 per day"
        );

        assert.equal(checkCodeStatus, false, "code status mapping not working as expected");

        console.log("checking code already used");
        
        await expectRevert(
            faucet.connect(accounts[3]).createDAIxFlow(hash1, accounts[3].address),
            "code has already been used"
        );
        
        console.log("checking address already used");

        //should revert with superfluid error as 2 flows can't be created to same address
        await expectRevert(
            faucet.connect(accounts[1]).createDAIxFlow(hash2, accounts[1].address),
            "CFA: flow already exist"
        );

    });

  });