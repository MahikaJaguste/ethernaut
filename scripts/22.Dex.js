
const hre = require("hardhat");

async function main() {

	const [deployer, signer0, signer1] = await hre.ethers.getSigners();

	const contract = await hre.ethers.deployContract("Dex", signer0);
	console.log("Dex deployed to address:", contract.address);

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

	// const contractAddress = "0xE82B09DB213BE9baE20e9a46904a2CFEaBa88066";
	// const token1Address = "0xdE3328A12CA9F7AEcAd699eA9285C7fC7882cB12";
	// const token2Address = "0x0edc69345FA5ABc4d6D21b8555DC92766ceD1aE2";
	const contractAddress = contract.address;
	const token1Address = token1.address;
	const token2Address = token2.address;

	const myContract = await hre.ethers.getContractAt("Dex", contractAddress, deployer);
	const myToken1 = await hre.ethers.getContractAt("SwappableToken", token1Address, deployer);
	const myToken2 = await hre.ethers.getContractAt("SwappableToken", token2Address, deployer);
	// const token1 = myToken1;
	// const token2 = myToken2;
	// const contract = myContract;

	let txn;

	console.log("Balance of dex:", await contract.balanceOf(token1.address, contract.address), await contract.balanceOf(token2.address, contract.address));
	console.log("Balance of deployer:", await token1.balanceOf(deployer.address), await token2.balanceOf(deployer.address));

	txn = await myToken1.increaseAllowance(contract.address, hre.ethers.constants.MaxUint256);
	await txn.wait();
	txn = await myToken2.increaseAllowance(contract.address, hre.ethers.constants.MaxUint256);
	await txn.wait();

	console.log('Allownace of dex:', await myToken1.allowance(deployer.address, contract.address), await myToken2.allowance(deployer.address, contract.address));

	console.log("Swap price:", await myContract.getSwapPrice(token1.address, token2.address, 10));

	txn = await myToken1.transfer(myContract.address, 10);
	await txn.wait();

	for(let i = 0 ; i < 5; i++) {
		let b = await token2.balanceOf(deployer.address);
		console.log(b);
		console.log("Swap price:", await myContract.getSwapPrice(token2.address, token1.address, b));
		txn = await myContract.swap(token2.address, token1.address, b);
		await txn.wait();
		b = await token1.balanceOf(deployer.address);
		console.log(b);
		console.log("Swap price:", await myContract.getSwapPrice(token1.address, token2.address, b));
		txn = await myContract.swap(token1.address, token2.address, b);
		await txn.wait();
	}

	b = await token2.balanceOf(deployer.address);
	console.log(b);
	console.log("Swap price:", await myContract.getSwapPrice(token2.address, token1.address, b));
	txn = await myContract.swap(token2.address, token1.address, b);
	await txn.wait();

	console.log("Balance of dex:", await contract.balanceOf(token1.address, contract.address), await contract.balanceOf(token2.address, contract.address));
	console.log("Balance of deployer:", await token1.balanceOf(deployer.address), await token2.balanceOf(deployer.address));

	b = hre.ethers.BigNumber.from(34);
	console.log("Swap price:", await myContract.getSwapPrice(token1.address, token2.address, b));
	txn = await myContract.swap(token1.address, token2.address, b);
	await txn.wait();

	console.log("Balance of dex:", await contract.balanceOf(token1.address, contract.address), await contract.balanceOf(token2.address, contract.address));
	console.log("Balance of deployer:", await token1.balanceOf(deployer.address), await token2.balanceOf(deployer.address));

	// console.log("Swap price:", await myContract.getSwapPrice(token2.address, token1.address, b));


}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
