
const hre = require("hardhat");

async function main() {

    const [deployer, signer0, signer1] = await hre.ethers.getSigners();

    console.log("signer0:", signer0.address);
    console.log("signer1:", signer1.address);

    const contract = await hre.ethers.deployContract("Telephone", signer0);
    console.log("Contract deployed to address:", contract.address);
    console.log("Contract owner:", await contract.owner());

    const attackContract = await hre.ethers.deployContract("CallTelephone", [contract.address], signer1);
    console.log("Attack contract deployed to address:", attackContract.address);    

    await attackContract.attack();

    console.log("Contract owner:", await contract.owner());

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
