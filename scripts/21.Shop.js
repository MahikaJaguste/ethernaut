
const hre = require("hardhat");

async function main() {

    const [deployer, signer0, signer1] = await hre.ethers.getSigners();

    // const contract = await hre.ethers.getContractAt("Shop", "0x0d8d7074A51f69F9D091500dAB08aABA61F39E51", signer0);
    const contract = await hre.ethers.deployContract("Shop", signer0)
    console.log("Contract deployed to address:", contract.address);
    console.log("Contract price:", await contract.price());

	const contract1 = await hre.ethers.deployContract("TestShop", [contract.address], signer1);
    console.log("Test contract deployed to address:", contract1.address)
	const r = await contract1.attack(contract.address);

	console.log("Contract price:", await contract.price());
    console.log("Contract isSold:", await contract.isSold());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
