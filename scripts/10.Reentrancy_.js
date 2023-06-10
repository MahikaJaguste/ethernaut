const hre = require("hardhat");

async function main() {

    const [deployer, signer0, signer1] = await hre.ethers.getSigners();

    const contract = await hre.ethers.getContractAt("Reentrance", "0xc3921D624187FCE41f0086Bb697Ebc31Cfca5A16", deployer);
    console.log("Contract deployed to address:", contract.address);

    const testContract = await hre.ethers.getContractAt("TestReentrance", "0x851ad3A43E98Fe6EA90cB48B7b3490e0af9d6718", deployer);
    console.log("Test contract deployed to:", testContract.address)

    // await contract.donate(testContract.address, {
    //     value: hre.ethers.utils.parseEther("0.001")
    // });

    // await testContract.attack();

    console.log("Test Contract balance:", await hre.ethers.provider.getBalance(testContract.address));

    // console.log("Contract balance:", await hre.ethers.provider.getBalance(contract.address));

    console.log("Signer balance:", await hre.ethers.provider.getBalance(deployer.address))

    // await testContract.withdraw();

    console.log("Signer balance:", await hre.ethers.provider.getBalance(deployer.address))

   
    // await contract.donate(signer0.address, {
    //     value: hre.ethers.utils.parseEther("1")
    // });

    // console.log("Contract balance:", await hre.ethers.provider.getBalance(contract.address));

    // await contract.donate(testContract.address, {
    //     value: hre.ethers.utils.parseUnits("1", "wei")
    // });

    // await testContract.attack();

    console.log("Contract balance:", await hre.ethers.provider.getBalance(contract.address));
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
