
const hre = require("hardhat");

async function main() {

    const [deployer, signer0, signer1] = await hre.ethers.getSigners();
    const contractAddress = "0x25BcBFbB126Be0868d424CDC5C8c99b490E5A3e5";

    const contract = await hre.ethers.getContractAt("Recovery", contractAddress, signer0);

    const tokenContractAddress = hre.ethers.utils.getContractAddress({from: contract.address, nonce: 1});
    console.log("Token address:", tokenContractAddress)

    const tokenContract = await hre.ethers.getContractAt("SimpleToken", tokenContractAddress, deployer);
    console.log("Token name:", await tokenContract.name());

    const b1 = await hre.ethers.provider.getBalance(deployer.address);
    console.log(b1.toString());

    await tokenContract.destroy(deployer.address);
    
    const b2 = await hre.ethers.provider.getBalance(deployer.address);
    console.log(b2.toString());
    
}


main()
