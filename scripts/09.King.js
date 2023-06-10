
const hre = require("hardhat");

async function main() {

    const [deployer, signer0, signer1] = await hre.ethers.getSigners();

    // const contract = await hre.ethers.getContractAt("King", "0x3F88c9f09ad03f7722b733f15C017a32F795D523", signer0);
    // console.log("Contract deployed to address:", contract.address);
    // console.log("Contract king:", await contract._king());
    // console.log("Contract prize:", await contract.prize());

	// const testContract = await hre.ethers.deployContract("TestKing", [contract.address], deployer);
    // console.log("Test contract deployed to:", testContract.address)

	// await testContract.attack({
    //     value: hre.ethers.utils.parseEther("0.001")
    // });

    // console.log("Contract king:", await contract._king());

    // await signer0.sendTransaction({
    //     to: contract.address,
    //     value: hre.ethers.utils.parseUnits("1", "wei")
    // })

	// console.log("Contract king:", await contract._king());

    const accept = await hre.ethers.provider.getStorageAt("0x921cBF8a90b32675295740Be12D27015DDF4d953", 1);
    console.log(accept)
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
