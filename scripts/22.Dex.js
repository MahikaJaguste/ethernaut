
const hre = require("hardhat");

async function main() {

    const [deployer, signer0, signer1] = await hre.ethers.getSigners();

    // const contract = await hre.ethers.getContractAt("Shop", "0x0d8d7074A51f69F9D091500dAB08aABA61F39E51", signer0);
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
    await token1.transfer(signer1.address, 10);

    await token2.transfer(contract.address, 100);
    await token2.transfer(signer1.address, 10);

    console.log("Balance of dex:", await contract.balanceOf(token1.address, contract.address), await contract.balanceOf(token2.address, contract.address));
    console.log("Balance of signer1:", await token1.balanceOf(signer1.address), await token2.balanceOf(signer1.address));

    const myContract = await hre.ethers.getContractAt("Dex", contract.address, signer1);
    const myToken1 = await hre.ethers.getContractAt("SwappableToken", token1.address, signer1);
    const myToken2 = await hre.ethers.getContractAt("SwappableToken", token2.address, signer1);
    
    await myToken1.increaseAllowance(contract.address, hre.ethers.constants.MaxUint256);
    await myToken2.increaseAllowance(contract.address, hre.ethers.constants.MaxUint256);

    console.log('Allownace of dex:', await myToken1.allowance(signer1.address, contract.address), await myToken2.allowance(signer1.address, contract.address));

    console.log("Swap price:", await contract.getSwapPrice(token1.address, token2.address, 5))
    // I want to get all token2 into my account
    // 9 11   101  99
    // 8 12    102 98
    /*
    7 13   103 97
    6 14   104  96
    5 15    105  95

    1 19   109  91
    0 20    110 90

    */


}



main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
