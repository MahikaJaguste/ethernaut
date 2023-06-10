
const hre = require("hardhat");

async function main() {

  const [deployer, signer0, signer1] = await hre.ethers.getSigners();

  console.log("signer0:", signer0.address);
  console.log("signer1:", signer1.address);

  const contract = await hre.ethers.deployContract("Fallback", signer0);
  console.log("Contract deployed to address:", contract.address);
  console.log("Contract owner:", await contract.owner());
  console.log("Contract owner contribution:", await contract.getContribution());

  const contract1 = await hre.ethers.getContractAt("Fallback", contract.address, signer1);
  console.log("Contract1 contribution:", await contract1.getContribution());

  await contract1.contribute({
    value: hre.ethers.utils.parseUnits("1", "wei")
  });

  console.log("Contract1 contribution:", await contract1.getContribution());

  await signer1.sendTransaction({
    to: contract.address,
    value: hre.ethers.utils.parseUnits("1", "wei")  
  });

  console.log("Contract1 owner:", await contract1.owner());

  console.log("Signer1 balance:", await signer1.getBalance());
  console.log("Contract balance", await hre.ethers.provider.getBalance(contract.address));

  await contract1.withdraw();

  console.log("Signer1 balance:", await signer1.getBalance());
  console.log("Contract balance", await hre.ethers.provider.getBalance(contract.address));
  
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
