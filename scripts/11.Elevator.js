
const hre = require("hardhat");

async function main() {

    const [deployer, signer0, signer1] = await hre.ethers.getSigners();

    const contract = await hre.ethers.getContractAt("Elevator", "0x435DFC6941462a885dBf276A43e500244c3656e5", signer0);
    console.log("Contract deployed to address:", contract.address);
    console.log("Contract top:", await contract.top());

	// const contract1 = await hre.ethers.deployContract("TestBuilding", deployer);
	// await contract1.attack(contract.address);

	console.log("Contract top:", await contract.top());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
