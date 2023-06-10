
const hre = require("hardhat");

async function main() {

    const [deployer, signer0, signer1] = await hre.ethers.getSigners();

    console.log("signer0:", signer0.address);
    console.log("signer1:", signer1.address);

    const contract = await hre.ethers.deployContract("Token", [20], signer0);
    console.log("Contract deployed to address:", contract.address);
    console.log("Balance:", await contract.balanceOf(signer0.address));

    await contract.transfer(signer1.address, 21);

    console.log("Balance:", await contract.balanceOf(signer0.address));
    console.log("Balance:", await contract.balanceOf(signer1.address));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
