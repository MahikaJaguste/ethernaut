
const hre = require("hardhat");

async function main() {

    const [deployer, signer0, signer1] = await hre.ethers.getSigners();
    console.log("Signer balance:", await hre.ethers.provider.getBalance(signer0.address))

    const contract = await hre.ethers.deployContract("Reentrance", signer0);
    console.log("Contract deployed to address:", contract.address);

	const testContract = await hre.ethers.deployContract("TestReentrance", [contract.address], signer0);
    console.log("Test contract deployed to:", testContract.address)

    await contract.donate(signer0.address, {
        value: hre.ethers.utils.parseEther("0.001")
    });

    await contract.donate(testContract.address, {
        value: hre.ethers.utils.parseEther("0.00001")
    });

    console.log("Contract balance:", await hre.ethers.provider.getBalance(contract.address));

    await testContract.attack();

    console.log("Contract balance:", await hre.ethers.provider.getBalance(contract.address));

    console.log("Signer balance:", await hre.ethers.provider.getBalance(signer0.address))

    await testContract.withdraw();

    console.log("Signer balance:", await hre.ethers.provider.getBalance(signer0.address))
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
