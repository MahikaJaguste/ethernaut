
const hre = require("hardhat");

async function main() {

	const [deployer, signer0, signer1] = await hre.ethers.getSigners();
    console.log(deployer.address, signer0.address, signer1.address);

    // const contract = await hre.ethers.getContractAt("CoinFlip", "", signer0);
    const contract = await hre.ethers.deployContract("CoinFlip", deployer);
    console.log("Contract deployed to address:", contract.address);

    const testContract = await hre.ethers.deployContract("TestCoinFlip", [contract.address], deployer);
    // const testContract = await hre.ethers.getContractAt("TestGatekeeperTwo", "0x68180a8d85c867CC2806c6C7F0561acDF62cF6f8", deployer);
    // console.log("Test contract deployed to:", testContract.address)

	for(let i=0; i < 10; i++) {
		await testContract.attack();
	}
	console.log(await contract.consecutiveWins())

	
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
