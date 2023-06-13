
const hre = require("hardhat");

async function main() {

    const [deployer, signer0, signer1, deployer1] = await hre.ethers.getSigners();

    const contract = await hre.ethers.deployContract("TestMagicNum", signer0);
    await contract.deploy();

    const address = "0x8398bcd4f633c72939f9043db78c574a91c99c0a";
    // on Mumbai, address = "0x03f3c0c332DEf6eb12A0065fFc01fA5844f3DD35";

    const testContract = await hre.ethers.getContractAt("ITestMagicSolver", address, signer0);
    console.log("Meaning of life:", await testContract.getMeaningOfLife());

}


main()
