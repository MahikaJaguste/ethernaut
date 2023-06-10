
const hre = require("hardhat");

async function main() {

    const [deployer, signer0, signer1, deployer1] = await hre.ethers.getSigners();

    const contract = await hre.ethers.getContractAt("Denial", "0xCf7e990a26EAA3e2a4D5505ebc676C2728781663", deployer);
    // const contract = await hre.ethers.deployContract("Denial", signer0);
    console.log("Contract deployed to address:", contract.address);
    
    // await signer0.sendTransaction({
    //     to: contract.address,
    //     value: hre.ethers.utils.parseEther("1")
    // })

    console.log("Contract balance:", await contract.contractBalance());

    // const contract1 = await hre.ethers.getContractAt("Denial", contract.address, deployer);
    const testContract = await hre.ethers.deployContract("TestDenial", deployer);
    console.log("Test contract deployed to:", testContract.address)

    await contract.setWithdrawPartner(testContract.address);

    // const txn = await contract.withdraw();
    // const receipt = await txn.wait();
    // console.log(receipt)

    // console.log("Contract balance:", await contract.contractBalance());

}


main()
