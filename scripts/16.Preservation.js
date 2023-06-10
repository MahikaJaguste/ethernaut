
const hre = require("hardhat");

async function main() {

    const [deployer, signer0, signer1, deployer1] = await hre.ethers.getSigners();

    // const contract = await hre.ethers.getContractAt("Preservation", "0xA356d44c87e1DB3fdcEf3f0a8DE5676231EC7AB9", deployer);
    
    const lib1 = await hre.ethers.deployContract("LibraryContract", signer0);
    console.log("Library deployed to address:", lib1.address);

    const lib2 = await hre.ethers.deployContract("LibraryContract", signer0);
    console.log("Library deployed to address:", lib2.address);
    
    const contract = await hre.ethers.deployContract("Preservation", [lib1.address, lib2.address], signer0);
    console.log("Contract deployed to address:", contract.address);
    console.log("Contract owner:", await contract.owner());

    const testContract = await hre.ethers.deployContract("TestPreservation", signer1);
    console.log("Test contract deployed to:", testContract.address)

    const timestamp = hre.ethers.BigNumber.from(testContract.address);
    await contract.setFirstTime(timestamp);

    console.log("Contract first time library:", await contract.timeZone1Library());

    const timestamp2 = hre.ethers.BigNumber.from(deployer.address);
    await contract.setFirstTime(timestamp2, {
        gasLimit: 1_00_000
    });

    console.log("Contract owner:", await contract.owner());
}


main()
