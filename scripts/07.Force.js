
const hre = require("hardhat");

async function main() {

    const [deployer, signer0, signer1] = await hre.ethers.getSigners();

    console.log("signer0:", signer0.address);
    console.log("signer1:", signer1.address);

    const contract = await hre.ethers.deployContract("Force", signer0);
    console.log("Contract deployed to address:", contract.address);
    console.log("Contract balance:", (await hre.ethers.provider.getBalance(contract.address)).toString());

    const contract1 = await hre.ethers.getContractAt("Force", contract.address, signer1);
    const testContract = await hre.ethers.deployContract("TestForce", [contract.address], signer1);

    await testContract.addMoney({
        value: hre.ethers.utils.parseUnits("1", "wei")
    })

    console.log("Contract balance:", (await hre.ethers.provider.getBalance(contract.address)).toString());


}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
