
const hre = require("hardhat");

async function main() {

    const [deployer, signer0, signer1, deployer1] = await hre.ethers.getSigners();

    const contract = await hre.ethers.getContractAt("NaughtCoin", "0xBc961e5152Bc4687eABd1767D05A0d82ABd2dEf9", deployer);
    // const contract = await hre.ethers.deployContract("NaughtCoin", [signer0.address], signer0);
    console.log("Contract deployed to address:", contract.address);

    const b1 = await contract.balanceOf(deployer.address);
    console.log("Player balance:", b1);

    await contract.approve(deployer1.address, b1);

    const contract1 = await hre.ethers.getContractAt('NaughtCoin', contract.address, deployer1);
    await contract1.transferFrom(deployer.address, deployer1.address, b1);
   
    const b2 = await contract.balanceOf(deployer.address)
    console.log("Player balance:", b2);

    const b3 = await contract.balanceOf(deployer1.address)
    console.log("Other address balance:", b3);
}


main()
